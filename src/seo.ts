export interface RouteMeta {
  title: string;
  description: string;
}

/**
 * Central per-route metadata. Titles are rendered as "Page · SecureX" and
 * descriptions must stay factual: no invented numbers, partners, or claims.
 */
export const HOME_META: RouteMeta = {
  title: 'SecureX — Blockchain-Powered Digital Credential Trust Network',
  description:
    'Issue, store, and verify digital credentials on a blockchain-backed trust network. Cryptographic signing, public anchoring, and instant verification for institutions, holders, and employers.',
};

export const DEFAULT_META: RouteMeta = {
  title: 'SecureX — Digital Credential Trust Network',
  description:
    'SecureX is a blockchain-powered trust network for issuing, holding, and verifying digital credentials.',
};

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': HOME_META,

  '/platform': {
    title: 'Platform',
    description:
      'How the SecureX platform connects issuance, storage, and verification: signed credential documents, blockchain anchoring, and a public verification API.',
  },
  '/platform/how-it-works': {
    title: 'How It Works',
    description:
      'Follow a credential from issuance to trust: sign, anchor, present, verify — and see what the verifier actually checks.',
  },
  '/platform/architecture': {
    title: 'Architecture',
    description:
      'The layers behind SecureX: web application, API services, PostgreSQL storage, and the blockchain node, and how data moves between them.',
  },
  '/platform/credential-lifecycle': {
    title: 'Credential Lifecycle',
    description:
      'The states a credential moves through — issued, valid, suspended, expired, revoked — and what each state means for a verifier.',
  },
  '/platform/verification': {
    title: 'Verification',
    description:
      'What the SecureX verification pipeline checks — document hash, issuer signature, ledger anchor, and status — and what each result means.',
  },
  '/platform/security': {
    title: 'Security',
    description:
      'The SecureX security model: role-based access control, server-side secrets, rate limiting, hashed credential documents, and anchored integrity proofs.',
  },

  '/solutions': {
    title: 'Solutions',
    description:
      'Who SecureX is for: institutions that issue credentials, holders who carry them, employers who verify them, and administrators who run the network.',
  },
  '/solutions/institutions': {
    title: 'For Institutions',
    description:
      'Issue tamper-evident digital credentials at scale, revoke them when required, and let anyone verify them without contacting your office.',
  },
  '/solutions/holders': {
    title: 'For Holders',
    description:
      'Keep your credentials in one place, share them with proof attached, and stop sending scans that anyone could have edited.',
  },
  '/solutions/employers': {
    title: 'For Employers',
    description:
      'Verify a candidate’s credential in seconds against the issuing institution’s record — no phone calls, no manual reference checks.',
  },
  '/solutions/administrators': {
    title: 'For Administrators',
    description:
      'Run the network: manage roles and institutions, monitor chain health, and review audit trails across the SecureX platform.',
  },

  '/trust': {
    title: 'Trust',
    description:
      'How SecureX makes credentials tamper-evident: cryptographic signatures, blockchain anchoring, explicit revocation records, and auditable history.',
  },
  '/trust/blockchain': {
    title: 'Blockchain',
    description:
      'The ledger behind SecureX: what gets written, when a credential is anchored, and what the chain proves about a document’s integrity.',
  },
  '/trust/credential-integrity': {
    title: 'Credential Integrity',
    description:
      'How SecureX detects altered credentials: canonical hashing at issue time and byte-for-byte comparison at verification time.',
  },
  '/trust/revocation': {
    title: 'Revocation',
    description:
      'How revocation works on SecureX: platform status changes, ledger-anchored revocation records, and what a verifier sees afterward.',
  },
  '/trust/auditability': {
    title: 'Auditability',
    description:
      'How SecureX supports audits: queryable verification records, block history, and an explorer for inspecting anchored transactions.',
  },

  '/resources': {
    title: 'Resources',
    description:
      'Documentation, guides, API reference, FAQ, and glossary for building on — and evaluating — the SecureX trust network.',
  },
  '/resources/documentation': {
    title: 'Documentation',
    description:
      'The SecureX documentation set: where to start, what each service does, and which guide covers issuance, verification, and operations.',
  },
  '/resources/getting-started': {
    title: 'Getting Started',
    description:
      'A practical path into SecureX: create an account, explore the platform, issue a test credential, and verify it end to end.',
  },
  '/resources/verification-guide': {
    title: 'Verification Guide',
    description:
      'How to verify a SecureX credential: what to look for, which result states exist, and what to do when a check fails.',
  },
  '/resources/api': {
    title: 'API Reference',
    description:
      'Public SecureX API endpoints: health, credential verification, chain status, response envelopes, and authentication notes.',
  },
  '/resources/faq': {
    title: 'FAQ',
    description:
      'Answers to common questions about SecureX: what credentials are, how verification works, and what the network does today.',
  },
  '/resources/glossary': {
    title: 'Glossary',
    description:
      'Plain-language definitions of the terms SecureX uses: credential, hash, anchor, revocation, holder, issuer, and verifier.',
  },

  '/project': {
    title: 'Project',
    description:
      'About the SecureX project: its goals, technology choices, SIH 2026 context, and the roadmap toward a production trust network.',
  },
  '/project/about': {
    title: 'About SecureX',
    description:
      'Why SecureX exists: the credential fraud problem it addresses, the approach it takes, and where the project stands today.',
  },
  '/project/sih-2026': {
    title: 'SIH 2026',
    description:
      'SecureX and Smart India Hackathon 2026: the problem statement, the team’s approach, and the prototype built for the hackathon.',
  },
  '/project/technology': {
    title: 'Technology',
    description:
      'The stack behind SecureX: React and Vite frontend, Express API services, PostgreSQL, and a custom blockchain node.',
  },
  '/project/roadmap': {
    title: 'Roadmap',
    description:
      'What has shipped, what is in development, and what is planned next for the SecureX trust network.',
  },

  '/live': {
    title: 'Live',
    description:
      'See SecureX running: public verification examples, live service health, and the current state of the chain.',
  },
  '/live/status': {
    title: 'Live Status',
    description:
      'Live health of SecureX services: platform API, blockchain node, version information, and chain height.',
  },
};

export function metaFor(path: string): RouteMeta {
  return ROUTE_META[path] ?? DEFAULT_META;
}
