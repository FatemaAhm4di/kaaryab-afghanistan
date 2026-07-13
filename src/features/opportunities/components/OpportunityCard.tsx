'use client';

import Link from 'next/link';
import {ArrowRight, Bookmark, Building2, Clock, MapPin, Pencil, Trash2} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import type {Opportunity} from '@/features/opportunities/types';
import {useSavedOpportunities} from '@/context/SavedOpportunitiesContext';
import {useOpportunities} from '@/context/OpportunitiesContext';
import {useTheme} from '@/context/ThemeContext';

type Props = {
  opportunity: Opportunity;
};

const categoryColors: Record<string, {bg: string; text: string; darkBg: string; darkText: string}> = {
  Job: {bg: '#d1eef2', text: '#09637e', darkBg: '#1e3a4a', darkText: '#38bdf8'},
  Internship: {bg: '#ede9fe', text: '#5b21b6', darkBg: '#2e1065', darkText: '#a78bfa'},
  Scholarship: {bg: '#fef3c7', text: '#92400e', darkBg: '#3d2000', darkText: '#fbbf24'},
  Remote: {bg: '#d1fae5', text: '#065f46', darkBg: '#052e16', darkText: '#34d399'},
  Training: {bg: '#ffedd5', text: '#9a3412', darkBg: '#3d1200', darkText: '#fb923c'},
  Volunteer: {bg: '#fce7f3', text: '#9d174d', darkBg: '#3d0020', darkText: '#f472b6'},
  Course: {bg: '#dbeafe', text: '#1e40af', darkBg: '#1e1b4b', darkText: '#60a5fa'},
};

function DeadlineCountdown({deadline}: {deadline: string}) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpiringSoon, setIsExpiringSoon] = useState(false);

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) {setTimeLeft('Expired'); return;}
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

export default function OpportunityCard({opportunity}: Props) {
  const {toggleSave, isSaved} = useSavedOpportunities();
  const {deleteOpportunity} = useOpportunities();
  const {theme} = useTheme();
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
      <article
        style={{
          background: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e5e7eb',
        }}
        className="group rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      >

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span
              style={{
                backgroundColor: isDark ? (colors?.darkBg ?? '#1e293b') : (colors?.bg ?? '#f3f4f6'),
                color: isDark ? (colors?.darkText ?? '#cbd5e1') : (colors?.text ?? '#374151'),
              }}
              className="rounded-full px-3 py-1 text-xs font-semibold"
            >
              {opportunity.category}
            </span>
            <h3
              style={{color: isDark ? '#f1f5f9' : '#1f2937'}}
              className="mt-3 text-lg font-bold leading-snug"
            >
              {opportunity.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => toggleSave(opportunity.id)}
            style={{color: saved ? '#09637e' : (isDark ? '#64748b' : '#9ca3af')}}
            className="shrink-0 p-2 rounded-xl transition hover:bg-gray-100"
          >
            <Bookmark size={18} className={saved ? 'fill-current' : ''} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 text-sm" style={{color: isDark ? '#94a3b8' : '#6b7280'}}>
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
        </div>

        <div className="mt-5 flex items-center justify-between">
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
            <Link
              href={`/${locale}/opportunities/${opportunity.id}/edit`}
              style={{color: isDark ? '#64748b' : '#9ca3af'}}
              className="flex items-center gap-1 rounded-lg p-1.5 transition hover:bg-[#d1eef2] hover:text-[#09637e]"
              title="Edit"
            >
              <Pencil size={15} />
            </Link>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              style={{color: isDark ? '#64748b' : '#9ca3af'}}
              className="flex items-center gap-1 rounded-lg p-1.5 transition hover:bg-red-50 hover:text-red-500"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
            <Link
              href={`/${locale}/opportunities/${opportunity.id}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#09637e] hover:gap-2.5 transition-all"
            >
              View
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </article>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            style={{background: isDark ? '#1e293b' : '#ffffff', borderColor: isDark ? '#334155' : '#d1eef2'}}
            className="mx-4 w-full max-w-sm rounded-2xl border p-6 shadow-xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 style={{color: isDark ? '#f1f5f9' : '#1f2937'}} className="mb-2 text-lg font-bold">
              Delete opportunity?
            </h3>
            <p style={{color: isDark ? '#94a3b8' : '#6b7280'}} className="mb-6 text-sm">
              This will permanently delete <strong style={{color: isDark ? '#f1f5f9' : '#1f2937'}}>{opportunity.title}</strong>. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 rounded-xl border border-[#d1eef2] py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}