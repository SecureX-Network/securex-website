import { Beaker, CheckCircle2, Map } from 'lucide-react';

export type DeliveryStatus = 'live' | 'development' | 'roadmap';

const STYLES: Record<
  DeliveryStatus,
  { label: string; className: string; icon: typeof CheckCircle2 }
> = {
  live: {
    label: 'Live',
    className: 'border-trust-200 bg-trust-50 text-trust-700',
    icon: CheckCircle2,
  },
  development: {
    label: 'In development',
    className: 'border-warning-200 bg-warning-50 text-warning-700',
    icon: Beaker,
  },
  roadmap: {
    label: 'Roadmap',
    className: 'border-neutral-200 bg-neutral-50 text-neutral-600',
    icon: Map,
  },
};

/**
 * Delivery-status chip. Every significant capability on this site is labelled
 * exactly once as live, in development, or planned, so nothing reads as
 * shipped when it is not.
 */
export function StatusChip({ status, className = '' }: { status: DeliveryStatus; className?: string }) {
  const style = STYLES[status];
  const Icon = style.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${style.className} ${className}`.trim()}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {style.label}
    </span>
  );
}

export function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <StatusChip status="live" />
      <StatusChip status="development" />
      <StatusChip status="roadmap" />
    </div>
  );
}
