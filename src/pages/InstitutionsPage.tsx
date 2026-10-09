import {
  ArrowRight,
  Globe,
  GraduationCap,
  ScanLine,
  Stamp,
} from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { CheckList } from '../components/Cards';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { Callout } from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const REASONS = [
  {
    icon: Globe,
    title: 'Proof that travels',
    description:
      'Each credential carries a fixed SHA-256 document hash, the issuer’s signature, and a chain anchor — so the proof exists outside your systems, wherever the document goes.',
  },
  {
    icon: ScanLine,
    title: 'No reference calls to field',
    description:
      'A verifier queries the public API with the credential ID and hash and reads a structured result. Your office does not have to answer “is this certificate real?”.',
  },
  {
    icon: Stamp,
    title: 'Revocation when it matters',
    description:
      'Marking a credential revoked updates its status on the platform, and the verifier receives an explicit REVOKED state instead of guessing from a missing record.',
  },
];

const TODAY = [
  'Issue signed credentials from your institution’s account — the document is canonicalised, hashed with SHA-256, and signed with your issuer key.',
  'Revoke a credential you issued; status precedence recomputes on every read, so a revoked credential never reports VALID.',
  'Anchor issuance to the public chain and keep the evidence: transaction ID, block height, block hash, and Merkle root.',
  'Read verification history for your credentials — each public check writes a row with its result, method, and timestamp.',
];

const ISSUANCE_FLOW = [
  {
    label: 'Create the credential',
    detail: 'Enter the holder’s details and the credential document in the web application.',
  },
  {
    label: 'Hash & sign',
    detail: 'Nine canonical fields are hashed with SHA-256 and signed with your issuer key.',
  },
  {
    label: 'Anchor',
    detail:
      'The credential ID and hash are submitted to the chain; the anchor moves PENDING → ANCHORED once a block commits.',
  },
  {
    label: 'Hand it to the holder',
    detail: 'The holder receives a public ID (SX-XXXX-XXXX-XXXX) to share by link, file, or QR code.',
  },
  {
    label: 'Revoke if needed',
    detail: 'Revocation updates the platform status and submits a revocation record to the chain.',
  },
];

export default function InstitutionsPage() {
  return (
    <>
      <PageHero
        icon={<GraduationCap className="h-4 w-4" />}
        badge="Solutions · Institutions"
        title="Issue credentials the world can check without you"
        description="For universities, training bodies, and certifying organizations: sign a credential once, revoke it when circumstances change, and let any third party verify it against your record — instantly, and without your office fielding the calls."
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
              How issuance works
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why issue on SecureX"
            title="One signature, unlimited checks"
            description="Issuance is the expensive part. Everything after it — sharing, checking, revoking — should not need you in the middle."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((reason) => (
              <div
                key={reason.title}
                className="group rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-securex-50 to-trust-50 text-securex-600 transition-transform duration-300 group-hover:scale-110">
                  <reason.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-neutral-900">{reason.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{reason.description}</p>
              </div>
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
                eyebrow="What you can do today"
                title="Live in the web application"
                description="These four capabilities are running in production — not on a roadmap."
              />
              <div className="mt-6 flex items-center gap-3">
                <StatusChip status="live" />
                <span className="text-sm text-neutral-600">
                  Available in the web application at app-securex.sp-net.in
                </span>
              </div>
              <div className="mt-6">
                <CheckList items={TODAY} />
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/platform/how-it-works" size="lg">
                  Walk through issuance
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button to="/trust/revocation" size="lg" variant="outline">
                  How revocation works
                </Button>
              </div>
            </div>

            <DiagramFigure
              label="Your issuance flow"
              caption="The same path every credential follows. Anchoring is retried on later operations if the chain is unreachable — the credential itself stays valid on the platform."
            >
              <FlowSteps ariaLabel="Institution issuance flow" columns={3} steps={ISSUANCE_FLOW} />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Not available yet"
            title="What is in development"
            description="The items your team will probably ask about next — labelled honestly instead of implied."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-neutral-900">Fraud dashboards</h3>
                <StatusChip status="development" />
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                A separate fraud analysis service exists, and the platform health-probes it — but
                its results are not surfaced to issuer dashboards, and fraud scoring is not part of
                the public verification response.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-neutral-900">Bulk issuance workflows</h3>
                <StatusChip status="roadmap" />
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                Credentials are issued one at a time through the web application today. A bulk
                issuance workflow through the API is planned — it is not available yet.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">
            <Callout tone="warning" title="Honest limits on the issuing side">
              Chain anchoring for revocation is submitted and retried, but it is not guaranteed on
              every deployment. The platform database remains the authoritative record of a
              credential’s status; treat chain evidence as independently verifiable support, not as
              the only durable copy.
            </Callout>
          </div>

          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap gap-3">
            <Button to="/trust/revocation" size="md" variant="outline">
              Revocation deep-dive
            </Button>
            <Button to="/project/roadmap" size="md" variant="ghost">
              See the roadmap
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        title="Issue your first credential"
        description="Create it in the web application, then verify it against the public API using the ID and document hash from the record."
        primary={{ label: 'Launch SecureX', href: APP_URL }}
        secondary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
      />
    </>
  );
}
