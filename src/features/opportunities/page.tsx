'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import OpportunityCard from './components/OpportunityCard';
import { useOpportunities } from '@/context/OpportunitiesContext';

// لیست کامل ولایات افغانستان
const AFGHAN_PROVINCES = [
  'All',
  'Badakhshan',
  'Badghis',
  'Baghlan',
  'Balkh',
  'Bamyan',
  'Daykundi',
  'Farah',
  'Faryab',
  'Ghazni',
  'Ghor',
  'Helmand',
  'Herat',
  'Jowzjan',
  'Kabul',
  'Kandahar',
  'Kapisa',
  'Khost',
  'Kunar',
  'Kunduz',
  'Laghman',
  'Logar',
  'Nangarhar',
  'Nimroz',
  'Nuristan',
  'Paktia',
  'Paktika',
  'Panjshir',
  'Parwan',
  'Samangan',
  'Sare Pol',
  'Takhar',
  'Uruzgan',
  'Wardak',
  'Zabul',
];

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [deadlineFilter, setDeadlineFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const { opportunities, loading } = useOpportunities();

  const uniqueLocations = useMemo(() => {
    const dbLocations = new Set(opportunities.map((opp) => opp.location));
    const allLocations = new Set([...AFGHAN_PROVINCES, ...dbLocations]);
    return ['All', ...Array.from(allLocations).filter((loc) => loc !== 'All')];
  }, [opportunities]);

  const hasActiveFilters = location !== 'All' || type !== 'All' || deadlineFilter !== 'All';

  const clearFilters = () => {
    setLocation('All');
    setType('All');
    setDeadlineFilter('All');
  };

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title.toLowerCase().includes(search.toLowerCase()) ||
        opportunity.organization.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === 'All' ? true : opportunity.category === category;

      const matchesLocation = location === 'All' ? true : opportunity.location === location;

      const matchesType = type === 'All' ? true : opportunity.type === type;

      let matchesDeadline = true;
      if (deadlineFilter === 'This week') {
        const now = new Date();
        const weekLater = new Date();
        weekLater.setDate(now.getDate() + 7);
        const deadline = new Date(opportunity.deadline);
        matchesDeadline = deadline >= now && deadline <= weekLater;
      } else if (deadlineFilter === 'This month') {
        const now = new Date();
        const monthLater = new Date();
        monthLater.setMonth(now.getMonth() + 1);
        const deadline = new Date(opportunity.deadline);
        matchesDeadline = deadline >= now && deadline <= monthLater;
      } else if (deadlineFilter === 'Expired') {
        const now = new Date();
        const deadline = new Date(opportunity.deadline);
        matchesDeadline = deadline < now;
      } else if (deadlineFilter === 'Upcoming') {
        const now = new Date();
        const deadline = new Date(opportunity.deadline);
        matchesDeadline = deadline >= now;
      }

      return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesDeadline;
    });
  }, [search, category, location, type, deadlineFilter, opportunities]);

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

        <div className="mb-4 grid gap-4 md:grid-cols-2">
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
            <option value="Training">Training</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Course">Course</option>
          </select>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#09637e] transition hover:text-[#075a6b]"
        >
          {showFilters ? 'Hide filters' : 'Show more filters'}
          <span className="text-xs">▼</span>
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-[#09637e] px-2 py-0.5 text-xs text-white">
              {filteredOpportunities.length}
            </span>
          )}
        </button>

        {showFilters && (
          <div className="mb-6 grid gap-4 rounded-2xl border border-[#d1eef2] bg-white p-4 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 outline-none transition focus:border-[#09637e]"
              >
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">Work Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 outline-none transition focus:border-[#09637e]"
              >
                <option value="All">All Types</option>
                <option value="Remote">Remote</option>
                <option value="OnSite">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">Deadline</label>
              <select
                value={deadlineFilter}
                onChange={(e) => setDeadlineFilter(e.target.value)}
                className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 outline-none transition focus:border-[#09637e]"
              >
                <option value="All">All Deadlines</option>
                <option value="This week">This week</option>
                <option value="This month">This month</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            {hasActiveFilters && (
              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-sm text-[#09637e] transition hover:text-[#075a6b]"
                >
                  <X size={16} />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-[#d1eef2] bg-white p-6">
                <div className="mb-4 h-4 w-24 rounded bg-gray-200" />
                <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />
                <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
                <div className="mb-2 h-4 w-1/3 rounded bg-gray-200" />
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
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-[#09637e] px-6 py-2 text-sm text-white transition hover:bg-[#075a6b]"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}

        {!loading && filteredOpportunities.length > 0 && (
          <p className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredOpportunities.length} of {opportunities.length} opportunities
          </p>
        )}
      </section>
    </main>
  );
}