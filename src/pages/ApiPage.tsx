import { ArrowRight, Braces, KeyRound, Lock, Timer } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';
import {
  BodyText,
  BulletList,
  Callout,
  CodeBlock,
  DocSection,
  InlineCode,
  Lead,
  SpecTable,
} from '../components/Prose';
import { API_URL, APP_URL, CHAIN_URL, EXPLORER_URL, VERIFY_APP_URL } from '../constants';

const ENVELOPE = `// Success (HTTP 2xx)
{ "success": true, "data": { … } }

// Failure (HTTP 4xx / 5xx)
{
  "success": false,
  "error": "<human-readable message>",
  "errorCode": "<MACHINE_CODE>",
  "message": "<same as error>"
}`;

const VERIFY_CURL = `curl -s "${API_URL}/api/verifications?credentialId=SX-XXXX-XXXX-XXXX&hash=<64-hex>"`;

const BASE_URLS = [
  { service: 'Platform API', url: `${API_URL}/api`, detail: 'Credentials, verification, auth, health.', auth: 'Public reads; Bearer JWT for writes' },
  { service: 'Blockchain node', url: CHAIN_URL, detail: 'Blocks, evidence, status, QR references.', auth: 'Public reads; shared-secret token for writes' },
  { service: 'Web application', url: APP_URL, detail: 'Issuance, holding, administration UI.', auth: 'Session (login)' },
  { service: 'Block explorer', url: EXPLORER_URL, detail: 'Read-only chain inspection.', auth: 'None' },
];

const PUBLIC_ENDPOINTS = [
  { method: 'GET', path: '/api/health', detail: 'Service version, database connectivity, data mode.', limit: '150/min' },
  { method: 'GET', path: '/api/verifications', detail: 'Verify by credential ID (+ optional document hash).', limit: '60/min' },
  { method: 'GET', path: '/api/verifications/search', detail: 'Same contract as /verifications, query form.', limit: '60/min' },
  { method: 'GET', path: '/api/verifications/:id', detail: 'Same contract, credential ID in the path.', limit: '60/min' },
  { method: 'GET', path: '/api/blockchain/health', detail: 'Chain health as seen by the platform.', limit: '150/min' },
  { method: 'GET', path: '/api/blockchain/blocks', detail: 'Live block list proxied from the node.', limit: '150/min' },
  { method: 'GET', path: '/api/blockchain/transactions/:id', detail: 'A single transaction with block context.', limit: '150/min' },
  { method: 'GET', path: '/api/blockchain/network', detail: 'Network status proxied from the node.', limit: '150/min' },
];

const CHAIN_ENDPOINTS = [
  { method: 'GET', path: '/health', detail: 'Node ID, version 3.0.0, protocol 2.0, height, peers, uptime.' },
  { method: 'GET', path: '/status', detail: 'Consensus status, validators, pending transactions, block count.' },
  { method: 'GET', path: '/blocks', detail: 'Committed blocks; offset/limit paging (max 200).' },
  { method: 'GET', path: '/blocks/:height', detail: 'One block with header, transactions, signatures.' },
  { method: 'GET', path: '/transactions/:id', detail: 'Transaction with block height and block hash.' },
  { method: 'GET', path: '/evidence/:id', detail: 'Inclusion evidence bundle for a credential.' },
  { method: 'GET', path: '/verify/:id', detail: 'Full chain-side verification response with security checks.' },
  { method: 'GET', path: '/qr/:credentialId', detail: 'Signed QR reference (7-day validity).' },
];

