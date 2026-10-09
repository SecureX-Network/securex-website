import { GitBranch, RefreshCw, ShieldAlert, Stamp } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, StateFlow } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import {
  BodyText,
  BulletList,
  Callout,
  DocSection,
  SpecTable,
} from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

const PLATFORM_STATES = [
  { label: 'VALID', tone: 'good' as const },
  { label: 'SUSPENDED', tone: 'warn' as const },
  { label: 'EXPIRED', tone: 'warn' as const },
  { label: 'REVOKED', tone: 'bad' as const },
  { label: 'TAMPERED', tone: 'bad' as const },
  { label: 'INVALID', tone: 'bad' as const },
  { label: 'SUSPICIOUS', tone: 'bad' as const },
  { label: 'NOT FOUND', tone: 'neutral' as const },
];

const ANCHOR_STATES = [
  { label: 'PENDING', tone: 'warn' as const },
  { label: 'ANCHORED', tone: 'good' as const },
  { label: 'UNAVAILABLE', tone: 'neutral' as const },
];

const CHAIN_STATES = [
  { label: 'CREATED', tone: 'neutral' as const },
  { label: 'ISSUED', tone: 'neutral' as const },
  { label: 'ACTIVE', tone: 'good' as const },
  { label: 'SUSPENDED', tone: 'warn' as const },
  { label: 'REVOKED', tone: 'bad' as const },
  { label: 'EXPIRED', tone: 'warn' as const },
  { label: 'REISSUED', tone: 'good' as const },
];

