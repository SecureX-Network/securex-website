import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Fingerprint,
  FileSearch,
  Lock,
  Radar,
  ShieldCheck,
  ShieldHalf,
  Unlink,
} from 'lucide-react';
import { Button } from '../components/Button';
import { APP_URL } from '../constants';

const PILLARS = [
  {
    icon: Fingerprint,
    title: 'Cryptographic signatures',
    description:
      'Every credential is digitally signed by the issuing institution, so its origin and integrity can be proven cryptographically — never asserted.',
  },
  {
    icon: Lock,
    title: 'Immutable ledger anchoring',
    description:
      'Credential hashes are written to a distributed ledger, creating a permanent, tamper-evident record of every issue and verification event.',
  },
  {
    icon: Radar,
    title: 'Fraud risk detection',
    description:
      'A dedicated risk engine evaluates every verification against tampering, signature, and ledger evidence and surfaces clear risk results.',
  },
  {
    icon: ClipboardCheck,
    title: 'Complete audit trail',
    description:
      'Every verification is time-stamped and stored, giving employers and institutions an auditable history they can rely on.',
  },
];

const THREATS = [
  {
    icon: Unlink,
    title: 'Forged or altered documents',
    description:
      'Anchor-based verification detects any modification to the document content because the recorded hash no longer matches.',
  },
  {
    icon: FileSearch,
    title: 'Unverifiable claims',
    description:
      'Employers get instant, independent results — no more relying on unverifiable paper letters or word of mouth.',
  },
  {
    icon: ShieldHalf,
    title: 'Lost trust in credentials',
    description:
      'By making verification open and cryptographically sound, SecureX restores confidence in academic and professional qualifications.',
  },
];

export default function SecurityPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-neutral-950">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-trust-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-securex-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
              <ShieldCheck className="h-3.5 w-3.5 text-trust-400" />
              Security & Trust
            </span>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Trust built on cryptography, not assumptions
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              SecureX combines digital signatures, a distributed ledger, and
              automated fraud detection to make credential fraud detectable —
              and trust verifiable — for everyone.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={APP_URL} size="lg">
                Launch SecureX
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                href="/about"
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                About SecureX
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-securex-600">
              Trust foundation
            </span>
            <h2 className="mt-3 text-3xl font-black text-neutral-900 sm:text-4xl">
              Four pillars of SecureX security
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              How SecureX guarantees that credentials are genuine, unaltered,
              and reliably verifiable.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-securex-50 to-trust-50 text-securex-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-neutral-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Threats */}
      <section className="relative bg-neutral-50 py-20 lg:py-24">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-securex-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-securex-600">
              What we prevent
            </span>
            <h2 className="mt-3 text-3xl font-black text-neutral-900 sm:text-4xl">
              Credential fraud, eliminated
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              SecureX is designed to stop the ways credentials are most
              commonly misused.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {THREATS.map((threat) => {
              const Icon = threat.icon;
              return (
                <div
                  key={threat.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-securex-600 text-white shadow-lg shadow-securex-600/20">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-neutral-900">
                    {threat.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">
                    {threat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <BadgeCheck className="h-8 w-8 text-trust-400" />
          </div>
          <h2 className="mt-7 text-3xl font-bold text-white sm:text-4xl">
            Verify with confidence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">
            Launch SecureX to verify a credential, issue credentials, or manage
            your digital wallet on the trust network.
          </p>
          <div className="mt-10">
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