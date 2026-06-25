'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Bookmark, ArrowRight, Building2, Clock, MapPin, BookmarkX} from 'lucide-react';
import {useSavedOpportunities} from '@/context/SavedOpportunitiesContext';
import {opportunities} from '@/features/opportunities/data';

export default function SavedPage() {
  const {savedIds, toggleSave} = useSavedOpportunities();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const savedOpportunities = mounted
    ? opportunities.filter((o) => savedIds.includes(o.id))
    : [];

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-12">

        <div className="mb-10 flex items-center justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-3 py-1 text-xs font-medium text-[#09637e]">
              <Bookmark size={12} />
              {mounted ? savedOpportunities.length : 0} saved
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

        {!mounted ? (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#d1eef2] border-t-[#09637e]" />
          </div>
        ) : savedOpportunities.length === 0 ? (
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
                    Deadline: {opportunity.deadline}
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

        {mounted && savedOpportunities.length > 0 && (
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