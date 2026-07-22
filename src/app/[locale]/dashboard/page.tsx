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
import {opportunities} from '@/features/opportunities/data';

const typeData = [
  {name: 'Remote', value: 59, color: '#09637e'},
  {name: 'On-site', value: 28, color: '#7c3aed'},
  {name: 'Hybrid', value: 13, color: '#f59e0b'},
];

const categoryData = [
  {label: 'Jobs', value: 45, max: 120, color: '#09637e'},
  {label: 'Internships', value: 33, max: 120, color: '#7c3aed'},
  {label: 'Scholarships', value: 28, max: 120, color: '#f59e0b'},
  {label: 'Remote', value: 14, max: 120, color: '#10b981'},
  {label: 'Training', value: 6, max: 120, color: '#f43f5e'},
];

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

function StatCard({
  icon: Icon,
  num,
  label,
  change,
  iconBg,
  iconColor,
  delay,
}: {
  icon: React.ElementType;
  num: number;
  label: string;
  change: string;
  iconBg: string;
  iconColor: string;
  delay: number;
}) {
  const count = useCountUp(num);

  return (
    <div
      className="rounded-2xl border border-[#d1eef2] bg-white p-5 shadow-sm"
      style={{
        animation: `fadeSlideIn 0.5s ease forwards`,
        animationDelay: `${delay}ms`,
        opacity: 0,
      }}
    >
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{background: iconBg, color: iconColor}}
      >
        <Icon size={20} />
      </div>
      <div className="text-3xl font-bold text-[#09637e]">{count}</div>
      <div className="mt-1 text-sm text-[var(--color-text-secondary)]">{label}</div>
      <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-600">
        <TrendingUp size={12} />
        {change}
      </div>
    </div>
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
      <div className="w-20 shrink-0 text-right text-xs text-[var(--color-text-secondary)]">{label}</div>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#ebf4f6]">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{width: `${width}%`, background: color}}
        />
      </div>
      <div className="w-6 shrink-0 text-xs text-[var(--color-text-secondary)]">{value}</div>
    </div>
  );
}

const now = Date.now();

export default function DashboardPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('dashboard');
  const common = useTranslations('common');

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

  const tagClass: Record<string, string> = {
    Job: 'bg-[#d1eef2] text-[#09637e]',
    Internship: 'bg-[#ede9fe] text-purple-700',
    Scholarship: 'bg-[#fef3c7] text-yellow-700',
    Remote: 'bg-[#d1fae5] text-green-700',
    Training: 'bg-[#fee2e2] text-red-700',
    Volunteer: 'bg-[#e0e7ff] text-indigo-700',
    Course: 'bg-[#fce7f3] text-pink-700',
  };

  // Map برای تبدیل نام‌ها به کلیدهای ترجمه
  const typeKeys: Record<string, string> = {
    'Remote': 'remote',
    'On-site': 'onSite',
    'Hybrid': 'hybrid',
  };

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
          <div
            className="mb-8 flex items-center justify-between"
            style={{animation: 'fadeSlideIn 0.4s ease forwards'}}
          >
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

          {/* Flow line */}
          <div className="flow-line mb-8 h-0.5 w-full rounded-full" />

          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard icon={LayoutGrid} num={120} label={t('total')} change="+12 this month" iconBg="#d1eef2" iconColor="#09637e" delay={100} />
            <StatCard icon={Briefcase} num={45} label={t('jobs')} change="+5 this week" iconBg="#ede9fe" iconColor="#7c3aed" delay={200} />
            <StatCard icon={GraduationCap} num={28} label={t('scholarships')} change="+3 this week" iconBg="#fef3c7" iconColor="#92400e" delay={300} />
            <StatCard icon={Globe} num={14} label={t('remote')} change="+2 this week" iconBg="#d1fae5" iconColor="#065f46" delay={400} />
          </div>

          {/* Charts row */}
          <div className="mb-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">

            {/* Bar chart */}
            <div
              className="rounded-2xl border border-[#d1eef2] bg-white p-6"
              style={{animation: 'fadeSlideIn 0.5s ease 0.4s forwards', opacity: 0}}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-semibold text-[#09637e]">{t('categoryChart')}</h2>
                <span className="text-xs text-[var(--color-text-secondary)]">{t('thisMonth')}</span>
              </div>
              <div className="flex flex-col gap-4">
                {categoryData.map((item, i) => (
                  <BarRow key={item.label} {...item} delay={600 + i * 100} />
                ))}
              </div>
            </div>

            {/* Donut chart */}
            <div
              className="rounded-2xl border border-[#d1eef2] bg-white p-6"
              style={{animation: 'fadeSlideIn 0.5s ease 0.5s forwards', opacity: 0}}
            >
              <h2 className="mb-4 font-semibold text-[#09637e]">{t('typeChart')}</h2>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    animationBegin={600}
                    animationDuration={1000}
                  >
                    {typeData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-col gap-2">
                {typeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    <div className="h-2.5 w-2.5 rounded-full" style={{background: item.color}} />
                    {common(typeKeys[item.name] || item.name.toLowerCase())} ({item.value}%)
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">

            {/* Recent */}
            <div
              className="rounded-2xl border border-[#d1eef2] bg-white p-6"
              style={{animation: 'fadeSlideIn 0.5s ease 0.6s forwards', opacity: 0}}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-[#09637e]">{t('recent')}</h2>
                <span className="text-xs text-[var(--color-text-secondary)]">{t('latest5')}</span>
              </div>
              <div className="flex flex-col">
                {recent.map((o) => (
                  <div key={o.id} className="flex items-center justify-between border-b border-[#f3f4f6] py-3 last:border-none">
                    <div>
                      <div className="text-sm font-medium text-[var(--color-text-primary)]">{o.title}</div>
                      <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{o.organization}</div>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tagClass[o.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {o.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expiring */}
            <div
              className="rounded-2xl border border-[#fed7aa] bg-[#fff7ed] p-6"
              style={{animation: 'fadeSlideIn 0.5s ease 0.7s forwards', opacity: 0}}
            >
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
                  {expiring.map((o) => (
                    <div key={o.id} className="flex items-center justify-between border-b border-orange-100 py-3 last:border-none">
                      <div>
                        <div className="text-sm font-medium text-[var(--color-text-primary)]">{o.title}</div>
                        <div className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{o.organization}</div>
                      </div>
                      <span className="rounded-full border border-orange-200 bg-white px-2.5 py-1 text-xs font-semibold text-orange-600">
                        {o.daysLeft === 0 ? t('today') : `${o.daysLeft}d ${t('left')}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>
      </main>
    </>
  );
}