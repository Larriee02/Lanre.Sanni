import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import BrandLogo from '../components/BrandLogo.jsx';
import { budgets, profile, socials } from '../data/site.js';

const API_URL = import.meta.env.VITE_API_URL || '';

const initial = { firstName: '', lastName: '', phone: '', email: '', budget: '', message: '', company: '' };

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = 'Please enter your first name.';
  if (!values.lastName.trim()) errors.lastName = 'Please enter your last name.';
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone && !/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number.';
  if (values.message.trim().length < 10) errors.message = 'Tell me a little more (at least 10 characters).';
  return errors;
}

function Field({ label, name, error, children }) {
  return (
    <label htmlFor={name} className="block">
      <span className="font-label text-xs uppercase tracking-[0.14em] text-muted">{label}</span>
      {children}
      {error && <span className="mt-2 block font-sans text-sm text-red-600 dark:text-red-400">{error}</span>}
    </label>
  );
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setValues(initial);
      setStatus({ state: 'success', message: data.message || "Thanks! Your message is on its way. I'll get back to you soon." });
    } catch (err) {
      setStatus({
        state: 'error',
        message:
          err instanceof TypeError
            ? 'Could not reach the server. Please try again, or message me on WhatsApp.'
            : err.message,
      });
    }
  };

  const fieldProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange,
    className: 'field',
    'aria-invalid': Boolean(errors[name]),
  });

  return (
    <>
      <PageHeader eyebrow="Let's work together" title="Get in touch.">
        Have a project in mind, a role to fill, or just want to say hi? Send a message below and I'll get back to you.
      </PageHeader>

      <section className="shell grid gap-16 py-[60px] lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <div className="space-y-10">
            <BrandLogo variant="full" className="max-w-[270px] rounded-2xl" />
            <div>
              <p className="font-label text-xs uppercase tracking-[0.14em] text-muted">WhatsApp</p>
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-display text-2xl font-medium">
                <span className="link-underline">{profile.phoneDisplay}</span>
              </a>
            </div>
            {profile.email && (
              <div>
                <p className="font-label text-xs uppercase tracking-[0.14em] text-muted">Email</p>
                <a href={`mailto:${profile.email}`} className="mt-2 inline-block font-display text-2xl font-medium">
                  <span className="link-underline">{profile.email}</span>
                </a>
              </div>
            )}
            <div>
              <p className="font-label text-xs uppercase tracking-[0.14em] text-muted">Based in</p>
              <p className="mt-2 font-display text-2xl font-medium">{profile.location}</p>
            </div>
            <div>
              <p className="font-label text-xs uppercase tracking-[0.14em] text-muted">Elsewhere</p>
              <ul className="mt-3 space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="font-sans text-lg text-ink-soft transition-colors hover:text-accent">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-8">
          <form onSubmit={onSubmit} noValidate className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            <Field label="First name" name="firstName" error={errors.firstName}>
              <input {...fieldProps('firstName')} autoComplete="given-name" placeholder="Jane" />
            </Field>
            <Field label="Last name" name="lastName" error={errors.lastName}>
              <input {...fieldProps('lastName')} autoComplete="family-name" placeholder="Doe" />
            </Field>
            <Field label="Phone number" name="phone" error={errors.phone}>
              <input {...fieldProps('phone')} type="tel" autoComplete="tel" placeholder="+234 800 000 0000" />
            </Field>
            <Field label="Email" name="email" error={errors.email}>
              <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="jane@company.com" />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Budget" name="budget">
                <div className="relative">
                  <select {...fieldProps('budget')} className="field cursor-pointer appearance-none pr-8">
                    <option value="" className="bg-canvas text-ink">
                      Select your budget...
                    </option>
                    {budgets.map((b) => (
                      <option key={b} value={b} className="bg-canvas text-ink">
                        {b}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Message" name="message" error={errors.message}>
                <textarea {...fieldProps('message')} rows={5} placeholder="Tell me about your project..." className="field resize-none" />
              </Field>
            </div>

            {/* Honeypot: hidden from people, tempting for bots. */}
            <input type="text" name="company" value={values.company} onChange={onChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status.state === 'sending'}
                className="btn-primary w-fit cursor-pointer px-7 py-3.5 disabled:translate-y-0 disabled:opacity-60"
              >
                {status.state === 'sending' ? 'Sending…' : 'Submit'}
              </button>
              <p
                role="status"
                className={`font-sans text-base ${status.state === 'error' ? 'text-red-600 dark:text-red-400' : 'text-ink-soft'}`}
              >
                {status.message}
              </p>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}
