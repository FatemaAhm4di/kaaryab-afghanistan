'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useOpportunities } from '@/context/OpportunitiesContext';
import { Briefcase, GraduationCap, BookOpen, Globe, Users, Calendar, MapPin, Clock } from 'lucide-react';

export default function HomePage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('home');
  const common = useTranslations('common');
  const { opportunities, loading } = useOpportunities();

  // آمار واقعی از دیتابیس
  const stats = {
    total: opportunities.length,
    jobs: opportunities.filter((o) => o.category === 'Job').length,
    internships: opportunities.filter((o) => o.category === 'Internship').length,
    scholarships: opportunities.filter((o) => o.category === 'Scholarship').length,
    remote: opportunities.filter((o) => o.type === 'Remote').length,
    categories: new Set(opportunities.map((o) => o.category)).size,
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    'Job': <Briefcase size={20} />,
    'Internship': <GraduationCap size={20} />,
    'Scholarship': <BookOpen size={20} />,
    'Remote': <Globe size={20} />,
    'Training': <Users size={20} />,
    'Volunteer': <Users size={20} />,
    'Course': <BookOpen size={20} />,
  };

  const categoryColors: Record<string, string> = {
    'Job': 'border-[#d1eef2] bg-white text-[#09637e]',
    'Internship': 'border-[#ddd6fe] bg-white text-purple-700',
    'Scholarship': 'border-[#fde68a] bg-white text-yellow-700',
    'Remote': 'border-[#a7f3d0] bg-white text-green-700',
    'Training': 'border-[#fbcfe8] bg-white text-pink-700',
    'Volunteer': 'border-[#bfdbfe] bg-white text-blue-700',
    'Course': 'border-[#fed7aa] bg-white text-orange-700',
  };

  const categoryBgColors: Record<string, string> = {
    'Job': 'bg-[#d1eef2]',
    'Internship': 'bg-[#ede9fe]',
    'Scholarship': 'bg-[#fef3c7]',
    'Remote': 'bg-[#d1fae5]',
    'Training': 'bg-[#fce7f3]',
    'Volunteer': 'bg-[#dbeafe]',
    'Course': 'bg-[#ffedd5]',
  };

  // گرفتن ۴ فرصت ویژه برای نمایش
  const featuredOpportunities = opportunities.slice(0, 4);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
      {/* Background Blobs */}
      <div className="absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full bg-[var(--color-primary)] opacity-15 blur-3xl" />
      <div className="absolute -bottom-28 -right-24 h-[450px] w-[450px] rounded-full bg-[var(--color-secondary)] opacity-15 blur-3xl" />

      <section className="container-custom flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-12 md:py-20">
        <div className="w-full max-w-4xl text-center">

          {/* Illustration */}
          <div className="mb-6 flex justify-center">
            <Image
              src="/illustrations/illustration-home.svg"
              alt={t('title')}
              width={320}
              height={260}
              className="w-[180px] md:w-[320px]"
              priority
            />
          </div>

          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-4 py-2 text-sm font-medium text-[var(--color-primary-dark)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            {t('badge')}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold leading-tight text-[var(--color-primary-dark)] md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--color-text-secondary)] md:text-base lg:text-lg">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 px-6 sm:flex-row sm:px-0">
            <Link
              href={`/${locale}/opportunities`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary-dark)] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 md:px-10 md:py-4 md:text-base"
            >
              {t('explore')}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>

            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-[var(--color-primary-dark)] shadow-md ring-2 ring-[var(--color-primary-dark)] transition hover:bg-[#d1eef2] md:px-10 md:py-4 md:text-base"
            >
              {t('learnMore')}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--color-text-secondary)]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary-dark)] md:text-3xl">{stats.total}+</div>
              <div className="text-xs text-[var(--color-text-secondary)]">{t('opportunities')}</div>
            </div>
            <div className="hidden h-8 w-px bg-[var(--color-border)] md:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary-dark)] md:text-3xl">{stats.categories}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">{t('categories')}</div>
            </div>
            <div className="hidden h-8 w-px bg-[var(--color-border)] md:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary-dark)] md:text-3xl">{stats.remote}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">{t('remote')}</div>
            </div>
            <div className="hidden h-8 w-px bg-[var(--color-border)] md:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary-dark)] md:text-3xl">💚</div>
              <div className="text-xs text-[var(--color-text-secondary)]">{t('free')}</div>
            </div>
          </div>

          {/* Category Cards */}
          <div className="mt-8 w-full">
            <p className="mb-4 text-sm font-semibold text-[var(--color-text-secondary)]">{t('browseCategories')}</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {['Job', 'Internship', 'Scholarship', 'Remote'].map((category) => {
                const count = opportunities.filter((o) => o.category === category).length;
                return (
                  <Link
                    key={category}
                    href={`/${locale}/opportunities?category=${category}`}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition hover:shadow-md ${categoryColors[category]}`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${categoryBgColors[category]}`}>
                      {categoryIcons[category]}
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-[var(--color-text-secondary)]">{t(category.toLowerCase())}</div>
                      <div className="text-sm font-semibold text-[var(--color-text-primary)]">{count} {common('open')}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Featured Opportunities */}
          {!loading && featuredOpportunities.length > 0 && (
            <div className="mt-12 w-full text-left">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[var(--color-primary-dark)] md:text-xl">
                  {t('featured')}
                </h2>
                <Link
                  href={`/${locale}/opportunities`}
                  className="text-sm font-medium text-[var(--color-primary-dark)] transition hover:opacity-70"
                >
                  {common('viewAll')} →
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {featuredOpportunities.map((opp) => (
                  <Link
                    key={opp.id}
                    href={`/${locale}/opportunities/${opp.id}`}
                    className="group rounded-2xl border border-[#d1eef2] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <span className="rounded-full bg-[#d1eef2] px-2.5 py-0.5 text-xs font-medium text-[#09637e]">
                        {opp.category}
                      </span>
                      <span className="text-xs text-gray-400">{opp.type}</span>
                    </div>
                    <h3 className="mb-1 text-sm font-semibold text-[var(--color-text-primary)] line-clamp-1">
                      {opp.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">{opp.organization}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                      <MapPin size={12} />
                      {opp.location}
                      <span className="mx-1">•</span>
                      <Clock size={12} />
                      {new Date(opp.deadline).toLocaleDateString()}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}