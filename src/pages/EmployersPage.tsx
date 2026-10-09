import { ArrowRight, Handshake, ScanLine, Timer, XCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { Callout, CodeBlock, InlineCode, SpecTable } from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const VERIFY_REQUEST = [
  {
    label: '1. Take the two inputs',
    detail:
      'The credential ID printed on the document (SX-XXXX-XXXX-XXXX) and the 64-character SHA-256 hash of the document you were given.',
  },
  {
    label: '2. Call the public endpoint',
    detail:
      'One GET request to /api/verifications. No account, no sign-up, and no API key are required.',
  },
  {
    label: '3. Read the structured result',
    detail:
      'A status, a message, and an independent verdict for each check — with chain evidence attached when available.',
  },
];

const CURL_EXAMPLE = `curl "https://api-securex.sp-net.in/api/verifications?credentialId=SX-XXXX-XXXX-XXXX&hash=<64-hex>"`;

const RESULT_STATES = [
  {
    status: <span className="font-bold text-trust-700">VALID</span>,
    meaning: 'Record found and status checks passed; chain evidence attached when available.',
  },
  {
    status: <span className="font-bold text-danger-700">REVOKED</span>,
    meaning: 'The issuer withdrew the credential after it was issued.',
  },
  {
    status: <span className="font-bold text-warning-700">EXPIRED / SUSPENDED</span>,
    meaning: 'The credential exists but is no longer usable as-is.',
  },
  {
    status: <span className="font-bold text-danger-700">TAMPERED</span>,
    meaning: 'The document you hashed differs from the hash recorded at issue time.',
  },
  {
    status: <span className="font-bold text-neutral-700">NOT FOUND</span>,
    meaning: 'No credential matches this ID — an unknown ID is never treated as valid.',
  },
];

const NOT_AN_INFERENCE = [
  'VALID is not a legal opinion. It means the record and its evidence check out — not that the underlying qualification is right for the role.',
  'It does not identify the holder. The public response returns status, issuer, dates, and evidence — never the holder’s identity or credential metadata.',
  'It does not score fraud. Fraud analysis runs as a separate, admin-only service and is not part of the public verification response (in development).',
  'It is rate-limited: 60 requests per minute per IP address. Over the limit you get 429 with errorCode RATE_LIMITED and a Retry-After header — back off and retry.',
];

export default function EmployersPage() {
  return (
    <>
      <PageHero
        icon={<Handshake className="h-4 w-4" />}
        badge="Solutions · Employers"
        title="Check a candidate’s credential in one request"
        description="Send a credential ID and its document hash, and read back a structured result with chain evidence. No account is needed to verify, and no phone call to the issuing institution."
        actions={
          <>
            <Button href={VERIFY_APP_URL} size="lg">
              Verify a credential
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              to="/platform/verification"
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              What gets checked
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The request"
            title="One call, three steps"
            description="The public verification endpoint is a plain HTTPS GET — anything that can make a request can check a credential."
          />
          <div className="mt-12">
            <FlowSteps ariaLabel="Verification request steps" columns={3} steps={VERIFY_REQUEST} />
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <CodeBlock label="Public verification request (placeholder values)" code={CURL_EXAMPLE} />
            <div className="mt-4 flex flex-wrap items-start gap-x-6 gap-y-2 text-sm text-neutral-600">
              <span>
                Replace <InlineCode>SX-XXXX-XXXX-XXXX</InlineCode> with the credential ID from the
                document.
              </span>
              <span>
                Replace <InlineCode>&lt;64-hex&gt;</InlineCode> with the document’s 64-character
                SHA-256 hash.
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/resources/api" size="md">
                API reference
              </Button>
              <Button href={VERIFY_APP_URL} size="md" variant="outline">
                Try the web verifier
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Reading the result"
                title="A state, not a maybe"
                description="The status field always carries one of a fixed set of values, and every check reports its own verdict alongside it."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <p>
                  Alongside the status you get the issuer’s name, the issue and expiry dates, and —
                  when the chain answers — the transaction ID, block height, and Merkle inclusion
                  proof. A failed check is reported independently; a pass elsewhere never hides it.
                </p>
                <Callout tone="info" title="Supply the hash when you have it">
                  With the document hash, the API compares your copy against the stored one and
                  answers EXACT or TAMPERED. Without it, document integrity simply is not
                  claimed — it is not assumed to pass.
                </Callout>
                <div className="flex flex-wrap gap-3">
                  <Button to="/platform/verification" size="lg">
                    Full result reference
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button to="/resources/verification-guide" size="lg" variant="outline">
                    Verification guide
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-neutral-900">Statuses you can receive</h3>
                <StatusChip status="live" />
              </div>
              <SpecTable
                caption="Verification statuses"
                columns={[
                  { header: 'Status', key: 'status' },
                  { header: 'What it means', key: 'meaning' },
                ]}
                rows={RESULT_STATES}
              />
              <p className="mt-4 text-sm text-neutral-600">
                SUSPENDED and INVALID/SUSPICIOUS also appear in the full reference — including how
                each check reports its evidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Read it correctly"
            title="What a result does not say"
            description="A verification result answers one question — does this credential check out against the issuer’s record? Everything else is your judgement."
          />
          <div className="mt-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-7">
            <ul className="space-y-5">
              {NOT_AN_INFERENCE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle
                    className="mt-0.5 h-5 w-5 shrink-0 text-danger-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Timer className="h-5 w-5 text-securex-600" aria-hidden="true" />
            <span className="text-sm text-neutral-600">
              Automated screening should honour <InlineCode>Retry-After</InlineCode> when it sees a{' '}
              <InlineCode>429</InlineCode>.
            </span>
            <Button to="/platform/security" size="sm" variant="ghost">
              Rate limits &amp; security
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/trust/credential-integrity" size="lg" variant="outline">
              How integrity is proven
            </Button>
            <Button to="/live/status" size="lg" variant="ghost">
              Check service health
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<ScanLine className="h-8 w-8" />}
        title="Verify a candidate now"
        description="Paste a credential ID and its document hash into the public verifier and read the full evidence bundle — no account required."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
