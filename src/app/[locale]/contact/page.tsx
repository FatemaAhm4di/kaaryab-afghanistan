'use client';

import Image from 'next/image';
import {useState} from 'react';
import {Mail, MapPin, Clock, Send, MessageSquare} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function ContactPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('contact');
  const common = useTranslations('common');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-16">

        <div className="flex justify-center mb-6">
          <Image
            src="/illustrations/illustration-contact.svg"
            alt="Contact us"
            width={280}
            height={220}
            className="w-full max-w-xs"
          />
        </div>
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-4 py-2 text-sm font-medium text-[#09637e]">
            <Mail size={14} />
            {t('badge')}
          </div>

          <h1 className="mb-4 text-4xl font-extrabold text-[#09637e] md:text-5xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[var(--color-text-secondary)]">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_1.6fr]">

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-4 rounded-2xl border border-[#d1eef2] bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-secondary)]">{t('emailLabel')}</div>
                <div className="mt-0.5 font-semibold text-[#09637e]">hello@kaaryab.af</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#d1eef2] bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-secondary)]">{t('locationLabel')}</div>
                <div className="mt-0.5 font-semibold text-[#09637e]">{t('locationValue')}</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#d1eef2] bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
                <Clock size={18} />
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-secondary)]">{t('responseLabel')}</div>
                <div className="mt-0.5 font-semibold text-[#09637e]">{t('responseValue')}</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-[#d1eef2] bg-white p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
                <MessageSquare size={18} />
              </div>
              <div>
                <div className="text-xs text-[var(--color-text-secondary)]">{t('telegramLabel')}</div>
                <div className="mt-0.5 font-semibold text-[#09637e]">{t('telegramValue')}</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-[#d1eef2] bg-white p-8">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d1eef2] text-[#09637e]">
                  <Send size={28} />
                </div>
                <h2 className="mb-2 text-xl font-bold text-[#09637e]">{t('successTitle')}</h2>
                <p className="text-[var(--color-text-secondary)]">
                  {t('successMessage')}
                </p>
              </div>
            ) : (
              <>
                <h2 className="mb-6 text-lg font-bold text-[#09637e]">{t('formTitle')}</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        {t('nameLabel')}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('namePlaceholder')}
                        className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                        {t('emailLabel')}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t('emailPlaceholder')}
                        className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                      {t('subjectLabel')}
                    </label>
                    <select className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]">
                      <option>{t('subjectGeneral')}</option>
                      <option>{t('subjectOpportunity')}</option>
                      <option>{t('subjectIssue')}</option>
                      <option>{t('subjectPartnership')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                      {t('messageLabel')}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={t('messagePlaceholder')}
                      className="w-full resize-none rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#09637e] px-6 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    <Send size={16} />
                    {t('submitButton')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

      </section>
    </main>
  );
}