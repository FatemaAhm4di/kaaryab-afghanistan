'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Briefcase, MapPin, Calendar, Tag } from 'lucide-react';
import { MotionWrapper, MotionCard } from '@/components/ui/MotionWrapper';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ErrorState } from '@/components/ui/ErrorState';
import { LoadingState } from '@/components/ui/LoadingState';

type Opportunity = {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: string;
  type: string;
  deadline: string;
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
  featured?: boolean;
};

function OpportunitySkeleton() {
  return (
    <main className="container-custom py-10 animate-pulse">
      <div className="h-5 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 mb-6" />
      <div className="h-8 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700 mb-2" />
      <div className="h-5 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700 mb-8" />
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-28 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-6 w-32 rounded-lg bg-gray-200 dark:bg-gray-700 mb-3" />
      <div className="h-24 w-full rounded-2xl bg-gray-200 dark:bg-gray-700 mb-8" />
      <div className="h-6 w-40 rounded-lg bg-gray-200 dark:bg-gray-700 mb-3" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
        <div className="h-5 w-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-3">
          <div className="h-10 w-28 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-20 rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </main>
  );
}

export default function OpportunityPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'fa';
  const id = params.id as string;
  const t = useTranslations('details');
  const common = useTranslations('common');

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunity = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/opportunities/${id}`);
      if (!res.ok) {
        if (res.status === 404) setError(t('notFound'));
        else setError(t('errorMessage'));
        return;
      }
      const data = await res.json();
      setOpportunity(data);
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  if (loading) return <OpportunitySkeleton />;
  
  if (error) {
    return (
      <main className="container-custom py-20">
        <ErrorState
          title={t('error')}
          message={error}
          onRetry={fetchOpportunity}
        />
      </main>
    );
  }
  
  if (!opportunity) {
    return (
      <main className="container-custom py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="mb-6 text-6xl"
          >
            🔍
          </motion.div>
          <h2 className="text-2xl font-bold text-[#09637e] dark:text-[#088395]">{t('notFound')}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('notFoundMessage')}
          </p>
          <Link
            href={`/${locale}/opportunities`}
            className="mt-6 inline-block rounded-xl bg-[#09637e] dark:bg-[#088395] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075a6b]"
          >
            {t('browse')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-custom py-10">
      {/* Back Button */}
      <MotionWrapper delay={0.1}>
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#09637e] dark:text-[#088395] transition hover:text-[#075a6b]"
        >
          <ArrowLeft size={16} />
          {common('back')}
        </button>
      </MotionWrapper>

      {/* Header */}
      <MotionWrapper delay={0.2}>
        <div className="mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#09637e] dark:text-white md:text-4xl">
                {opportunity.title}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Briefcase size={16} />
                {opportunity.organization}
                <span className="mx-1">•</span>
                <MapPin size={16} />
                {opportunity.location}
              </p>
            </div>
            <span className="rounded-full bg-[#d1eef2] dark:bg-gray-700 px-4 py-1.5 text-sm font-medium text-[#09637e] dark:text-[#088395]">
              {opportunity.category}
            </span>
          </div>
        </div>
      </MotionWrapper>

      {/* Badges */}
      <MotionWrapper delay={0.3}>
        <div className="mb-8 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#ebf4f6] dark:bg-gray-700 px-3 py-1 text-xs font-medium text-[#09637e] dark:text-[#088395]">
            {opportunity.type}
          </span>
          <span className="rounded-full bg-[#ebf4f6] dark:bg-gray-700 px-3 py-1 text-xs font-medium text-[#09637e] dark:text-[#088395]">
            <Calendar size={12} className="inline mr-1" />
            {new Date(opportunity.deadline).toLocaleDateString()}
          </span>
          {opportunity.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-xs text-gray-600 dark:text-gray-400">
              <Tag size={10} className="inline mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </MotionWrapper>

      {/* Description */}
      <MotionWrapper delay={0.4}>
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-[#09637e] dark:text-white">
            {t('description')}
          </h2>
          <MotionCard>
            <div className="rounded-2xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {opportunity.description}
              </p>
            </div>
          </MotionCard>
        </section>
      </MotionWrapper>

      {/* Requirements */}
      <MotionWrapper delay={0.5}>
        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-[#09637e] dark:text-white">
            {t('requirements')}
          </h2>
          <MotionCard>
            <div className="rounded-2xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
              <ul className="list-disc pl-5 space-y-1.5 text-gray-700 dark:text-gray-300">
                {opportunity.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </MotionCard>
        </section>
      </MotionWrapper>

      {/* Apply Section */}
      <MotionWrapper delay={0.6}>
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('ready')}</p>
            <p className="font-medium text-[#09637e] dark:text-[#088395]">
              {opportunity.organization}
            </p>
          </div>
          <div className="flex gap-3">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={opportunity.applyLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-[#09637e] dark:bg-[#088395] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075a6b]"
            >
              {t('apply')} →
            </motion.a>
            <Link
              href={`/${locale}/opportunities`}
              className="rounded-xl border border-[#d1eef2] dark:border-gray-700 px-6 py-2.5 text-sm font-semibold text-[#09637e] dark:text-[#088395] transition hover:bg-[#d1eef2] dark:hover:bg-gray-700"
            >
              {common('back')}
            </Link>
          </div>
        </div>
      </MotionWrapper>
    </main>
  );
}