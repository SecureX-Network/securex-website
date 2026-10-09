import { ArrowRight, KeyRound, Lock, ShieldCheck, Timer, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import {
  BodyText,
  BulletList,
  Callout,
  DocSection,
  InlineCode,
  Lead,
  SpecTable,
} from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const AUTH_FLOW = [
  { label: '1. Credentials', detail: 'Email + password → bcrypt check (cost 10).' },
  { label: '2. Session', detail: 'A server-side session row is created; tokens carry its ID.' },
  { label: '3. Token', detail: 'JWT bearer token, 8-hour expiry by default.' },
  { label: '4. Every request', detail: 'Signature → session not revoked → user ACTIVE → role allowed.' },
  { label: '5. On failure', detail: '401 for missing/invalid credentials, 403 for a wrong role.' },
  { label: '6. Audit', detail: 'Failed logins and privileged actions are written to the audit log.' },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        icon={<ShieldCheck className="h-4 w-4" />}
        badge="Platform · Security"
        title="The security model, in plain terms"
        description="Role-based access, short-lived tokens, strict rate limits, and hardened response headers — each one enforced in code, not in a policy document."
        actions={
          <Button to="/platform" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Platform overview
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Access control"
                title="Nine roles, checked twice"
                description="Authentication proves who you are; authorization proves what you may do. Privileged routes require both."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DocSection id="roles" title="Roles">
                  <BodyText>
                    Every authenticated request carries a role. Route guards reject anything
                    outside the allowed set with 403 FORBIDDEN — a valid token alone is never
                    enough.
                  </BodyText>
                  <BulletList
                    items={[
                      'Self-registration is limited to HOLDER, INSTITUTION, ISSUER, and EMPLOYER.',
                      'Credential writes (issue, revoke) require an institution, issuer, or an admin-level role.',
                      'AUDITOR can read everything in scope but can never write.',
                      'Object-level checks apply too: an issuer can only touch its own issuer record, and out-of-scope reads return 404 rather than confirming existence.',
                    ]}
                  />
                </DocSection>
                <Callout tone="info" title="Bootstrap without an HTTP backdoor">
                  The first administrator is created by a gated command-line bootstrap, which
                  refuses to run once any admin exists. There is no endpoint that can mint an
                  administrator.
                </Callout>
              </div>
            </div>

            <div className="space-y-6">
              <DiagramFigure label="Authentication lifecycle" caption="Tokens are short-lived and bound to a server-side session, so revocation takes effect immediately.">
                <FlowSteps ariaLabel="Authentication lifecycle" columns={3} steps={AUTH_FLOW} />
              </DiagramFigure>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Rate limits"
                title="Abuse control by default"
                description="Fixed one-minute windows per IP address, applied at the router level."
              />
              <div className="mt-6">
                <SpecTable
                  caption="API rate limits"
                  columns={[
                    { header: 'Scope', key: 'scope' },
                    { header: 'Limit', key: 'limit' },
                    { header: 'Applies to', key: 'applies' },
                  ]}
                  rows={[
                    { scope: 'Default', limit: '150 / minute', applies: 'All API routes' },
                    { scope: 'Auth', limit: '10 / minute', applies: 'Login, register, password reset' },
                    { scope: 'Verify', limit: '60 / minute', applies: 'Public verification endpoints' },
                  ]}
                />
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                Over-limit requests receive <InlineCode>429</InlineCode> with{' '}
                <InlineCode>errorCode: RATE_LIMITED</InlineCode> and a{' '}
                <InlineCode>Retry-After</InlineCode> header.
              </p>
            </div>

            <DiagramFigure label="Response headers" caption="Applied to every API response, including errors.">
              <ul className="space-y-3 text-sm">
                {[
                  ['Strict-Transport-Security', 'max-age=31536000; includeSubDomains (production)'],
                  ['Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; script-src 'self'"],
                  ['X-Frame-Options', 'DENY'],
                  ['X-Content-Type-Options', 'nosniff'],
                  ['Referrer-Policy', 'no-referrer'],
                  ['Permissions-Policy', 'camera=(), microphone=(), geolocation=()'],
                  ['Cross-Origin-Resource-Policy', 'same-origin'],
                ].map(([header, value]) => (
                  <li key={header} className="flex flex-col gap-0.5 rounded-xl border border-neutral-200 bg-white px-4 py-3">
                    <span className="font-mono text-xs font-bold text-securex-700">{header}</span>
                    <span className="font-mono text-xs text-neutral-500">{value}</span>
                  </li>
                ))}
              </ul>
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Secrets & boundaries" title="What never reaches the browser" />
          <div className="mt-10 space-y-6 text-[15px] leading-7 text-neutral-600">
            <Lead>
              Anything a client could read, an attacker could read. The sensitive material stays
              server-side by construction:
            </Lead>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <KeyRound className="h-5 w-5 text-securex-600" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-neutral-900">Signing keys</h3>
                <p className="mt-1.5 text-sm leading-6 text-neutral-600">
                  Issuer private keys are generated on the node’s disk with file mode 600 and are
                  never served, logged, or shipped to a browser bundle.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <Lock className="h-5 w-5 text-securex-600" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-neutral-900">Chain credentials</h3>
                <p className="mt-1.5 text-sm leading-6 text-neutral-600">
                  The platform’s chain token lives in server configuration only. If it is missing,
                  privileged chain operations are refused — never silently permitted.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <Users className="h-5 w-5 text-securex-600" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-neutral-900">Passwords</h3>
                <p className="mt-1.5 text-sm leading-6 text-neutral-600">
                  Stored as bcrypt hashes with cost factor 10. Password resets return the same
                  response whether or not an account exists.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <Timer className="h-5 w-5 text-securex-600" aria-hidden="true" />
                <h3 className="mt-3 font-bold text-neutral-900">Sessions</h3>
                <p className="mt-1.5 text-sm leading-6 text-neutral-600">
                  JWTs expire after 8 hours by default and reference a server-side session row, so
                  a compromised token can be invalidated.
                </p>
              </div>
            </div>

            <DocSection id="cors" title="CORS: an exact allowlist">
              <BulletList
                items={[
                  'Only configured origins (the web application and explorer) receive CORS permission.',
                  'An empty origin list or the wildcard “*” is rejected at startup in production.',
                  'Disallowed origins still receive standard security headers — they simply cannot read responses from a browser.',
                ]}
              />
            </DocSection>

            <Callout tone="warning" title="Honest scope">
              This page describes what the code enforces today. Fraud analysis exists as a separate
              service but is not part of the public verification response yet, and chain anchoring
              for revocation is not guaranteed on every deployment. Those items are tracked as in
              development on the roadmap.
            </Callout>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button to="/project/roadmap" size="lg" variant="outline">
                See the roadmap
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/resources/faq" size="lg" variant="ghost">
                Security FAQ
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Trust, then verify"
        description="The strongest proof is checking a credential yourself against the public API."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
