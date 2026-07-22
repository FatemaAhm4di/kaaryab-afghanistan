'use client';

import Link from 'next/link';
import { ArrowRight, Bookmark, Building2, Clock, MapPin, Pencil, Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Opportunity } from '@/features/opportunities/types';
import { useSavedOpportunities } from '@/context/SavedOpportunitiesContext';
import { useOpportunities } from '@/context/OpportunitiesContext';
import { useTheme } from '@/context/ThemeContext';

type Props = {
  opportunity: Opportunity;
};

const categoryColors: Record<string, { bg: string; text: string; darkBg: string; darkText: string }> = {
  Job: { bg: '#d1eef2', text: '#09637e', darkBg: '#1e3a4a', darkText: '#38bdf8' },
  Internship: { bg: '#ede9fe', text: '#5b21b6', darkBg: '#2e1065', darkText: '#a78bfa' },
  Scholarship: { bg: '#fef3c7', text: '#92400e', darkBg: '#3d2000', darkText: '#fbbf24' },
  Remote: { bg: '#d1fae5', text: '#065f46', darkBg: '#052e16', darkText: '#34d399' },
  Training: { bg: '#ffedd5', text: '#9a3412', darkBg: '#3d1200', darkText: '#fb923c' },
  Volunteer: { bg: '#fce7f3', text: '#9d174d', darkBg: '#3d0020', darkText: '#f472b6' },
  Course: { bg: '#dbeafe', text: '#1e40af', darkBg: '#1e1b4b', darkText: '#60a5fa' },
};

function DeadlineCountdown({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Expired'); return; }
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setIsExpiringSoon(days <= 7);
      setTimeLeft(days === 1 ? '1 day left' : `${days} days left`);
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <span className={`text-xs font-medium ${isExpiringSoon ? 'text-red-500' : 'text-gray-500'}`}>
      {isExpiringSoon && timeLeft !== 'Expired' && (
        <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
      )}
      {timeLeft}
    </span>
  );
}

export default function OpportunityCard({ opportunity }: Props) {
  const { toggleSave, isSaved } = useSavedOpportunities();
  const { deleteOpportunity } = useOpportunities();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const [mounted, setMounted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => setMounted(true), []);

  const saved = mounted ? isSaved(opportunity.id) : false;

  const handleDelete = async () => {
    setDeleting(true);
    await deleteOpportunity(opportunity.id);
    setDeleting(false);
    setShowDeleteModal(false);
  };

  const colors = categoryColors[opportunity.category];

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e5e7eb',
        }}
        className="group rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              style={{
                backgroundColor: isDark ? (colors?.darkBg ?? '#1e293b') : (colors?.bg ?? '#f3f4f6'),
                color: isDark ? (colors?.darkText ?? '#cbd5e1') : (colors?.text ?? '#374151'),
              }}
              className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
            >
              {opportunity.category}
            </motion.span>
            <h3
              style={{ color: isDark ? '#f1f5f9' : '#1f2937' }}
              className="mt-3 text-lg font-bold leading-snug"
            >
              {opportunity.title}
            </h3>
          </div>

          <motion.button
            type="button"
            onClick={() => toggleSave(opportunity.id)}
            whileTap={{ scale: 0.8 }}
            style={{ color: saved ? '#09637e' : (isDark ? '#64748b' : '#9ca3af') }}
            className="shrink-0 p-2 rounded-xl transition hover:bg-gray-100"
          >
            <Bookmark size={18} className={saved ? 'fill-current' : ''} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex flex-col gap-1.5 text-sm"
          style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
        >
          <div className="flex items-center gap-2">
            <Building2 size={14} className="shrink-0" />
            <span className="truncate">{opportunity.organization}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="shrink-0" />
            {opportunity.location}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="shrink-0" />
            <DeadlineCountdown deadline={opportunity.deadline} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 flex items-center justify-between"
        >
          <span
            style={{
              backgroundColor: isDark ? '#1e3a4a' : '#f0fafa',
              color: isDark ? '#38bdf8' : '#09637e',
              border: `1px solid ${isDark ? '#1e3a4a' : '#d1eef2'}`,
            }}
            className="rounded-full px-2.5 py-1 text-xs font-medium"
          >
            {opportunity.type}
          </span>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 30 }} transition={{ duration: 0.2 }}>
              <Link
                href={`/${locale}/opportunities/${opportunity.id}/edit`}
                style={{ color: isDark ? '#64748b' : '#9ca3af' }}
                className="flex items-center gap-1 rounded-lg p-1.5 transition hover:bg-[#d1eef2] hover:text-[#09637e]"
                title="Edit"
              >
                <Pencil size={15} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                style={{ color: isDark ? '#64748b' : '#9ca3af' }}
                className="flex items-center gap-1 rounded-lg p-1.5 transition hover:bg-red-50 hover:text-red-500"
                title="Delete"
              >
                <Trash2 size={15} />
              </button>
            </motion.div>
            <Link
              href={`/${locale}/opportunities/${opportunity.id}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#09637e] hover:gap-2.5 transition-all"
            >
              View
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </motion.article>

      {/* Delete Modal with Animation */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              style={{ background: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#d1eef2' }}
              className="mx-4 w-full max-w-sm rounded-2xl border p-6 shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50"
              >
                <Trash2 size={22} className="text-red-500" />
              </motion.div>
              <h3 style={{ color: isDark ? '#f1f5f9' : '#1f2937' }} className="mb-2 text-lg font-bold">
                Delete opportunity?
              </h3>
              <p style={{ color: isDark ? '#94a3b8' : '#6b7280' }} className="mb-6 text-sm">
                This will permanently delete <strong style={{ color: isDark ? '#f1f5f9' : '#1f2937' }}>{opportunity.title}</strong>. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 rounded-xl border border-[#d1eef2] py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}