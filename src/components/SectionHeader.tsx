import type { ReactNode } from 'react';

export interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'center' | 'left';
  id?: string;
}

/** Eyebrow + heading + optional description, matching the existing sections. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  id,
}: SectionHeaderProps) {
  if (align === 'left') {
    return (
      <div className="max-w-2xl">
        <span className="text-sm font-bold uppercase tracking-wider text-securex-600">
          {eyebrow}
        </span>
        <h2
          id={id}
          className="mt-3 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-lg leading-8 text-neutral-600">{description}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-bold uppercase tracking-wider text-securex-600">
        {eyebrow}
      </span>
      <h2
        id={id}
        className="mt-3 text-3xl font-black text-neutral-900 sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-lg leading-8 text-neutral-600">{description}</p>
      ) : null}
    </div>
  );
}
