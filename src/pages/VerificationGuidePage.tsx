import { AlertTriangle, ArrowRight, ScanLine, ShieldCheck, Terminal } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { CheckPipeline, DiagramFigure } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import {
  BulletList,
  Callout,
  CodeBlock,
  DocSection,
  InlineCode,
  SpecTable,
} from '../components/Prose';
import { API_URL, VERIFY_APP_URL } from '../constants';

const REQUEST = `# Inputs: a public credential ID (SX-XXXX-XXXX-XXXX) and,
# optionally, the document hash (exactly 64 hex characters).

curl -s "${API_URL}/api/verifications?credentialId=SX-XXXX-XXXX-XXXX&hash=<64-hex>"

# Same data, other entry points:
#   ${API_URL}/api/verifications/search?credentialId=SX-XXXX-XXXX-XXXX&hash=<64-hex>
#   ${API_URL}/api/verifications/{id}?hash=<64-hex>`;

const ENVELOPES = `// Success
{"success":true,"data":{ ... }}

// Failure
{"success":false,"error":"<human message>","errorCode":"<CODE>","message":"<same>"}`;

const RESPONSE_STEPS = [
  {
    name: '1 · Status first',
    detail:
      'One of eight values: VALID, INVALID, REVOKED, SUSPENDED, EXPIRED, TAMPERED, SUSPICIOUS, NOT_FOUND. Start here — everything below explains it.',
  },
  {
    name: '2 · Then the checks',
    detail:
      'credentialRecord, blockchainProof, signature, and (when you sent a hash) documentIntegrity each report verified, available, status, and a detail string.',
  },
  {
    name: '3 · Then the evidence',
    detail:
      'When the proof passes: transactionId, transactionHash, merkleRoot, blockHeight, blockHash, and inclusionProofVerified — enough to check again elsewhere.',
  },
  {
    name: '4 · Then the context',
    detail:
      'message explains the status in words, alongside issuedAt, expiresAt, revokedAt, and verifiedAt.',
  },
];

const ERROR_ROWS = [
  {
    code: <span className="font-bold text-danger-700">400 · MISSING_CREDENTIAL_ID</span>,
    when: 'No credentialId parameter was supplied. The ID is the only required input.',
  },
  {
    code: <span className="font-bold text-danger-700">400 · INVALID_HASH_FORMAT</span>,
    when: 'The hash is not exactly 64 hexadecimal characters. Rejected before any lookup happens.',
  },
  {
    code: <span className="font-bold text-warning-700">429 · RATE_LIMITED</span>,
    when: 'Over 60 requests per minute from this IP. Honour the Retry-After header, in seconds.',
  },
];

const DECISION_ROWS = [
  {
    status: <span className="font-bold text-trust-700">VALID</span>,
    meaning: 'Record found and status checks pass; evidence attached when available.',
    action: 'Accept under your own policy. Confirm documentIntegrity says EXACT if you sent a hash.',
  },
  {
    status: <span className="font-bold text-danger-700">REVOKED</span>,
    meaning: 'The issuer withdrew the credential; revokedAt says when.',
    action: 'Reject. A revocation reason is never returned publicly, so do not ask for one.',
  },
  {
    status: <span className="font-bold text-warning-700">SUSPENDED</span>,
    meaning: 'The credential exists but is on hold.',
    action: 'Escalate to the issuer. Do not accept it as-is.',
  },
  {
    status: <span className="font-bold text-warning-700">EXPIRED</span>,
    meaning: 'Past its expiresAt date, by stored value or current time.',
    action: 'Reject for current use; ask the holder for a re-issued credential.',
  },
  {
    status: <span className="font-bold text-danger-700">TAMPERED</span>,
    meaning: 'The presented document does not match the hash recorded at issuance.',
    action: 'Reject and treat as a red flag — the file in hand is not the one that was issued.',
  },
  {
    status: <span className="font-bold text-danger-700">INVALID</span>,
    meaning: 'The record failed validation.',
    action: 'Reject. If the holder disagrees, ask for a re-issued credential rather than reusing this one.',
  },
  {
    status: <span className="font-bold text-danger-700">SUSPICIOUS</span>,
    meaning: 'Flagged for review by the platform.',
    action: 'Escalate for manual review; never auto-accept.',
  },
  {
    status: <span className="font-bold text-neutral-700">NOT_FOUND</span>,
    meaning: 'No credential matches this ID.',
    action: 'Check for a typo first, then reject. An unknown ID is never treated as valid.',
  },
];

const RED_FLAGS = [
  <><InlineCode>TAMPERED</InlineCode> — the document hash does not match what was recorded at issuance.</>,
  <><InlineCode>NOT_FOUND</InlineCode> — no such credential; confirm the ID before drawing conclusions.</>,
  <>
    A <InlineCode>blockchainProof</InlineCode> or <InlineCode>signature</InlineCode> check reported{' '}
    <InlineCode>UNVERIFIED</InlineCode> with nothing in the detail — re-run before deciding; the
    chain may simply have been unreachable.
  </>,
  <><InlineCode>REVOKED</InlineCode> — valid evidence of the original issuance does not revive it.</>,
];

