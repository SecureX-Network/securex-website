import { BookMarked, Library } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { InlineCode, SpecTable } from '../components/Prose';
import { VERIFY_APP_URL } from '../constants';

const CORE_ROWS = [
  {
    term: 'Credential',
    definition:
      'A structured record issued under an issuer identity: ID, type, title, description, holder, issuer, institution, and validity dates. It is stored in the platform database and referenced by a public credential ID.',
  },
  {
    term: 'Credential ID',
    definition: (
      <>
        The public identifier in the form <InlineCode>SX-3A7F-91C2-B04E</InlineCode> —{' '}
        <InlineCode>SX-</InlineCode> plus twelve uppercase hexadecimal characters in three groups.
        Drawn from a cryptographically secure random source (48 bits) and never changed.
      </>
    ),
  },
  {
    term: 'Document hash',
    definition: (
      <>
        The SHA-256 digest of the canonical document, stored as 64 hexadecimal characters.
        Verification compares it case-insensitively and reports EXACT, TAMPERED, or UNVERIFIABLE.
      </>
    ),
  },
  {
    term: 'Canonical document',
    definition: (
      <>
        A JSON array of exactly nine <InlineCode>[field, value]</InlineCode> pairs in a fixed order:{' '}
        <InlineCode>credentialId</InlineCode>, <InlineCode>type</InlineCode>,{' '}
        <InlineCode>title</InlineCode>, <InlineCode>description</InlineCode>,{' '}
        <InlineCode>holderName</InlineCode>, <InlineCode>issuerName</InlineCode>,{' '}
        <InlineCode>institutionName</InlineCode>, <InlineCode>issuedAt</InlineCode>,{' '}
        <InlineCode>expiresAt</InlineCode>. Hashing that serialisation is what makes the comparison
        repeatable.
      </>
    ),
  },
  {
    term: 'Issuer',
    definition:
      'The identity that signs and stands behind a credential. Issuer status is tracked as ACTIVE, SUSPENDED, or REVOKED, and each signing key as ACTIVE, RETIRED, COMPROMISED, or ROTATED.',
  },
  {
    term: 'Institution',
    definition:
      'The organisation a credential is issued under, recorded as institutionName. The INSTITUTION role issues and revokes credentials within its own tenant.',
  },
  {
    term: 'Holder',
    definition:
      'The person a credential is about. Holders keep and present credentials in the web application — there is no mobile wallet app today (roadmap).',
  },
  {
    term: 'Verifier',
    definition:
      'Anyone checking a credential through the public verification endpoint. No account, token, or API key is required.',
  },
  {
    term: 'Revocation',
    definition:
      'An issuer withdrawing a credential: the platform status becomes REVOKED immediately, with the audit entry written in the same transaction. The chain write is attempted and reported as ANCHORED, PENDING, or UNAVAILABLE — the platform record applies either way.',
  },
  {
    term: 'Suspension',
    definition:
      'A state where the credential exists but must not be used as-is. In the chain lifecycle a credential moves ACTIVE to SUSPENDED and back, and verification reports SUSPENDED.',
  },
  {
    term: 'Expiry',
    definition:
      'The expiresAt date carried by the credential, checked against the stored value and the current time. A credential past it reports EXPIRED.',
  },
].map((row) => ({
  term: <span className="font-bold text-neutral-900">{row.term}</span>,
  definition: row.definition,
}));

const CHAIN_ROWS = [
  {
    term: 'Anchor / anchoring',
    definition:
      'The attempt to record an issuance or revocation on the blockchain, reported as ANCHORED (committed block, verified inclusion proof, valid Merkle root), PENDING (submitted, or no proof yet), or UNAVAILABLE (chain unreachable or not configured). It is a reported result, not an assurance.',
  },
  {
    term: 'Block',
    definition:
      'A header — version, height, timestamp, previousHash, merkleRoot, proposerId — plus transactions, validator signatures, and a hash. One proposer commits blocks in order under Proof of Authority.',
  },
  {
    term: 'Transaction',
    definition:
      'A signed record submitted to the chain, such as an issuance or revocation event. Writes require a bearer token with an admin, validator, or issuer role; reads are open to anyone.',
  },
  {
    term: 'Merkle root / inclusion proof',
    definition:
      'The Merkle root is the block header commitment over its transaction leaves — current blocks hold a single transaction, so the root is that leaf. The inclusion proof shows a transaction belongs to that root and is reported as inclusionProofVerified.',
  },
  {
    term: 'Block height',
    definition:
      'A block position above genesis, returned as blockHeight in the evidence bundle and used to fetch that block directly.',
  },
  {
    term: 'Ed25519 signature',
    definition:
      'The algorithm behind issuer signatures and chain transactions. Private keys are generated on the node disk with file mode 600 and are never served by an API or shipped to a browser.',
  },
  {
    term: 'Proof of Authority',
    definition:
      "The chain's consensus: permissioned, with known validators and a single proposer. There is no mining and no gas — writes are ordered, not auctioned.",
  },
  {
    term: 'Explorer',
    definition:
      'The read-only block explorer at explorer-securex.sp-net.in, where blocks, transactions, and evidence can be inspected without an account.',
  },
].map((row) => ({
  term: <span className="font-bold text-neutral-900">{row.term}</span>,
  definition: row.definition,
}));

