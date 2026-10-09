import { ArrowRight, ClipboardCheck, FileClock, Globe, History, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { DiagramFigure, FlowSteps } from '../components/Diagrams';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip } from '../components/StatusChip';
import {
  BulletList,
  Callout,
  Lead,
  SpecTable,
} from '../components/Prose';
import { APP_URL, EXPLORER_URL, VERIFY_APP_URL } from '../constants';

const RECORDS = [
  {
    icon: History,
    title: 'Verification history',
    description:
      'Every verification call writes a row: the result, the method, and a timestamp — queryable by institutions and administrators.',
    to: '/resources/api',
  },
  {
    icon: ClipboardCheck,
    title: 'Audit log',
    description:
      'Issue and revoke actions create audit entries alongside the data change, in the same transaction — no action without a trace.',
    to: '/platform/security',
  },
  {
    icon: FileClock,
    title: 'Event rows',
    description:
      'Credential lifecycle events (issued, revoked) are recorded as event rows with their status, separate from the audit log.',
    to: '/platform/credential-lifecycle',
  },
  {
    icon: Search,
    title: 'Block data',
    description:
      'Blocks, transactions, and inclusion proofs are readable by anyone through public endpoints — no login required.',
    to: '/trust/blockchain',
  },
];

const AUDITOR_JOURNEY = [
  { label: '1. Question', detail: '“Was this credential issued, and is it still valid?”' },
  { label: '2. Verify', detail: 'Query the public API with the credential ID and document hash.' },
  { label: '3. Read evidence', detail: 'Take the transaction ID and block height from the response.' },
  { label: '4. Cross-check', detail: 'Look the transaction up in the explorer — the same data, a different surface.' },
  { label: '5. Reconcile', detail: 'Compare with the platform’s verification history and audit log.' },
  { label: '6. Conclude', detail: 'A written trail: what was checked, when, by whom, and what it returned.' },
];

export default function AuditabilityPage() {
  return (
    <>
      <PageHero
        icon={<History className="h-4 w-4" />}
        badge="Trust · Auditability"
        title="Every check leaves a trail"
        description="Verification history, audit entries, lifecycle events, and public block data — four independent records that can be reconciled against each other."
        actions={
          <Button href={EXPLORER_URL} size="lg">
            Open the explorer
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The records"
            title="Four sources of truth"
            description="None of them depends on the others being available — which is exactly the point."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {RECORDS.map((record) => (
              <div
                key={record.title}
                className="group rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-securex-50 to-trust-50 text-securex-600 transition-transform duration-300 group-hover:scale-110">
                  <record.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-neutral-900">{record.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{record.description}</p>
                <ArrowRight
                  className="mt-6 h-5 w-5 text-securex-500 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                eyebrow="Audit walkthrough"
                title="From question to written trail"
                description="An auditor never has to take this website’s word for anything."
              />
              <div className="mt-6">
                <FlowSteps ariaLabel="Auditor walkthrough" columns={3} steps={AUDITOR_JOURNEY} />
              </div>
            </div>

            <div className="space-y-6">
              <DiagramFigure label="Who can read what" caption="Access follows the same role model as the rest of the platform.">
                <SpecTable
                  caption="Audit access by role"
                  columns={[
                    { header: 'Role', key: 'role' },
                    { header: 'Access', key: 'access' },
                  ]}
                  rows={[
                    { role: <span className="font-bold">AUDITOR</span>, access: 'Read-only oversight across in-scope records; cannot write anything.' },
                    { role: <span className="font-bold">ADMIN / SECURITY_ADMIN / NETWORK_ADMIN</span>, access: 'Full audit reads, including chain audit events and admin console views.' },
                    { role: <span className="font-bold">INSTITUTION / ISSUER</span>, access: 'Own tenant’s credentials, verification history, and audit entries.' },
                    { role: <span className="font-bold">Public</span>, access: 'Block explorer, chain endpoints, and credential verification — no account.' },
                  ]}
                />
              </DiagramFigure>

              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-bold text-neutral-900">Read-only explorer</h3>
                  <StatusChip status="live" />
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  The explorer has no login, no wallet, and no write surface. It reads live chain
                  data through the platform’s blockchain API and shows an explicit unavailable
                  state instead of fabricating numbers if that data cannot be fetched.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Transparency" title="What the records do not contain" />
          <div className="mt-8 space-y-5 text-[15px] leading-7 text-neutral-600">
            <Lead>
              Auditability is not surveillance. The public surfaces deliberately exclude personal
              and sensitive fields:
            </Lead>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <BulletList
                items={[
                  <>The public verification response never returns holder identity, credential metadata, signatures, or revocation reasons.</>,
                  <>Verification history rows store the result and method — not the submitted document.</>,
                  <>Chain records hold identifiers, hashes, and keys — never credential content such as names or titles.</>,
                  <>Internal IDs, institution IDs, and stored Merkle roots stay server-side.</>,
                ]}
              />
            </div>
            <Callout tone="info" title="Retention and access">
              Verification history and audit rows are platform records: readable by the roles
              above and retained as part of the credential’s story. See the security page for how
              access is enforced.
            </Callout>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button to="/platform/security" size="lg">
                <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
                Security model
              </Button>
              <Button href={EXPLORER_URL} size="lg" variant="outline">
                Block explorer
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Run your own audit"
        description="Verify a credential, follow its transaction into the explorer, and compare the result with the platform’s records."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
