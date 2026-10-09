import { ArrowRight, Bug, CheckCircle2, FlaskConical, GraduationCap, Timer } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { FlowSteps, LayerStack } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { BodyText, BulletList, Callout, CodeBlock, DocSection, Lead } from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const DEMO_STEPS = [
  { label: 'Register an issuer', detail: 'Create an institutional account and get its public key anchored on the chain.', mono: false },
  { label: 'Issue a credential', detail: 'The platform stores the record and writes its hash under the issuer identity.', mono: false },
  { label: 'Alter the document', detail: 'Change one character in the presented copy.', mono: false },
  { label: 'Verify the pair', detail: 'One query returns EXACT for the original and TAMPERED for the altered copy.', mono: false },
  { label: 'Revoke it', detail: 'The issuer withdraws the credential; status flips to REVOKED.', mono: false },
  { label: 'Follow the evidence', detail: 'Open the block explorer and inspect the transaction the evidence points to.', mono: false },
];

const STACK = [
  {
    title: 'Web application',
    items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    note: 'Issuer, holder, and administrator workflows — plus this public website.',
  },
  {
    title: 'Platform API',
    items: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
    note: 'Structured credentials, roles, rate limits, and the public verification endpoint.',
  },
  {
    title: 'Permissioned chain',
    items: ['Ed25519', 'SHA-256', 'Merkle proofs', 'Proof of Authority'],
    note: 'Hashes, public IDs, revocation transactions, and inclusion proofs. No tokens, no mining.',
  },
  {
    title: 'Tooling',
    items: ['Block explorer', 'CLI', 'Attack simulation'],
    note: 'Independent frontend for inspecting blocks, transactions, and evidence.',
  },
];

export default function SihPage() {
  return (
    <>
      <PageHero
        icon={<GraduationCap className="h-4 w-4" />}
        badge="Project · SIH 2026"
        title="SecureX at Smart India Hackathon 2026"
        description="A prototype built for SIH 2026: a working credential trust network you can deploy, attack, and verify end to end — not a slide deck."
        actions={
          <Button href={VERIFY_APP_URL} size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Try a verification
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="The problem statement"
                title="Forged credentials are cheap to make and slow to catch"
                description="Institutions issue thousands of certificates a year; verifying even one of them still takes a phone call."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <BodyText>
                  Smart India Hackathon asks teams to build working solutions to real problems.
                  SecureX tackles credential fraud: the ease of altering a certificate, the manual
                  cost of checking one, and the absence of any shared record an employer can query
                  in seconds.
                </BodyText>
                <BulletList
                  items={[
                    <>A verification that takes <strong>seconds</strong> instead of days — without an account or API key.</>,
                    <>Forgery that fails <strong>visibly</strong>: an altered character changes the hash and the check.</>,
                    <>Revocation that travels: once an issuer withdraws a credential, every verifier sees it.</>,
                    <>Privacy preserved: only <strong>hashes and proofs</strong> ever reach the chain.</>,
                  ]}
                />
              </div>
            </div>

            <Callout tone="success" title="What makes this prototype judgeable">
              <div className="space-y-3 text-sm leading-6">
                <p>
                  Everything in SecureX can be exercised live: the web app, the public verification
                  API, the blockchain node, and the explorer. Nothing needs a scripted demo video.
                </p>
                <p>
                  <strong>Attack simulation is built in.</strong> The chain repository ships a
                  deterministic attack script that attempts eight classes of manipulation and
                  shows each one rejected with a concrete error — replayed transactions, invalid
                  signatures, tampered blocks, altered documents, and more.
                </p>
              </div>
            </Callout>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The demo loop"
            title="Issue → tamper → verify → revoke"
            description="The six moves a judge runs to see the whole system work."
          />
          <div className="mt-12">
            <FlowSteps ariaLabel="Demo loop" columns={3} steps={DEMO_STEPS} />
          </div>
          <div className="mt-8">
            <CodeBlock
              label="Verification response (real payload shape)"
              code={`{
  "status": "VALID",
  "integrity": "EXACT",
  "statusEvidence": { "source": "platform", "status": "ISSUED" },
  "chainEvidence": { "found": true, "blockHeight": 4, "anchoring": "ANCHORED" }
}`}
            />
          </div>
          <div className="mt-6">
            <Callout tone="warning" title="Prototype status, stated plainly">
              The chain node currently runs with in-memory storage — state restarts from genesis if
              the service restarts — and chain-side revocation confirmation is still being hardened.
              Both are tracked as in development on the roadmap.
            </Callout>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="The stack"
                title="Built from scratch, kept understandable"
                description="Four layers a small team can reason about — no crypto tokens, no gas, no external chain dependency."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/project/technology" size="lg">
                  Full technology page
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
            <LayerStack ariaLabel="Prototype stack" layers={STACK} />
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Engineering highlights"
            title="What was hardest — and what shipped"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              icon={FlaskConical}
              title="Determinism"
              description="Independent nodes given identical inputs converge on identical hashes, roots, and state — covered by dedicated determinism tests."
            />
            <Card
              icon={Bug}
              title="Bugs found and fixed"
              description="A real broadcast-signature defect (relay re-signed with the wrong key) surfaced during demo runs and was fixed at the protocol boundary."
            />
            <Card
              icon={CheckCircle2}
              title="Evidence, not assertions"
              description="Every verification response links to the block it came from, and the explorer can show that block independently."
            />
            <Card
              icon={Timer}
              title="Batched commits"
              description="Queued credential transactions batch into a single Merkle-committed block, keeping the chain light and the history auditable."
            />
            <Card
              icon={GraduationCap}
              title="Documented spec set"
              description="Protocol, block, storage, threat model, and testing docs are kept aligned with the implementation."
            />
            <Card
              icon={Bug}
              title="Attack vectors tested"
              description="A repeatable attack script proves eight manipulation classes are rejected with concrete errors — useful evidence in a hackathon review."
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Current stage" title="Where the project stands" />
          <div className="mt-8 space-y-6 text-[15px] leading-7 text-neutral-600">
            <DocSection id="stage" title="Working today">
              <Lead>
                Issuance and signing, issuance anchoring, public verification with integrity
                checks, platform-side revocation, role-based access, and the explorer are all
                deployed and reachable from this site.
              </Lead>
            </DocSection>
            <div className="flex flex-wrap gap-3">
              <Button href={APP_URL} size="lg">
                Launch SecureX
              </Button>
              <Button to="/live/status" size="lg" variant="outline">
                <StatusChip status="live" className="mr-2" />
                Live status
              </Button>
              <Button to="/project/roadmap" size="lg" variant="ghost">
                Roadmap
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Run the verification yourself"
        description="One query against the public API shows the whole loop working."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
