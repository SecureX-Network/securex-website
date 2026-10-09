import type { ReactNode } from 'react';
import { AlertTriangle, Info, LockKeyhole } from 'lucide-react';

/** Large intro paragraph used under page heroes and section headings. */
export function Lead({ children }: { children: ReactNode }) {
  return <p className="text-lg leading-8 text-neutral-600">{children}</p>;
}

export function DocSection({
  id,
  title,
  children,
}: {
  id: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <h2
        id={`${id}-heading`}
        className="text-2xl font-black tracking-tight text-neutral-900 sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[15px] leading-7 text-neutral-600">{children}</div>
    </section>
  );
}

export function DocSubheading({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-bold text-neutral-900">{children}</h3>;
}

export function BodyText({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2.5">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-securex-500" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-securex-50 text-xs font-bold text-securex-600">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

const CALLOUT_STYLES = {
  info: {
    className: 'border-securex-200 bg-securex-50',
    text: 'text-securex-900',
    Icon: Info,
  },
  warning: {
    className: 'border-warning-200 bg-warning-50',
    text: 'text-warning-900',
    Icon: AlertTriangle,
  },
  success: {
    className: 'border-trust-200 bg-trust-50',
    text: 'text-trust-900',
    Icon: LockKeyhole,
  },
} as const;

export type CalloutTone = keyof typeof CALLOUT_STYLES;

export function Callout({
  tone = 'info',
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  children: ReactNode;
}) {
  const style = CALLOUT_STYLES[tone];
  const Icon = style.Icon;
  return (
    <div className={`rounded-2xl border p-5 ${style.className}`}>
      <div className={`flex items-start gap-3 ${style.text}`}>
        <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <div className="text-sm leading-6">
          {title ? <p className="font-bold">{title}</p> : null}
          <div className={title ? 'mt-1' : ''}>{children}</div>
        </div>
      </div>
    </div>
  );
}

/** Dark monospace block for request/response examples. */
export function CodeBlock({ label, code }: { label?: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
      {label ? (
        <div className="border-b border-neutral-800 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-neutral-400">
          {label}
        </div>
      ) : null}
      <pre className="overflow-x-auto px-5 py-4 text-xs leading-5 text-neutral-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export interface TableColumn {
  header: string;
  key: string;
}

export function SpecTable({
  columns,
  rows,
  caption,
}: {
  columns: TableColumn[];
  rows: Record<string, ReactNode>[];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200">
      <table className="min-w-full divide-y divide-neutral-200 text-left text-sm">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-neutral-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-neutral-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 bg-white">
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 align-top text-neutral-700">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Small monospace inline code span. */
export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.8em] text-neutral-800">
      {children}
    </code>
  );
}
