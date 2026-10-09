import { ArrowRight, Globe, Network, Server, ShieldCheck, Workflow } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps, LayerStack } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { BodyText, BulletList, Callout, DocSection, Lead } from '../components/Prose';
import { APP_URL } from '../constants';

const LAYERS = [
  {
    title: 'Clients',
    items: [
      'securex.sp-net.in (this site)',
      'app-securex.sp-net.in (web application)',
      'explorer-securex.sp-net.in (read-only explorer)',
      'Third-party verifiers (plain HTTPS)',
    ],
    note: 'Browsers talk to the platform API over HTTPS. Only allowlisted origins receive CORS permission.',
  },
  {
    title: 'Platform API (Express, REST under /api)',
    items: [
      'JWT bearer authentication',
      'Role guards (9 roles)',
      'Rate limiting (150 / 10 / 60 per minute)',
      'Security headers on every response',
      'Validation and error envelope',
    ],
    note: 'All business logic lives server-side; the browser never receives secrets, signing keys, or chain credentials.',
  },
  {
    title: 'PostgreSQL',
    items: [
      'credentials (status, hash, anchor columns)',
      'institutions & issuers',
      'users & sessions',
      'verification_history',
      'audit & events',
    ],
    note: 'The platform record is authoritative for status; the chain is authoritative for inclusion evidence.',
  },
  {
    title: 'Blockchain node',
    items: [
      'Permissioned Proof of Authority (single proposer)',
      'Ed25519 transaction signatures',
      'SHA-256 Merkle inclusion proofs',
      'JSON-file block/transaction storage',
      'Shared-secret auth boundary for writes',
    ],
    note: 'Public reads (health, status, blocks, evidence, QR) require no credentials; every write does.',
  },
  {
    title: 'Fraud analysis service (separate)',
    items: ['Deterministic rule engine', 'REST + API-key auth', 'Not called by verification'],
    note: 'In development: today the platform only probes its health endpoint; public verification results do not include fraud scoring.',
  },
];

const DATA_FLOW = [
  { label: '1. Client request', detail: 'A browser or script calls the platform API over HTTPS.' },
  { label: '2. Guard rails', detail: 'Rate limit → auth → role check → payload validation.' },
  { label: '3. Domain logic', detail: 'Status recomputation, hashing, authorization scope.' },
  { label: '4. Persistence', detail: 'PostgreSQL write plus an audit/event row in the same transaction.' },
  { label: '5. Chain call', detail: 'For issuance and revocation, the API submits to the node and waits for proof.' },
  { label: '6. Response', detail: 'A success or error envelope, never an internal stack trace.' },
];

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        icon={<Network className="h-4 w-4" />}
        badge="Platform · Architecture"
        title="How the pieces fit together"
        description="Five services with clearly separated responsibilities: a static site, a web application, an API with PostgreSQL, a blockchain node, and a read-only explorer."
        actions={
          <Button to="/platform" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Platform overview
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Layered view"
            title="The stack, top to bottom"
            description="Each layer only trusts the layer below it, and no secret ever crosses into the browser."
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <LayerStack ariaLabel="Architecture layers" layers={LAYERS} />
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Request lifecycle"
                title="What happens to an API call"
                description="The same guarded path applies to every request, whether it comes from the web application or an integrator."
              />
              <div className="mt-6">
                <FlowSteps ariaLabel="API request lifecycle" columns={3} steps={DATA_FLOW} />
              </div>
            </div>

            <div className="space-y-6">
              <DiagramFigure label="Trust boundaries" caption="Three boundaries an attacker would have to cross — each enforced independently.">
                <div className="space-y-4">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-securex-600" aria-hidden="true" />
                      <h3 className="text-sm font-bold text-neutral-900">Origin boundary</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      CORS is an exact allowlist (web application and explorer origins only). A
                      production configuration without an explicit list refuses to start, and the
                      wildcard origin is rejected outright.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-securex-600" aria-hidden="true" />
                      <h3 className="text-sm font-bold text-neutral-900">Identity boundary</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Bearer JWTs are checked against a server-side session record, and every
                      privileged route additionally requires an allowed role.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-securex-600" aria-hidden="true" />
                      <h3 className="text-sm font-bold text-neutral-900">Chain boundary</h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Writes to the node require a shared-secret token with a declared role.
                      Without it configured, privileged chain operations are refused rather than
                      silently downgraded.
                    </p>
                  </div>
                </div>
              </DiagramFigure>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Deployment" title="Where it runs" />
          <div className="mt-10 space-y-6 text-[15px] leading-7 text-neutral-600">
            <Lead>
              The API, database, blockchain node, and fraud service deploy together from a single
              service blueprint; the web application, this site, and the explorer deploy
              independently as static frontends.
            </Lead>
            <DocSection id="persistence" title="Persistence and durability">
              <BodyText>
                PostgreSQL is the durable store for credentials and audit history. The blockchain
                node keeps blocks and transactions in JSON files on its own disk.
              </BodyText>
              <Callout tone="warning" title="Known limitation">
                The chain currently runs on free-tier infrastructure without a persistent disk: if
                the instance is replaced, the node re-initialises from genesis. Treat chain data as
                independently verifiable evidence, not as the system’s only durable record — the
                platform database holds the authoritative credential history.
              </Callout>
            </DocSection>
            <DocSection id="observability" title="Observability">
              <BulletList
                items={[
                  'Platform health: GET /api/health reports service version, database connectivity, and data mode.',
                  'Chain health: GET /health and /status report node ID, protocol version, height, peers, and uptime.',
                  'Public status page: this site’s /live/status reads both endpoints and shows them side by side.',
                ]}
              />
            </DocSection>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button to="/live/status" size="lg">
                Live status
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/project/technology" size="lg" variant="outline">
                Technology choices
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<Workflow className="h-8 w-8" />}
        title="Inspect the architecture in production"
        description="Health endpoints, chain height, and block history are all publicly readable — no credentials required."
        primary={{ label: 'View live status', to: '/live/status' }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
