import { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  Blocks,
  Braces,
  CheckCircle2,
  ExternalLink,
  HeartPulse,
  RefreshCw,
  ScanLine,
  TriangleAlert,
} from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import { Callout, CodeBlock, DocSection, Lead } from '../components/Prose';
import { APP_URL, EXPLORER_URL, VERIFY_APP_URL } from '../constants';

interface ServiceCheck {
  ok: boolean;
  latencyMs: number | null;
  status: number | null;
}

interface StatusPayload {
  checkedAt: string;
  overall: 'operational' | 'degraded' | 'down' | 'unavailable';
  services?: {
    platform: ServiceCheck & {
      version: string | null;
      database: string | null;
      dataMode: string | null;
    };
    verification: ServiceCheck;
    chain: ServiceCheck & {
      status: string | null;
      version: string | null;
      protocolVersion: string | null;
      height: number | null;
      peerCount: number | null;
      uptimeSeconds: number | null;
    };
    explorer: ServiceCheck;
  };
  network?: {
    validators: number | null;
    pendingTransactions: number | null;
    consensus: string | null;
    proposer: string | null;
    issuers: number | null;
    credentials: number | null;
    keys: number | null;
  };
  error?: string;
}

type Overall = 'operational' | 'degraded' | 'down' | 'unavailable' | 'loading';

const OVERALL_PRESENTATION: Record<
  Overall,
  { label: string; className: string; Icon: typeof CheckCircle2 }
> = {
  operational: {
    label: 'All systems operational',
    className: 'border-trust-200 bg-trust-50 text-trust-800',
    Icon: CheckCircle2,
  },
  degraded: {
    label: 'Partial disruption',
    className: 'border-warning-200 bg-warning-50 text-warning-800',
    Icon: TriangleAlert,
  },
  down: {
    label: 'Systems unavailable',
    className: 'border-danger-200 bg-danger-50 text-danger-800',
    Icon: TriangleAlert,
  },
  unavailable: {
    label: 'Unable to retrieve live status.',
    className: 'border-neutral-300 bg-neutral-100 text-neutral-700',
    Icon: TriangleAlert,
  },
  loading: {
    label: 'Checking services…',
    className: 'border-neutral-300 bg-neutral-100 text-neutral-700',
    Icon: Activity,
  },
};

