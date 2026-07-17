'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bookmark, ArrowRight, Building2, Clock, MapPin, BookmarkX, AlertCircle } from 'lucide-react';
import { useSavedOpportunities } from '@/context/SavedOpportunitiesContext';
import { useOpportunities } from '@/context/OpportunitiesContext';

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
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-20 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500">
        <AlertCircle size={32} />
      </div>
      <h2 className="text-xl font-bold text-red-700">Failed to load saved opportunities</h2>
      <p className="mt-2 max-w-sm text-sm text-red-600">
        There was a problem loading your saved opportunities. Please try again.
      </p>
      <button
        onClick={onRetry}
        className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
      >
        Try again
      </button>
    </div>
  );
}

export default function SavedPage() {
  const { savedIds, toggleSave } = useSavedOpportunities();
  const { opportunities, loading, error, refreshOpportunities } = useOpportunities();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';

  const savedOpportunities = !loading
    ? opportunities.filter((o) => savedIds.includes(o.id))
    : [];

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-12">
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
                  Loading...
                </div>
                <h1 className="text-3xl font-extrabold text-[var(--color-primary-dark)] md:text-4xl">
                  Saved Opportunities
                </h1>
                <p className="mt-2 text-[var(--color-text-secondary)]">
                  Opportunities you bookmarked for later.
                </p>
              </div>
            </div>
          </div>
          <SavedSkeleton />
        </section>
      </main>
    );
  }

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
                {savedOpportunities.length} saved
              </div>
              <h1 className="text-3xl font-extrabold text-[var(--color-primary-dark)] md:text-4xl">
                Saved Opportunities
              </h1>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                Opportunities you bookmarked for later.
              </p>
            </div>
            <Link
              href={`/${locale}/opportunities`}
              className="hidden items-center gap-2 rounded-xl border border-[#a8d8df] bg-white px-5 py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2] md:flex"
            >
              Browse More
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {savedOpportunities.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#a8d8df] bg-white px-6 py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d1eef2] text-[#09637e]">
              <Bookmark size={32} />
            </div>
            <h2 className="text-xl font-bold text-[var(--color-primary-dark)]">
              No saved opportunities yet
            </h2>
            <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">
              Browse opportunities and click the bookmark icon to save them here for later.
            </p>
            <Link
              href={`/${locale}/opportunities`}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#09637e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Explore Opportunities
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {savedOpportunities.map((opportunity) => (
              <article
                key={opportunity.id}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">
                      {opportunity.category}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-[var(--color-text-primary)]">
                      {opportunity.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSave(opportunity.id)}
                    className="rounded-xl p-2 text-cyan-700 transition hover:bg-red-50 hover:text-red-500"
                    title="Remove from saved"
                  >
                    <BookmarkX size={20} />
                  </button>
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
                    Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
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
                    View
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {savedOpportunities.length > 0 && (
          <div className="mt-8 flex justify-center md:hidden">
            <Link
              href={`/${locale}/opportunities`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#a8d8df] bg-white px-5 py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
            >
              Browse More
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}