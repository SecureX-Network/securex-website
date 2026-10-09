import {
  ArrowRight,
  BookOpen,
  Braces,
  HelpCircle,
  ListChecks,
  PlayCircle,
  ScrollText,
  Waypoints,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusLegend } from '../components/StatusChip';
import { EXPLORER_URL, VERIFY_APP_URL } from '../constants';

const GUIDES = [
  {
    icon: PlayCircle,
    title: 'Getting Started',
    description: 'Create an account, issue a first credential, and verify it end to end.',
    to: '/resources/getting-started',
  },
  {
    icon: ListChecks,
    title: 'Verification Guide',
    description: 'For verifiers: what you need, how to read the result, and what not to infer.',
    to: '/resources/verification-guide',
  },
  {
    icon: Braces,
    title: 'API Reference',
    description: 'Endpoints, envelopes, parameters, rate limits, and authentication.',
    to: '/resources/api',
  },
  {
    icon: ScrollText,
    title: 'Documentation',
    description: 'The full documentation set, organised by topic, with reading order.',
    to: '/resources/documentation',
  },
  {
    icon: HelpCircle,
    title: 'FAQ',
    description: 'Straight answers on statuses, revocation, privacy, and what is live today.',
    to: '/resources/faq',
  },
  {
    icon: BookOpen,
    title: 'Glossary',
    description: 'Every term this site uses, defined in plain language.',
    to: '/resources/glossary',
  },
];

const READING_ORDER = [
  { label: '1. Getting started', detail: 'Understand the roles and the issuance flow.' },
  { label: '2. How it works', detail: 'The six stages from issuance to a verification result.' },
  { label: '3. Verification guide', detail: 'Learn to read a result before you rely on one.' },
  { label: '4. API reference', detail: 'Wire the endpoints into your own systems.' },
  { label: '5. Trust pages', detail: 'Integrity, revocation, auditability — the evidence behind it all.' },
  { label: '6. Roadmap', detail: 'What is live, in development, or planned.' },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        icon={<Waypoints className="h-4 w-4" />}
        badge="Resources"
        title="Everything written down"
        description="Guides for issuers, holders, and verifiers; a precise API reference; and a glossary so no term on this site needs translating."
        actions={
          <Button to="/resources/getting-started" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Start here
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Guides"
            title="Pick your path"
            description="Six resources, each with a specific job. None of them requires an account to read."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((guide) => (
              <Card key={guide.title} icon={guide.icon} title={guide.title} description={guide.description} to={guide.to} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Reading order"
                title="New to SecureX? Follow the sequence"
                description="Each step builds on the previous one — no jumping straight to API calls without knowing what a result means."
              />
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/resources/documentation" size="lg">
                  Open the documentation
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button to="/platform" size="lg" variant="outline">
                  Platform overview
                </Button>
              </div>
              <div className="mt-8">
                <StatusLegend />
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-neutral-500">
                Every capability on this site carries one of these labels. Nothing is described as
                shipped unless it is running in production.
              </p>
            </div>

            <FlowSteps ariaLabel="Recommended reading order" columns={3} steps={READING_ORDER} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Related surfaces"
            title="Beyond the docs"
            description="Two live systems you will use while reading."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card
              href={VERIFY_APP_URL}
              icon={ListChecks}
              title="Public verifier"
              description="Try the verification endpoint with a credential ID and hash — the exact request the API reference documents."
            />
            <Card
              href={EXPLORER_URL}
              icon={Waypoints}
              title="Block explorer"
              description="Read-only chain inspection: blocks, transactions, validators, and network status. No login."
            />
          </div>
        </div>
      </section>

      <CtaSection
        title="Read less, verify more"
        description="The fastest way to understand SecureX is to run a verification and read the evidence it returns."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ to: '/resources/getting-started', label: 'Getting started' }}
      />
    </>
  );
}
