import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  CheckCircle2,
  Fingerprint,
  Globe,
  Handshake,
  Lock,
  QrCode,
  ScanLine,
  Server,
  Shield,
  ShieldCheck,
  Signature,
  Stamp,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card, StepCard } from '../components/Cards';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const GUARANTEES = [
  {
    icon: Fingerprint,
    title: 'Fixed-length integrity hash',
    description:
      'Every credential document is reduced to a SHA-256 hash at issue time. Verification compares the presented document against that exact hash.',
  },
  {
    icon: Blocks,
    title: 'Public chain anchoring',
    description:
      'Issuance is written to a public blockchain with a transaction receipt, so the record can be checked outside our infrastructure.',
  },
  {
    icon: ScanLine,
    title: 'Open verification API',
    description:
      'Anyone can query the verification endpoint with a credential ID and hash and receive a structured result with chain evidence.',
  },
  {
    icon: Stamp,
    title: 'Explicit revocation status',
    description:
      'Issuers can mark a credential revoked. Verifiers receive an unambiguous state instead of guessing from a missing record.',
  },
];

const FEATURES = [
  {
    icon: Lock,
    title: 'Tamper-evident',
    description:
      'Each credential is cryptographically signed and hashed. Any alteration to the document produces a different hash and fails verification.',
  },
  {
    icon: Zap,
    title: 'Instant verification',
    description:
      'Confirm authenticity in seconds without calling the issuing institution or waiting on a manual reference check.',
  },
  {
    icon: Blocks,
    title: 'Blockchain secured',
    description:
      'A public ledger keeps an auditable record of credential issuance and revocation, independent of any single operator.',
  },
  {
    icon: Globe,
    title: 'Portable by design',
    description:
      'Credentials carry their own proof. Holders share them by link or QR code, and verifiers get the same answer anywhere.',
  },
];

const STEPS = [
  {
    step: '01',
    icon: Server,
    title: 'Issue',
    description:
      'An institution creates a credential in SecureX and assigns it to a holder.',
  },
  {
    step: '02',
    icon: Signature,
    title: 'Sign',
    description:
      'The credential document is hashed and signed with the issuing institution’s keys.',
  },
  {
    step: '03',
    icon: Blocks,
    title: 'Anchor',
    description:
      'The hash is written to the blockchain and a transaction receipt is returned.',
  },
  {
    step: '04',
    icon: QrCode,
    title: 'Present',
    description:
      'The holder shares the credential by link or QR code — the document travels with its proof.',
  },
  {
    step: '05',
    icon: ScanLine,
    title: 'Verify',
    description:
      'The verifier checks the hash, the signature, the chain anchor, and the current status.',
  },
  {
    step: '06',
    icon: ShieldCheck,
    title: 'Trust',
    description:
      'A single structured result tells the verifier exactly what was proven — and what was not.',
  },
];

const OUTCOMES = [
  { label: 'VALID', className: 'border-trust-200 bg-trust-50 text-trust-700' },
  { label: 'REVOKED', className: 'border-danger-200 bg-danger-50 text-danger-700' },
  { label: 'EXPIRED', className: 'border-warning-200 bg-warning-50 text-warning-700' },
  { label: 'SUSPENDED', className: 'border-warning-200 bg-warning-50 text-warning-700' },
  { label: 'TAMPERED', className: 'border-danger-200 bg-danger-50 text-danger-700' },
  { label: 'NOT FOUND', className: 'border-neutral-200 bg-neutral-100 text-neutral-600' },
];

const LIVE_NOW = [
  'Credential issuance and signing',
  'Blockchain anchoring of issuance',
  'Public verification API',
  'Revocation status changes',
  'Chain explorer and service status',
];