export default function VerificationGuidePage() {
  return (
    <>
      <PageHero
        icon={<ScanLine className="h-4 w-4" />}
        badge="Resources · Verification Guide"
        title="Verify before you accept"
        description="A practical guide for verifiers: what to collect, the request to send, how to read the response, and the cases where the only safe answer is no."
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
              What the pipeline checks
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
                eyebrow="Inputs"
                title="What you need before you start"
                description="Two values, no credentials of your own. The second one is what turns a status check into a document check."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DocSection id="inputs" title="The two inputs">
                  <BulletList
                    items={[
                      <>
                        <strong>Credential ID</strong> — <InlineCode>SX-3A7F-91C2-B04E</InlineCode>{' '}
                        style: <InlineCode>SX-</InlineCode> plus twelve uppercase hexadecimal
                        characters in three groups. It is public, immutable, and printed on the
                        credential itself.
                      </>,
                      <>
                        <strong>Document hash</strong> — the SHA-256 of the credential's canonical
                        nine-field document, exactly 64 hexadecimal characters, compared
                        case-insensitively against the hash stored at issuance.
                      </>,
                      <>
                        <strong>Nothing else</strong> — no account, no token, no API key. The
                        endpoint is read-only and public.
                      </>,
                    ]}
                  />
                </DocSection>
                <Callout tone="info" title="The hash is optional, the honesty is not">
                  Send the hash and you get the document-integrity check — EXACT, TAMPERED, or
                  UNVERIFIABLE when the platform has no stored hash to compare against. Omit it and
                  that check is simply absent; the status still reflects the platform record.
                </Callout>
              </div>
            </div>

            <DiagramFigure
              label="Reading the response"
              caption="Order matters: the status is the decision, the checks are the reasoning, and the evidence is what you can re-check later."
            >
              <CheckPipeline checks={RESPONSE_STEPS} />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="The request"
                title="One GET, no authentication"
                description="Replace the placeholders and run it. Every other verification endpoint takes the same two inputs."
              />
              <div className="mt-6">
                <CodeBlock label="Public verification" code={REQUEST} />
              </div>
              <div className="mt-6">
                <CodeBlock label="Response envelopes" code={ENVELOPES} />
              </div>
            </div>

            <div>
              <SectionHeader
                align="left"
                eyebrow="Errors"
                title="What can go wrong"
                description="Validation failures arrive before any lookup, so an error never leaks whether a credential exists."
              />
              <div className="mt-6">
                <SpecTable
                  caption="Verification request errors"
                  columns={[
                    { header: 'Response', key: 'code' },
                    { header: 'When it happens', key: 'when' },
                  ]}
                  rows={ERROR_ROWS}
                />
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-securex-200 bg-securex-50 p-5 text-sm leading-6 text-securex-900">
                <Terminal className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <p>
                  Every verification — successful or not — is written to verification history as
                  result, method, and timestamp. Rate limits are counted per IP address in fixed
                  one-minute windows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Decisions"
            title="Status → what to do"
            description="A verifier's cheat sheet. The platform reports; your policy decides — these are the safe defaults."
          />
          <div className="mt-10">
            <SpecTable
              caption="Decision table for verification statuses"
              columns={[
                { header: 'Status', key: 'status' },
                { header: 'What it means', key: 'meaning' },
                { header: 'What to do', key: 'action' },
              ]}
              rows={DECISION_ROWS}
            />
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-securex-50 to-trust-50 text-securex-600">
                <AlertTriangle className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-neutral-900">Red flags</h3>
              <div className="mt-4 text-sm leading-6 text-neutral-600">
                <BulletList items={RED_FLAGS} />
              </div>
            </div>

            <div className="space-y-6">
              <Callout tone="warning" title="VALID is not a legal opinion">
                A VALID result means the record and its evidence check out. It is not a judgement
                about what the qualification is worth, nor a substitute for your own acceptance
                criteria.
              </Callout>
              <Callout tone="info" title="There is no fraud score in this response">
                Fraud analysis is a separate service used by administrators and is in development
                as a verification feature. The public endpoint never returns a fraud score, a
                holder identity, credential metadata, the signature, or a revocation reason.
              </Callout>
              <Callout tone="info" title="You are rate limited">
                Verification allows 60 requests per minute per IP. When you exceed it the API
                answers <InlineCode>429 RATE_LIMITED</InlineCode> with a <InlineCode>Retry-After</InlineCode>{' '}
                header — back off and retry rather than hammering the endpoint.
              </Callout>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to="/platform/verification" size="lg">
              <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
              Verification pipeline
            </Button>
            <Button to="/trust/credential-integrity" size="lg" variant="outline">
              Integrity deep-dive
            </Button>
            <Button to="/resources/faq" size="lg" variant="ghost">
              FAQ
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<ScanLine className="h-8 w-8" />}
        title="Check a credential end to end"
        description="Send an ID and hash to the public endpoint, read the status and checks, then take the evidence to the explorer."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'API reference', to: '/resources/api' }}
      />
    </>
  );
}
