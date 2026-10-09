import { ArrowRight, Fingerprint, KeyRound, ScanLine, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { CheckPipeline, DiagramFigure } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import {
  BodyText,
  BulletList,
  Callout,
  CodeBlock,
  DocSection,
  InlineCode,
  Lead,
} from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const CANONICAL = `// Canonical document — exactly nine fields, fixed order
[
  ["credentialId",  "SX-3A7F-91C2-B04E"],
  ["type",          "degree"],
  ["title",         "B.Tech Computer Science"],
  ["description",   "Four-year undergraduate programme"],
  ["holderName",    "A. Sharma"],
  ["issuerName",    "Registrar"],
  ["institutionName","Example Institute of Technology"],
  ["issuedAt",      "2026-01-14T09:12:00.000Z"],
  ["expiresAt",     null]
]

// SHA-256 of that exact serialisation
// → 64 lowercase hex characters, stored at issuance
// e.g. 9f86d081884c7d659a2feaa0c55ad015
//      a3bf4f1b2b0b822cd15d6c15b0f00a08`;

const TAMPER_CHECKS = [
  {
    name: 'A changed field changes everything',
    detail:
      'Alter any character in any of the nine fields and the SHA-256 output changes completely — there is no partial match and no “close enough”.',
  },
  {
    name: 'Comparison is exact',
    detail:
      'The verifier’s supplied hash is compared case-insensitively against the stored hash. The result is reported as EXACT, TAMPERED, or UNVERIFIABLE (when no stored hash exists).',
  },
  {
    name: 'The scope is explicit',
    detail:
      'The document integrity check carries scope PLATFORM_RECORD — it proves the presented document matches what the platform recorded at issuance, and nothing more.',
  },
  {
    name: 'Independently re-derivable',
    detail:
      'Anyone holding the credential document can recompute the hash locally with any SHA-256 implementation before sending it.',
  },
];

export default function CredentialIntegrityPage() {
  return (
    <>
      <PageHero
        icon={<Fingerprint className="h-4 w-4" />}
        badge="Trust · Credential Integrity"
        title="Alter one character, fail the check"
        description="Integrity on SecureX is a comparison, not a promise: the presented document is hashed and compared against the hash recorded when the credential was issued."
        actions={
          <Button href={VERIFY_APP_URL} size="lg">
            Verify a credential
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Canonicalisation"
                title="Nine fields, one fixed form"
                description="Before hashing, the credential document is reduced to a canonical serialisation so the same document always produces the same hash."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DocSection id="algorithm" title="The algorithm">
                  <BodyText>
                    The canonical form is a JSON array of exactly nine field/value pairs in a fixed
                    order, serialised and hashed with SHA-256. The result is stored alongside the
                    credential as 64 lowercase hexadecimal characters.
                  </BodyText>
                  <BulletList
                    items={[
                      <><InlineCode>credentialId</InlineCode> — the public SX identifier.</>,
                      <><InlineCode>type</InlineCode>, <InlineCode>title</InlineCode>, <InlineCode>description</InlineCode> — what the credential is.</>,
                      <><InlineCode>holderName</InlineCode>, <InlineCode>issuerName</InlineCode>, <InlineCode>institutionName</InlineCode> — who it concerns.</>,
                      <><InlineCode>issuedAt</InlineCode> and <InlineCode>expiresAt</InlineCode> — validity window (expiry may be null).</>,
                    ]}
                  />
                </DocSection>
                <Callout tone="info" title="What is not covered">
                  The hash covers those nine fields exactly. Credential documents are plain
                  structured records — there is no free-form attachment for the hash to miss.
                </Callout>
              </div>
            </div>

            <div className="space-y-6">
              <CodeBlock label="Canonical form → hash" code={CANONICAL} />
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-neutral-900">Public credential IDs</h3>
                  <StatusChip status="live" />
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  IDs look like <InlineCode>SX-3A7F-91C2-B04E</InlineCode>: twelve hexadecimal
                  characters (48 bits) drawn from a cryptographically secure random source and
                  never reused — an identifier is not a secret, but it is not predictable either.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <DiagramFigure
              label="Why tampering is detectable"
              caption="SHA-256 is a one-way function: you cannot work backwards from a hash to a document, and you cannot craft a different document that produces the same one."
            >
              <CheckPipeline checks={TAMPER_CHECKS} />
            </DiagramFigure>

            <div>
              <SectionHeader
                align="left"
                eyebrow="Signatures"
                title="The chain confirms the issuer"
                description="Hash proves the document is unchanged. The signature proves who put it there."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <BodyText>
                  Issuance is submitted to the blockchain under the issuer’s identity, signed with
                  Ed25519 keys generated and stored on the node (file mode 600, never exposed via
                  API or browser bundle). Verification reports the signature check as VERIFIED only
                  when the chain evidence explicitly confirms it.
                </BodyText>
                <BulletList
                  items={[
                    'Key status is tracked per key: ACTIVE, RETIRED, COMPROMISED, or ROTATED.',
                    'Issuer status is tracked too — a revoked issuer cannot stand behind new attestations.',
                    'If the chain cannot be reached, the signature check reports UNVERIFIED rather than assuming success.',
                  ]}
                />
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button to="/platform/verification" size="lg">
                    <ScanLine className="mr-2 h-4 w-4" aria-hidden="true" />
                    Verification pipeline
                  </Button>
                  <Button to="/trust/blockchain" size="lg" variant="outline">
                    <KeyRound className="mr-2 h-4 w-4" aria-hidden="true" />
                    Keys on the chain
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Lead>
            Integrity answers “is this the document that was issued?” — status answers “does the
            issuer still stand behind it?”. A forged document fails the first; a withdrawn
            credential fails the second. Verification reports both independently.
          </Lead>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/trust/revocation" size="lg" variant="outline">
              How revocation works
            </Button>
            <Button to="/platform/credential-lifecycle" size="lg" variant="ghost">
              Lifecycle states
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<ShieldCheck className="h-8 w-8" />}
        title="Prove it on a real document"
        description="Supply a credential ID and its document hash to the public verifier — the response tells you EXACT or TAMPERED with the evidence attached."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