const AUDIENCES = [
  {
    icon: Stamp,
    title: 'Institutions',
    description:
      'Issue signed credentials, track their status, and revoke them when circumstances change.',
    to: '/solutions/institutions',
  },
  {
    icon: Users,
    title: 'Holders',
    description:
      'Keep every credential in one place and share it with verifiable proof attached.',
    to: '/solutions/holders',
  },
  {
    icon: Handshake,
    title: 'Employers',
    description:
      'Check a candidate’s credential against the issuer’s record in a single request.',
    to: '/solutions/employers',
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="securex-hero relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-trust-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[28rem] w-[28rem] rounded-full bg-securex-500/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.12),transparent_55%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="securex-hero-badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-trust-500" aria-hidden="true" />
              Blockchain-Powered Trust Network
              <span className="h-1 w-1 rounded-full bg-trust-500" aria-hidden="true" />
              SecureX
            </div>

            <h1 className="securex-hero-title mt-8 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
              Blockchain-Powered
              <span className="block bg-gradient-to-r from-trust-500 via-emerald-500 to-securex-500 bg-clip-text text-transparent">
                Digital Credential Trust Network
              </span>
            </h1>

            <p className="securex-hero-description mx-auto mt-7 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">
              Issue, store, and verify credentials with cryptographic security.
              SecureX connects institutions, holders, and employers through a
              tamper-proof distributed ledger.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href={APP_URL}
                size="lg"
                rightIcon={<ArrowRight className="h-5 w-5" />}
                className="shadow-xl shadow-securex-500/20 transition-all hover:-translate-y-1"
              >
                Launch SecureX
              </Button>
              <Button
                to="/platform/how-it-works"
                size="lg"
                variant="outline"
                className="securex-outline-button"
              >
                How It Works
              </Button>
            </div>
          </div>

          {/* SHIELD VISUAL */}
          <div className="mx-auto mt-20 max-w-3xl">
            <div className="securex-hero-card relative rounded-[2rem] p-10 shadow-2xl backdrop-blur-xl sm:p-14">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-trust-500/5 via-transparent to-securex-500/10" />
              <div className="relative flex items-center justify-center">
                <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-trust-500/30 to-securex-500/30 blur-3xl" />
                  <div className="absolute inset-4 rounded-full border border-dashed border-neutral-300" />
                  <div className="absolute inset-8 rounded-full border border-neutral-200" />
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] bg-gradient-to-br from-trust-400 to-securex-600 shadow-2xl shadow-trust-500/30 transition-all duration-500 hover:scale-110 hover:rotate-2 sm:h-44 sm:w-44">
                    <Shield className="h-20 w-20 text-white sm:h-24 sm:w-24" aria-hidden="true" />
                  </div>
                  <div className="absolute right-0 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-trust-600 shadow-xl">
                    <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="securex-lock-badge absolute bottom-7 left-0 flex h-11 w-11 items-center justify-center rounded-full shadow-xl">
                    <Lock className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <span className="securex-hero-tag rounded-full px-4 py-2 text-xs font-medium">
                  Cryptographically Secure
                </span>
                <span className="securex-hero-tag rounded-full px-4 py-2 text-xs font-medium">
                  Tamper Resistant
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THE NETWORK GUARANTEES (replaces invented statistics) */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Trust, in writing"
            title="What the network actually guarantees"
            description="No invented numbers — these are the properties the system is built to provide, and each one is checkable."
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GUARANTEES.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-securex-50 to-trust-50 text-securex-600 transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-neutral-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SECUREX */}
      <section className="relative bg-neutral-50 py-24 lg:py-28">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-securex-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Why SecureX"
            title="A new standard for digital trust"
            description="SecureX makes credentials portable, verifiable, and hard to forge — without a central authority deciding who to believe."
          />

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-2xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-securex-50 to-trust-50 text-securex-600 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-neutral-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{feature.description}</p>
                <ArrowRight
                  className="mt-6 h-5 w-5 text-securex-500 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Simple Process"
            title="How it works"
            description="Six stages take a credential from an issuing institution to a result a verifier can act on."
          />

          <ol className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

          <div className="mt-12 text-center">
            <Button to="/platform/how-it-works" size="lg" variant="outline">
              Walk through the full flow
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* VERIFICATION OUTCOMES */}
      <section className="border-y border-neutral-200 bg-neutral-50 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="A result you can act on"
                title="Verification returns a state, not a maybe"
                description="Every check answers with one of a fixed set of states, so a verifier never has to interpret a vague response."
              />
              <p className="mt-5 text-[15px] leading-7 text-neutral-600">
                The response also records whether the document hash matched, whether
                the chain anchor was found, and which institution issued the
                credential — the evidence sits next to the verdict.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/platform/verification" size="lg" variant="outline">
                  See what gets checked
                </Button>
                <Button to="/resources/verification-guide" size="lg" variant="ghost">
                  Verification guide
                </Button>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {OUTCOMES.map((outcome) => (
                <li
                  key={outcome.label}
                  className={`flex items-center justify-center rounded-2xl border px-4 py-5 text-center text-sm font-black tracking-wide ${outcome.className}`}
                >
                  {outcome.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT'S LIVE */}
      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Live status"
            title="What is live today"
            description="SecureX labels every capability honestly. These are running in production right now."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-trust-200 bg-gradient-to-br from-trust-50 to-white p-7 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-neutral-900">Running in production</h3>
                <StatusChip status="live" />
              </div>
              <ul className="mt-5 space-y-3">
                {LIVE_NOW.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-neutral-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-trust-600" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-7 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-neutral-900">Planned work</h3>
                  <StatusChip status="roadmap" />
                </div>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Everything not listed as live is still in development or on the
                  roadmap. The full breakdown — including what each phase means —
                  is published openly.
                </p>
                <Card
                  to="/project/roadmap"
                  title="Read the roadmap"
                  description="What has shipped, what is being built, and what comes next."
                  className="mt-5 bg-white"
                />
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-7 shadow-sm">
                <h3 className="text-lg font-bold text-neutral-900">Check it yourself</h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">
                  Live service health — API and chain — is published without a login.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button to="/live/status" size="md" variant="outline">
                    Live status
                  </Button>
                  <Button href={VERIFY_APP_URL} size="md" variant="outline">
                    Verify a credential
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="bg-neutral-50 py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Who it is for"
            title="Three roles, one network"
            description="SecureX is shaped around the people who issue credentials, carry them, and check them."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {AUDIENCES.map((audience) => (
              <Card
                key={audience.title}
                icon={audience.icon}
                title={audience.title}
                description={audience.description}
                to={audience.to}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-neutral-950 py-24">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-securex-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <BadgeCheck className="h-8 w-8 text-trust-400" aria-hidden="true" />
          </div>
          <h2 className="mt-7 text-3xl font-black text-white sm:text-5xl">
            See verifiable credentials in action
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-300">
            Issue a credential, anchor it, and verify it end to end — or check
            someone else’s in a single request.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              href={APP_URL}
              size="lg"
              className="shadow-xl shadow-securex-500/20 transition-all hover:-translate-y-1"
            >
              Launch SecureX
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              href={VERIFY_APP_URL}
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Verify a credential
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
