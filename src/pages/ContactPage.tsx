import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { APP_URL } from '../constants';

const FAQS = [
  {
    question: 'How much does SecureX cost for employers?',
    answer:
      'Credential verification is free for employers and public users. Enterprise integrations and high-volume API access are available through a subscription.',
  },
  {
    question: 'Can my institution issue credentials on SecureX?',
    answer:
      'Absolutely. Register your institution in the application, complete the verification process, and you can start issuing cryptographically signed credentials within minutes.',
  },
  {
    question: 'How is each credential secured?',
    answer:
      'Every credential is signed by the issuing institution and hashed onto a distributed ledger, making it tamper-evident and independently verifiable.',
  },
  {
    question: 'How can I verify a credential?',
    answer:
      'Open the main application and use the Verify page: enter the credential ID, scan its QR code, or follow a secure verification link. Results are returned instantly.',
  },
  {
    question: 'Where do I access the SecureX application?',
    answer:
      'The main application is available at app-securex.sp-net.in. You can launch it at any time from the Launch SecureX button on this website.',
  },
];

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@securex.io',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 010-8493',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: '100 Market Street, Suite 400, San Francisco, CA 94103',
  },
];

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim()) {
      nextErrors.subject = 'Please enter a subject.';
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = 'Please enter at least 10 characters.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field] && value.trim()) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-neutral-950">
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-securex-600/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300">
              <ShieldCheck className="h-3.5 w-3.5 text-trust-400" />
              Contact
            </span>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Get in touch
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-neutral-300">
              Questions about issuing, holding, or verifying credentials?
              Reach out and the SecureX team will respond.
            </p>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact methods */}
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-securex-600">
                Contact methods
              </span>
              <h2 className="mt-3 text-3xl font-black text-neutral-900">
                Talk to us
              </h2>
              <p className="mt-4 text-lg text-neutral-600">
                Prefer email, phone, or in person? Use any of the channels
                below.
              </p>

              <div className="mt-8 space-y-4">
                {CONTACT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.label}
                      className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-securex-200 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-securex-600 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                          {method.label}
                        </div>
                        <div className="mt-0.5 text-base font-bold text-neutral-900">
                          {method.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 p-6">
                <h3 className="text-lg font-bold text-amber-900">
                  Ready to get started?
                </h3>
                <p className="mt-2 text-sm leading-6 text-amber-800">
                  The fastest way to begin is to launch the main application
                  and create your account.
                </p>
                <a
                  href={APP_URL}
                  className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-securex-600 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-securex-700"
                >
                  Launch SecureX
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 shadow-sm">
              <h2 className="text-2xl font-black text-neutral-900">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-neutral-500">
                We typically respond within one business day.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-trust-200 bg-trust-50 p-6 text-center">
                  <ShieldCheck className="mx-auto h-10 w-10 text-trust-600" />
                  <h3 className="mt-3 text-lg font-bold text-neutral-900">
                    Message sent
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    Thanks for reaching out. The SecureX team will be in touch
                    shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
                  <Field
                    label="Name"
                    value={form.name}
                    error={errors.name}
                    placeholder="Jane Doe"
                    onChange={(value) => handleChange('name', value)}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={form.email}
                    error={errors.email}
                    placeholder="jane@example.com"
                    onChange={(value) => handleChange('email', value)}
                  />
                  <Field
                    label="Subject"
                    value={form.subject}
                    error={errors.subject}
                    placeholder="How can we help?"
                    onChange={(value) => handleChange('subject', value)}
                  />
                  <Field
                    label="Message"
                    textarea
                    value={form.message}
                    error={errors.message}
                    placeholder="Tell us a bit more…"
                    onChange={(value) => handleChange('message', value)}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-securex-600 px-6 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-securex-700 disabled:opacity-60"
                  >
                    {submitting ? 'Sending…' : 'Send message'}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-neutral-50 py-20 lg:py-24">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-securex-100/40 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-securex-600">
              FAQ
            </span>
            <h2 className="mt-3 text-3xl font-black text-neutral-900">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-bold text-neutral-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  type = 'text',
  textarea = false,
  value,
  error,
  placeholder,
  onChange,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  const baseInput =
    'mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-securex-500 focus:outline-none focus:ring-2 focus:ring-securex-500/20';
  return (
    <label className="block">
      <span className="text-sm font-semibold text-neutral-700">{label}</span>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={baseInput}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={baseInput}
        />
      )}
      {error && <span className="mt-1 block text-xs font-medium text-danger-600">{error}</span>}
    </label>
  );
}