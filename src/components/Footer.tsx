import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { APP_URL, EXPLORER_URL, NAV_SECTIONS, VERIFY_APP_URL } from '../constants';

const APPLICATION_LINKS = [
  { label: 'Launch SecureX', to: APP_URL, external: true },
  { label: 'Sign in', to: `${APP_URL}/auth/login`, external: true },
  { label: 'Create an account', to: `${APP_URL}/auth/register`, external: true },
  { label: 'Verify a credential', to: VERIFY_APP_URL, external: true },
  { label: 'Chain explorer', to: EXPLORER_URL, external: true },
  { label: 'Live status', to: '/live/status', external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-securex-600 text-white">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold text-neutral-900">
                Secure<span className="text-securex-600">X</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-500">
              A blockchain-powered trust network for verifiable digital
              credentials. Instant verification, tamper-evident records, and
              publicly auditable anchoring.
            </p>
            <Link
              to="/live/status"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-trust-200 bg-trust-50 px-4 py-2 text-xs font-bold text-trust-700 transition-colors hover:bg-trust-100"
            >
              <span className="h-2 w-2 rounded-full bg-trust-500" aria-hidden="true" />
              View live network status
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {NAV_SECTIONS.map((section) => (
              <nav key={section.label} aria-label={`${section.label} (footer)`}>
                <h3 className="text-sm font-semibold text-neutral-900">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-neutral-500 transition-colors hover:text-securex-600"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="Application (footer)">
              <h3 className="text-sm font-semibold text-neutral-900">
                Application
              </h3>
              <ul className="mt-4 space-y-2">
                {APPLICATION_LINKS.map((link) => (
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
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} SecureX Trust Network. All rights
            reserved.
          </p>
          <Link
            to="/resources/verification-guide"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-500 transition-colors hover:text-securex-600"
          >
            How verification works
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
