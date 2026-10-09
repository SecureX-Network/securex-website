import { ArrowRight, Fingerprint, QrCode, ScanLine, Server, Stamp } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { CheckPipeline, DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { BodyText, BulletList, Callout, CodeBlock, DocSection, Lead } from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const STAGES = [
  {
    label: '1. Issue',
    detail: 'An institution creates a credential in the platform. The record is stored with status VALID and anchor state PENDING.',
  },
  {
    label: '2. Hash & sign',
    detail: 'The credential document is canonicalised into nine fixed fields and hashed with SHA-256. The chain records the issuer’s Ed25519 signature over the issuance.',
  },
  {
    label: '3. Anchor',
    detail: 'The platform submits the credential ID and hash to the blockchain node and waits for block inclusion (polling every 1.5s, up to 20s by default).',
  },
  {
    label: '4. Record receipt',
    detail: 'Once a block commits with a verified inclusion proof, the anchor state becomes ANCHORED and the transaction and block IDs are stored.',
  },
  {
    label: '5. Present',
    detail: 'The holder shares the credential — by link, file, or QR code. The document travels with its own public ID (SX-XXXX-XXXX-XXXX).',
  },
  {
    label: '6. Verify',
    detail: 'A verifier queries the public API with the credential ID and document hash and receives a structured result with chain evidence.',
  },
];

const PIPELINE = [
  {
    name: 'Request validation',
    detail:
      'The credential ID must be present; a supplied hash must be 64 hexadecimal characters. Otherwise the API answers 400 with MISSING_CREDENTIAL_ID or INVALID_HASH_FORMAT.',
  },
  {
    name: 'Record lookup',
    detail:
      'The platform reads the credential record along with its issuer and institution. If no record exists, the result is NOT_FOUND — no further checks are claimed.',
  },
  {
    name: 'Chain evidence',
    detail:
      'The node is asked for the credential’s inclusion evidence: transaction ID, transaction hash, block height, block hash, and whether the Merkle proof verified.',
  },
  {
    name: 'Status precedence',
    detail:
      'The effective status is recomputed: REVOKED first, then stored EXPIRED, then time-based expiry, then other terminal states — so a revoked credential never reports VALID.',
  },
  {
    name: 'Issuer signature',
    detail:
      'The signature check passes only when the chain evidence explicitly reports issuerSignatureValid as true.',
  },
  {
    name: 'Document integrity (optional)',
    detail:
      'If the verifier supplies the document hash, it is compared case-insensitively against the stored hash: EXACT, TAMPERED, or UNVERIFIABLE.',
  },
];

const EXAMPLE = `GET https://api-securex.sp-net.in/api/verifications?credentialId=SX-3A7F-91C2-B04E&hash=9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08

{
  "success": true,
  "data": {
    "credentialId": "SX-3A7F-91C2-B04E",
    "status": "VALID",
    "storedStatus": "VALID",
    "issuerName": "Example Institute of Technology",
    "issuedAt": "2026-01-14T09:12:00.000Z",
    "expiresAt": null,
    "revokedAt": null,
    "verifiedAt": "2026-02-02T11:03:41.000Z",
    "checks": {
      "credentialRecord": {
        "verified": true,
        "available": true,
        "status": "VERIFIED",
        "detail": "Credential record found; authoritative status is VALID."
      },
      "blockchainProof": {
        "verified": true,
        "available": true,
        "status": "VERIFIED",
        "detail": "Inclusion proof verified in a committed block.",
        "evidence": {
          "transactionId": "b1f4c2e0…",
          "transactionHash": "7d3b…",
          "merkleRoot": "a91c5e2f…",
          "blockHeight": 184,
          "blockHash": "0c7a…",
          "inclusionProofVerified": true
        }
      },
      "signature": {
        "verified": true,
        "available": true,
        "status": "VERIFIED",
        "detail": "Issuer signature verified against the registered issuer key."
      },
      "documentIntegrity": {
        "verified": true,
        "available": true,
        "status": "EXACT",
        "scope": "PLATFORM_RECORD"
      }
    },
    "message": "Credential is valid and anchored."
  }
}`;

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        icon={<Server className="h-4 w-4" />}
        badge="Platform · How It Works"
        title="From issuance to a result you can trust"
        description="Six stages turn a record inside an institution into proof anyone can check. Here is what happens at each stage — and exactly what the verifier receives at the end."
        actions={
          <Button to="/platform" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Platform overview
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The flow"
            title="Issue → Sign → Anchor → Present → Verify → Trust"
            description="Every credential follows the same path. Nothing in it depends on the verifier trusting the platform’s website."
          />
          <div className="mt-12">
            <FlowSteps ariaLabel="Credential trust flow" columns={3} steps={STAGES} />
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Anchoring"
                title="Submission is not commitment"
                description="Writing to a chain only counts once a block commits with a verified inclusion proof."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DocSection id="anchor-states" title="Anchor states">
                  <BodyText>
                    While a credential is being issued, its anchor state moves through exactly three
                    values. Each one is recorded against the credential row:
                  </BodyText>
                  <BulletList
                    items={[
                      'PENDING — the record exists but no committed block proof has been confirmed yet (also the state while a submission is in flight).',
                      'ANCHORED — a block committed with height above genesis, a verified inclusion proof, and a valid Merkle root.',
                      'UNAVAILABLE — the chain could not be reached, is not configured, or returned an error. The credential stays valid on the platform; anchoring is retried on later operations.',
                    ]}
                  />
                </DocSection>
                <Callout tone="warning" title="Timeout behaviour">
                  The platform polls for block inclusion for up to 20 seconds by default
                  (BLOCKCHAIN_ANCHOR_TIMEOUT_MS). If no proof arrives in time, the anchor stays
                  PENDING rather than being reported as ANCHORED.
                </Callout>
              </div>
            </div>

            <DiagramFigure
              label="What the verifier checks"
              caption="Checks run in this order. A failed early check is never papered over by a later one — the response reports each check independently."
            >
              <CheckPipeline checks={PIPELINE} />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="The response" title="What comes back" />
          <div className="mt-10 space-y-6">
            <Lead>
              Verification returns a JSON envelope with a status, a human-readable message, and an
              independent verdict for each check — so a verifier can distinguish “no record” from
              “record exists but the document was altered”.
            </Lead>
            <CodeBlock label="Example response (illustrative values)" code={EXAMPLE} />
            <Callout tone="info" title="Rate limits">
              Public verification is rate-limited to 60 requests per minute per IP address.
              Exceeding it returns 429 with errorCode RATE_LIMITED and a Retry-After header.
            </Callout>
            <div className="flex flex-wrap gap-3">
              <Button to="/platform/verification" size="lg">
                Read the verification details
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/resources/api" size="lg" variant="outline">
                API reference
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sharing"
            title="How a credential travels"
            description="The holder decides how to share. The verifier only ever needs the public ID and the document."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
              <QrCode className="h-7 w-7 text-securex-600" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold text-neutral-900">QR reference</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                The node issues a signed QR reference (SXQR1 token) encoding the credential ID with
                a seven-day validity window and an Ed25519 signature.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
              <Fingerprint className="h-7 w-7 text-securex-600" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold text-neutral-900">Document hash</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                The SHA-256 hash of the canonical document is what gets compared at verification.
                Send it along and the response tells you EXACT or TAMPERED.
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
              <ScanLine className="h-7 w-7 text-securex-600" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold text-neutral-900">One request</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                No account is required to verify. A single GET to the public API returns the full
                result, including chain evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<Stamp className="h-8 w-8" />}
        title="Walk the flow yourself"
        description="Issue a test credential in the web application, then verify it against the public API using the ID and hash from the record."
        primary={{ label: 'Launch SecureX', href: APP_URL }}
        secondary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
      />
    </>
  );
}
