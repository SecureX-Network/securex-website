import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  GitBranch,
  HelpCircle,
  KeyRound,
  Layers,
  Library,
  ListChecks,
  Rocket,
  ScanLine,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { APP_URL } from '../constants';

const GUIDES = [
  {
    icon: Rocket,
    title: 'Getting Started',
    description:
      'Six steps from an empty account to a credential you have verified yourself, with the exact request to send.',
    to: '/resources/getting-started',
  },
  {
    icon: ScanLine,
    title: 'Verification Guide',
    description:
      'What to collect before you call the endpoint, how to read every field it returns, and when to accept, reject, or escalate.',
    to: '/resources/verification-guide',
  },
  {
    icon: ClipboardList,
    title: 'API Reference',
    description:
      'Endpoints, parameters, success and error envelopes, roles, and rate limits — the surface an integrator codes against.',
    to: '/resources/api',
  },
  {
    icon: HelpCircle,
    title: 'Frequently Asked Questions',
    description:
      'Direct answers on accounts, statuses, the blockchain, fraud detection, mobile, pricing, and how to get in touch.',
    to: '/resources/faq',
  },
  {
    icon: Library,
    title: 'Glossary',
    description:
      'Every credential, chain, and platform term used across this site, each defined in two sentences or fewer.',
    to: '/resources/glossary',
  },
];

const PLATFORM_DOCS = [
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
      'Web applications, API services, PostgreSQL, and the blockchain node — how the layers fit together.',
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
    icon: KeyRound,
    title: 'Security',
    description:
      'Role-based access, token handling, rate limits, and the headers every API response carries.',
    to: '/platform/security',
  },
];

const START_PATH = [
  {
    label: 'New integrator',
    detail: 'Start here: nothing assumed beyond a credential ID and its document hash.',
  },
  {
    label: 'Getting started',
    detail: 'Create an account, issue one credential, and run a first verification end to end.',
  },
  {
    label: 'API reference',
    detail: 'Endpoints, envelopes, error codes, roles, and limits — written for code, not prose.',
  },
  {
    label: 'Verification guide',
    detail: 'Read a result, decide what it means, and recognise the cases that need escalation.',
  },
];

export default function DocumentationPage() {
  return (
    <>
      <PageHero
        icon={<BookOpen className="h-4 w-4" />}
        badge="Resources · Documentation"
        title="Every guide, one starting point"
        description="The SecureX documentation set: how to begin, how to verify, the exact API surface, and a reference for the terms and statuses used everywhere on this site."
        actions={
          <>
            <Button to="/resources/getting-started" size="lg">
              Getting started
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              to="/resources/api"
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              API reference
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Documentation set"
            title="Five guides"
            description="Each page covers one job completely. Read them in any order — every term used here is defined in the glossary."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((guide) => (
              <Card
                key={guide.to}
                icon={guide.icon}
                title={guide.title}
                description={guide.description}
                to={guide.to}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Where to start"
            title="A path for a new integrator"
            description="Four stops, in order. Each one assumes only what the stop before it already covered."
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <StatusChip status="live" />
            <span className="text-sm text-neutral-600">
              Every guide on this page describes the platform as it runs today.
            </span>
          </div>
          <div className="mt-10">
            <FlowSteps ariaLabel="Where to start" columns={4} steps={START_PATH} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Platform reference"
            title="Go deeper on the system"
            description="The pages behind the documentation: how the pieces are built, how a credential moves, and what the security model actually enforces."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_DOCS.map((page) => (
              <Card
                key={page.to}
                icon={page.icon}
                title={page.title}
                description={page.description}
                to={page.to}
              />
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to="/platform" size="lg" variant="outline">
              Platform overview
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/resources/faq" size="lg" variant="ghost">
              FAQ
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<BookOpen className="h-8 w-8" />}
        title="Read one guide, run one request"
        description="The getting started path ends with a verification you ran yourself — an account to issue, nothing to verify."
        primary={{ label: 'Getting started', to: '/resources/getting-started' }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
