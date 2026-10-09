import {
  ArrowRight,
  EyeOff,
  Link2,
  QrCode,
  ShieldCheck,
  Smartphone,
  Wallet,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, CheckList } from '../components/Cards';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { BulletList, Callout } from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const TRAVELS_WITH_IT = [
  {
    label: 'Public credential ID',
    detail: 'A fixed identifier in the form SX-XXXX-XXXX-XXXX, printed on the document itself.',
    mono: true,
  },
  {
    label: 'Document hash',
    detail: 'The SHA-256 hash recorded at issue time — the reference a verifier compares against.',
  },
  {
    label: 'Issuer signature',
    detail: 'Signed with the issuing institution’s key at the moment of issuance.',
  },
  {
    label: 'Chain evidence',
    detail: 'Transaction ID, block height, and Merkle inclusion proof, read from the public chain.',
  },
];

const SHARING = [
  {
    icon: Link2,
    title: 'Link or file',
    description:
      'Send the credential by link or as a file. The document travels with its public ID, so the verifier always has the reference they need.',
  },
  {
    icon: QrCode,
    title: 'QR reference',
    description:
      'The node issues a signed QR reference (SXQR1 token) encoding the credential ID, valid for seven days and signed with Ed25519.',
  },
  {
    icon: ShieldCheck,
    title: 'Verify anywhere',
    description:
      'The verifier only needs the ID and the document hash — no account, no API key, and no access to your SecureX account.',
  },
];

export default function HoldersPage() {
  return (
    <>
      <PageHero
        icon={<Wallet className="h-4 w-4" />}
        badge="Solutions · Holders"
        title="Your credential carries its own proof"
        description="Stop sending scans anyone could have edited. A SecureX credential travels with a hash, a signature, and chain evidence — and a verifier learns only what the check requires, nothing else about you."
        actions={
          <>
            <Button href={APP_URL} size="lg">
              Open your credentials
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              href={VERIFY_APP_URL}
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Verify a credential
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
                eyebrow="Built-in proof"
                title="What travels with the document"
                description="Verification compares what you present against what was recorded at issue time. That comparison is what makes an altered scan fail."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <p>
                  When your institution issues a credential, the document is canonicalised, hashed
                  with SHA-256, and signed. The hash and the issuance are also written to the
                  public chain. None of that depends on you keeping an account open or on the
                  verifier trusting a website.
                </p>
                <Callout tone="info" title="You never hand over your account">
                  Sharing a credential does not share your SecureX login. The verifier interacts
                  with the public API and the document — not with your account.
                </Callout>
              </div>
            </div>

            <DiagramFigure
              label="The proof attached to your credential"
              caption="A verifier can re-check the chain evidence independently — for example against the block explorer."
            >
              <FlowSteps ariaLabel="Proof carried by a credential" steps={TRAVELS_WITH_IT} />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sharing"
            title="Share it on your terms"
            description="You decide how the credential travels. The verifier only ever needs the ID and the document."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SHARING.map((item) => (
              <Card
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Privacy of the check"
            title="What a verifier sees — and what they never see"
            description="The public verification response is deliberately narrow: enough to judge the credential, nothing about your wider account."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-trust-200 bg-gradient-to-br from-trust-50 to-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-neutral-900">Returned publicly</h3>
                <StatusChip status="live" />
              </div>
              <div className="mt-5">
                <CheckList
                  items={[
                    'The credential’s status — VALID, REVOKED, EXPIRED, SUSPENDED, TAMPERED, or NOT FOUND.',
                    'The issuer’s name, plus issued, expires, revoked, and verified timestamps.',
                    'Chain evidence when available: transaction ID, block height, and inclusion proof.',
                  ]}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <EyeOff className="h-5 w-5 text-neutral-500" aria-hidden="true" />
                <h3 className="text-lg font-bold text-neutral-900">Never returned</h3>
              </div>
              <div className="mt-5">
                <BulletList
                  items={[
                    'Your identity — the public response does not name or identify the holder.',
                    'Credential metadata beyond the status, issuer, dates, and evidence.',
                    'The reason a credential was revoked, or any note the issuer attached.',
                    'Anything about your other credentials or your account.',
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">
            <Callout tone="info" title="Revocation and expiry are shown honestly">
              If your institution revokes a credential, or its expiry date passes, the status
              changes for every future check — the verifier sees that state explicitly rather than
              inferring it from silence. A revoked credential is not reopened; a replacement is
              issued as a separate credential.
            </Callout>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Where you manage them"
                title="The web application, today"
                description="The holder experience lives in the SecureX web application — sign in, see the credentials issued to you, and share them from there."
              />
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={APP_URL} size="lg">
                  Open the web application
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
                <Button to="/resources/verification-guide" size="lg" variant="outline">
                  Verification guide
                </Button>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-securex-600" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-neutral-900">Dedicated mobile wallet app</h3>
                </div>
                <StatusChip status="roadmap" />
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-600">
                A standalone mobile wallet is planned — it is not in development yet, and no
                release date is promised here. Until then, the web application is where holders
                manage and share credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Carry proof, not promises"
        description="Open the web application to see your credentials, or check one against the public verifier right now."
        primary={{ label: 'Launch SecureX', href: APP_URL }}
        secondary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
      />
    </>
  );
}
