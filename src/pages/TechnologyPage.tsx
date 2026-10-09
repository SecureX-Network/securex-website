import { ArrowRight, Cpu, Database, KeyRound, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps, LayerStack } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { BodyText, BulletList, Callout, CodeBlock, DocSection, SpecTable } from '../components/Prose';
import { APP_URL } from '../constants';

const LAYERS = [
  {
    title: 'Web application',
    items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router'],
    note: 'Issuer, holder, and administrator workflows — plus this public website, which builds independently.',
  },
  {
    title: 'Platform API',
    items: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'bcrypt'],
    note: 'Structured credentials, institutional accounts, nine roles including a read-only auditor, rate limiting, and the public verification endpoint.',
  },
  {
    title: 'Permissioned chain',
    items: ['TypeScript', 'Ed25519', 'SHA-256', 'Merkle trees', 'Proof of Authority', 'WebSocket P2P'],
    note: 'Hashes, public IDs, revocation transactions, and position-tagged inclusion proofs. No tokens, no mining, no gas.',
  },
  {
    title: 'Tooling & toolset',
    items: ['Block explorer', 'Node CLI', 'Attack simulation', 'Determinism tests'],
    note: 'An independent frontend plus scripts to inspect, seed, and attack the network.',
  },
];

const CRYPTO_STEPS = [
  { label: 'Canonicalise', detail: 'The credential is reduced to a fixed array of nine [field, value] pairs in a fixed order.' },
  { label: 'Serialise', detail: 'The array is encoded as compact JSON — no whitespace ambiguity.' },
  { label: 'Hash', detail: 'SHA-256 over the serialised bytes produces 64 lowercase hex characters.' },
  { label: 'Sign', detail: 'The issuer signs the signing payload with Ed25519; verifiers check it against the anchored public key.' },
  { label: 'Commit', detail: 'Hash, public ID, and issuer identity enter a transaction that lands in a Merkle-committed block.' },
];

const COMPANIONS = [
  {
    icon: Database,
    title: 'Block explorer',
    description: 'A separate Vite frontend for browsing blocks, transactions, credentials, and network stats — the independent view of what the chain committed.',
    to: '/trust/blockchain',
  },
  {
    icon: KeyRound,
    title: 'Keys & identities',
    description: 'Ed25519 keypairs identify issuers and block signers. Private keys stay server-side with restrictive file permissions; the public key is the identity.',
    to: '/trust/credential-integrity',
  },
  {
    icon: ShieldCheck,
    title: 'Security model',
    description: 'Rate limits, strict validation, security headers, scoped CORS, bcrypt password hashing, and short-lived JWTs — documented layer by layer.',
    to: '/platform/security',
  },
];

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        icon={<Cpu className="h-4 w-4" />}
        badge="Project · Technology"
        title="How SecureX is built"
        description="A conventional web stack around a purpose-built permissioned chain: TypeScript everywhere, hashing and signatures instead of tokens, and docs kept in step with the code."
        actions={
          <Button to="/platform/architecture" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Architecture deep-dive
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Stack"
            title="Four layers"
            description="Nothing here depends on a public blockchain network — the whole system runs from these repositories."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <LayerStack ariaLabel="Technology layers" layers={LAYERS} />
            <div className="space-y-4">
              <DiagramFigure label="Design choices" caption="Constraints chosen on purpose.">
                <BulletList
                  items={[
                    <><strong>Permissioned, not public.</strong> Only registered issuers and validators write to the chain — so credentials can be governed.</>,
                    <><strong>Hashes only.</strong> PII never enters a block; transactions carry credential IDs, hashes, and revocation state.</>,
                    <><strong>No cryptocurrency.</strong> No tokens, mining, gas, or wallets — consensus is round-robin Proof of Authority.</>,
                    <><strong>Single-proposer batching.</strong> The current proposer collects queued transactions, Merkle-commits them, and broadcasts the signed block.</>,
                    <><strong>Pluggable storage.</strong> The chain abstracts persistence; the production deployment currently runs without a persistent disk.</>,
                  ]}
                />
              </DiagramFigure>
              <Callout tone="warning" title="Prototype trade-off, published">
                Consensus trusts the rotating proposer to behave; invalid blocks are rejected by
                peers, but liveness depends on honest rotation. This and other residual risks are
                documented in the project’s threat model rather than hidden.
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Credential integrity"
            title="From document to block in five steps"
            description="The exact pipeline a credential travels before anyone can verify it."
          />
          <div className="mt-12">
            <FlowSteps ariaLabel="Credential integrity pipeline" columns={5} steps={CRYPTO_STEPS} />
          </div>
          <div className="mx-auto mt-8 max-w-3xl">
            <CodeBlock
              label="Canonical document — nine field/value pairs"
              code={`[["credentialId","SX-C7DD-EC9C-495A"],
 ["type","DEGREE"],
 ["title","B.Tech Computer Science"],
 ["description","Four-year undergraduate programme"],
 ["holderName","Aarav Mehta"],
 ["issuerName","Prof. S. Iyer"],
 ["institutionName","Example Institute of Technology"],
 ["issuedAt","2026-05-14T00:00:00.000Z"],
 ["expiresAt",""]]`}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Specifications" title="Numbers that are actually true" />
          <div className="mt-12">
            <SpecTable
              caption="Measured from the running system and source repositories."
              columns={[
                { header: 'Property', key: 'property' },
                { header: 'Value', key: 'value' },
                { header: 'Notes', key: 'notes' },
              ]}
              rows={[
                { property: 'Hash algorithm', value: 'SHA-256', notes: 'Over the canonical nine-field document' },
                { property: 'Digest format', value: '64 lowercase hex chars', notes: 'Compared byte-for-byte during verification' },
                { property: 'Public credential ID', value: 'SX- + 12 uppercase hex', notes: '48 bits of entropy per credential' },
                { property: 'Signature scheme', value: 'Ed25519', notes: 'Issuer signatures and block signatures' },
                { property: 'Consensus', value: 'Proof of Authority (round-robin)', notes: 'Single proposer commits; peers validate' },
                { property: 'Block anchoring states', value: 'ANCHORED · PENDING · UNAVAILABLE', notes: 'PENDING is the default while confirmation polls' },
                { property: 'Password hashing', value: 'bcrypt, cost 10', notes: 'Platform-side account storage' },
                { property: 'JWT lifetime', value: '8 hours', notes: 'Access tokens for authenticated sessions' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Companions"
            title="Around the core"
            description="The chain is only useful if people can inspect it — and if the platform around it stays safe."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANIONS.map((item) => (
              <Card
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                to={item.to}
              />
            ))}
          </div>
          <div className="mt-10">
            <DocSection id="testing" title="How it is tested">
              <BodyText>
                The chain repository runs independent test suites for consensus, crypto, Merkle
                proofs, storage, networking, and the REST API, plus a determinism suite proving
                independent nodes converge on identical state. A repeatable attack script attempts
                eight classes of manipulation — replayed transactions, invalid signatures, tampered
                blocks, altered credential documents, and more — and expects each to fail with a
                concrete error.
              </BodyText>
            </DocSection>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/resources/documentation" size="lg">
              Documentation
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/trust" size="lg" variant="outline">
              How trust works
            </Button>
            <Button href={APP_URL} size="lg" variant="ghost">
              Launch SecureX
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="Read the specs, then check the results"
        description="Documentation explains the pipeline; the public API proves it on live data."
        primary={{ label: 'Read the documentation', to: '/resources/documentation' }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
