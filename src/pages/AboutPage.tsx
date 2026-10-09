import { ArrowRight, FileWarning, Lightbulb, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import {
  BodyText,
  BulletList,
  Callout,
  DocSection,
  Lead,
} from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const APPROACH = [
  { label: '1. Issue', detail: 'An institution creates a structured credential record and assigns it to a holder.' },
  { label: '2. Reduce', detail: 'The document is canonicalised to nine fields and hashed with SHA-256.' },
  { label: '3. Anchor', detail: 'The hash and public ID are written to a permissioned chain under the issuer’s identity.' },
  { label: '4. Present', detail: 'The holder shares the credential; the document travels with its own proof.' },
  { label: '5. Check', detail: 'A verifier compares the presented hash, status, signature, and chain evidence.' },
  { label: '6. Decide', detail: 'The response says what was proven — and what was not.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        icon={<ShieldCheck className="h-4 w-4" />}
        badge="Project · About"
        title="Why SecureX exists"
        description="Credentials are still mostly PDFs and phone calls. SecureX asks a narrow question: what would it take for anyone to verify a credential in seconds — without trusting the person who sent it?"
        actions={
          <Button to="/platform/how-it-works" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            How it works
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="The problem"
                title="Verification is still manual"
                description="A certificate is easy to alter and awkward to check — which is exactly why credential fraud works."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <BodyText>
                  Today, checking a qualification usually means emailing a registrar, calling an
                  office, or trusting a PDF that anyone could have edited. Institutions spend hours
                  responding to verification requests, employers wait days, and holders re-send
                  documents they already proved once.
                </BodyText>
                <BulletList
                  items={[
                    <><strong>For institutions</strong> — every verification request is manual work, and forged documents damage the value of real ones.</>,
                    <><strong>For holders</strong> — proof of achievement lives in an inbox, not in their control.</>,
                    <><strong>For employers</strong> — the alternative to waiting is trusting an unverifiable file.</>,
                  ]}
                />
                <Lead>
                  None of these problems need a new document format. They need a shared record that
                  anyone can check and no single party can quietly rewrite.
                </Lead>
              </div>
            </div>

            <DiagramFigure label="Before and after" caption="The credential itself barely changes. What changes is how quickly its claims can be checked.">
              <div className="space-y-4">
                <div className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold text-neutral-900">Today</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Manual</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                    <li>Holder forwards a PDF (or a scan of one).</li>
                    <li>Verifier emails the issuing institution.</li>
                    <li>Institution searches its records — hours or days later.</li>
                    <li>Everyone hopes the file was genuine.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-securex-200 bg-securex-50 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-bold text-securex-900">With SecureX</h3>
                    <StatusChip status="live" />
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-securex-900">
                    <li>Holder shares the credential’s public ID (and hash).</li>
                    <li>Verifier queries the public API — no account needed.</li>
                    <li>Response returns status plus chain evidence, in seconds.</li>
                    <li>Altered or withdrawn credentials fail visibly.</li>
                  </ul>
                </div>
              </div>
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The approach"
            title="Small proofs, public checks"
            description="Six steps — none of which puts credential content on a public ledger."
          />
          <div className="mt-12">
            <FlowSteps ariaLabel="SecureX approach" columns={3} steps={APPROACH} />
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <Callout tone="info" title="Privacy by construction">
              Only hashes, public IDs, and proofs reach the chain. Names, titles, and descriptions
              stay in the platform database under the issuing institution’s control — and never
              appear in the public verification response.
            </Callout>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What it is not" title="Boundaries, stated up front" />
          <div className="mt-8 space-y-6 text-[15px] leading-7 text-neutral-600">
            <div className="rounded-3xl border border-warning-200 bg-warning-50 p-7">
              <div className="flex items-center gap-2 text-warning-900">
                <FileWarning className="h-5 w-5" aria-hidden="true" />
                <h3 className="font-bold">Honest scope</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-warning-900">
                <li>
                  <strong>It is a prototype.</strong> The services run in production, but chain
                  storage has no persistent disk today, and chain-side revocation confirmation is
                  not yet guaranteed.
                </li>
                <li>
                  <strong>It is not a universal registry.</strong> SecureX verifies credentials
                  issued through its own platform — it does not attest to institutions it has never
                  onboarded.
                </li>
                <li>
                  <strong>It does not replace judgement.</strong> A VALID result means the record
                  and evidence check out. Whether the qualification matters is still the verifier’s
                  call.
                </li>
              </ul>
            </div>

            <DocSection id="principles" title="How we talk about it">
              <BodyText>
                This website follows the same rule as the software: every claim is checkable, every
                capability is labelled, and limitations appear next to features rather than in a
                footnote. If a number cannot be verified from the running system, it does not
                appear here.
              </BodyText>
            </DocSection>

            <div className="flex flex-wrap gap-3">
              <Button to="/project/roadmap" size="lg">
                <Lightbulb className="mr-2 h-4 w-4" aria-hidden="true" />
                Roadmap
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button to="/trust" size="lg" variant="outline">
                How trust works
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="See it for yourself"
        description="The proof is in a verification response: status, evidence, and the block it came from."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
