import { ArrowRight, ScanLine, ShieldCheck, XCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { CheckPipeline, DiagramFigure } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import {
  BodyText,
  BulletList,
  Callout,
  DocSection,
  InlineCode,
  Lead,
  SpecTable,
} from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const CHECKS = [
  {
    name: '1 · Request validation',
    detail:
      'A credential ID must be provided. If a hash is supplied it must be exactly 64 hexadecimal characters — anything else is rejected with 400 INVALID_HASH_FORMAT before any lookup happens.',
  },
  {
    name: '2 · Record lookup',
    detail:
      'The credential is looked up by its public ID (or internal ID) together with issuer and institution. No match returns NOT_FOUND with an explicit message — an unknown ID is never treated as valid.',
  },
  {
    name: '3 · Chain evidence',
    detail:
      'The blockchain node is asked for the inclusion evidence: transaction ID, transaction hash, Merkle root, block height, block hash, and whether the proof verified. Unreachable or missing evidence downgrades the proof check — it never fakes a pass.',
  },
  {
    name: '4 · Status recomputation',
    detail:
      'The effective status is derived in precedence order (revoked → stored expiry → time-based expiry → terminal states → stored value), so stale data cannot upgrade a credential.',
  },
  {
    name: '5 · Issuer signature',
    detail:
      'The signature check reports VERIFIED only when the chain evidence explicitly states the issuer signature validated against the registered key.',
  },
  {
    name: '6 · Document integrity (optional)',
    detail:
      'If the verifier sends the document hash, it is compared case-insensitively with the stored hash: EXACT, TAMPERED, or UNVERIFIABLE when no stored hash exists.',
  },
];

const RESULT_STATES = [
  {
    status: <span className="font-bold text-trust-700">VALID</span>,
    record: 'Found',
    proof: 'Evidence attached when available',
    meaning: 'Record exists and passes status checks.',
  },
  {
    status: <span className="font-bold text-danger-700">REVOKED</span>,
    record: 'Found',
    proof: 'Evidence attached when available',
    meaning: 'The issuer withdrew the credential.',
  },
  {
    status: <span className="font-bold text-warning-700">EXPIRED / SUSPENDED</span>,
    record: 'Found',
    proof: 'Evidence attached when available',
    meaning: 'No longer usable as-is.',
  },
  {
    status: <span className="font-bold text-danger-700">TAMPERED</span>,
    record: 'Found',
    proof: 'Compared against stored hash',
    meaning: 'The presented document differs from what was issued.',
  },
  {
    status: <span className="font-bold text-danger-700">INVALID / SUSPICIOUS</span>,
    record: 'Found',
    proof: 'Evidence attached when available',
    meaning: 'Failed validation or flagged for review.',
  },
  {
    status: <span className="font-bold text-neutral-700">NOT FOUND</span>,
    record: 'Not found',
    proof: 'Not applicable',
    meaning: 'No credential matches this ID.',
  },
];

export default function VerificationPage() {
  return (
    <>
      <PageHero
        icon={<ScanLine className="h-4 w-4" />}
        badge="Platform · Verification"
        title="What verification actually checks"
        description="Six ordered checks, each reported independently in the response. No account is needed, and no check is skipped to make a result look cleaner."
        actions={
          <>
            <Button href={VERIFY_APP_URL} size="lg">
              Verify a credential
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/resources/api" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              API reference
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
                eyebrow="The pipeline"
                title="Checks run in order"
                description="Every check reports VERIFIED, UNVERIFIED, or NOT_FOUND on its own — a pass in one area never hides a failure in another."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DocSection id="reading-results" title="Reading a result">
                  <BodyText>
                    The response separates four concerns so a verifier can make a judgement:
                  </BodyText>
                  <BulletList
                    items={[
                      <><strong>Credential record</strong> — does the platform hold this credential, and what is its effective status?</>,
                      <><strong>Blockchain proof</strong> — is there a committed block with a verified inclusion proof for it?</>,
                      <><strong>Signature</strong> — did the chain confirm the issuer’s signature?</>,
                      <><strong>Document integrity</strong> — if you supplied the hash, does it EXACTly match what was issued?</>,
                    ]}
                  />
                </DocSection>
                <Callout tone="info" title="Evidence travels with the verdict">
                  When the proof check passes, the response includes transactionId,
                  transactionHash, merkleRoot, blockHeight, blockHash, and
                  inclusionProofVerified — enough to re-check the claim independently against the
                  explorer.
                </Callout>
              </div>
            </div>

            <DiagramFigure
              label="Ordered checks"
              caption="Each step short-circuits only its own check — later checks still report what they found."
            >
              <CheckPipeline checks={CHECKS} />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Result states"
            title="Every status, no ambiguity"
            description="The status field carries one of eight values; rows are grouped here for readability, and everything else in the response explains why."
          />
          <div className="mt-10">
            <SpecTable
              caption="Verification result states"
              columns={[
                { header: 'Status', key: 'status' },
                { header: 'Record', key: 'record' },
                { header: 'Blockchain proof', key: 'proof' },
                { header: 'Meaning', key: 'meaning' },
              ]}
              rows={RESULT_STATES}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Boundaries" title="What verification does not claim" />
          <div className="mt-10 space-y-6 text-[15px] leading-7 text-neutral-600">
            <Lead>
              Trust comes from knowing the edges of a check. These limits are part of the
              contract:
            </Lead>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger-500" aria-hidden="true" />
                  <span>
                    <strong>It does not identify the holder.</strong> The public response never
                    returns holder identity, credential metadata, or the revocation reason — only
                    status, issuer name, dates, and evidence.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger-500" aria-hidden="true" />
                  <span>
                    <strong>It does not score fraud.</strong> Fraud analysis runs as a separate
                    service for administrators; it is not part of the public verification response
                    today (in development).
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger-500" aria-hidden="true" />
                  <span>
                    <strong>It does not replace the issuer’s judgement.</strong> A VALID result
                    means the record and its evidence check out — it is not a legal opinion on the
                    underlying qualification.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger-500" aria-hidden="true" />
                  <span>
                    <strong>It is rate-limited.</strong> Public verification allows 60 requests per
                    minute per IP (<InlineCode>429 RATE_LIMITED</InlineCode>). Automated systems
                    should back off and retry using the <InlineCode>Retry-After</InlineCode> header.
                  </span>
                </li>
              </ul>
            </div>

            <DocSection id="history" title="Every verification is recorded">
              <BodyText>
                Each call writes a row to the platform’s verification history (result, method, and
                timestamp). Verifiers get an audit trail; issuers can see how often their
                credentials were checked.
              </BodyText>
            </DocSection>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button to="/resources/verification-guide" size="lg">
                <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                Verification guide
              </Button>
              <Button to="/trust/credential-integrity" size="lg" variant="outline">
                Integrity deep-dive
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Verify something real"
        description="Paste a credential ID and its document hash into the public verifier and read the full evidence bundle."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
