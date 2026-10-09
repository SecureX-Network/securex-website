import { ArrowRight, CheckCircle2, Construction, Flag } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { StatusChip, type DeliveryStatus } from '../components/StatusChip';
import { BodyText, Callout, DocSection } from '../components/Prose';
import { APP_URL, VERIFY_APP_URL } from '../constants';

interface RoadmapItem {
  title: string;
  detail: string;
}

interface RoadmapBand {
  kind: DeliveryStatus;
  heading: string;
  blurb: string;
  items: RoadmapItem[];
}

const BANDS: RoadmapBand[] = [
  {
    kind: 'live',
    heading: 'Live now',
    blurb: 'Running in production and checkable from this site.',
    items: [
      { title: 'Credential issuance and signing', detail: 'Institutions create structured credentials; each document is canonicalised, hashed, and signed.' },
      { title: 'Issuance chain anchoring', detail: 'The credential hash, public ID, and issuer identity are committed to the permissioned chain.' },
      { title: 'Public verification API', detail: 'Unauthenticated queries return document integrity (EXACT/TAMPERED), platform status, and chain evidence.' },
      { title: 'Platform-side revocation', detail: 'Issuers can withdraw credentials; verifiers see REVOKED immediately in the status response.' },
      { title: 'Web application', detail: 'Issuer, holder, and administrator workflows with nine roles, including read-only auditors.' },
      { title: 'Block explorer', detail: 'Blocks, transactions, credentials, and network stats browsable in an independent frontend.' },
      { title: 'Audit and verification history', detail: 'Verification events are recorded and surfaced to authorised roles inside the platform.' },
      { title: 'Rate limits and security headers', detail: 'Tiered rate limits, strict payload validation, security headers, and scoped CORS on both services.' },
      { title: 'Service health endpoints', detail: 'Health and readiness endpoints exposed for the API, chain node, and this site’s status proxy.' },
    ],
  },
  {
    kind: 'development',
    heading: 'In development',
    blurb: 'Partially built or built but not yet proven end to end in production.',
    items: [
      { title: 'Persistent chain storage', detail: 'The node currently runs without a persistent disk, so state restarts from genesis on redeploy. Storage exists in code; durability in the live deployment does not.' },
      { title: 'Chain-side revocation anchoring', detail: 'Revocation transactions can be anchored, but the production path is not yet guaranteed end to end — verifiers rely on platform status until it is.' },
      { title: 'Fraud scoring in the verify path', detail: 'The fraud engine evaluates deterministic risk rules, but its score is not yet returned as part of the public verification response.' },
      { title: 'Fraud and audit dashboards', detail: 'Data is captured platform-side; richer issuer-facing dashboards are still being built out.' },
      { title: 'Durable verification history exposure', detail: 'History exists, but read endpoints are being tightened and scoped before wider exposure.' },
    ],
  },
  {
    kind: 'roadmap',
    heading: 'Roadmap',
    blurb: 'Planned next. Nothing here should be read as available.',
    items: [
      { title: 'Multi-node deployment', detail: 'Run validators on separate hosts behind TLS so the network is genuinely distributed rather than single-instance.' },
      { title: 'Fraud signals for verifiers', detail: 'Surface the engine’s risk score and reasons inside the verification response for authorised callers.' },
      { title: 'Third-party API access', detail: 'Scoped, auditable API access for partner systems that verify at volume.' },
      { title: 'Mobile holder experience', detail: 'A lightweight mobile surface for holders to carry and present credentials.' },
      { title: 'Standards alignment review', detail: 'Evaluate mapping the credential model against emerging verifiable-credential standards without changing the privacy posture.' },
    ],
  },
];

const CHIP_CLASS = 'text-xs';

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        icon={<Flag className="h-4 w-4" />}
        badge="Project · Roadmap"
        title="What is live, what is next"
        description="Three bands — live, in development, roadmap — with the same honesty we ask of the credentials themselves. If it is not running and checkable, it is not listed as live."
        actions={
          <Button to="/live/status" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Check live status
          </Button>
        }
      />

      {BANDS.map((band) => (
        <section
          key={band.kind}
          className={
            band.kind === 'development'
              ? 'border-y border-neutral-200 bg-neutral-50 py-20'
              : 'bg-white py-20'
          }
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <StatusChip status={band.kind} className={CHIP_CLASS} />
                  <h2 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
                    {band.heading}
                  </h2>
                </div>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-neutral-600">{band.blurb}</p>
              </div>
              {band.kind === 'live' ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-trust-200 bg-trust-50 px-3 py-1 text-xs font-bold text-trust-700">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Verifiable from this site
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs font-bold text-neutral-500">
                  <Construction className="h-3.5 w-3.5" aria-hidden="true" />
                  {band.kind === 'development' ? 'Not yet guaranteed' : 'Planned only'}
                </span>
              )}
            </div>

            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {band.items.map((item) => (
                <li
                  key={item.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-securex-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-neutral-900">{item.title}</h3>
                    <StatusChip status={band.kind} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ))}

      <section className="border-t border-neutral-200 bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How to read this"
            title="Labels we hold ourselves to"
          />
          <div className="mt-8 space-y-6 text-[15px] leading-7 text-neutral-600">
            <DocSection id="labels" title="Definitions">
              <ul className="space-y-4">
                <li className="rounded-2xl border border-trust-200 bg-trust-50 p-5 text-trust-900">
                  <strong>Live</strong> — deployed in production, reachable today, and represented on
                  this site by something you can check (an endpoint, a page, a probe). Every live
                  claim here corresponds to a running service.
                </li>
                <li className="rounded-2xl border border-warning-200 bg-warning-50 p-5 text-warning-900">
                  <strong>In development</strong> — code exists but the capability is incomplete,
                  not yet wired end to end, or not proven in the production environment. We list
                  these explicitly so they are never mistaken for finished work.
                </li>
                <li className="rounded-2xl border border-neutral-300 bg-neutral-100 p-5 text-neutral-700">
                  <strong>Roadmap</strong> — planned intent. Availability, scope, and timing may
                  change; treat these as direction, not commitment.
                </li>
              </ul>
            </DocSection>

            <Callout tone="info" title="Known limitations we do not hide">
              <BodyText>
                Chain state currently resets from genesis when the node redeploys (no persistent
                disk), chain-side revocation confirmation is not yet guaranteed end to end, and
                fraud scoring is not part of the public verification response yet. Each appears in
                the band above with its status.
              </BodyText>
            </Callout>

            <div className="flex flex-wrap gap-3">
              <Button to="/live" size="lg">
                Live network
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href={VERIFY_APP_URL} size="lg" variant="outline">
                Verify a credential
              </Button>
              <Button href={APP_URL} size="lg" variant="ghost">
                Launch SecureX
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Track the network, not the promise"
        description="The status page reflects the running services — health, latency, and chain freshness as they are right now."
        primary={{ label: 'Open live status', to: '/live/status' }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