const ERRORS = [
  { code: 'MISSING_CREDENTIAL_ID', http: '400', when: 'No credentialId supplied to a verification query.' },
  { code: 'INVALID_HASH_FORMAT', http: '400', when: 'Supplied hash is not exactly 64 hexadecimal characters.' },
  { code: 'VALIDATION', http: '400', when: 'A request body field is missing or malformed.' },
  { code: 'RATE_LIMITED', http: '429', when: 'Per-IP window exceeded; Retry-After header is set.' },
  { code: 'UNAUTHORIZED', http: '401', when: 'Missing, malformed, expired, or revoked token.' },
  { code: 'FORBIDDEN', http: '403', when: 'Valid token, but the role is not allowed for this route.' },
  { code: 'INVALID_CREDENTIALS', http: '401', when: 'Login failed (email or password incorrect).' },
  { code: 'EMAIL_TAKEN', http: '409', when: 'Registration with an existing email.' },
  { code: 'NOT_FOUND', http: '404', when: 'Unknown route or resource (out-of-scope reads also return 404).' },
  { code: 'INVALID_JSON', http: '400', when: 'Request body is not parseable JSON.' },
  { code: 'INTERNAL', http: '500', when: 'Unexpected server error; message is intentionally generic.' },
];

export default function ApiPage() {
  return (
    <>
      <PageHero
        icon={<Braces className="h-4 w-4" />}
        badge="Resources · API Reference"
        title="The API, exactly as it behaves"
        description="Base URLs, response envelopes, public endpoints, rate limits, and error codes — every value on this page comes from the running code."
        actions={
          <Button to="/resources/verification-guide" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white">
            Verification guide
          </Button>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Base URLs" title="Where the services live" />
          <div className="mt-10">
            <SpecTable
              caption="Service base URLs"
              columns={[
                { header: 'Service', key: 'service' },
                { header: 'Base URL', key: 'url' },
                { header: 'Purpose', key: 'detail' },
                { header: 'Auth', key: 'auth' },
              ]}
              rows={BASE_URLS.map((row) => ({
                service: <span className="font-bold text-neutral-900">{row.service}</span>,
                url: <span className="font-mono text-xs">{row.url}</span>,
                detail: row.detail,
                auth: row.auth,
              }))}
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div>
              <DocSection id="envelopes" title="Response envelopes">
                <BodyText>
                  Every JSON response — success or failure — uses the same two shapes. Check{' '}
                  <InlineCode>success</InlineCode> first; on failure, branch on{' '}
                  <InlineCode>errorCode</InlineCode>, not on the message text.
                </BodyText>
                <CodeBlock label="Envelope" code={ENVELOPE} />
              </DocSection>
            </div>
            <div>
              <DocSection id="verification-request" title="Verification request">
                <BodyText>
                  The core public endpoint needs no authentication — only the credential ID and,
                  optionally, its document hash:
                </BodyText>
                <CodeBlock label="Request" code={VERIFY_CURL} />
                <BulletList
                  items={[
                    <><InlineCode>credentialId</InlineCode> — required; <InlineCode>SX-</InlineCode> public ID (also accepts the internal record ID).</>,
                    <><InlineCode>hash</InlineCode> — optional; 64 hexadecimal characters. Supplying it enables the document-integrity check (EXACT / TAMPERED / UNVERIFIABLE).</>,
                  ]}
                />
              </DocSection>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Public endpoints"
            title="No token required"
            description="These routes work with plain HTTPS requests from a server, a script, or curl."
          />
          <div className="mt-10 overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <SpecTable
              caption="Platform public endpoints"
              columns={[
                { header: 'Method', key: 'method' },
                { header: 'Path', key: 'path' },
                { header: 'Returns', key: 'detail' },
                { header: 'Limit', key: 'limit' },
              ]}
              rows={PUBLIC_ENDPOINTS.map((row) => ({
                method: <span className="font-bold text-securex-700">{row.method}</span>,
                path: <span className="font-mono text-xs">{row.path}</span>,
                detail: row.detail,
                limit: <span className="font-mono text-xs">{row.limit}</span>,
              }))}
            />
          </div>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <SpecTable
              caption="Blockchain node public endpoints"
              columns={[
                { header: 'Method', key: 'method' },
                { header: 'Path', key: 'path' },
                { header: 'Returns', key: 'detail' },
              ]}
              rows={CHAIN_ENDPOINTS.map((row) => ({
                method: <span className="font-bold text-securex-700">{row.method}</span>,
                path: <span className="font-mono text-xs">{row.path}</span>,
                detail: row.detail,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader align="left" eyebrow="Errors" title="Error codes" />
              <div className="mt-8">
                <SpecTable
                  caption="Platform error codes"
                  columns={[
                    { header: 'errorCode', key: 'code' },
                    { header: 'HTTP', key: 'http' },
                    { header: 'When', key: 'when' },
                  ]}
                  rows={ERRORS.map((row) => ({
                    code: <span className="font-mono text-xs font-bold">{row.code}</span>,
                    http: <span className="font-mono text-xs">{row.http}</span>,
                    when: row.when,
                  }))}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <SectionHeader align="left" eyebrow="Rate limits" title="Per-IP windows" />
                <div className="mt-6">
                  <SpecTable
                    caption="Rate limits"
                    columns={[
                      { header: 'Scope', key: 'scope' },
                      { header: 'Limit (60s window)', key: 'limit' },
                      { header: 'Applies to', key: 'applies' },
                    ]}
                    rows={[
                      { scope: 'Default', limit: '150 requests', applies: 'All /api routes' },
                      { scope: 'Auth', limit: '10 requests', applies: 'Login, register, password reset' },
                      { scope: 'Verify', limit: '60 requests', applies: 'Verification endpoints' },
                    ]}
                  />
                </div>
              </div>

              <Callout tone="warning" title="Browser calls from other origins">
                API responses only grant CORS permission to the SecureX web application and
                explorer origins. Third-party integrations should call the API from their server
                (or a backend-for-frontend), not directly from an arbitrary browser page.
              </Callout>

              <Callout tone="info" title="Chain writes are not public">
                Issuance, revocation, and state changes on the blockchain node require a
                bearer token with a declared role (<InlineCode>admin</InlineCode>,{' '}
                <InlineCode>validator</InlineCode>, <InlineCode>issuer</InlineCode>). They are
                performed through the platform API, not by third parties.
              </Callout>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Authentication" title="Tokens for privileged routes" />
          <div className="mt-10 space-y-6 text-[15px] leading-7 text-neutral-600">
            <Lead>
              Public verification never needs a token. Anything that creates, changes, or withdraws
              data does.
            </Lead>
            <DocSection id="auth-flow" title="Obtaining a token">
              <BulletList
                items={[
                  <><InlineCode>POST /api/auth/register</InlineCode> — name, email, password (8–128 characters); roles limited to HOLDER, INSTITUTION, ISSUER, EMPLOYER.</>,
                  <><InlineCode>POST /api/auth/login</InlineCode> — email + password returns <InlineCode>{'{ user, token }'}</InlineCode>.</>,
                  <>Send <InlineCode>Authorization: Bearer {'<token>'}</InlineCode> on subsequent requests. Tokens expire after 8 hours by default and reference a server-side session, so they can be invalidated.</>,
                  <>Roles: <InlineCode>ADMIN</InlineCode>, <InlineCode>SECURITY_ADMIN</InlineCode>, <InlineCode>NETWORK_ADMIN</InlineCode>, <InlineCode>AUDITOR</InlineCode> are provisioned by administrators — there is no self-service path to them.</>,
                ]}
              />
            </DocSection>
            <div className="flex flex-wrap gap-3">
              <Button to="/platform/security" size="lg">
                <Lock className="mr-2 h-4 w-4" aria-hidden="true" />
                Security model
              </Button>
              <Button to="/resources/getting-started" size="lg" variant="outline">
                <KeyRound className="mr-2 h-4 w-4" aria-hidden="true" />
                Getting started
              </Button>
              <Button to="/platform/verification" size="lg" variant="ghost">
                <Timer className="mr-2 h-4 w-4" aria-hidden="true" />
                What verification checks
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaSection
        title="Try the reference on real data"
        description="Run the verification request above against a credential you hold, then follow its evidence into the explorer."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Open the explorer', href: EXPLORER_URL }}
      />
    </>
  );
}
