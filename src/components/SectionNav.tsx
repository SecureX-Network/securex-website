import { Link, useLocation } from 'react-router-dom';
import { sectionLabel, sectionLinks } from '../constants';

/**
 * In-section pill navigation. Reuses the approved navbar pill treatment
 * (rounded-xl items, active = bordered white pill with securex text) so the
 * sub-navigation looks like it was designed with the original navbar.
 */
export function SectionNav({ section }: { section: string }) {
  const location = useLocation();
  const links = sectionLinks(section);
  if (links.length === 0) return null;

  return (
    <nav
      aria-label={`${sectionLabel(section)} section`}
      className="border-b border-neutral-200/80 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 py-3">
          <span className="hidden shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 lg:block">
            {sectionLabel(section)}
          </span>
          <ul className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-neutral-200 bg-neutral-50/70 p-1.5">
            {links.map((link) => {
              const active = location.pathname === link.href;
              return (
                <li key={link.href} className="shrink-0">
                  <Link
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-xl px-4 py-2 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-securex-500 ${
                      active
                        ? 'border border-neutral-300 bg-white text-securex-600 shadow-sm'
                        : 'text-neutral-600 hover:bg-white/80 hover:text-neutral-950'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
