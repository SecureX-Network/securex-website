import type { ReactNode } from 'react';

export interface PageHeroProps {
  icon: ReactNode;
  badge: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
  align?: 'center' | 'left';
}

/**
 * Dark page hero. Matches the existing SecureX page headers: neutral-950
 * background, soft brand blur blobs, a bordered pill badge, an extrabold white
 * heading and a neutral-300 description.
 */
export function PageHero({
  icon,
  badge,
  title,
  description,
  actions,
  align = 'center',
}: PageHeroProps) {
  const centered = align === 'center';

  return (
    <section className="relative bg-neutral-950">
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-trust-500/10 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-securex-600/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div
          className={
            centered
              ? 'mx-auto max-w-3xl text-center'
              : 'max-w-3xl'
          }
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
            <span className="text-trust-400" aria-hidden="true">
              {icon}
            </span>
            {badge}
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-neutral-300">{description}</p>
          {actions ? (
            <div
              className={
                centered
                  ? 'mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'
                  : 'mt-8 flex flex-wrap gap-3'
              }
            >
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