export default function CredentialLifecyclePage() {
  return (
    <>
      <PageHero
        icon={<GitBranch className="h-4 w-4" />}
        badge="Platform · Credential Lifecycle"
        title="Every state a credential can be in"
        description="Status is recomputed on every read, not stored once and forgotten. This page lists the exact values, their precedence, and the transitions the system allows."
        actions={
          <Button to="/platform/verification" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            How verification reads status
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Platform status"
                title="Eight verification outcomes"
                description="This vocabulary is what the public verification API returns as status."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DocSection id="precedence" title="Precedence, not hope">
                  <BodyText>
                    The effective status is derived on every read, in a fixed order, so an expired
                    or revoked credential can never be masked by its stored value:
                  </BodyText>
                  <BulletList
                    items={[
                      'REVOKED wins — if the record was revoked, nothing else is considered.',
                      'Stored EXPIRED — a record already marked expired stays expired.',
                      'Time-based expiry — expires_at in the past reports EXPIRED even if the stored value said VALID.',
                      'Terminal states — SUSPENDED, TAMPERED, and INVALID are reported as-is.',
                      'Stored value — otherwise the stored status stands (normal case: VALID).',
                    ]}
                  />
                </DocSection>
                <Callout tone="info" title="Where status changes">
                  Revocation is the only mutation the platform performs on credential status:
                  an authorized issuer or administrator sets REVOKED, along with a timestamp and
                  an internal reason (the reason is never exposed publicly).
                </Callout>
              </div>
            </div>

            <DiagramFigure label="Platform status values" caption="These are the values returned in the status and storedStatus fields of the verification response.">
              <StateFlow
                ariaLabel="Platform credential status values"
                states={PLATFORM_STATES}
                transitions={[
                  { from: 'VALID', to: 'REVOKED', label: 'issuer or administrator revokes the credential' },
                  { from: 'VALID', to: 'EXPIRED', label: 'the expires_at timestamp passes' },
                  { from: 'VALID', to: 'SUSPENDED', label: 'recorded as suspended on the platform' },
                  { from: 'REVOKED', to: 'REISSUED', label: 'only on the chain lifecycle — a replacement credential is issued' },
                ]}
              />
            </DiagramFigure>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <DiagramFigure
              label="Anchor states"
              caption="Anchor status is recorded against the credential row but is never a public API field — verifiers see live chain evidence instead."
            >
              <StateFlow
                ariaLabel="Anchor status values"
                states={ANCHOR_STATES}
                transitions={[
                  { from: 'PENDING', to: 'ANCHORED', label: 'block commits with a verified inclusion proof' },
                  { from: 'PENDING', to: 'UNAVAILABLE', label: 'chain unreachable or submission rejected' },
                  { from: 'UNAVAILABLE', to: 'ANCHORED', label: 'a later issuance or revocation operation re-anchors' },
                ]}
              />
            </DiagramFigure>

            <div>
              <SectionHeader
                align="left"
                eyebrow="Chain lifecycle"
                title="The ledger keeps its own states"
                description="A separate lifecycle lives on the blockchain — it is not the same vocabulary as the platform’s."
              />
              <div className="mt-6 space-y-5 text-[15px] leading-7 text-neutral-600">
                <DiagramFigure label="Chain credential lifecycle">
                  <StateFlow
                    ariaLabel="Chain credential lifecycle states"
                    states={CHAIN_STATES}
                    transitions={[
                      { from: 'CREATED', to: 'ISSUED', label: 'issuance transaction accepted' },
                      { from: 'ISSUED', to: 'ACTIVE', label: 'state applied in a committed block' },
                      { from: 'ACTIVE', to: 'SUSPENDED', label: 'issuer suspends on-chain' },
                      { from: 'SUSPENDED', to: 'ACTIVE', label: 'issuer reinstates' },
                      { from: 'ACTIVE', to: 'REVOKED', label: 'issuer revokes on-chain' },
                      { from: 'REVOKED', to: 'REISSUED', label: 'a replacement credential is registered' },
                    ]}
                  />
                </DiagramFigure>
                <Callout tone="warning" title="Three vocabularies, deliberately separate">
                  Platform status, anchor status, and chain lifecycle states are three distinct
                  sets with different meanings. Public verification reports the platform vocabulary
                  and attaches chain evidence next to it — it never merges them into one number.
                </Callout>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Reference"
            title="Status meanings at a glance"
          />
          <div className="mt-10">
            <SpecTable
              caption="Platform credential status meanings"
              columns={[
                { header: 'Status', key: 'status' },
                { header: 'What it means', key: 'meaning' },
                { header: 'What a verifier should do', key: 'action' },
              ]}
              rows={[
                {
                  status: <span className="font-bold text-trust-700">VALID</span>,
                  meaning: 'Record exists, not revoked, not expired.',
                  action: 'Accept, subject to the other checks.',
                },
                {
                  status: <span className="font-bold text-danger-700">REVOKED</span>,
                  meaning: 'The issuer withdrew the credential.',
                  action: 'Reject. Check revokedAt for when.',
                },
                {
                  status: <span className="font-bold text-warning-700">EXPIRED</span>,
                  meaning: 'The expires_at timestamp has passed (or was stored as expired).',
                  action: 'Reject unless the issuer renews it.',
                },
                {
                  status: <span className="font-bold text-warning-700">SUSPENDED</span>,
                  meaning: 'Temporarily withdrawn pending review.',
                  action: 'Do not accept; treat as unresolved.',
                },
                {
                  status: <span className="font-bold text-danger-700">TAMPERED</span>,
                  meaning: 'The presented document hash does not match the stored hash.',
                  action: 'Reject immediately — the document was altered.',
                },
                {
                  status: <span className="font-bold text-danger-700">INVALID</span>,
                  meaning: 'Record failed validation or is in a terminal failed state.',
                  action: 'Reject.',
                },
                {
                  status: <span className="font-bold text-danger-700">SUSPICIOUS</span>,
                  meaning: 'Record flagged for review on the platform.',
                  action: 'Reject pending review.',
                },
                {
                  status: <span className="font-bold text-neutral-700">NOT FOUND</span>,
                  meaning: 'No credential record matches the ID.',
                  action: 'Do not accept — an unknown ID proves nothing.',
                },
              ]}
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/trust/revocation" size="lg" variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
              How revocation works
            </Button>
            <Button to="/resources/glossary" size="lg" variant="ghost">
              <Stamp className="mr-2 h-4 w-4" aria-hidden="true" />
              Glossary of terms
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<ShieldAlert className="h-8 w-8" />}
        title="Check a credential’s state now"
        description="Verification reports the current status of any credential — valid, revoked, expired, or tampered — in a single request."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
