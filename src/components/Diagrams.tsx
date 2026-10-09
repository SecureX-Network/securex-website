import type { ReactNode } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export interface FlowStep {
  label: string;
  detail?: string;
  mono?: boolean;
}

/**
 * Chain of labelled steps with arrows. Rendered from the site's existing pill
 * and card vocabulary so diagrams never introduce a separate visual language.
 */
export function FlowSteps({
  steps,
  ariaLabel,
  columns = 3,
}: {
  steps: FlowStep[];
  ariaLabel: string;
  columns?: 3 | 4 | 5;
}) {
  const grid =
    columns === 5
      ? 'sm:grid-cols-2 lg:grid-cols-5'
      : columns === 4
        ? 'sm:grid-cols-2 lg:grid-cols-4'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <ol aria-label={ariaLabel} className={`grid grid-cols-1 gap-3 ${grid}`}>
      {steps.map((step, index) => (
        <li key={step.label} className="relative">
          <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-securex-600 text-[11px] font-bold text-white">
                {index + 1}
              </span>
              <span
                className={`text-sm font-bold text-neutral-900 ${step.mono ? 'font-mono text-[13px]' : ''}`}
              >
                {step.label}
              </span>
            </div>
            {step.detail ? (
              <p className="mt-2 text-xs leading-5 text-neutral-600">{step.detail}</p>
            ) : null}
          </div>
          {index < steps.length - 1 ? (
            <ArrowDown
              className="mx-auto mt-1 h-4 w-4 text-securex-400 lg:hidden"
              aria-hidden="true"
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export interface Layer {
  title: string;
  items: string[];
  note?: string;
}

/** Stacked architecture layers: title on the left, components on the right. */
export function LayerStack({ layers, ariaLabel }: { layers: Layer[]; ariaLabel: string }) {
  return (
    <ol aria-label={ariaLabel} className="space-y-3">
      {layers.map((layer, index) => (
        <li key={layer.title}>
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-securex-600">
                Layer {index + 1}
              </span>
              <h3 className="text-base font-bold text-neutral-900">{layer.title}</h3>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700"
                >
                  {item}
                </li>
              ))}
            </ul>
            {layer.note ? (
              <p className="mt-3 text-xs leading-5 text-neutral-500">{layer.note}</p>
            ) : null}
          </div>
          {index < layers.length - 1 ? (
            <div className="flex justify-center py-1" aria-hidden="true">
              <ArrowDown className="h-4 w-4 text-securex-400" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export interface StateNode {
  label: string;
  tone?: 'neutral' | 'good' | 'warn' | 'bad';
  note?: string;
}

const toneClasses: Record<NonNullable<StateNode['tone']>, string> = {
  neutral: 'border-neutral-300 bg-white text-neutral-800',
  good: 'border-trust-300 bg-trust-50 text-trust-800',
  warn: 'border-warning-300 bg-warning-50 text-warning-800',
  bad: 'border-danger-300 bg-danger-50 text-danger-800',
};

/** Credential state flow with labelled transitions. */
export function StateFlow({
  states,
  transitions,
  ariaLabel,
}: {
  states: StateNode[];
  transitions: { from: string; to: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <div aria-label={ariaLabel}>
      <ul className="flex flex-wrap gap-3">
        {states.map((state) => (
          <li
            key={state.label}
            className={`rounded-xl border px-4 py-2 text-sm font-bold ${toneClasses[state.tone ?? 'neutral']}`}
          >
            {state.label}
            {state.note ? (
              <span className="ml-2 text-xs font-medium opacity-80">{state.note}</span>
            ) : null}
          </li>
        ))}
      </ul>
      <ul className="mt-5 space-y-2">
        {transitions.map((transition) => (
          <li
            key={`${transition.from}-${transition.to}`}
            className="flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-700"
          >
            <span className="font-bold text-neutral-900">{transition.from}</span>
            <ArrowRight className="h-4 w-4 text-securex-500" aria-hidden="true" />
            <span className="font-bold text-neutral-900">{transition.to}</span>
            <span className="text-neutral-500">— {transition.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Ordered check list used by the verification pipeline diagram. */
export function CheckPipeline({ checks }: { checks: { name: string; detail: string }[] }) {
  return (
    <ol className="space-y-3">
      {checks.map((check, index) => (
        <li
          key={check.name}
          className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-securex-50 to-trust-50 text-sm font-black text-securex-600">
            {index + 1}
          </span>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">{check.name}</h3>
            <p className="mt-1 text-sm leading-6 text-neutral-600">{check.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Simple two-column figure with a caption, used for explanatory diagrams. */
export function DiagramFigure({
  label,
  caption,
  children,
}: {
  label: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-white p-6 shadow-sm sm:p-8">
      <figcaption className="mb-5 text-xs font-bold uppercase tracking-widest text-securex-600">
        {label}
      </figcaption>
      {children}
      {caption ? <p className="mt-5 text-xs leading-5 text-neutral-500">{caption}</p> : null}
    </figure>
  );
}
