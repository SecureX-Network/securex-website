import { ArrowRight, Flag, Layers, Rocket, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusLegend } from '../components/StatusChip';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const PAGES = [
  {
    icon: Users,
    title: 'About SecureX',
    description: 'The problem this project addresses and the approach it takes.',
    to: '/project/about',
  },
  {
    icon: Flag,
    title: 'SIH 2026',
    description: 'Why the project exists, what the prototype demonstrates, and its current stage.',
    to: '/project/sih-2026',
  },
  {
    icon: Layers,
    title: 'Technology',
    description: 'The stack: React, Express, PostgreSQL, and a purpose-built permissioned chain.',
    to: '/project/technology',
  },
  {
    icon: Rocket,
    title: 'Roadmap',
    description: 'What is live, what is in development, and what is planned next.',
    to: '/project/roadmap',
  },
];

const PRINCIPLES = [
  { label: 'Evidence over claims', detail: 'Anything this site states can be re-checked through public endpoints, the explorer, or the source repositories.' },
  { label: 'Honest labels', detail: 'Every capability carries a live / in development / roadmap label. Nothing is implied to be finished when it is not.' },
  { label: 'Off-chain by default', detail: 'Credential content stays with the platform and its issuer. Only hashes, IDs, and proofs reach the chain.' },
  { label: 'Verification without gatekeeping', detail: 'Checking a credential needs no account, no API key, and no agreement with us.' },
  { label: 'Separate the questions', detail: 'Integrity (is this the document that was issued?) and status (is it still honoured?) are answered independently.' },
  { label: 'Prototype honesty', detail: 'This is a working prototype with known limitations — they are published, not buried.' },
];

export default function ProjectPage() {
  return (
    <>
      <PageHero
        icon={<Rocket className="h-4 w-4" />}
        badge="Project"
        title="About this project"
        description="SecureX is a credential trust network built as a working prototype: issuance, verification, revocation, and a permissioned chain — deployed and inspectable, not just described."
        actions={
          <Button to="/project/about" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Read the story
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Project pages" title="Where to start" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PAGES.map((page) => (
              <Card key={page.title} icon={page.icon} title={page.title} description={page.description} to={page.to} />
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
                eyebrow="Principles"
                title="How the project decides things"
                description="Six commitments that shape both the product and how this website talks about it."
              />
              <div className="mt-8">
                <StatusLegend />
              </div>
            </div>

            <FlowSteps ariaLabel="Project principles" columns={3} steps={PRINCIPLES} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Current stage"
            title="A prototype that is actually running"
            description="The services are deployed: a web application, a public API, a blockchain node, and a block explorer. Known limitations — including chain storage durability and revocation anchoring guarantees — are published on the roadmap rather than glossed over."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to="/project/roadmap" size="lg">
              See the roadmap
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/live/status" size="lg" variant="outline">
              Live status
            </Button>
            <Button href={APP_URL} size="lg" variant="ghost">
              Launch SecureX
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="Judge it by what it does"
        description="Verify a credential against the public API and follow the evidence into the chain explorer."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
