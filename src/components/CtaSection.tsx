import type { ReactNode } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from './Button';

export interface CtaAction {
  label: string;
  /** External URL. Use `to` for internal routes so navigation stays client-side. */
  href?: string;
  to?: string;
}

export interface CtaSectionProps {
  icon?: ReactNode;
  title: string;
  description: string;
  primary?: CtaAction;
  secondary?: CtaAction;
}

/**
 * Closing call-to-action band. Identical to the existing dark CTA sections:
 * neutral-950 background, blurred securex glow, bordered icon tile and the
 * shared Button component.
 */
export function CtaSection({
  icon,
  title,
  description,
  primary,
  secondary,
}: CtaSectionProps) {
  return (
    <section className="bg-neutral-950 py-20">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-securex-600/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <span className="text-trust-400" aria-hidden="true">
            {icon ?? <ShieldCheck className="h-8 w-8" />}
          </span>
        </div>
        <h2 className="mt-7 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-300">{description}</p>
        {primary || secondary ? (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {primary ? (
              <Button {...(primary.to ? { to: primary.to } : { href: primary.href ?? '/' })} size="lg">
                {primary.label}
              </Button>
            ) : null}
            {secondary ? (
              <Button
                {...(secondary.to ? { to: secondary.to } : { href: secondary.href ?? '/' })}
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
