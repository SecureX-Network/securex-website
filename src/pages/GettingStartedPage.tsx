import {
  ArrowRight,
  Blocks,
  Compass,
  GitBranch,
  Hash,
  Rocket,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Stamp,
  UserPlus,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, StepCard } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip, type DeliveryStatus } from '../components/StatusChip';
import {
  BodyText,
  BulletList,
  Callout,
  CodeBlock,
  DocSection,
  InlineCode,
} from '../components/Prose';
import { APP_URL, API_URL, EXPLORER_URL } from '../constants';

const STEPS = [
  {
    step: '1',
    icon: UserPlus,
    title: 'Create an account',
    description:
      'Register in the web application. Self-registration opens four roles: HOLDER, INSTITUTION, ISSUER, and EMPLOYER.',
  },
  {
    step: '2',
    icon: Compass,
    title: 'Choose a starting role',
    description:
      'A HOLDER carries credentials; an ISSUER or INSTITUTION issues them. The role you register with decides which routes your token can reach.',
  },
  {
    step: '3',
    icon: Stamp,
    title: 'Issue a credential',
    description:
      'Create a credential from the issuing view. Issuance is live: it writes a platform record and submits an anchoring transaction.',
  },
  {
    step: '4',
    icon: Hash,
    title: 'Read the public ID and hash',
    description:
      'The credential carries an SX-XXXX-XXXX-XXXX identifier plus the SHA-256 hash of its canonical nine-field document — 64 hexadecimal characters.',
  },
  {
    step: '5',
    icon: ScanLine,
    title: 'Verify it publicly',
    description:
      'Send the ID and hash to the public endpoint. No Authorization header, no API key, no account needed for this call.',
  },
  {
    step: '6',
    icon: Blocks,
    title: 'Re-check the evidence',
    description:
      'Take the transaction ID from the evidence bundle and look the block up in the explorer yourself — the loop closes outside our pages.',
  },
];

const HONEST_NOTES: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
  status: DeliveryStatus;
}[] = [
  {
    icon: ShieldCheck,
    title: 'Public verification',
    description:
      'Anyone can call the verification endpoint with a credential ID and an optional hash. No account, no token, no key.',
    status: 'live',
  },
  {
    icon: GitBranch,
    title: 'Issuance anchoring',
    description:
      'Every issuance is submitted to the chain and reported ANCHORED only once a block commits with a verified inclusion proof — a receipt alone is not treated as proof.',
    status: 'live',
  },
  {
    icon: GitBranch,
    title: 'Revocation anchoring',
    description:
      'Revocation writes are attempted on every revoke and reported as ANCHORED, PENDING, or UNAVAILABLE. Guaranteed chain confirmation is still in development.',
    status: 'development',
  },
  {
    icon: ShieldAlert,
    title: 'Fraud scoring',
    description:
      'Fraud analysis runs as a separate service for administrators. It is in development as a verification feature and never appears in a public response.',
    status: 'development',
  },
  {
    icon: Smartphone,
    title: 'Mobile wallet',
    description:
      'Holders use the web application today. A mobile wallet is planned work, not something you can download.',
    status: 'roadmap',
  },
];

const VERIFY_REQUEST = `# Public verification — no Authorization header, no API key
curl -s "${API_URL}/api/verifications?credentialId=SX-XXXX-XXXX-XXXX&hash=<64-hex>"

# Replace SX-XXXX-XXXX-XXXX with the credential's public ID.
# Replace <64-hex> with its document hash: exactly 64 hexadecimal
# characters, compared case-insensitively against the stored hash.`;

export default function GettingStartedPage() {
  return (
    <>
      <PageHero
        icon={<Rocket className="h-4 w-4" />}
        badge="Resources · Getting Started"
        title="From zero to a verified credential"
        description="Six steps: register, issue, read the ID and hash, call the public endpoint, then check the evidence yourself. Every request on this page is one you can run."
        actions={
          <>
            <Button href={APP_URL} size="lg">
              Launch SecureX
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              to="/resources/api"
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              API reference
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The path"
            title="Six steps, in order"
            description="Steps 1 to 4 need an account. Step 5 does not — and neither does anything a verifier does later."
          />
          <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((step) => (
              <StepCard
                key={step.step}
                step={step.step}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Step five"
                title="The request you send"
                description="One GET, two query parameters, no authentication. This is the same endpoint the platform's own verifier uses."
              />
              <div className="mt-6">
                <CodeBlock label="Public verification request" code={VERIFY_REQUEST} />
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                The response is wrapped in the standard success envelope{' '}
                <InlineCode>{'{"success":true,"data":…}'}</InlineCode>; failures carry{' '}
                <InlineCode>errorCode</InlineCode> alongside a human-readable{' '}
                <InlineCode>message</InlineCode>.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-neutral-900">Account required</h3>
                  <StatusChip status="live" />
                </div>
                <div className="mt-4 text-sm leading-6 text-neutral-600">
                  <BulletList
                    items={[
                      <>Issuing a credential — INSTITUTION, ISSUER, ADMIN, SECURITY_ADMIN, or NETWORK_ADMIN.</>,
                      'Revoking one — the same roles. AUDITOR is read-only by design.',
                      'Your holder, issuer, and administrator views inside the web application.',
                    ]}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-neutral-900">No account required</h3>
                  <StatusChip status="live" />
                </div>
                <div className="mt-4 text-sm leading-6 text-neutral-600">
                  <BulletList
                    items={[
                      <>
                        Verification: <InlineCode>GET /api/verifications</InlineCode> with a credential ID
                        and an optional hash.
                      </>,
                      'Chain reads: health, status, blocks, transactions, and evidence are open on the node.',
                      'The block explorer and every page on this documentation site.',
                    ]}
                  />
                </div>
              </div>

              <Callout tone="warning" title="Rate limits apply to every caller">
                Verification endpoints allow 60 requests per minute per IP, the rest of the API
                allows 150 per minute, and authentication routes allow 10 per minute — fixed
                one-minute windows. Over the limit you receive <InlineCode>429</InlineCode> with{' '}
                <InlineCode>errorCode: RATE_LIMITED</InlineCode> and a <InlineCode>Retry-After</InlineCode>{' '}
                header in seconds.
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Honest scope"
            title="What is live, what is not"
            description="Labels used across this site, applied here to the four things a first-time integrator asks about."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {HONEST_NOTES.map((note) => (
              <Card
                key={note.title}
                icon={note.icon}
                title={note.title}
                description={note.description}
                footer={<StatusChip status={note.status} />}
              />
            ))}
          </div>

          <div className="mt-10 space-y-4 text-[15px] leading-7 text-neutral-600">
            <DocSection id="first-run" title="Before your first run">
              <BodyText>
                Keep the credential ID and the 64-character hash together — the ID alone answers
                “does this credential exist and is it still valid”, while the hash adds the
                document-integrity check that tells you whether the file in front of you is the
                one that was issued.
              </BodyText>
            </DocSection>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/resources/verification-guide" size="lg">
              <ScanLine className="mr-2 h-4 w-4" aria-hidden="true" />
              Verification guide
            </Button>
            <Button href={EXPLORER_URL} size="lg" variant="outline">
              Open the explorer
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<Rocket className="h-8 w-8" />}
        title="Run the first verification now"
        description="Register, issue a credential, and send the request on this page — the result comes back with the evidence attached."
        primary={{ label: 'Launch SecureX', href: APP_URL }}
        secondary={{ label: 'API reference', to: '/resources/api' }}
      />
    </>
  );
}
