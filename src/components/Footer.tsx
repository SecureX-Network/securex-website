import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react';
import { APP_URL } from '../constants';

const FOOTER_COLUMNS = [
  {
    heading: 'Website',
    links: [
      { label: 'About', to: '/about', external: false },
      { label: 'How It Works', to: '/how-it-works', external: false },
      { label: 'Features', to: '/features', external: false },
      { label: 'Security', to: '/security', external: false },
      { label: 'Contact', to: '/contact', external: false },
    ],
  },
  {
    heading: 'Application',
    links: [
      { label: 'Launch SecureX', to: APP_URL, external: true },
      { label: 'Login', to: `${APP_URL}/auth/login`, external: true },
      { label: 'Register', to: `${APP_URL}/auth/register`, external: true },
      { label: 'Verify a Credential', to: `${APP_URL}/verify`, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-securex-600 text-white">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <span className="text-lg font-bold text-neutral-900">
                Secure<span className="text-securex-600">X</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-neutral-500">
              A blockchain-powered trust network for verifiable digital
              credentials. Instant verification, tamper-proof records, and
              built-in fraud detection.
            </p>
            <ButtonLink href={APP_URL} className="mt-6">
              Launch SecureX
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonLink>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold text-neutral-900">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        className="text-sm text-neutral-500 transition-colors hover:text-securex-600"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-sm text-neutral-500 transition-colors hover:text-securex-600"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} SecureX Trust Network. All rights
            reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Mail className="h-4 w-4" />
            hello@securex.io
          </div>
        </div>
      </div>
    </footer>
  );
}

function ButtonLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`inline-flex h-10 items-center justify-center rounded-lg bg-securex-600 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-securex-700 ${
        className ?? ''
      }`}
    >
      {children}
    </a>
  );
}