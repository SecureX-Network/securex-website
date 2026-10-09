import { ArrowRight, Blocks, Box, Database, Globe, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import {
  BodyText,
  BulletList,
  Callout,
  DocSection,
  InlineCode,
  Lead,
  SpecTable,
} from '../components/Prose';
import { APP_URL, EXPLORER_URL, VERIFY_APP_URL } from '../constants';

const PUBLIC_READS = [
  { method: 'GET', path: '/health', detail: 'Node ID, version, protocol version, height, peers, uptime.' },
  { method: 'GET', path: '/status', detail: 'Consensus status, validators, pending transactions, block count.' },
  { method: 'GET', path: '/blocks?offset=&limit=', detail: 'Committed blocks (limit up to 200).' },
  { method: 'GET', path: '/blocks/:height', detail: 'A single block with header, transactions, and validator signatures.' },
  { method: 'GET', path: '/transactions/:id', detail: 'A transaction with its block height and block hash.' },
  { method: 'GET', path: '/evidence/:id', detail: 'Inclusion evidence for a credential: proof, block, verification state.' },
  { method: 'GET', path: '/verify/:id', detail: 'Full verification response: status, issuer, lifecycle, security checks.' },
  { method: 'GET', path: '/qr/:credentialId', detail: 'Signed QR reference with a verification URL (7-day validity).' },
  { method: 'GET', path: '/network/status', detail: 'Peer count, proposer, consensus mode.' },
  { method: 'GET', path: '/openapi.json', detail: 'Machine-readable API description (subset).' },
];

const WHAT_GETS_WRITTEN = [
  { label: 'Credential issuance', detail: 'Public credential ID, SHA-256 document hash, issuer ID, and type — submitted when a credential is issued.' },
  { label: 'Revocation', detail: 'A revocation transaction sent by the issuing identity when an issuer withdraws a credential.' },
  { label: 'Issuer registry', detail: 'Issuer identity, public key, and status (ACTIVE / SUSPENDED / REVOKED).' },
  { label: 'Key records', detail: 'Key IDs, owners, algorithms, and key status (ACTIVE / RETIRED / COMPROMISED / ROTATED).' },
  { label: 'Block headers', detail: 'Height, timestamp, previous hash, Merkle root, proposer — chained in order.' },
];

export default function BlockchainPage() {
  return (
    <>
      <PageHero
        icon={<Blocks className="h-4 w-4" />}
        badge="Trust · Blockchain"
        title="The ledger behind the proof"
        description="A permissioned chain running Proof of Authority with Ed25519 transaction signatures and SHA-256 Merkle inclusion proofs. Public reads are open to anyone; every write is authenticated."
        actions={
          <>
            <Button href={EXPLORER_URL} size="lg">
              Open the explorer
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/live/status" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              Node status
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Consensus"
                title="Permissioned, single proposer"
                description="Known validators propose and sign blocks; there is no mining and no gas — writes are ordered, not auctioned."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DocSection id="what-counts" title="What counts as committed">
                  <BodyText>
                    A submission returns a receipt immediately, but a receipt is not proof. The
                    platform only reports ANCHORED once a block commits with a height above
                    genesis, a verified inclusion proof, and a valid Merkle root.
                  </BodyText>
                </DocSection>
                <DocSection id="protocol" title="Versions">
                  <BulletList
                    items={[
                      'Node software version 3.0.0, protocol version 2.0, block format version 2.',
                      'Every transaction carries protocol and format versions so incompatible writes are rejected explicitly.',
                      'Current blocks contain a single transaction, so the Merkle root is that transaction’s own leaf — the proof verifies trivially, and the structure already supports multi-transaction blocks.',
                    ]}
                  />
                </DocSection>
                <Callout tone="info" title="No wallet, no gas">
                  Credentials are not tokens. There is nothing to buy, no balance to manage, and
                  no private key for a holder to lose — the chain records evidence, not assets.
                </Callout>
              </div>
            </div>

            <DiagramFigure label="What gets written" caption="Only these categories ever reach the chain. Credential content itself — names, titles, descriptions — is not stored on it.">
              <FlowSteps ariaLabel="What gets written to the chain" columns={3} steps={WHAT_GETS_WRITTEN} />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Open for inspection"
            title="Public reads, authenticated writes"
            description="You can verify every claim on this page with plain HTTPS — no API key, no account."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-trust-200 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-neutral-900">Open endpoints</h3>
                <StatusChip status="live" />
              </div>
              <div className="mt-5 overflow-x-auto">
                <SpecTable
                  caption="Public blockchain endpoints"
                  columns={[
                    { header: 'Method', key: 'method' },
                    { header: 'Path', key: 'path' },
                    { header: 'Returns', key: 'detail' },
                  ]}
                  rows={PUBLIC_READS.map((row) => ({
                    method: <span className="font-bold text-securex-700">{row.method}</span>,
                    path: <span className="font-mono text-xs">{row.path}</span>,
                    detail: row.detail,
                  }))}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-neutral-900">Authenticated writes</h3>
                  <StatusChip status="live" />
                </div>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Issuance, revocation, issuer management, and state changes require a bearer token
                  with a declared role — <InlineCode>admin</InlineCode>,{' '}
                  <InlineCode>validator</InlineCode>, or <InlineCode>issuer</InlineCode>. Secrets
                  are compared in constant time, and without tokens configured the node refuses
                  privileged operations rather than opening them.
                </p>
              </div>

              <div className="rounded-3xl border border-warning-200 bg-warning-50 p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-warning-900">Durability today</h3>
                  <StatusChip status="development" />
                </div>
                <p className="mt-4 text-sm leading-6 text-warning-900">
                  The node stores blocks and transactions in JSON files on its own disk, and the
                  current deployment has no persistent disk attached: a replaced instance starts
                  again from genesis. Platform-side records and audit history are unaffected, but
                  treat chain data as evidence you can re-anchor, not as the only copy.
                </p>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-7">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-neutral-900">Multi-node network</h3>
                  <StatusChip status="roadmap" />
                </div>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Peer and validator APIs already exist (<InlineCode>/network/peers</InlineCode>,{' '}
                  <InlineCode>/state/validators</InlineCode>); running additional independent nodes
                  is planned work, not a current property of the network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Exploring the chain" title="See it without our website" />
          <div className="mt-8 space-y-5 text-[15px] leading-7 text-neutral-600">
            <Lead>
              The block explorer is a separate, read-only application with no login and no wallet.
              It reads live chain data through the platform’s blockchain API and fails closed if
              that data is unavailable.
            </Lead>
            <div className="flex flex-wrap gap-3">
              <Button href={EXPLORER_URL} size="lg">
                <Database className="mr-2 h-4 w-4" aria-hidden="true" />
                Block explorer
              </Button>
              <Button to="/trust/auditability" size="lg" variant="outline">
                <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
                Auditability
              </Button>
              <Button to="/resources/api" size="lg" variant="ghost">
                <Box className="mr-2 h-4 w-4" aria-hidden="true" />
                API reference
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<ShieldCheck className="h-8 w-8" />}
        title="Trace a credential to its block"
        description="Verify a credential, take the transaction ID from the evidence, and look it up in the explorer — the loop closes without trusting this page."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
