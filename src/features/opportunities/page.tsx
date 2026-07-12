'use client';

import Image from 'next/image';
import {useMemo, useState} from 'react';
import Link from 'next/link';
import {Plus} from 'lucide-react';
import {usePathname} from 'next/navigation';

import OpportunityCard from './components/OpportunityCard';
import {useOpportunities} from '@/context/OpportunitiesContext';

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const {opportunities, loading} = useOpportunities();

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title.toLowerCase().includes(search.toLowerCase()) ||
        opportunity.organization.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' ? true : opportunity.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category, opportunities]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-10">
      <section className="container-custom">

        <div className="mb-10">
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
                Opportunities
              </h1>
              <p className="mt-2 text-gray-600">
                Discover jobs, internships, scholarships and remote work opportunities.
              </p>
            </div>
            <Link
              href={`/${locale}/add-opportunity`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#09637e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075a6b]"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add opportunity</span>
              <span className="sm:hidden">Add</span>
            </Link>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-[#d1eef2] bg-white px-4 py-3 outline-none transition focus:border-[#09637e]"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-[#d1eef2] bg-white px-4 py-3 outline-none transition focus:border-[#09637e]"
          >
            <option value="All">All Categories</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-[#d1eef2] bg-white p-6 animate-pulse">
                <div className="h-4 w-24 rounded bg-gray-200 mb-4" />
                <div className="h-6 w-3/4 rounded bg-gray-200 mb-3" />
                <div className="h-4 w-1/2 rounded bg-gray-200 mb-2" />
                <div className="h-4 w-1/3 rounded bg-gray-200 mb-2" />
                <div className="h-4 w-1/4 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-[#a8d8df] p-10 text-center">
            <Image
              src="/illustrations/illustration-opportunities.svg"
              alt="No opportunities found"
              width={180}
              height={140}
              className="mb-4 opacity-70"
            />
            <h2 className="text-xl font-semibold text-[#09637e]">No opportunities found</h2>
            <p className="mt-2 text-gray-600">Try changing your search or filter.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}

      </section>
    </main>
  );
}