function formatLatency(ms: number | null): string {
  if (ms === null) return '—';
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

function formatUptime(seconds: number | null): string {
  if (seconds === null) return '—';
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function ServiceCard({
  title,
  description,
  check,
  stateLabel,
  details,
  link,
}: {
  title: string;
  description: string;
  check: ServiceCheck | null;
  stateLabel: string;
  details: Array<{ label: string; value: string | number }>;
  link?: { label: string; href: string };
}) {
  const ok = check?.ok ?? false;
  return (
    <div className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-neutral-600">{description}</p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${
            ok
              ? 'border-trust-200 bg-trust-50 text-trust-700'
              : 'border-neutral-300 bg-neutral-50 text-neutral-600'
          }`}
        >
          {ok ? (
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {stateLabel}
        </span>
      </div>

      <dl className="mt-5 space-y-2 border-t border-neutral-100 pt-4 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-neutral-500">Response time</dt>
          <dd className="font-semibold text-neutral-800">{formatLatency(check?.latencyMs ?? null)}</dd>
        </div>
        {details.map((detail) => (
          <div key={detail.label} className="flex items-center justify-between gap-3">
            <dt className="text-neutral-500">{detail.label}</dt>
            <dd className="text-right font-semibold text-neutral-800">{detail.value}</dd>
          </div>
        ))}
      </dl>

      {link ? (
        <a
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-securex-600 hover:text-securex-700"
        >
          {link.label}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm">
      <div className="text-2xl font-black text-neutral-900">{value}</div>
      <div className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-500">{label}</div>
    </div>
  );
}

export default function StatusPage() {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async (manual = false) => {
    if (manual) setRefreshing(true);
    try {
      const response = await fetch('/api/status', { headers: { accept: 'application/json' } });
      const payload = (await response.json()) as StatusPayload;
      setData(payload);
    } catch {
      setData({ checkedAt: new Date().toISOString(), overall: 'unavailable' });
    } finally {
      setLoading(false);
      if (manual) setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 30000);
    return () => window.clearInterval(id);
  }, [load]);

  const overall: Overall = loading ? 'loading' : (data?.overall ?? 'unavailable');
  const presentation = OVERALL_PRESENTATION[overall];
  const services = data?.services;
  const network = data?.network;
  const checkedAt = data ? new Date(data.checkedAt) : null;

  return (
    <>
      <PageHero
        icon={<HeartPulse className="h-4 w-4" />}
        badge="Live · Status"
        title="Service status"
        description="Live health probes for the platform API, the public verifier, the blockchain node, and the explorer — refreshed automatically every 30 seconds."
        actions={
          <Button
            onClick={() => void load(true)}
            size="lg"
            variant="outline"
            className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            aria-label="Refresh status now"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} aria-hidden="true" />
            Refresh now
          </Button>
        }
      />

      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            role="status"
            className={`flex flex-wrap items-center justify-between gap-4 rounded-3xl border p-6 ${presentation.className}`}
          >
            <div className="flex items-center gap-3">
              <presentation.Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-lg font-black">{presentation.label}</p>
                <p className="text-sm opacity-80">
                  {checkedAt
                    ? `Last checked ${checkedAt.toLocaleTimeString()} · auto-refreshes every 30 seconds`
                    : 'Probing services…'}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {services?.platform.dataMode ? (
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${
                    services.platform.dataMode === 'real'
                      ? 'border-trust-300 bg-white/60 text-trust-800'
                      : 'border-warning-300 bg-white/60 text-warning-800'
                  }`}
                >
                  {services.platform.dataMode === 'real' ? 'Real data mode' : 'Demo data mode'}
                </span>
              ) : null}
              <span className="rounded-full border border-current/20 bg-white/60 px-3 py-1 text-xs font-bold">
                Proxy: this site
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Services"
            title="Four probes, four results"
            description="Each probe is an unauthenticated GET against a public endpoint. The verifier is checked with a validation-only request that records nothing."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <ServiceCard
              title="Platform API"
              description="Credentials, verification, auth, and health."
              check={services?.platform ?? null}
              stateLabel={services?.platform.ok ? 'Operational' : 'No response'}
              details={[
                { label: 'HTTP', value: services?.platform.status ? String(services.platform.status) : '—' },
                { label: 'Version', value: services?.platform.version ?? '—' },
                { label: 'Database', value: services?.platform.database ?? '—' },
              ]}
              link={{ label: 'How this page works', href: '#api-reference' }}
            />
            <ServiceCard
              title="Public verifier"
              description="The endpoint every credential check runs through."
              check={services?.verification ?? null}
              stateLabel={services?.verification.ok ? 'Responding' : 'No response'}
              details={[
                { label: 'HTTP', value: services?.verification.status ? String(services.verification.status) : '—' },
                { label: 'Check type', value: 'Validation-only' },
                { label: 'Records created', value: '0' },
              ]}
              link={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
            />
            <ServiceCard
              title="Blockchain node"
              description="Permissioned chain: blocks, evidence, revocations."
              check={services?.chain ?? null}
              stateLabel={services?.chain.ok ? 'Running' : 'No response'}
              details={[
                { label: 'Node status', value: services?.chain.status ?? '—' },
                { label: 'Height', value: services?.chain.height ?? '—' },
                { label: 'Version', value: services?.chain.version ?? '—' },
                { label: 'Protocol', value: services?.chain.protocolVersion ? `v${services.chain.protocolVersion}` : '—' },
                { label: 'Peers', value: services?.chain.peerCount ?? '—' },
                { label: 'Uptime', value: formatUptime(services?.chain.uptimeSeconds ?? null) },
              ]}
              link={{ label: 'Open block explorer', href: EXPLORER_URL }}
            />
            <ServiceCard
              title="Block explorer"
              description="Independent, read-only view of the chain."
              check={services?.explorer ?? null}
              stateLabel={services?.explorer.ok ? 'Operational' : 'No response'}
              details={[
                { label: 'HTTP', value: services?.explorer.status ? String(services.explorer.status) : '—' },
                { label: 'Access', value: 'No account' },
              ]}
              link={{ label: 'Open explorer', href: EXPLORER_URL }}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Network snapshot"
            title="What the chain currently holds"
            description="Read from the node’s own status endpoints at the last check."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Block height" value={services?.chain.height ?? '—'} />
            <Metric label="Validators" value={network?.validators ?? '—'} />
            <Metric label="Issuers anchored" value={network?.issuers ?? '—'} />
            <Metric label="Credentials anchored" value={network?.credentials ?? '—'} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Callout tone="warning" title="Height resets on redeploy">
              <Lead>
                The production node runs without a persistent disk, so its state restarts from
                genesis when the service redeploys. A low block height is expected — it counts the
                current process, not the network’s history.
              </Lead>
            </Callout>
            <Callout tone="info" title="Cold starts are real latency">
              <Lead>
                The chain node sleeps when idle; its first response after idle can take up to a
                minute. Subsequent probes are fast. Latency figures above are measured end to end
                from this site’s proxy.
              </Lead>
            </Callout>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <Button href={VERIFY_APP_URL} size="lg">
              <ScanLine className="mr-2 h-4 w-4" aria-hidden="true" />
              Verify a credential
            </Button>
            <Button href={EXPLORER_URL} size="lg" variant="outline">
              <Blocks className="mr-2 h-4 w-4" aria-hidden="true" />
              Block explorer
            </Button>
            <Button href={APP_URL} size="lg" variant="ghost">
              Launch SecureX
            </Button>
          </div>

          <div className="mt-10 space-y-6" id="api-reference">
            <DocSection id="how-this-works" title="How this page gets its data">
              <Lead>
                The browser cannot call the platform API or chain node directly — both restrict
                cross-origin requests to their own application origins. A small serverless
                function on this site probes them server-side and returns a normalised, non
                -sensitive payload.
              </Lead>
              <CodeBlock
                label="Request"
                code={`GET /api/status   (this site's serverless proxy)`}
              />
              <CodeBlock
                label="Response shape"
                code={`{
  "checkedAt": "…",
  "overall": "operational",
  "services": {
    "platform":     { "ok": true, "latencyMs": 310, "version": "1.0.0", "database": "connected" },
    "verification": { "ok": true, "latencyMs": 260, "status": 400 },
    "chain":        { "ok": true, "latencyMs": 810, "height": 2, "status": "UP" },
    "explorer":     { "ok": true, "latencyMs": 420, "status": 200 }
  },
  "network": { "validators": 1, "issuers": 1, "credentials": 0, … }
}`}
              />
            </DocSection>

            <div className="flex flex-wrap gap-3">
              <Button to="/resources/api" size="lg">
                <Braces className="mr-2 h-4 w-4" aria-hidden="true" />
                API reference
              </Button>
              <Button to="/project/roadmap" size="lg" variant="outline">
                What is live vs planned
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Use the network, not just the status page"
        description="Run a verification and follow the evidence into the explorer."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Launch SecureX', href: APP_URL }}
      />
    </>
  );
}
