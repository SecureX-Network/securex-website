import {
  ArrowRight,
  Blocks,
  Braces,
  Globe,
  HeartPulse,
  ScanLine,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { Callout, Lead } from '../components/Prose';
import { APP_URL, EXPLORER_URL, VERIFY_APP_URL } from '../constants';

interface Surface {
  icon: typeof Globe;
  title: string;
  description: string;
  to?: string;
  href?: string;
}

const SURFACES: Surface[] = [
  {
    icon: HeartPulse,
    title: 'Service status',
    description: 'Live health, latency, and chain freshness — probed every 30 seconds through this site’s own status proxy.',
    to: '/live/status',
  },
  {
    icon: ScanLine,
    title: 'Verify a credential',
    description: 'The public verifier: paste a credential ID and hash, and read the integrity, status, and chain evidence.',
    href: VERIFY_APP_URL,
  },
  {
    icon: Blocks,
    title: 'Block explorer',
    description: 'Browse blocks, transactions, credentials, and network stats in an independent, read-only frontend.',
    href: EXPLORER_URL,
  },
  {
    icon: Braces,
    title: 'Public API reference',
    description: 'Endpoints, parameters, envelopes, and rate limits for building verification into your own systems.',
    to: '/resources/api',
  },
  {
    icon: Globe,
    title: 'What is live today',
    description: 'The honest three-band list: live, in development, and roadmap — nothing mislabelled.',
    to: '/project/roadmap',
  },
  {
    icon: Blocks,
    title: 'Chain evidence explained',
    description: 'How a verification response links back to a block, and how to read that block yourself.',
    to: '/trust/blockchain',
  },
];

const READ_STEPS = [
  { label: '1. Check the status page', detail: 'Confirm the platform API, chain node, verifier, and explorer all respond.' },
  { label: '2. Run a verification', detail: 'Use the public verifier with a credential ID — no account required.' },
  { label: '3. Follow the evidence', detail: 'Open the block referenced in the response and compare it in the explorer.' },
  { label: '4. Read the labels', detail: 'Anything not marked live is in development or planned — see the roadmap.' },
];

export default function LivePage() {
  return (
    <>
      <PageHero
        icon={<HeartPulse className="h-4 w-4" />}
        badge="Live"
        title="The network, as it runs right now"
        description="SecureX publishes its own state: service health, verification results, and the chain behind them. Everything on this page links to a running system — not a description of one."
        actions={
          <Button to="/live/status" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Open service status
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Live surfaces"
            title="Four running systems, one check each"
            description="Each surface below is a deployed service you can reach without credentials."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SURFACES.map((surface) => (
              <Card
                key={surface.title}
                icon={surface.icon}
                title={surface.title}
                description={surface.description}
                {...(surface.to ? { to: surface.to } : { href: surface.href })}
              />
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
                eyebrow="How to use this section"
                title="Trust, then verify"
                description="Four steps that take under a minute and need no account."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <StatusChip status="live" />
                <StatusChip status="development" />
                <StatusChip status="roadmap" />
              </div>
            </div>
            <FlowSteps ariaLabel="How to use the live section" columns={3} steps={READ_STEPS} />
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <Callout tone="info" title="Why status is served through a proxy">
              <Lead>
                The platform API and chain node only accept browser requests from their own
                application origins. This site’s status page therefore probes them server-side
                through a small serverless function and shows only non-sensitive operational
                facts — version, health, height, and latency.
              </Lead>
            </Callout>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Application"
            title="Issuing and holding lives in the app"
            description="The public site reports; the application does the work — creating institutions, issuing signed credentials, holding them, and revoking them."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href={APP_URL} size="lg">
              Launch SecureX
            </Button>
            <Button to="/live/status" size="lg" variant="outline">
              Service status
            </Button>
            <Button href={EXPLORER_URL} size="lg" variant="ghost">
              Block explorer
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="Watch it answer"
        description="The status page probes every service and prints what came back — latency included."
        primary={{ label: 'Open service status', to: '/live/status' }}
        secondary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
      />
    </>
  );
}
