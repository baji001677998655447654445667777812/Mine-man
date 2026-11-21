import { Check, Copy, Mail, MapPin, GraduationCap, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type {
  ContactSubmission,
  ContactValidationErrors,
  PortfolioData,
} from '../types/portfolio';
import { hasValidationErrors, validateContactForm } from '../utils/portfolioLogic';

interface ContactSectionProps {
  portfolio: PortfolioData;
}

export function ContactSection({ portfolio }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [serverError, setServerError] = useState('');
  const [recentSubmissions, setRecentSubmissions] = useState<ContactSubmission[]>([]);
  const [emailCopied, setEmailCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(portfolio.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      setEmailCopied(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError('');

    const payload = { name, email, subject, message };
    const validationErrors = validateContactForm(payload);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      setSubmitState('idle');
      return;
    }

    setSubmitState('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data?.fields) {
          setErrors(data.fields);
        }
        throw new Error(data?.error || 'Unable to send inquiry.');
      }

      setRecentSubmissions((prev) => [data as ContactSubmission, ...prev]);
      setSubmitState('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setErrors({});
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Unable to send inquiry.'
      );
      setSubmitState('error');
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-slate-200/80 bg-white py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Direct contact info */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              08. Contact Information
            </p>
            <h2 className="text-balance mt-2 font-display text-2xl font-bold tracking-tight text-[#152946] sm:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Open to software engineering internships, AI/ML collaborations, game concept discussions, and student technology projects.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                        Email
                      </p>
                      <a
                        href={`mailto:${portfolio.email}`}
                        className="mt-1 block break-all text-sm font-semibold text-[#152946] hover:underline sm:text-base"
                      >
                        {portfolio.email}
                      </a>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#152946] sm:text-base">
                      {portfolio.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
                <div className="flex items-start gap-3">
                  <GraduationCap
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A8A]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      Academic Programme
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#152946] sm:text-base">
                      {portfolio.academicProgramme}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Validated contact form */}
          <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 lg:col-span-7">
            <h3 className="font-display text-xl font-bold text-[#152946]">
              Send a Message
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Inquiries are validated and stored directly via the Python backend service.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-[#152946]"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Rao"
                    aria-invalid={Boolean(errors.name)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
                  />
                  {errors.name && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-[#152946]"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
                  />
                  {errors.email && (
                    <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-[#152946]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project collaboration or internship inquiry"
                  aria-invalid={Boolean(errors.subject)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
                />
                {errors.subject && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-[#152946]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about your project, role, or question..."
                  aria-invalid={Boolean(errors.message)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20"
                />
                {errors.message && (
                  <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitState === 'error' && serverError && (
                <div
                  role="alert"
                  className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800"
                >
                  {serverError}
                </div>
              )}

              {submitState === 'success' && (
                <div
                  role="status"
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900"
                >
                  Message saved successfully. Thank you for reaching out to {portfolio.name}.
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <p className="text-xs text-slate-500">
                  Direct inbox: {portfolio.email}
                </p>

                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-[#152946] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1E3A8A] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {submitState === 'submitting' ? 'Sending...' : 'Send Message'}
                  </span>
                </button>
              </div>
            </form>

            {recentSubmissions.length > 0 && (
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Sent Inquiries ({recentSubmissions.length})
                </p>
                <ul className="mt-3 space-y-2">
                  {recentSubmissions.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[#152946]">
                          {item.subject}
                        </span>
                        <span className="text-xs text-slate-500">
                          From {item.name}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600">{item.message}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
