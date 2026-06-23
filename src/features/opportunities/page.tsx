'use client';

import {useMemo, useState} from 'react';

import OpportunityCard from './components/OpportunityCard';
import {opportunities} from './data';

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        opportunity.organization
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === 'All'
          ? true
          : opportunity.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const hasFilters =
    search.trim() !== '' || category !== 'All';

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-10">
      <section className="container-custom">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[var(--color-primary-dark)] md:text-4xl">
            Opportunities
          </h1>

          <p className="mt-2 text-gray-600">
            Discover jobs, internships, scholarships and remote work opportunities.
          </p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-600"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-cyan-600"
          >
            <option value="All">All Categories</option>
            <option value="Job">Job</option>
            <option value="Internship">Internship</option>
            <option value="Scholarship">Scholarship</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            {filteredOpportunities.length} opportunities found
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
            <h2 className="text-xl font-semibold">
              No opportunities found
            </h2>

            <p className="mt-2 text-gray-600">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}