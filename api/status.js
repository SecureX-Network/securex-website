/**
 * Serverless status proxy.
 *
 * The browser cannot query the platform API or chain node directly from
 * securex.sp-net.in: CORS on both services only allows the application and
 * explorer origins. This function runs server-side, probes each public
 * endpoint, and returns one normalised payload so the Live Status page can
 * render real data with no credentials and no secrets.
 *
 * Every URL below is public and contains no keys or tokens.
 */

const PLATFORM_API_URL = process.env.PLATFORM_API_URL || 'https://api-securex.sp-net.in';
const CHAIN_NODE_URL = process.env.CHAIN_NODE_URL || 'https://securex-blockchain.onrender.com';
const EXPLORER_URL = process.env.EXPLORER_URL || 'https://explorer-securex.sp-net.in';

// Free-tier services sleep when idle and take 10-60s to wake. A short
// timeout made the status page flap to "down" whenever the services were
// asleep rather than genuinely unavailable.
const PROBE_TIMEOUT_MS = 45000;

async function probe(url) {
  const started = Date.now();
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(PROBE_TIMEOUT_MS),
      cache: 'no-store',
    });
    let body = null;
    try {
      body = await response.json();
    } catch {
      body = null;
    }
    return { reached: true, status: response.status, latencyMs: Date.now() - started, body };
  } catch (error) {
    return {
      reached: false,
      status: null,
      latencyMs: Date.now() - started,
      error: error && error.name === 'TimeoutError' ? 'timeout' : 'unreachable',
      body: null,
    };
  }
}

function payload(result) {
  return result.body && result.body.success && result.body.data ? result.body.data : null;
}

export default async function handler(_req, res) {
  res.setHeader('cache-control', 'public, s-maxage=15, stale-while-revalidate=30');

  try {
    const [platformHealth, verificationProbe, chainHealth, chainNetwork, chainState, explorer] =
      await Promise.all([
        probe(`${PLATFORM_API_URL}/api/health`),
        probe(`${PLATFORM_API_URL}/api/verifications`),
        probe(`${CHAIN_NODE_URL}/health`),
        probe(`${CHAIN_NODE_URL}/network/status`),
        probe(`${CHAIN_NODE_URL}/state`),
        probe(EXPLORER_URL),
      ]);

    const platformPayload = payload(platformHealth);
    const chainPayload = payload(chainHealth);
    const networkPayload = payload(chainNetwork);
    const statePayload = payload(chainState);

    // The verification route answers 400 MISSING_CREDENTIAL_ID when called
    // without a credential ID — that is proof the route is mounted and live.
    const verificationOk =
      verificationProbe.reached &&
      (verificationProbe.status === 200 || verificationProbe.status === 400);

    const platformOk = platformHealth.reached && platformHealth.status === 200 && platformPayload;
    const chainOk = chainHealth.reached && chainHealth.status === 200 && chainPayload;
    const explorerOk = explorer.reached && explorer.status === 200;

    const requiredOk = Boolean(platformOk && chainOk);
    const optionalOk = verificationOk && explorerOk;

    const overall = !requiredOk
      ? platformOk || chainOk
        ? 'degraded'
        : 'down'
      : optionalOk
        ? 'operational'
        : 'degraded';

    res.status(200).json({
      checkedAt: new Date().toISOString(),
      overall,
      services: {
        platform: {
          ok: Boolean(platformOk),
          latencyMs: platformHealth.latencyMs,
          status: platformHealth.status,
          version: platformPayload ? platformPayload.version : null,
          database: platformPayload ? platformPayload.database : null,
          dataMode: platformPayload ? platformPayload.dataMode : null,
        },
        verification: {
          ok: verificationOk,
          latencyMs: verificationProbe.latencyMs,
          status: verificationProbe.status,
        },
        chain: {
          ok: Boolean(chainOk),
          latencyMs: chainHealth.latencyMs,
          status: chainPayload ? chainPayload.status : null,
          version: chainPayload ? chainPayload.version : null,
          protocolVersion: chainPayload ? chainPayload.protocolVersion : null,
          height: chainPayload ? chainPayload.height : null,
          peerCount: chainPayload ? chainPayload.peerCount : null,
          uptimeSeconds: chainPayload ? Math.round(chainPayload.uptime) : null,
        },
        explorer: {
          ok: explorerOk,
          latencyMs: explorer.latencyMs,
          status: explorer.status,
        },
      },
      network: {
        validators: networkPayload ? networkPayload.validators : null,
        pendingTransactions: networkPayload ? networkPayload.pendingTransactions : null,
        consensus: networkPayload ? networkPayload.consensus : null,
        proposer: networkPayload ? networkPayload.currentProposer : null,
        issuers: statePayload ? statePayload.issuers : null,
        credentials: statePayload ? statePayload.credentials : null,
        keys: statePayload ? statePayload.keys : null,
      },
    });
  } catch (error) {
    res.status(503).json({
      checkedAt: new Date().toISOString(),
      overall: 'unavailable',
      error: 'Unable to retrieve live status.',
      detail: error instanceof Error ? error.message : 'unknown',
    });
  }
}

export const config = { maxDuration: 60 };
