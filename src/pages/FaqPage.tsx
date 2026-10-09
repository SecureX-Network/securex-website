import { ArrowRight, HelpCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { CtaSection } from '../components/CtaSection';
import { PageHero } from '../components/PageHero';
import {
  BodyText,
  BulletList,
  DocSection,
  DocSubheading,
  InlineCode,
} from '../components/Prose';
import { VERIFY_APP_URL } from '../constants';

export default function FaqPage() {
  return (
    <>
      <PageHero
        icon={<HelpCircle className="h-4 w-4" />}
        badge="Resources · FAQ"
        title="Straight answers"
        description="The questions people actually ask about SecureX — accounts, statuses, the blockchain, fraud detection, mobile, pricing, and contact — answered from what the code does today."
        actions={
          <>
            <Button to="/resources/getting-started" size="lg">
              Getting started
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              to="/resources/api"
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              API reference
            </Button>
          </>
        }
      />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DocSection id="basics" title="The basics">
            <div className="space-y-1.5">
              <DocSubheading>What is SecureX?</DocSubheading>
              <BodyText>
                A credential trust network: institutions and issuers sign credentials, holders keep
                them in the web application, and anyone can check one against the issuing record
                and a public ledger. Verification itself is a public, read-only endpoint — no
                account required.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>How is it different from a PDF?</DocSubheading>
              <BodyText>
                A PDF can be edited and re-exported without leaving a trace; a SecureX credential
                carries an immutable public ID, an issuer signature, and the SHA-256 hash of its
                nine-field canonical document recorded at issuance. Send the document to the public
                endpoint and it reports whether what you hold still matches — EXACT, TAMPERED, or
                UNVERIFIABLE — alongside the credential's current status.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>Is it on a blockchain?</DocSubheading>
              <BodyText>
                Yes — issuance and revocation events are submitted to a permissioned Proof of
                Authority chain, and a passing verification returns the evidence: transaction ID,
                transaction hash, Merkle root, block height, block hash, and inclusion proof status.
                Credential content itself — names, titles, descriptions — is never written to the
                chain; only the public ID, document hash, issuer ID, and type go up.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>Is it really immutable?</DocSubheading>
              <BodyText>
                Honestly: the node stores blocks as JSON files on its own disk, and the current
                deployment has no persistent disk, so a replaced instance re-initialises from
                genesis — a known limitation marked in development on the roadmap. The platform
                database record and its audit history are the durable copy, and anchoring is
                reported as ANCHORED, PENDING, or UNAVAILABLE instead of assumed.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>
                What is the difference between this site, the web application, and the API?
              </DocSubheading>
              <BodyText>
                This site (<InlineCode>securex.sp-net.in</InlineCode>) is documentation; the web
                application (<InlineCode>app-securex.sp-net.in</InlineCode>) is where accounts,
                issuance, holding, and revocation happen; the API (
                <InlineCode>api-securex.sp-net.in/api</InlineCode>) is the programmatic surface both
                use. The explorer (<InlineCode>explorer-securex.sp-net.in</InlineCode>) reads chain
                data separately, with no login.
              </BodyText>
            </div>
          </DocSection>

          <DocSection id="verification" title="Verification">
            <div className="space-y-1.5">
              <DocSubheading>Do I need an account to verify?</DocSubheading>
              <BodyText>
                No. The public verification endpoints take a credential ID and an optional hash with
                no authentication at all — no token, no API key, no login. Accounts exist for
                issuing, holding, and administering credentials.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>What do I need to verify?</DocSubheading>
              <BodyText>
                A credential ID in the <InlineCode>SX-XXXX-XXXX-XXXX</InlineCode> format and — to
                check the document as well as the status — its SHA-256 hash of exactly 64
                hexadecimal characters. With the hash you get the document-integrity check; without
                it, that check is simply not part of the response.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>What do the statuses mean?</DocSubheading>
              <BodyText>
                The <InlineCode>status</InlineCode> field carries exactly one of these eight values:
              </BodyText>
              <BulletList
                items={[
                  <><strong>VALID</strong> — the record exists and passes its status checks.</>,
                  <><strong>INVALID</strong> — the record failed validation.</>,
                  <><strong>REVOKED</strong> — the issuer withdrew it.</>,
                  <><strong>SUSPENDED</strong> — on hold; not usable as-is.</>,
                  <><strong>EXPIRED</strong> — past its expiresAt date.</>,
                  <><strong>TAMPERED</strong> — the presented document differs from what was issued.</>,
                  <><strong>SUSPICIOUS</strong> — flagged for review.</>,
                  <><strong>NOT_FOUND</strong> — no credential matches this ID.</>,
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <DocSubheading>Does it do fraud detection?</DocSubheading>
              <BodyText>
                Not in the public verification response. Fraud analysis is a separate service used
                by administrators and is in development as a verification feature, so no fraud
                score is ever returned when you verify.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>What are the rate limits?</DocSubheading>
              <BodyText>
                Verification endpoints allow 60 requests per minute per IP, the rest of the API 150
                per minute, and authentication routes 10 per minute — all fixed one-minute windows.
                Over the limit the API answers <InlineCode>429</InlineCode> with{' '}
                <InlineCode>errorCode: RATE_LIMITED</InlineCode> and a <InlineCode>Retry-After</InlineCode>{' '}
                header in seconds.
              </BodyText>
            </div>
          </DocSection>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <DocSection id="roles" title="Issuing, roles & your data">
            <div className="space-y-1.5">
              <DocSubheading>Can an issuer revoke a credential?</DocSubheading>
              <BodyText>
                Yes — revocation is live for issuer, institution, and admin-level roles; AUDITOR
                cannot write. The platform status changes to REVOKED immediately with its audit
                entry, then the chain write is attempted and reported as ANCHORED, PENDING, or
                UNAVAILABLE; the revocation reason is never public.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>Who can see my data as a holder?</DocSubheading>
              <BodyText>
                The public response never returns holder identity, credential metadata, the
                internal database ID, the signature, or the revocation reason — only credential ID,
                status, issuer name, dates, checks, and a message. Each call does add a row to
                verification history (result, method, timestamp), and holders see their own
                credentials inside the web application.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>Do I need an account to issue a credential?</DocSubheading>
              <BodyText>
                Yes. Self-registration covers four roles — HOLDER, INSTITUTION, ISSUER, EMPLOYER —
                and credential writes (issue and revoke) require INSTITUTION, ISSUER, ADMIN,
                SECURITY_ADMIN, or NETWORK_ADMIN, checked on every request.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>Is there a mobile app?</DocSubheading>
              <BodyText>
                No. The holder experience lives in the web application today, and a mobile wallet
                sits on the roadmap — there is nothing to download.
              </BodyText>
            </div>
          </DocSection>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <DocSection id="integration" title="Integration">
            <div className="space-y-1.5">
              <DocSubheading>How do I integrate?</DocSubheading>
              <BodyText>
                Start with the API reference: verification needs no authentication and takes a
                credential ID plus an optional hash, while authenticated flows use a bearer JWT with
                an 8-hour default lifetime. Role guards answer <InlineCode>403 FORBIDDEN</InlineCode>{' '}
                when a token's role is not allowed, and out-of-scope credential reads return 404
                rather than confirming existence.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>What does a response look like?</DocSubheading>
              <BodyText>
                Success is <InlineCode>{'{"success":true,"data":…}'}</InlineCode> and every failure
                is <InlineCode>{'{"success":false,"error":"…","errorCode":"…","message":"…"}'}</InlineCode>{' '}
                with an HTTP status to match: 400 for bad input, 401 and 403 for authentication and
                roles, 404 for out-of-scope reads, and 429 for rate limits.
              </BodyText>
            </div>
          </DocSection>

          <DocSection id="commercial" title="Pricing & contact">
            <div className="space-y-1.5">
              <DocSubheading>Is it free?</DocSubheading>
              <BodyText>
                Pricing is not published on this site — there is no pricing page, plan table, or
                figure anywhere in this documentation, and none is invented here. This site
                describes the software as it is deployed; it is not a commercial offer.
              </BodyText>
            </div>

            <div className="space-y-1.5">
              <DocSubheading>How do I contact you?</DocSubheading>
              <BodyText>
                No public email address, phone number, or contact form is published on this site.
                If you have an account, the platform's in-app channels are the supported route;
                otherwise the documentation you are reading is the best starting point.
              </BodyText>
            </div>
          </DocSection>

          <div className="flex flex-wrap gap-3">
            <Button to="/resources/api" size="lg">
              API reference
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/resources/documentation" size="lg" variant="outline">
              All documentation
            </Button>
          </div>
        </div>
      </section>

      <CtaSection
        icon={<HelpCircle className="h-8 w-8" />}
        title="Still reading? Try it instead"
        description="The fastest answer to most of these questions is one verification run against the public endpoint."
        primary={{ label: 'Verify a credential', href: VERIFY_APP_URL }}
        secondary={{ label: 'Getting started', to: '/resources/getting-started' }}
      />
    </>
  );
}
