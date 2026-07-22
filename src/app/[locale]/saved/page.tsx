'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, ArrowRight, Building2, Clock, MapPin, BookmarkX, AlertCircle } from 'lucide-react';
import { useSavedOpportunities } from '@/context/SavedOpportunitiesContext';
import { useOpportunities } from '@/context/OpportunitiesContext';
import { useTranslations } from 'next-intl';
import { MotionWrapper, MotionCard, MotionStagger } from '@/components/ui/MotionWrapper';
import { motion } from 'framer-motion';

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

function ErrorState({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations('saved');
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', damping: 25 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-20 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500"
      >
        <AlertCircle size={32} />
      </motion.div>
      <h2 className="text-xl font-bold text-red-700">{t('errorTitle')}</h2>
      <p className="mt-2 max-w-sm text-sm text-red-600">{t('errorMessage')}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRetry}
        className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        {t('retry')}
      </motion.button>
    </motion.div>
  );
}

export default function SavedPage() {
  const { savedIds, toggleSave } = useSavedOpportunities();
  const { opportunities, error, refreshOpportunities } = useOpportunities();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('saved');
  const common = useTranslations('common');

  const savedOpportunities = opportunities.filter((o) => savedIds.includes(o.id));

  if (error) {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-12">
          <ErrorState onRetry={refreshOpportunities} />
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#a8d8df] bg-white px-6 py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d1eef2] text-[#09637e]"
            >
              <Bookmark size={32} />
            </motion.div>
            <h2 className="text-xl font-bold text-[var(--color-primary-dark)]">
              {t('empty')}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">
              {t('emptyMessage')}
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={`/${locale}/opportunities`}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#09637e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                {t('explore')}
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <MotionStagger staggerDelay={0.08}>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {savedOpportunities.map((opportunity) => (
                <MotionCard key={opportunity.id}>
                  <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">
                          {opportunity.category}
                        </span>
                        <h3 className="mt-4 text-xl font-bold text-[var(--color-text-primary)]">
                          {opportunity.title}
                        </h3>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        type="button"
                        onClick={() => toggleSave(opportunity.id)}
                        className="rounded-xl p-2 text-cyan-700 transition hover:bg-red-50 hover:text-red-500"
                        title={t('remove')}
                      >
                        <BookmarkX size={20} />
                      </motion.button>
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
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </Link>
                    </div>
                  </article>
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