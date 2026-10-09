import {
  ArrowRight,
  Blocks,
  ClipboardList,
  GitBranch,
  KeyRound,
  Layers,
  ListChecks,
  ScanLine,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const SUBPAGES = [
  {
    icon: ListChecks,
    title: 'How It Works',
    description:
      'The full path from issuance to a verification result, with the anchor states recorded along the way.',
    to: '/platform/how-it-works',
  },
  {
    icon: Layers,
    title: 'Architecture',
    description:
      'The layers behind SecureX: web applications, API services, PostgreSQL, and the blockchain node.',
    to: '/platform/architecture',
  },
  {
    icon: GitBranch,
    title: 'Credential Lifecycle',
    description:
      'Every status a credential can hold, what each one means, and which transitions are allowed.',
    to: '/platform/credential-lifecycle',
  },
  {
    icon: ScanLine,
    title: 'Verification',
    description:
      'What the verification pipeline checks, in order, and how to read the result it returns.',
    to: '/platform/verification',
  },
  {
    icon: KeyRound,
    title: 'Security',
    description:
      'Role-based access, token handling, rate limits, and the headers every API response carries.',
    to: '/platform/security',
  },
];

const COMPONENTS = [
  { label: 'Public website (this site)', detail: 'securex.sp-net.in' },
  { label: 'Web application', detail: 'app-securex.sp-net.in' },
  { label: 'Platform API', detail: 'api-securex.sp-net.in' },
  { label: 'Blockchain node', detail: 'Public chain reads and anchoring' },
  { label: 'Block explorer', detail: 'explorer-securex.sp-net.in' },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        icon={<Layers className="h-4 w-4" />}
        badge="Platform"
        title="One platform, from issuance to proof"
        description="SecureX is a credential trust network: institutions issue signed credentials, holders carry them, and anyone can verify them against the issuing record and the public ledger."
        actions={
          <>
            <Button href={APP_URL} size="lg">
              Launch SecureX
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/platform/how-it-works" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              How it works
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Explore the platform"
            title="Five deep-dives"
            description="Each page covers one part of the system, with the actual states, checks, and limits — not marketing shorthand."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUBPAGES.map((page) => (
              <Card key={page.title} icon={page.icon} title={page.title} description={page.description} to={page.to} />
            ))}
            <Card
              icon={ClipboardList}
              title="API Reference"
              description="Exact endpoints, parameters, response envelopes, and rate limits for integrators."
              to="/resources/api"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="System at a glance"
                title="What runs today"
                description="Five deployed services, each independently observable. Live health is published without a login."
              />
              <ul className="mt-6 space-y-3">
                {COMPONENTS.map((component) => (
                  <li
                    key={component.label}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm"
                  >
                    <span className="text-sm font-bold text-neutral-900">{component.label}</span>
                    <span className="font-mono text-xs text-neutral-500">{component.detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <StatusChip status="live" />
                <Button to="/live/status" size="md" variant="outline">
                  Check live status
                </Button>
              </div>
            </div>

            <DiagramFigure
              label="The trust path"
              caption="The public website explains the network; the web application is where credentials are issued and held. Verification itself only needs a credential ID, its hash, and the public API."
            >
              <FlowSteps
                ariaLabel="Trust path"
                columns={3}
                steps={[
                  { label: 'Web application', detail: 'Issue, hold, and revoke credentials.' },
                  { label: 'Platform API', detail: 'Validates requests, stores records, writes audit entries.' },
                  { label: 'PostgreSQL', detail: 'Credentials, institutions, users, verification history.' },
                  { label: 'Blockchain node', detail: 'Anchors issuance and revocation to a public chain.' },
                  { label: 'Verification API', detail: 'Returns a structured result with chain evidence.' },
                  { label: 'Anyone', detail: 'A verifier needs no account to check a credential.' },
                ]}
              />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Design principles"
            title="How the platform is built"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 p-6">
              <ShieldCheck className="h-6 w-6 text-securex-600" aria-hidden="true" />
              <h3 className="mt-4 font-bold text-neutral-900">Verify without an account</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                The public verification endpoint accepts a credential ID and hash — no login, no API key.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 p-6">
              <Blocks className="h-6 w-6 text-securex-600" aria-hidden="true" />
              <h3 className="mt-4 font-bold text-neutral-900">Evidence, not adjectives</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Results include block height, transaction IDs, and proof status so a claim can be checked a second time.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 p-6">
              <GitBranch className="h-6 w-6 text-securex-600" aria-hidden="true" />
              <h3 className="mt-4 font-bold text-neutral-900">Honest state labels</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Capabilities are marked live, in development, or on the roadmap wherever they appear on this site.
              </p>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Button to="/resources/getting-started" size="lg" variant="outline">
              Getting started guide
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="See the platform running"
        description="Issue a credential in the web application, then verify it against the public API — the same flow this page describes."
        primary={{ label: 'Launch SecureX', href: APP_URL }}
        secondary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
      />
    </>
  );
}
