import { Ban, RefreshCw, ShieldAlert, Stamp } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import {
  BulletList,
  Callout,
  CodeBlock,
  DocSection,
  InlineCode,
  Lead,
} from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const REVOKE_FLOW = [
  { label: '1. Request', detail: 'POST /api/credentials/:id/revoke — authenticated, issuer/institution/admin roles only.' },
  { label: '2. Local record', detail: 'Status becomes REVOKED with a timestamp; an audit entry and an event row are written in the same transaction.' },
  { label: '3. Chain attempt', detail: 'The API submits a revocation transaction on behalf of the issuer and waits for a block proof.' },
  { label: '4. Honest answer', detail: 'The response reports the anchor result: ANCHORED, PENDING, or UNAVAILABLE — never an unqualified success.' },
  { label: '5. Verification', detail: 'From then on, every verification recomputes status with REVOKED taking precedence over everything else.' },
];

const RESPONSE = `POST /api/credentials/{id}/revoke   (Bearer token required)

{
  "success": true,
  "data": {
    "message": "Credential revoked.",
    "anchor": {
      "status": "ANCHORED",
      "chainTxId": "b1f4c2e0-…",
      "blockHeight": 184,
      "detail": "The revocation is recorded in a blockchain block."
    }
  }
}

// anchor.status is one of: ANCHORED | PENDING | UNAVAILABLE
// When the chain cannot confirm it, detail explains why —
// the platform revocation still applies either way.`;

export default function RevocationPage() {
  return (
    <>
      <PageHero
        icon={<Ban className="h-4 w-4" />}
        badge="Trust · Revocation"
        title="Withdrawn means withdrawn"
        description="An issuer can revoke a credential at any time. The platform status change is immediate; the blockchain write is attempted and reported honestly, whatever the outcome."
        actions={
          <Button to="/platform/credential-lifecycle" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Lifecycle states
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="The flow"
                title="Five steps, one precedence rule"
                description="Revocation is the only status mutation the platform performs — and it always wins when status is recomputed."
              />
              <div className="mt-6">
                <FlowSteps ariaLabel="Revocation flow" columns={3} steps={REVOKE_FLOW} />
              </div>
            </div>

            <div className="space-y-6">
              <CodeBlock label="Revocation response (illustrative)" code={RESPONSE} />
              <div className="rounded-3xl border border-trust-200 bg-trust-50 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-trust-900">Platform revocation</h3>
                  <StatusChip status="live" />
                </div>
                <p className="mt-3 text-sm leading-6 text-trust-900">
                  Always applies. Status becomes REVOKED in the same transaction as the audit
                  entry, and every subsequent verification reports it — no chain required.
                </p>
              </div>
              <div className="rounded-3xl border border-warning-200 bg-warning-50 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-warning-900">Chain-anchored revocation</h3>
                  <StatusChip status="development" />
                </div>
                <p className="mt-3 text-sm leading-6 text-warning-900">
                  Attempted on every revoke and reported as ANCHORED, PENDING, or UNAVAILABLE in
                  the response. Confirmation is not yet guaranteed on every deployment, which is
                  why the result is surfaced instead of assumed.
                </p>
              </div>
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
                eyebrow="For verifiers"
                title="What you see after a revocation"
                description="A verifier never has to guess — revoked is a first-class result."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DocSection id="verifier-view" title="The verification response">
                  <BulletList
                    items={[
                      <><InlineCode>status: REVOKED</InlineCode> with a message stating the issuer withdrew it.</>,
                      <><InlineCode>revokedAt</InlineCode> — when it happened.</>,
                      <>The revocation reason stays internal; it is never returned publicly.</>,
                      <>Blockchain proof checks still report their own state independently — a revoked credential can still have valid evidence of its original issuance.</>,
                    ]}
                  />
                </DocSection>
                <Callout tone="warning" title="Precedence is deliberate">
                  REVOKED outranks every other state. An expired-but-revoked credential reports
                  REVOKED, because “withdrawn by the issuer” is the most actionable fact for a
                  verifier.
                </Callout>
              </div>
            </div>

            <DiagramFigure
              label="Who can revoke"
              caption="Out-of-scope requests return 404 rather than 403, so the API does not confirm the existence of credentials you are not allowed to see."
            >
              <ul className="space-y-3">
                {[
                  ['INSTITUTION', 'Revokes credentials within its own tenant.'],
                  ['ISSUER', 'Revokes credentials issued under its own issuer record.'],
                  ['ADMIN / SECURITY_ADMIN / NETWORK_ADMIN', 'Platform-level revocation with audit trail.'],
                  ['AUDITOR', 'Cannot revoke — read-only by design.'],
                  ['Anyone else', 'No route. Public verification is read-only.'],
                ].map(([role, detail]) => (
                  <li key={role} className="rounded-2xl border border-neutral-200 bg-white px-5 py-4">
                    <span className="text-sm font-bold text-neutral-900">{role}</span>
                    <p className="mt-1 text-sm text-neutral-600">{detail}</p>
                  </li>
                ))}
              </ul>
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Lead>
            Revocation is a status change, not a deletion. The credential record and its issuance
            evidence remain inspectable — so an auditor can still see what happened and when.
          </Lead>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/trust/auditability" size="lg" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
              Audit trails
            </Button>
            <Button to="/resources/faq" size="lg" variant="ghost">
              <ShieldAlert className="mr-2 h-4 w-4" aria-hidden="true" />
              Revocation FAQ
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<Stamp className="h-8 w-8" />}
        title="See revocation in a result"
        description="Verify a revoked credential and read status, revokedAt, and the independent evidence checks in one response."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
