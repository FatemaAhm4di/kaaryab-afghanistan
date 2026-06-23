'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Bookmark,
  Building2,
  Clock,
  MapPin
} from 'lucide-react';

import type { Opportunity } from '@/features/opportunities/types';
import { useSavedOpportunities } from '@/context/SavedOpportunitiesContext';

type Props = {
  opportunity: Opportunity;
};

export default function OpportunityCard({ opportunity }: Props) {
  const { toggleSave, isSaved } = useSavedOpportunities();

  const saved = isSaved(opportunity.id);

  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">
            {opportunity.category}
          </span>

          <h3 className="mt-4 text-xl font-bold">
            {opportunity.title}
          </h3>
        </div>

        {/* wrapper fix for hydration */}
        <button
          type="button"
          onClick={() => toggleSave(opportunity.id)}
          className="p-2 rounded-xl hover:bg-gray-100"
        >
          <span className={saved ? 'text-cyan-600' : 'text-gray-500'}>
            <Bookmark size={20} />
          </span>
        </button>
      </div>

      <div className="mt-5 text-sm text-gray-600">
        <div className="flex gap-2">
          <Building2 size={16} />
          {opportunity.organization}
        </div>

        <div className="flex gap-2">
          <MapPin size={16} />
          {opportunity.location}
        </div>

        <div className="flex gap-2">
          <Clock size={16} />
          Deadline: {opportunity.deadline}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <span className="text-xs font-semibold text-cyan-700">
          {opportunity.type}
        </span>

        <Link
          href={`/opportunities/${opportunity.id}`}
          className="flex items-center gap-2 font-semibold text-cyan-700"
        >
          View
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}