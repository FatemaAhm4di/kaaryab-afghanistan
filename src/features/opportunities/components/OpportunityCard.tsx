'use client';

import Link from 'next/link';
import {ArrowRight, Bookmark, Building2, Clock, MapPin, Pencil, Trash2} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import type {Opportunity} from '@/features/opportunities/types';
import {useSavedOpportunities} from '@/context/SavedOpportunitiesContext';
import {useOpportunities} from '@/context/OpportunitiesContext';

type Props = {
  opportunity: Opportunity;
};

const categoryColors: Record<string, string> = {
  Job: 'bg-[#d1eef2] text-[#09637e]',
  Internship: 'bg-purple-100 text-purple-700',
  Scholarship: 'bg-yellow-100 text-yellow-700',
  Remote: 'bg-green-100 text-green-700',
  Training: 'bg-orange-100 text-orange-700',
  Volunteer: 'bg-pink-100 text-pink-700',
  Course: 'bg-blue-100 text-blue-700',
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

  return (
    <>
      <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[opportunity.category] ?? 'bg-gray-100 text-gray-700'}`}>
              {opportunity.category}
            </span>
            <h3 className="mt-3 text-lg font-bold leading-snug text-[var(--color-text-primary)]">
              {opportunity.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => toggleSave(opportunity.id)}
            className="shrink-0 p-2 rounded-xl hover:bg-gray-100 transition"
          >
            <Bookmark
              size={18}
              className={saved ? 'text-[#09637e] fill-current' : 'text-gray-400'}
            />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 text-sm text-gray-500">
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
          <span className="rounded-full bg-[#f0fafa] border border-[#d1eef2] px-2.5 py-1 text-xs font-medium text-[#09637e]">
            {opportunity.type}
          </span>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/opportunities/${opportunity.id}/edit`}
              className="flex items-center gap-1 rounded-lg p-1.5 text-gray-400 hover:bg-[#d1eef2] hover:text-[#09637e] transition"
              title="Edit"
            >
              <Pencil size={15} />
            </Link>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-1 rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-sm rounded-2xl border border-[#d1eef2] bg-white p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-[var(--color-text-primary)]">
              Delete opportunity?
            </h3>
            <p className="mb-6 text-sm text-gray-500">
              This will permanently delete <strong>{opportunity.title}</strong>. This action cannot be undone.
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