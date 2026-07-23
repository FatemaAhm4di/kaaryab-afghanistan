'use client';

import {useEffect, useRef, useState} from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  LayoutGrid,
  Briefcase,
  GraduationCap,
  Globe,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { opportunities } from '@/features/opportunities/data';
import { MotionWrapper, MotionCard, MotionStagger } from '@/components/ui/MotionWrapper';
import { motion } from 'framer-motion';
import { EmptyState } from '@/components/ui/EmptyState';
import { DASHBOARD_TYPE_DATA, DASHBOARD_CATEGORY_DATA, DASHBOARD_TYPE_KEYS } from '@/constants/dashboard';
import { CATEGORY_TAG_CLASSES } from '@/constants/categories';

// ============ SKELETON COMPONENT ============
function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-1 h-4 w-64 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="hidden h-8 w-32 rounded-xl bg-gray-200 dark:bg-gray-700 md:block" />
      </div>

      {/* Flow line Skeleton */}
      <div className="mb-8 h-0.5 w-full rounded-full bg-gray-200 dark:bg-gray-700" />

      {/* Stats Skeleton */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
            <div className="mb-3 h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700" />
            <div className="h-7 w-12 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-1 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-2 h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="mb-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-6 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
          <div className="mb-4 h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mx-auto h-40 w-40 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mt-4 flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row Skeleton */}
      <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 py-3 last:border-none">
                <div>
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="mt-1 h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="h-5 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 py-3 last:border-none">
                <div>
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="mt-1 h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="h-5 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const now = Date.now();

export default function DashboardPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('dashboard');
  const common = useTranslations('common');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const expiring = opportunities
    .map((o) => ({
      ...o,
      daysLeft: Math.ceil(
        (new Date(o.deadline).getTime() - now) / (1000 * 60 * 60 * 24)
      ),
    }))
    .filter((o) => o.daysLeft >= 0 && o.daysLeft <= 30)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 4);

  const recent = [...opportunities].reverse().slice(0, 5);

  // Skeleton Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-12">
          <DashboardSkeleton />
        </section>
      </main>
    );
  }

  // Empty State
  if (opportunities.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-12">
          <EmptyState
            image="/illustrations/illustration-dashboard.svg"
            title="No data available"
            description="There are no opportunities to display in the dashboard yet."
          />
        </section>
      </main>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flowAcross {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .flow-line {
          background: linear-gradient(90deg, #d1eef2 0%, #09637e 30%, #088395 50%, #09637e 70%, #d1eef2 100%);
          background-size: 200% auto;
          animation: flowAcross 3s linear infinite;
        }
      `}</style>

      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-12">

          {/* Header */}
          <MotionWrapper delay={0.1}>
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-3 py-1 text-xs font-medium text-[#09637e]">
                  <LayoutGrid size={12} />
                  {t('overview')}
                </div>
                <h1 className="text-3xl font-extrabold text-[#09637e] md:text-4xl">{t('title')}</h1>
                <p className="mt-1 text-[var(--color-text-secondary)]">
                  {t('subtitle')}
                </p>
              </div>
              <div className="hidden items-center gap-2 rounded-xl border border-[#d1eef2] bg-white px-4 py-2 text-sm text-[var(--color-text-secondary)] md:flex">
                <Clock size={14} />
                {t('updatedToday')}
              </div>
            </div>
          </MotionWrapper>

          {/* Flow line */}
          <div className="flow-line mb-8 h-0.5 w-full rounded-full" />

          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard 
              icon={LayoutGrid} 
              num={120} 
              label={t('total')} 
              change="+12" 
              changeLabel={t('thisMonth')}
              iconBg="#d1eef2" 
              iconColor="#09637e" 
              delay={100} 
            />
            <StatCard 
              icon={Briefcase} 
              num={45} 
              label={t('jobs')} 
              change="+5" 
              changeLabel={t('thisWeek')}
              iconBg="#ede9fe" 
              iconColor="#7c3aed" 
              delay={200} 
            />
            <StatCard 
              icon={GraduationCap} 
              num={28} 
              label={t('scholarships')} 
              change="+3" 
              changeLabel={t('thisWeek')}
              iconBg="#fef3c7" 
              iconColor="#92400e" 
              delay={300} 
            />
            <StatCard 
              icon={Globe} 
              num={14} 
              label={t('remote')} 
              change="+2" 
              changeLabel={t('thisWeek')}
              iconBg="#d1fae5" 
              iconColor="#065f46" 
              delay={400} 
            />
          </div>

          {/* Charts row */}
          <div className="mb-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">

            {/* Bar chart */}
            <MotionWrapper delay={0.2}>
              <div className="rounded-2xl border border-[#d1eef2] bg-white p-6">
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="font-semibold text-[#09637e]">{t('categoryChart')}</h2>
                  <span className="text-xs text-[var(--color-text-secondary)]">{t('thisMonth')}</span>
                </div>
                <div className="flex flex-col gap-4">
                  {DASHBOARD_CATEGORY_DATA.map((item, i) => (
                    <BarRow key={item.label} {...item} delay={600 + i * 100} />
                  ))}
                </div>
              </div>
            </MotionWrapper>

            {/* Donut chart */}
            <MotionWrapper delay={0.3}>
              <div className="rounded-2xl border border-[#d1eef2] bg-white p-6">
                <h2 className="mb-4 font-semibold text-[#09637e]">{t('typeChart')}</h2>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={DASHBOARD_TYPE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                      animationBegin={600}
                      animationDuration={1000}
                    >
                      {DASHBOARD_TYPE_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 flex flex-col gap-2">
                  {DASHBOARD_TYPE_DATA.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                      <div className="h-2.5 w-2.5 rounded-full" style={{background: item.color}} />
                      {common(DASHBOARD_TYPE_KEYS[item.name] || item.name.toLowerCase())} ({item.value}%)
                    </div>
                  ))}
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Bottom row */}
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">

            {/* Recent */}
            <MotionWrapper delay={0.4}>
              <div className="rounded-2xl border border-[#d1eef2] bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-[#09637e]">{t('recent')}</h2>
                  <span className="text-xs text-[var(--color-text-secondary)]">{t('latest5')}</span>
                </div>
                <div className="flex flex-col">
                  {recent.map((o, index) => (
                    <motion.div
                      key={o.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center justify-between border-b border-[#f3f4f6] py-3 last:border-none"
                    >
                      <div>
                        <div className="text-sm font-medium text-[var(--color-text-primary)]">{o.title}</div>
                        <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{o.organization}</div>
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${CATEGORY_TAG_CLASSES[o.category as keyof typeof CATEGORY_TAG_CLASSES] || 'bg-gray-100 text-gray-600'}`}>
                        {o.category}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </MotionWrapper>

            {/* Expiring */}
            <MotionWrapper delay={0.5}>
              <div className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-semibold text-orange-700">
                    <Clock size={15} />
                    {t('expiringSoon')}
                  </h2>
                  <span className="text-xs text-[var(--color-text-secondary)]">{t('next30Days')}</span>
                </div>
                {expiring.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-secondary)]">{t('noExpiring')}</p>
                ) : (
                  <div className="flex flex-col">
                    {expiring.map((o, index) => (
                      <motion.div
                        key={o.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center justify-between border-b border-orange-100 py-3 last:border-none"
                      >
                        <div>
                          <div className="text-sm font-medium text-[var(--color-text-primary)]">{o.title}</div>
                          <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{o.organization}</div>
                        </div>
                        <span className="rounded-full border border-orange-200 bg-white px-2.5 py-1 text-xs font-semibold text-orange-600">
                          {o.daysLeft === 0 ? t('today') : `${o.daysLeft}d ${t('left')}`}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </MotionWrapper>

          </div>
        </section>
      </main>
    </>
  );
}

function StatCard({
  icon: Icon,
  num,
  label,
  change,
  changeLabel,
  iconBg,
  iconColor,
  delay,
}: {
  icon: React.ElementType;
  num: number;
  label: string;
  change: string;
  changeLabel: string;
  iconBg: string;
  iconColor: string;
  delay: number;
}) {
  const count = useCountUp(num);

  return (
    <MotionCard delay={delay / 1000}>
      <div className="rounded-2xl border border-[#d1eef2] bg-white dark:bg-gray-800 p-5 shadow-sm">
        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
          style={{background: iconBg, color: iconColor}}
        >
          <Icon size={20} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay / 1000 + 0.2, type: 'spring' }}
          className="text-3xl font-bold text-[#09637e] dark:text-white"
        >
          {count}
        </motion.div>
        <div className="mt-1 text-sm text-[var(--color-text-secondary)] dark:text-gray-400">{label}</div>
        <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp size={12} />
          {change} {changeLabel}
        </div>
      </div>
    </MotionCard>
  );
}

function BarRow({label, value, max, color, delay}: {label: string; value: number; max: number; color: string; delay: number}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth((value / max) * 100), delay);
    return () => clearTimeout(t);
  }, [value, max, delay]);

  return (
    <div className="flex items-center gap-3">
      <div className="w-20 shrink-0 text-right text-xs text-[var(--color-text-secondary)] dark:text-gray-400">{label}</div>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#ebf4f6] dark:bg-gray-700">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: delay / 1000 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <div className="w-6 shrink-0 text-xs text-[var(--color-text-secondary)] dark:text-gray-400">{value}</div>
    </div>
  );
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    ref.current = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(ref.current!);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(ref.current!);
  }, [target, duration]);

  return count;
}