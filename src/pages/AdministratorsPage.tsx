import {
  Activity,
  ArrowRight,
  KeyRound,
  ScrollText,
  Server,
  Settings,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { BulletList, Callout, SpecTable } from '../components/Prose';
import { APP_URL } from '../constants';

const ADMIN_CAPABILITIES = [
  {
    icon: Settings,
    title: 'User management',
    description:
      'Create and manage user accounts and assign roles. Self-registration is limited to HOLDER, INSTITUTION, ISSUER, and EMPLOYER — no self-service path to an admin role.',
  },
  {
    icon: KeyRound,
    title: 'Issuer registration on-chain',
    description:
      'Registering an issuer on the chain is an admin-only operation. The first administrator is created by a gated command-line bootstrap that refuses to run once any admin exists.',
  },
  {
    icon: ScrollText,
    title: 'Audit reads',
    description:
      'Failed logins and privileged actions are written to the audit log; administrators and auditors can read it. AUDITOR reads everything in scope and can never write.',
  },
];

const ROLE_ROWS = [
  {
    role: <span className="font-bold text-neutral-900">ADMIN</span>,
    capability:
      'Full platform administration: manage users and platform settings, register issuers on-chain, and read audit records.',
  },
  {
    role: <span className="font-bold text-neutral-900">SECURITY_ADMIN</span>,
    capability:
      'Security-scoped administration. The exact routes this role may reach are enforced by role guards in the API.',
  },
  {
    role: <span className="font-bold text-neutral-900">NETWORK_ADMIN</span>,
    capability:
      'Network-scoped administration. The exact routes this role may reach are enforced by role guards in the API.',
  },
  {
    role: <span className="font-bold text-neutral-900">AUDITOR</span>,
    capability: 'Reads everything in scope but never writes — a read-only role for reviews.',
  },
];

const HEALTH = [
  {
    label: 'Platform health',
    detail: 'GET /api/health — service version, database connectivity, and data mode.',
    mono: true,
  },
  {
    label: 'Chain health',
    detail: 'GET /health and /status — node ID, protocol version, height, peers, and uptime.',
    mono: true,
  },
  {
    label: 'Status page',
    detail: 'This site’s /live/status reads both endpoints and shows them side by side.',
  },
];

const RATE_LIMIT_ROWS = [
  { scope: 'Default', limit: '150 / minute', applies: 'All API routes' },
  { scope: 'Auth', limit: '10 / minute', applies: 'Login, register, password reset' },
  { scope: 'Verify', limit: '60 / minute', applies: 'Public verification endpoints' },
];

const SECURITY_HEADERS = [
  'Strict-Transport-Security with includeSubDomains in production',
  'Content-Security-Policy default-src none, frame-ancestors none',
  'X-Frame-Options DENY and X-Content-Type-Options nosniff',
  'Referrer-Policy no-referrer and a restrictive Permissions-Policy',
  'Cross-Origin-Resource-Policy same-origin',
];

export default function AdministratorsPage() {
  return (
    <>
      <PageHero
        icon={<Settings className="h-4 w-4" />}
        badge="Solutions · Administrators"
        title="Run the network, with the evidence to back it"
        description="User management, issuer registration, audit reads, health endpoints, and rate limits — plus the two operational limitations we publish rather than hide."
        actions={
          <>
            <Button href={APP_URL} size="lg">
              Launch SecureX
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              to="/live/status"
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Live status
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Platform administration"
            title="Roles and what they unlock"
            description="Four administrative roles sit above the self-service roles. A valid token is never enough on its own — every privileged route checks the role as well."
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <SpecTable
              caption="Administrative roles and capabilities"
              columns={[
                { header: 'Role', key: 'role' },
                { header: 'Capability', key: 'capability' },
              ]}
              rows={ROLE_ROWS}
            />
            <p className="mt-4 text-sm text-neutral-600">
              Object-level checks apply too: an issuer only touches its own issuer record, and
              out-of-scope reads return 404 rather than confirming existence.{' '}
              <Button to="/platform/security" size="sm" variant="ghost">
                Full security model
                <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ADMIN_CAPABILITIES.map((item) => (
              <Card
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Operations"
            title="Observe and tune the platform"
            description="Health, rate limits, and response headers are all inspectable without logging in to anything."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">Health endpoints</h3>
              <div className="mt-5">
                <DiagramFigure
                  label="What you can probe"
                  caption="Both services publish their health publicly — useful before you page anyone."
                >
                  <FlowSteps ariaLabel="Health endpoints" steps={HEALTH} />
                </DiagramFigure>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button to="/live/status" size="md">
                  Open the status page
                </Button>
                <Button to="/resources/api" size="md" variant="outline">
                  API reference
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-neutral-900">Rate limit configuration</h3>
                <StatusChip status="live" />
              </div>
              <div className="mt-5">
                <SpecTable
                  caption="API rate limits"
                  columns={[
                    { header: 'Scope', key: 'scope' },
                    { header: 'Limit', key: 'limit' },
                    { header: 'Applies to', key: 'applies' },
                  ]}
                  rows={RATE_LIMIT_ROWS}
                />
              </div>
              <p className="mt-4 text-sm text-neutral-600">
                Fixed one-minute windows per IP address, applied at the router level. Over-limit
                requests receive 429 with errorCode RATE_LIMITED and a Retry-After header.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-neutral-900">Security headers on every response</h3>
              <StatusChip status="live" />
            </div>
            <div className="mt-5">
              <BulletList items={SECURITY_HEADERS} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Honest limitations"
            title="Two things we do not paper over"
            description="Both are tracked on the roadmap. They are stated here so an operator can plan around them instead of discovering them later."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-securex-600" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-neutral-900">Chain persistence</h3>
                </div>
                <StatusChip status="roadmap" />
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                The chain node stores blocks and transactions in JSON files on its own disk, and it
                runs today without a persistent disk: if the instance is replaced, it re-initialises
                from genesis. The platform database remains the authoritative credential history —
                treat chain data as independently verifiable evidence, not as the only durable copy.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-securex-600" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-neutral-900">Fraud engine</h3>
                </div>
                <StatusChip status="development" />
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                The fraud analysis service runs as a separate deployment, and the platform only
                health-probes its endpoint today. Fraud scoring is not part of the public
                verification response and is not surfaced in dashboards yet.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">
            <Callout tone="warning" title="Scope of this page">
              This page describes what the platform enforces and publishes today. Where a capability
              is in development or only planned, it is labelled as such — nothing here should be
              read as a guarantee about future behaviour.
            </Callout>
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap gap-3">
            <Button to="/project/roadmap" size="lg" variant="outline">
              See the roadmap
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/trust/auditability" size="lg" variant="ghost">
              Auditability deep-dive
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="Operate with the lights on"
        description="Health endpoints, chain height, and block history are publicly readable — inspect the platform before you rely on it."
        primary={{ label: 'Launch SecureX', href: APP_URL }}
        secondary={{ label: 'View live status', href: '/live/status' }}
      />
    </>
  );
}
