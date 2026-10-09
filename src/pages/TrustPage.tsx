import { ArrowRight, Blocks, Fingerprint, History, ShieldCheck, Stamp } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { BulletList, Lead } from '../components/Prose';
import { APP_URL, EXPLORER_URL, VERIFY_APP_URL } from '../constants';

const PILLARS = [
  {
    icon: Blocks,
    title: 'Blockchain',
    description:
      'What actually gets written to the ledger, when a write counts as committed, and what the chain proves.',
    to: '/trust/blockchain',
  },
  {
    icon: Fingerprint,
    title: 'Credential Integrity',
    description:
      'How a credential is reduced to a fixed-length hash, and why altering even one character fails verification.',
    to: '/trust/credential-integrity',
  },
  {
    icon: Stamp,
    title: 'Revocation',
    description:
      'How an issuer withdraws a credential, what the verifier sees, and what happens if the chain is unavailable.',
    to: '/trust/revocation',
  },
  {
    icon: History,
    title: 'Auditability',
    description:
      'The records left behind: verification history, audit events, block data, and a read-only explorer.',
    to: '/trust/auditability',
  },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        icon={<ShieldCheck className="h-4 w-4" />}
        badge="Trust"
        title="Trust you can check, not just read about"
        description="SecureX separates two questions: is this document the one that was issued (integrity), and does the issuer still stand behind it (status)? Each has its own evidence."
        actions={
          <>
            <Button href={VERIFY_APP_URL} size="lg">
              Verify a credential
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={EXPLORER_URL} size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Open the explorer
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Four pillars"
            title="Where trust comes from"
            description="Each pillar is a separate mechanism with its own page, its own evidence, and its own honest limits."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <Card key={pillar.title} icon={pillar.icon} title={pillar.title} description={pillar.description} to={pillar.to} />
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
                eyebrow="The model"
                title="Two independent questions"
                description="Confusing them is how credential systems overpromise. SecureX keeps them apart."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <Lead>
                  A verification response answers both, each with its own check, so a document can
                  be intact but withdrawn — or listed but altered.
                </Lead>
                <BulletList
                  items={[
                    <><strong>Integrity</strong> — “Is this the exact document that was issued?” Answered by hashing the presented document and comparing it with the hash recorded at issuance.</>,
                    <><strong>Status</strong> — “Does the issuer still stand behind it?” Answered by the platform record: valid, revoked, expired, suspended.</>,
                    <><strong>Evidence</strong> — “Can I confirm this outside your infrastructure?” Answered by block height, transaction IDs, and an inclusion proof you can re-check in the explorer.</>,
                  ]}
                />
              </div>
            </div>

            <DiagramFigure
              label="Evidence chain"
              caption="Every arrow is a step a verifier can reproduce with public endpoints."
            >
              <FlowSteps
                ariaLabel="Evidence chain"
                columns={3}
                steps={[
                  { label: 'Document', detail: 'The credential the holder presents.' },
                  { label: 'SHA-256 hash', detail: 'Compared with the hash recorded at issuance.' },
                  { label: 'Platform record', detail: 'Authoritative status, recomputed on every read.' },
                  { label: 'Chain evidence', detail: 'Transaction, block, and inclusion proof.' },
                  { label: 'Independent check', detail: 'Re-checkable in the block explorer.' },
                  { label: 'Decision', detail: 'Accept, reject, or escalate — with reasons attached.' },
                ]}
              />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Honest limits" title="What we do not claim" />
          <div className="mt-8 rounded-3xl border border-warning-200 bg-warning-50 p-7">
            <ul className="space-y-3 text-sm leading-6 text-warning-900">
              <li>
                <strong>Blockchain does not mean “cannot fail”.</strong> The node currently runs
                without a persistent disk: if the instance is replaced it re-initialises from
                genesis. The platform database remains the durable record of credentials.
              </li>
              <li>
                <strong>Not every revocation reaches the chain.</strong> Platform revocation always
                applies; the chain write is reported honestly as ANCHORED, PENDING, or UNAVAILABLE
                in the response.
              </li>
              <li>
                <strong>No fraud score in verification yet.</strong> A separate fraud-analysis
                service exists but is not part of the public verification response — it is marked
                in development on the roadmap.
              </li>
            </ul>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/project/roadmap" size="lg" variant="outline">
              See what is live vs planned
            </Button>
            <StatusChip status="live" className="self-center" />
            <StatusChip status="development" className="self-center" />
            <StatusChip status="roadmap" className="self-center" />
          </div>
        </div>
      </section>

      <CtaSection
        title="Check the evidence yourself"
        description="Verification returns block height, transaction IDs, and proof status alongside the verdict — nothing has to be taken on faith."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
