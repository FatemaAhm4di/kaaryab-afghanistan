"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowRight,
  Bookmark,
  Building2,
  Clock,
  MapPin
} from 'lucide-react';

import type {Opportunity} from '@/features/opportunities/types';

type OpportunityCardProps = {
  opportunity: Opportunity;
};

export default function OpportunityCard({
  opportunity
}: OpportunityCardProps) {
  const params = useParams() as { locale?: string } | undefined;
  const locale = params?.locale ?? '';
  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">
            {opportunity.category}
          </span>

          <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
            {opportunity.title}
          </h3>
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-gray-500 transition hover:bg-gray-100 hover:text-cyan-700 dark:hover:bg-gray-800"
          aria-label="Save opportunity"
        >
          <Bookmark size={20} />
        </button>
      </div>

      <div className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <Building2 size={16} />
          <span>{opportunity.organization}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{opportunity.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>Deadline: {opportunity.deadline}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {opportunity.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="rounded-full border border-gray-200 px-3 py-1 text-xs font-semibold text-cyan-800 dark:border-gray-700 dark:text-cyan-400">
          {opportunity.type}
        </span>

        <Link
          href={`/${locale}/opportunities/${opportunity.id}`}
          className="flex items-center gap-2 font-semibold text-cyan-800 transition-all duration-200 group-hover:gap-3 dark:text-cyan-400"
        >
          View Details
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}