const PLATFORM_ROWS = [
  {
    term: 'Verification history',
    definition:
      'The row written for every verification call, storing the result, the method, and the timestamp. It gives the platform a record of what was checked and when.',
  },
  {
    term: 'Audit log',
    definition:
      'Where privileged actions and failed logins are recorded. A revocation writes its audit entry in the same transaction as the status change.',
  },
  {
    term: 'JWT / bearer token',
    definition: (
      <>
        The <InlineCode>Authorization: Bearer</InlineCode> token used for authenticated API calls.
        It expires after 8 hours by default and is bound to a server-side session row, so it can be
        invalidated before it expires.
      </>
    ),
  },
  {
    term: 'Role-based access control',
    definition: (
      <>
        Every authenticated request carries one of nine roles — PUBLIC, HOLDER, INSTITUTION,
        ISSUER, EMPLOYER, ADMIN, SECURITY_ADMIN, NETWORK_ADMIN, AUDITOR — and disallowed routes
        answer <InlineCode>403 FORBIDDEN</InlineCode>. Out-of-scope credential reads return 404
        rather than confirming existence.
      </>
    ),
  },
  {
    term: 'Rate limit',
    definition: (
      <>
        Fixed one-minute windows counted per IP address: 150/minute across the API, 10/minute on
        authentication routes, 60/minute on verification. Over the limit the API answers{' '}
        <InlineCode>429</InlineCode> with <InlineCode>errorCode: RATE_LIMITED</InlineCode> and a{' '}
        <InlineCode>Retry-After</InlineCode> header in seconds.
      </>
    ),
  },
].map((row) => ({
  term: <span className="font-bold text-neutral-900">{row.term}</span>,
  definition: row.definition,
}));

const COLUMNS = [
  { header: 'Term', key: 'term' },
  { header: 'Definition', key: 'definition' },
];

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        icon={<BookMarked className="h-4 w-4" />}
        badge="Resources · Glossary"
        title="The vocabulary, defined once"
        description="Credential, anchor, Merkle root, role, rate limit — every term this site uses, stated in two sentences or fewer so the rest of the documentation can assume it."
        actions={
          <Button
            to="/resources/documentation"
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            All documentation
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="left"
            eyebrow="Credentials"
            title="What a credential is made of"
            description="The terms that appear on every verification response."
          />
          <div className="mt-8">
            <SpecTable columns={COLUMNS} rows={CORE_ROWS} caption="Credential terminology" />
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="left"
            eyebrow="Chain & evidence"
            title="What the ledger contributes"
            description="The words used for blocks, proofs, signatures, and the evidence bundle."
          />
          <div className="mt-8">
            <SpecTable columns={COLUMNS} rows={CHAIN_ROWS} caption="Blockchain terminology" />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="left"
            eyebrow="Platform & access"
            title="How the platform is governed"
            description="Tokens, roles, limits, and the records kept behind the scenes."
          />
          <div className="mt-8">
            <SpecTable columns={COLUMNS} rows={PLATFORM_ROWS} caption="Platform terminology" />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/resources/documentation" size="lg">
              <Library className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to documentation
            </Button>
            <Button to="/resources/verification-guide" size="lg" variant="outline">
              Verification guide
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<BookMarked className="h-8 w-8" />}
        title="See the terms applied"
        description="Run a verification and read status, checks, and evidence against the definitions above."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Documentation', to: '/resources/documentation' }}
      />
    </>
  );
}
