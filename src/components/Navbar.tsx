import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Button } from './Button';
import { APP_URL, NAV_LINKS, VERIFY_APP_URL } from '../constants';

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-trust-400 to-securex-600 shadow-lg shadow-securex-500/20">
            <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-xl font-black tracking-tight text-neutral-950">
              Secure<span className="text-securex-600">X</span>
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-neutral-500">
              Trusted Credentials
            </span>
          </span>
          <span className="sr-only">SecureX home</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav aria-label="Primary" className="hidden items-center gap-1 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-1.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === '/'
                ? location.pathname === '/'
                : location.pathname === link.href ||
                  location.pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={`relative rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-securex-500 ${
                  active
                    ? 'border border-neutral-300 bg-white text-securex-600 shadow-sm'
                    : 'text-neutral-600 hover:bg-white/80 hover:text-neutral-950'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            href={VERIFY_APP_URL}
            size="md"
            variant="outline"
            className="hidden xl:inline-flex"
          >
            Verify a Credential
          </Button>
          <Button href={APP_URL} size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Launch SecureX
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-700 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 pb-6 pt-2 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === '/'
                  ? location.pathname === '/'
                  : location.pathname === link.href ||
                    location.pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                    active
                      ? 'bg-securex-50 text-securex-600'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 p-3">
              <Sparkles className="h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
              <span className="flex-1 text-sm font-bold text-amber-900">
                Get started on the main application
              </span>
              <Button href={APP_URL} size="sm">
                Launch
              </Button>
            </div>
            <Button
              href={VERIFY_APP_URL}
              size="md"
              variant="outline"
              fullWidth
              className="mt-3"
            >
              Verify a Credential
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
