import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  CreditCard,
  FileCheck2,
  Fingerprint,
  Globe,
  Lock,
  QrCode,
  Search,
  ShieldCheck,
  UserCheck,
  Wallet,
  Zap,
} from 'lucide-react';
import { Button } from '../components/Button';
import { APP_URL } from '../constants';

const CAPABILITIES = [
  {
    icon: FileCheck2,
    title: 'Credential issuance',
    description:
      'Institutions issue cryptographically signed credentials directly onto the ledger with full lifecycle management.',
  },
  {
    icon: Fingerprint,
    title: 'Tamper-proof anchoring',
    description:
      'Every credential is hashed and anchored to a distributed ledger, making any alteration immediately detectable.',
  },
  {
    icon: Search,
    title: 'Instant verification',
    description:
      'Validate any credential in seconds with a single scan, search, or secure link — no phone calls, no waiting.',
  },
  {
    icon: ShieldCheck,
    title: 'Fraud & risk detection',
    description:
      'A dedicated risk engine scores every verification and flags suspicious activity with a full audit trail.',
  },
  {
    icon: Wallet,
    title: 'Secure holder wallet',
    description:
      'Holders own and control their credentials in a portable digital wallet and share them on their own terms.',
  },
  {
    icon: QrCode,
    title: 'QR & secure sharing',
    description:
      'Share credentials via QR code or secure link without ever exposing private keys.',
  },
  {
    icon: Blocks,
    title: 'Ledger explorer',
    description:
      'A transparent, auditable view of blocks and transactions on the SecureX network.',
  },
  {
    icon: UserCheck,
    title: 'Role-based access',
    description:
      'Purpose-built experiences for institutions, issuers, holders, employers, admins, and security teams.',
  },
  {
    icon: CreditCard,
    title: 'Credential lifecycle',
    description:
      'Full lifecycle control — issue, manage, revoke, and audit credentials with a clear record of every action.',
  },
  {
    icon: Globe,
    title: 'Universal access',
    description:
      'Open, standards-based platform that works across institutions, employers, borders, and industries.',
  },
  {
    icon: Lock,
    title: 'Cryptographic security',
    description:
      'Credentials are signed, hashed, and verified cryptographically — trust is earned through math, not paperwork.',
  },
  {
    icon: Zap,
    title: 'Real-time results',
    description:
      'Verification results, risk scores, and ledger proofs are returned instantly to every stakeholder.',
  },
];

const ACTORS = [
  {
    icon: BadgeCheck,
    title: 'Institutions & Issuers',
    description:
      'Digitize credentialing, authorize issuers, and put verifiable records on the ledger in minutes.',
  },
  {
    icon: Wallet,
    title: 'Holders',
    description:
      'Receive, store, and share credentials from one secure wallet with full control over visibility.',
  },
  {
    icon: Search,
    title: 'Employers & Verifiers',
    description:
      'Verify qualifications instantly with risk scoring and complete, time-stamped verification records.',
  },
];

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-neutral-950">
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-securex-600/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-trust-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
              <Blocks className="h-3.5 w-3.5 text-trust-400" />
              Features & Ecosystem
            </span>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              One ecosystem for verifiable credentials
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              Every capability — issuance, storage, verification, fraud
              detection, and administration — lives in a single SecureX
              application built on a tamper-proof distributed ledger.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={APP_URL} size="lg">
                Launch SecureX
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                href="/how-it-works"
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                See How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-securex-600">
              Platform capabilities
            </span>
            <h2 className="mt-3 text-3xl font-black text-neutral-900 sm:text-4xl">
              Everything you need to build trust
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              A complete, integrated set of capabilities available in the
              SecureX application.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return (
                <div
                  key={capability.title}
                  className="group rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-securex-50 to-trust-50 text-securex-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-neutral-900">
                    {capability.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Actors */}
      <section className="relative bg-neutral-50 py-20 lg:py-24">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-securex-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-securex-600">
              Built for everyone
            </span>
            <h2 className="mt-3 text-3xl font-black text-neutral-900 sm:text-4xl">
              Three roles. One network.
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              SecureX is designed around the people and organizations that make
              credential trust possible.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ACTORS.map((actor) => {
              const Icon = actor.icon;
              return (
                <div
                  key={actor.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-securex-600 text-white shadow-lg shadow-securex-600/20">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-neutral-900">
                    {actor.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {actor.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Button href={APP_URL} size="lg">
              Launch SecureX
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}