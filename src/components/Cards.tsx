import type { ComponentType, ReactNode } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type IconType = ComponentType<{ className?: string }>;

export interface CardProps {
  icon?: IconType;
  title: string;
  description: ReactNode;
  to?: string;
  href?: string;
  footer?: ReactNode;
  tone?: 'brand' | 'solid';
  className?: string;
}

const toneIcon = {
  brand: 'bg-gradient-to-br from-securex-50 to-trust-50 text-securex-600',
  solid: 'bg-securex-600 text-white shadow-lg shadow-securex-600/20',
};

/**
 * The standard SecureX content card. Style values are taken directly from the
 * approved homepage / features card treatment and reused unchanged.
 */
export function Card({
  icon: Icon,
  title,
  description,
  to,
  href,
  footer,
  tone = 'brand',
  className = '',
}: CardProps) {
  const shell = `group rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl ${
    className
  }`.trim();

  const body = (
    <>
      {Icon ? (
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${toneIcon[tone]}`}
        >
          <Icon className="h-7 w-7" />
        </div>
      ) : null}
      <h3 className={Icon ? 'mt-6 text-lg font-bold text-neutral-900' : 'text-lg font-bold text-neutral-900'}>
        {title}
      </h3>
      <div className="mt-3 text-sm leading-6 text-neutral-600">{description}</div>
      {footer ? <div className="mt-5">{footer}</div> : null}
      {to || href ? (
        <ArrowRight
          className="mt-6 h-5 w-5 text-securex-500 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${shell} block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-securex-500 focus-visible:ring-offset-2`}>
        {body}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={`${shell} block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-securex-500 focus-visible:ring-offset-2`}
        {...(href.startsWith('http') ? { rel: 'noreferrer noopener' } : {})}
      >
        {body}
      </a>
    );
  }

  return <div className={shell}>{body}</div>;
}

export interface StepCardProps {
  step: string;
  icon: IconType;
  title: string;
  description: ReactNode;
}

/** Numbered step card, matching the existing "how it works" treatment. */
export function StepCard({ step, icon: Icon, title, description }: StepCardProps) {
  return (
    <li className="group relative rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-securex-200 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-securex-600 text-white shadow-lg shadow-securex-600/20">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </div>
        <span className="text-5xl font-black text-neutral-100 transition-colors group-hover:text-securex-100">
          {step}
        </span>
      </div>
      <h3 className="mt-7 text-xl font-bold text-neutral-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{description}</p>
    </li>
  );
}

/** Compact numbered card used inside two-column step grids. */
export function MiniStepCard({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: number;
  icon: IconType;
  title: string;
  description: ReactNode;
}) {
  return (
    <li className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-securex-600">
          {String(step).padStart(2, '0')}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-securex-50 text-securex-600">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
    </li>
  );
}

/** Tick list, matching the existing About-page check list. */
export function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li
          key={String(item)}
          className="flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-4 transition-all hover:-translate-y-0.5 hover:border-securex-200 hover:shadow-md"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-securex-600" aria-hidden="true" />
          <span className="text-sm font-medium leading-relaxed text-neutral-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}
