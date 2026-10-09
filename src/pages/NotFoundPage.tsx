import { ArrowRight, Compass, Search } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { FlowSteps } from '../components/Diagrams';

const SUGGESTIONS = [
  {
    icon: Compass,
    title: 'Platform overview',
    description: 'What SecureX does end to end — issuance, anchoring, verification.',
    to: '/platform',
  },
  {
    icon: Search,
    title: 'Verify a credential',
    description: 'Check a credential’s integrity and status through the public verifier.',
    href: 'https://app-securex.sp-net.in/verify',
  },
  {
    icon: Compass,
    title: 'Live status',
    description: 'See whether the API, chain node, and explorer are responding right now.',
    to: '/live/status',
  },
];

const RECOVERY = [
  { label: '1. Check the address', detail: 'Paths are lowercase and hyphenated, e.g. /platform/how-it-works.' },
  { label: '2. Use the navigation', detail: 'Every section is reachable from the header and the footer.' },
  { label: '3. Look for a legacy path', detail: 'Old links redirect: /about → /project/about, /features → /platform, /security → /platform/security.' },
  { label: '4. Search the docs', detail: 'The documentation index links every guide, reference, and glossary term.' },
];

export default function NotFoundPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-950 py-24">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-securex-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Compass className="h-8 w-8 text-trust-400" aria-hidden="true" />
          </div>
          <h1 className="mt-7 text-6xl font-black text-white">404</h1>
          <p className="mt-4 text-2xl font-bold text-white">Page not found</p>
          <p className="mx-auto mt-3 max-w-md text-neutral-300">
            The page you are looking for does not exist or has moved. Nothing has been deleted —
            the site was reorganised into seven sections.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to="/" size="lg">
              Back to Home
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <Button to="/resources/documentation" size="lg" variant="outline">
              Documentation
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {SUGGESTIONS.map((suggestion) => (
              <Card
                key={suggestion.title}
                icon={suggestion.icon}
                title={suggestion.title}
                description={suggestion.description}
                {...(suggestion.to ? { to: suggestion.to } : { href: suggestion.href })}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FlowSteps ariaLabel="How to find what you were looking for" columns={4} steps={RECOVERY} />
          <div className="mt-8 text-center">
            <Button to="/resources/documentation" size="lg" variant="ghost">
              Open the documentation index
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
