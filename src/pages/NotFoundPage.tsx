import { ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';

export default function NotFoundPage() {
  return (
    <div className="relative overflow-hidden bg-neutral-950 py-24">
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-securex-600/20 blur-3xl" />
      <div className="relative mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <ShieldCheck className="h-8 w-8 text-trust-400" />
        </div>
        <h1 className="mt-7 text-6xl font-black text-white">404</h1>
        <p className="mt-4 text-2xl font-bold text-white">
          Page not found
        </p>
        <p className="mx-auto mt-3 max-w-md text-neutral-300">
          The page you are looking for does not exist or has moved. Head back
          to the SecureX home page to keep exploring.
        </p>
        <div className="mt-10">
          <Button href="/" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}