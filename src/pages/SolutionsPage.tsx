import {
  Activity,
  ArrowRight,
  Compass,
  FileText,
  GraduationCap,
  Handshake,
  Layers,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { PageHero } from '../components/PageHero';
import { Callout, SpecTable } from '../components/Prose';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const AUDIENCES = [
  {
    icon: GraduationCap,
    title: 'Institutions',
    description:
      'Universities, training bodies, and certifying organizations that issue signed credentials, revoke them when circumstances change, and let anyone verify them without calling the office.',
    to: '/solutions/institutions',
  },
  {
    icon: Wallet,
    title: 'Holders',
    description:
      'Anyone who has earned a credential: keep it in one place, share it by link or QR code, and know exactly what a verifier learns about you.',
    to: '/solutions/holders',
  },
  {
    icon: Handshake,
    title: 'Employers',
    description:
      'Recruiters and screening teams who want a structured answer about a candidate’s credential in a single request — no account needed to verify.',
    to: '/solutions/employers',
  },
  {
    icon: Settings,
    title: 'Administrators',
    description:
      'Operators running the network: user management, issuer registration, audit reads, health endpoints, and rate limit configuration.',
    to: '/solutions/administrators',
  },
  {
    icon: Layers,
    title: 'Platform overview',
    description:
      'The architecture, credential lifecycle, verification pipeline, and security model that every role above is working against.',
    to: '/platform',
  },
  {
    icon: Compass,
    title: 'Getting started',
    description:
      'A practical path in: create an account, explore the platform, issue a test credential, and verify it end to end.',
    to: '/resources/getting-started',
  },
];

const ROLE_ROWS = [
  {
    role: <span className="font-bold text-neutral-900">Institution</span>,
    account: 'Sign-in required',
    can: 'Issue and revoke credentials within its own institution (tenant).',
  },
  {
    role: <span className="font-bold text-neutral-900">Holder</span>,
    account: 'Sign-in required',
    can: 'See and share the credentials issued to you.',
  },
  {
    role: <span className="font-bold text-neutral-900">Employer</span>,
    account: 'Sign-in required',
    can: 'Verify credentials, and read data belonging to your own institution.',
  },
  {
    role: <span className="font-bold text-neutral-900">Administrator</span>,
    account: 'Sign-in required, privileged',
    can: 'Manage users, issuers, and network settings.',
  },
  {
    role: <span className="font-bold text-neutral-900">Verifier</span>,
    account: 'No account needed',
    can: 'Query the public verification endpoint with a credential ID and document hash.',
  },
];

const NEXT_STEPS = [
  {
    icon: FileText,
    title: 'API reference',
    description: 'Exact endpoints, parameters, response envelopes, and rate limits.',
    to: '/resources/api',
  },
  {
    icon: ShieldCheck,
    title: 'Verification guide',
    description: 'What each result state means and what to do when a check fails.',
    to: '/resources/verification-guide',
  },
  {
    icon: Activity,
    title: 'Live status',
    description: 'Current health of the platform API and the blockchain node — no login.',
    to: '/live/status',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        icon={<Users className="h-4 w-4" />}
        badge="Solutions"
        title="Built for everyone in the credential chain"
        description="Institutions issue credentials, holders carry them, employers verify them, and administrators run the network. Every role sees a different slice of the same record — and a verifier needs no account at all."
        actions={
          <>
            <Button href={APP_URL} size="lg">
              Launch SecureX
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              to="/platform/how-it-works"
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              How it works
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Choose your role"
            title="Where do you fit?"
            description="Each page below describes what that role can actually do today, what is in development, and what is only planned."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AUDIENCES.map((audience) => (
              <Card
                key={audience.title}
                icon={audience.icon}
                title={audience.title}
                description={audience.description}
                to={audience.to}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Roles at a glance"
            title="What each role can do"
            description="Scopes are enforced by role guards in the API — a valid token alone is never enough to reach a privileged route."
          />
          <div className="mx-auto mt-12 max-w-4xl">
            <SpecTable
              caption="Role capabilities"
              columns={[
                { header: 'Role', key: 'role' },
                { header: 'Account', key: 'account' },
                { header: 'What you can do', key: 'can' },
              ]}
              rows={ROLE_ROWS}
            />
            <div className="mt-6">
              <Callout tone="info" title="Verification is open to anyone">
                Anyone can check a credential against the public API with a credential ID and its
                document hash — no sign-up, no API key required.
              </Callout>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <StatusChip status="live" />
              <StatusChip status="development" />
              <StatusChip status="roadmap" />
              <p className="w-full text-center text-sm text-neutral-500">
                These labels appear next to every capability on this site, so nothing reads as
                shipped when it is not.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Go deeper"
            title="Check the claims yourself"
            description="Nothing on this site needs to be taken on faith — the guides and the live health page are public."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NEXT_STEPS.map((step) => (
              <Card
                key={step.title}
                icon={step.icon}
                title={step.title}
                description={step.description}
                to={step.to}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Start where you are"
        description="Issue and hold credentials in the web application, or check one against the public verifier — both are open right now."
        primary={{ label: 'Launch SecureX', href: APP_URL }}
        secondary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
      />
    </>
  );
}
