'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  ShieldCheck,
  Heart,
  Accessibility,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function AboutPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('about');
  const common = useTranslations('common');

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-16">

        {/* Hero */}
        <div className="mb-16 grid items-center gap-10 md:grid-cols-2">
          <div className="flex justify-center md:order-last">
            <Image
              src="/illustrations/illustration-about.svg"
              alt="Afghan youth connecting to opportunities"
              width={420}
              height={320}
              className="w-full max-w-sm"
            />
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-4 py-2 text-sm font-medium text-[#09637e]">
              <MapPin size={14} />
              {t('badge')}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-[#09637e] md:text-5xl">
              {t('title')}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Mission */}
        <div className="mb-6 rounded-2xl border border-[#d1eef2] bg-white p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#088395]">
            {t('problemLabel')}
          </p>
          <h2 className="mb-4 text-2xl font-bold text-[#09637e]">
            {t('problemTitle')}
          </h2>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            {t('problemDescription')}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[#d1eef2] bg-white p-4 text-center md:p-6">
            <div className="text-2xl font-bold text-[#09637e] md:text-3xl">120+</div>
            <div className="mt-1 text-xs leading-snug text-[var(--color-text-secondary)] md:text-sm">{t('statOpportunities')}</div>
          </div>
          <div className="rounded-2xl border border-[#d1eef2] bg-white p-4 text-center md:p-6">
            <div className="text-2xl font-bold text-[#09637e] md:text-3xl">8</div>
            <div className="mt-1 text-xs leading-snug text-[var(--color-text-secondary)] md:text-sm">{t('statCategories')}</div>
          </div>
          <div className="rounded-2xl border border-[#d1eef2] bg-white p-4 text-center md:p-6">
            <div className="text-2xl font-bold text-[#09637e] md:text-3xl">3</div>
            <div className="mt-1 text-xs leading-snug text-[var(--color-text-secondary)] md:text-sm">{t('statLanguages')}</div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="flex gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
              <Accessibility size={20} />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-[#09637e]">{t('valueFreeTitle')}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t('valueFreeDesc')}
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
              <Globe size={20} />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-[#09637e]">{t('valueMultiTitle')}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t('valueMultiDesc')}
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-[#09637e]">{t('valueReviewedTitle')}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t('valueReviewedDesc')}
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
              <Heart size={20} />
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-[#09637e]">{t('valueCareTitle')}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {t('valueCareDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Founder */}
        <div className="mb-6 rounded-2xl border border-[#d1eef2] bg-white p-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#088395]">
            {t('founderLabel')}
          </p>
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d1eef2] text-xl font-bold text-[#09637e]">
              ف
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#09637e]">{t('founderName')}</h3>
              <p className="mb-3 text-sm text-[#088395]">{t('founderTitle')}</p>
              <p className="leading-relaxed text-[var(--color-text-secondary)]">
                {t('founderBio')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-[#09637e] p-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-white">
            {t('ctaTitle')}
          </h2>
          <p className="mb-6 text-[rgba(255,255,255,0.75)]">
            {t('ctaSubtitle')}
          </p>
          <Link
            href={`/${locale}/opportunities`}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
          >
            {t('ctaButton')}
            <ArrowRight size={17} />
          </Link>
        </div>

      </section>
    </main>
  );
}