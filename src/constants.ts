export const APP_URL = 'https://app-securex.sp-net.in';
export const VERIFY_APP_URL = `${APP_URL}/verify`;
export const API_URL = 'https://api-securex.sp-net.in';
export const API_BASE_URL = `${API_URL}/api`;
export const EXPLORER_URL = 'https://explorer-securex.sp-net.in';
export const CHAIN_URL = 'https://securex-blockchain.onrender.com';
export const SITE_URL = 'https://securex.sp-net.in';
export const STATUS_PROXY_PATH = '/api/status';

export interface NavLink {
  label: string;
  href: string;
}

export interface NavSection {
  label: string;
  href: string;
  links: NavLink[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Platform',
    href: '/platform',
    links: [
      { label: 'Overview', href: '/platform' },
      { label: 'How It Works', href: '/platform/how-it-works' },
      { label: 'Architecture', href: '/platform/architecture' },
      { label: 'Credential Lifecycle', href: '/platform/credential-lifecycle' },
      { label: 'Verification', href: '/platform/verification' },
      { label: 'Security', href: '/platform/security' },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions',
    links: [
      { label: 'Overview', href: '/solutions' },
      { label: 'Institutions', href: '/solutions/institutions' },
      { label: 'Holders', href: '/solutions/holders' },
      { label: 'Employers', href: '/solutions/employers' },
      { label: 'Administrators', href: '/solutions/administrators' },
    ],
  },
  {
    label: 'Trust',
    href: '/trust',
    links: [
      { label: 'Overview', href: '/trust' },
      { label: 'Blockchain', href: '/trust/blockchain' },
      { label: 'Credential Integrity', href: '/trust/credential-integrity' },
      { label: 'Revocation', href: '/trust/revocation' },
      { label: 'Auditability', href: '/trust/auditability' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    links: [
      { label: 'Overview', href: '/resources' },
      { label: 'Documentation', href: '/resources/documentation' },
      { label: 'Getting Started', href: '/resources/getting-started' },
      { label: 'Verification Guide', href: '/resources/verification-guide' },
      { label: 'API Reference', href: '/resources/api' },
      { label: 'FAQ', href: '/resources/faq' },
      { label: 'Glossary', href: '/resources/glossary' },
    ],
  },
  {
    label: 'Project',
    href: '/project',
    links: [
      { label: 'Overview', href: '/project' },
      { label: 'About', href: '/project/about' },
      { label: 'SIH 2026', href: '/project/sih-2026' },
      { label: 'Technology', href: '/project/technology' },
      { label: 'Roadmap', href: '/project/roadmap' },
    ],
  },
  {
    label: 'Live',
    href: '/live',
    links: [
      { label: 'Overview', href: '/live' },
      { label: 'Status', href: '/live/status' },
    ],
  },
];

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  ...NAV_SECTIONS.map((section) => ({ label: section.label, href: section.href })),
];

/** Canonical public routes, used by the sitemap, tests, and route validation. */
export const PUBLIC_ROUTES: string[] = [
  '/',
  '/platform',
  '/platform/how-it-works',
  '/platform/architecture',
  '/platform/credential-lifecycle',
  '/platform/verification',
  '/platform/security',
  '/solutions',
  '/solutions/institutions',
  '/solutions/holders',
  '/solutions/employers',
  '/solutions/administrators',
  '/trust',
  '/trust/blockchain',
  '/trust/credential-integrity',
  '/trust/revocation',
  '/trust/auditability',
  '/resources',
  '/resources/documentation',
  '/resources/getting-started',
  '/resources/verification-guide',
  '/resources/api',
  '/resources/faq',
  '/resources/glossary',
  '/project',
  '/project/about',
  '/project/sih-2026',
  '/project/technology',
  '/project/roadmap',
  '/live',
  '/live/status',
];

/** Legacy scaffold routes that now redirect to their new home. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/about': '/project/about',
  '/how-it-works': '/platform/how-it-works',
  '/features': '/platform',
  '/security': '/platform/security',
  '/contact': '/resources/faq',
};

export function sectionLinks(sectionHref: string): NavLink[] {
  const section = NAV_SECTIONS.find((item) => item.href === sectionHref);
  return section ? section.links : [];
}

export function sectionLabel(sectionHref: string): string {
  const section = NAV_SECTIONS.find((item) => item.href === sectionHref);
  return section ? section.label : '';
}
