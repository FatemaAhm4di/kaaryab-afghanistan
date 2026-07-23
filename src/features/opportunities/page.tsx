'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

import OpportunityCard from './components/OpportunityCard';
import { useOpportunities } from '@/context/OpportunitiesContext';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';

// لیست کامل ولایات افغانستان
const AFGHAN_PROVINCES = [
  'All',
  'Badakhshan',
  'Badghis',
  'Baghlan',
  'Balkh',
  'Bamyan',
  'Daykundi',
  'Farah',
  'Faryab',
  'Ghazni',
  'Ghor',
  'Helmand',
  'Herat',
  'Jowzjan',
  'Kabul',
  'Kandahar',
  'Kapisa',
  'Khost',
  'Kunar',
  'Kunduz',
  'Laghman',
  'Logar',
  'Nangarhar',
  'Nimroz',
  'Nuristan',
  'Paktia',
  'Paktika',
  'Panjshir',
  'Parwan',
  'Samangan',
  'Sare Pol',
  'Takhar',
  'Uruzgan',
  'Wardak',
  'Zabul',
];

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [deadlineFilter, setDeadlineFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const { opportunities, loading } = useOpportunities();
  const t = useTranslations('opportunities');
  const common = useTranslations('common');

  const uniqueLocations = useMemo(() => {
    const dbLocations = new Set(opportunities.map((opp) => opp.location));
    const allLocations = new Set([...AFGHAN_PROVINCES, ...dbLocations]);
    return ['All', ...Array.from(allLocations).filter((loc) => loc !== 'All')];
  }, [opportunities]);

  const hasActiveFilters = location !== 'All' || type !== 'All' || deadlineFilter !== 'All';

  const clearFilters = () => {
    setLocation('All');
    setType('All');
    setDeadlineFilter('All');
  };

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title.toLowerCase().includes(search.toLowerCase()) ||
        opportunity.organization.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === 'All' ? true : opportunity.category === category;

      const matchesLocation = location === 'All' ? true : opportunity.location === location;

      const matchesType = type === 'All' ? true : opportunity.type === type;

      let matchesDeadline = true;
      if (deadlineFilter === 'This week') {
        const now = new Date();
        const weekLater = new Date();
        weekLater.setDate(now.getDate() + 7);
        const deadline = new Date(opportunity.deadline);
        matchesDeadline = deadline >= now && deadline <= weekLater;
      } else if (deadlineFilter === 'This month') {
        const now = new Date();
        const monthLater = new Date();
        monthLater.setMonth(now.getMonth() + 1);
        const deadline = new Date(opportunity.deadline);
        matchesDeadline = deadline >= now && deadline <= monthLater;
      } else if (deadlineFilter === 'Expired') {
        const now = new Date();
        const deadline = new Date(opportunity.deadline);
        matchesDeadline = deadline < now;
      } else if (deadlineFilter === 'Upcoming') {
        const now = new Date();
        const deadline = new Date(opportunity.deadline);
        matchesDeadline = deadline >= now;
      }

      return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesDeadline;
    });
  }, [search, category, location, type, deadlineFilter, opportunities]);

  // Loading State
  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] py-10">
        <section className="container-custom">
          <LoadingState message={common('loading')} />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-10">
      <section className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-6 flex justify-center">
            <Image
              src="/illustrations/illustration-opportunities.svg"
              alt="Browse opportunities"
              width={260}
              height={200}
              className="w-[200px] md:w-[260px]"
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-primary-dark)] md:text-4xl">
                {t('title')}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t('subtitle')}
              </p>
            </div>
            <Link
              href={`/${locale}/add-opportunity`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#09637e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075a6b]"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">{common('add')}</span>
              <span className="sm:hidden">{common('add')}</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 px-4 py-3 outline-none transition focus:border-[#09637e] dark:focus:border-[#088395]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 outline-none transition focus:border-[#09637e] dark:focus:border-[#088395]"
          >
            <option value="All">{t('allCategories')}</option>
            <option value="Job">{common('job')}</option>
            <option value="Internship">{common('internship')}</option>
            <option value="Scholarship">{common('scholarship')}</option>
            <option value="Remote">{common('remote')}</option>
            <option value="Training">{common('training')}</option>
            <option value="Volunteer">{common('volunteer')}</option>
            <option value="Course">{common('course')}</option>
          </select>
        </motion.div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#09637e] dark:text-[#088395] transition hover:text-[#075a6b]"
        >
          {showFilters ? t('hideFilters') : t('showMore')}
          <span className="text-xs">▼</span>
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-[#09637e] dark:bg-[#088395] px-2 py-0.5 text-xs text-white">
              {filteredOpportunities.length}
            </span>
          )}
        </button>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden mb-6"
            >
              <div className="grid gap-4 rounded-2xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 p-4 md:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('location')}</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none transition focus:border-[#09637e] dark:focus:border-[#088395]"
                  >
                    {uniqueLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('type')}</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none transition focus:border-[#09637e] dark:focus:border-[#088395]"
                  >
                    <option value="All">{common('allTypes')}</option>
                    <option value="Remote">{common('remote')}</option>
                    <option value="OnSite">{common('onSite')}</option>
                    <option value="Hybrid">{common('hybrid')}</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('deadline')}</label>
                  <select
                    value={deadlineFilter}
                    onChange={(e) => setDeadlineFilter(e.target.value)}
                    className="w-full rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2.5 outline-none transition focus:border-[#09637e] dark:focus:border-[#088395]"
                  >
                    <option value="All">{t('allDeadlines')}</option>
                    <option value="This week">{t('thisWeek')}</option>
                    <option value="This month">{t('thisMonth')}</option>
                    <option value="Upcoming">{t('upcoming')}</option>
                    <option value="Expired">{t('expired')}</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <div className="md:col-span-3 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="inline-flex items-center gap-1 text-sm text-[#09637e] dark:text-[#088395] transition hover:text-[#075a6b]"
                    >
                      <X size={16} />
                      {t('clearFilters')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredOpportunities.length === 0 ? (
          <EmptyState
            image="/illustrations/illustration-opportunities.svg"
            title={t('noResults')}
            description={t('noResultsMessage')}
            action={hasActiveFilters ? {
              label: t('clearFilters'),
              onClick: clearFilters
            } : undefined}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.05 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <OpportunityCard opportunity={opportunity} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredOpportunities.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400"
          >
            {t('showing')} {filteredOpportunities.length} {common('of')} {opportunities.length} {t('opportunities')}
          </motion.p>
        )}
      </section>
    </main>
  );
}