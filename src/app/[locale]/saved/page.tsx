'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Bookmark, ArrowRight, Building2, Clock, MapPin, BookmarkX } from 'lucide-react';
import { useSavedOpportunities } from '@/context/SavedOpportunitiesContext';
import { useOpportunities } from '@/context/OpportunitiesContext';
import { useTranslations } from 'next-intl';
import { MotionWrapper, MotionCard, MotionStagger } from '@/components/ui/MotionWrapper';
import { motion } from 'framer-motion';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorState } from '@/components/ui/ErrorState';

function SavedSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div className="h-6 w-20 rounded-full bg-gray-200" />
            <div className="h-8 w-8 rounded-xl bg-gray-200" />
          </div>
          <div className="mt-4 h-6 w-3/4 rounded-lg bg-gray-200" />
          <div className="mt-5 space-y-2">
            <div className="h-4 w-1/2 rounded-lg bg-gray-200" />
            <div className="h-4 w-1/3 rounded-lg bg-gray-200" />
            <div className="h-4 w-1/4 rounded-lg bg-gray-200" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="h-4 w-16 rounded-lg bg-gray-200" />
            <div className="h-4 w-12 rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SavedPage() {
  const { savedIds, toggleSave } = useSavedOpportunities();
  const { opportunities, loading, error, refreshOpportunities } = useOpportunities();
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('saved');
  const common = useTranslations('common');

  const savedOpportunities = opportunities.filter((o) => savedIds.includes(o.id));

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-12">
          <SavedSkeleton />
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-12">
          <ErrorState 
            title={t('errorTitle')}
            message={t('errorMessage')}
            onRetry={refreshOpportunities}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-12">
        <MotionWrapper delay={0.1}>
          <div className="mb-10">
            <div className="mb-6 flex justify-center">
              <Image
                src="/illustrations/illustration-saved.svg"
                alt="Saved opportunities"
                width={260}
                height={200}
                className="w-[200px] md:w-[260px]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-3 py-1 text-xs font-medium text-[#09637e]">
                  <Bookmark size={12} />
                  {savedOpportunities.length} {t('saved')}
                </div>
                <h1 className="text-3xl font-extrabold text-[var(--color-primary-dark)] md:text-4xl">
                  {t('title')}
                </h1>
                <p className="mt-2 text-[var(--color-text-secondary)]">
                  {t('subtitle')}
                </p>
              </div>
              <Link
                href={`/${locale}/opportunities`}
                className="hidden items-center gap-2 rounded-xl border border-[#a8d8df] bg-white px-5 py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2] md:flex"
              >
                {t('browseMore')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </MotionWrapper>

        {savedOpportunities.length === 0 ? (
          <EmptyState
            image="/illustrations/illustration-saved.svg"
            title={t('empty')}
            description={t('emptyMessage')}
            action={{
              label: t('explore'),
              onClick: () => router.push(`/${locale}/opportunities`)
            }}
          />
        ) : (
          <MotionStagger staggerDelay={0.08}>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {savedOpportunities.map((opportunity) => (
                <MotionCard key={opportunity.id}>
                  <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">
                          {opportunity.category}
                        </span>
                        <h3 className="mt-4 text-xl font-bold text-gray-900">
                          {opportunity.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleSave(opportunity.id)}
                        className="rounded-xl p-2 text-cyan-700 transition hover:bg-red-50 hover:text-red-500"
                        title={t('remove')}
                      >
                        <BookmarkX size={20} />
                      </button>
                    </div>
                    <div className="mt-5 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Building2 size={15} />
                        {opportunity.organization}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={15} />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={15} />
                        {t('deadline')}: {new Date(opportunity.deadline).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs font-semibold text-cyan-700">
                        {opportunity.type}
                      </span>
                      <Link
                        href={`/${locale}/opportunities/${opportunity.id}`}
                        className="flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition hover:gap-2.5"
                      >
                        {common('view')}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </MotionCard>
              ))}
            </div>
          </MotionStagger>
        )}

        {savedOpportunities.length > 0 && (
          <MotionWrapper delay={0.3}>
            <div className="mt-8 flex justify-center md:hidden">
              <Link
                href={`/${locale}/opportunities`}
                className="inline-flex items-center gap-2 rounded-xl border border-[#a8d8df] bg-white px-5 py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
              >
                {t('browseMore')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </MotionWrapper>
        )}
      </section>
    </main>
  );
}