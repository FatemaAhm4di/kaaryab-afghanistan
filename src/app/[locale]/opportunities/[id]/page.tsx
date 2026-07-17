'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Briefcase, MapPin, Calendar, Tag } from 'lucide-react';

type Opportunity = {
  id: string;
  title: string;
  organization: string;
  category: string;
  location: string;
  type: string;
  deadline: string;
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
  featured?: boolean;
};

function OpportunitySkeleton() {
  return (
    <main className="container-custom py-10 animate-pulse">
      <div className="h-5 w-32 rounded-lg bg-gray-200 mb-6" />
      <div className="h-8 w-3/4 rounded-lg bg-gray-200 mb-2" />
      <div className="h-5 w-1/2 rounded-lg bg-gray-200 mb-8" />
      <div className="flex flex-wrap gap-2 mb-8">
        <div className="h-6 w-20 rounded-full bg-gray-200" />
        <div className="h-6 w-28 rounded-full bg-gray-200" />
        <div className="h-6 w-16 rounded-full bg-gray-200" />
      </div>
      <div className="h-6 w-32 rounded-lg bg-gray-200 mb-3" />
      <div className="h-24 w-full rounded-2xl bg-gray-200 mb-8" />
      <div className="h-6 w-40 rounded-lg bg-gray-200 mb-3" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded-lg bg-gray-200" />
        <div className="h-4 w-3/4 rounded-lg bg-gray-200" />
        <div className="h-4 w-1/2 rounded-lg bg-gray-200" />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
        <div className="h-5 w-32 rounded-lg bg-gray-200" />
        <div className="flex gap-3">
          <div className="h-10 w-28 rounded-xl bg-gray-200" />
          <div className="h-10 w-20 rounded-xl bg-gray-200" />
        </div>
      </div>
    </main>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <main className="container-custom py-20">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 text-6xl">😕</div>
        <h2 className="text-2xl font-bold text-[#09637e]">Something went wrong</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <button
          onClick={onRetry}
          className="mt-6 rounded-xl bg-[#09637e] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075a6b]"
        >
          Try again
        </button>
        <Link
          href="/opportunities"
          className="mt-4 block text-sm text-[#09637e] transition hover:text-[#075a6b]"
        >
          ← Back to opportunities
        </Link>
      </div>
    </main>
  );
}

export default function OpportunityPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'fa';
  const id = params.id as string;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunity = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/opportunities/${id}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError('Opportunity not found');
        } else {
          setError('Failed to load opportunity');
        }
        return;
      }
      const data = await res.json();
      setOpportunity(data);
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  // Loading
  if (loading) {
    return <OpportunitySkeleton />;
  }

  // Error
  if (error) {
    return <ErrorState message={error} onRetry={fetchOpportunity} />;
  }

  // Not found
  if (!opportunity) {
    return (
      <main className="container-custom py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 text-6xl">🔍</div>
          <h2 className="text-2xl font-bold text-[#09637e]">Opportunity not found</h2>
          <p className="mt-2 text-gray-600">
            The opportunity youre looking for doesnt exist or has been removed.
          </p>
          <Link
            href={`/${locale}/opportunities`}
            className="mt-6 inline-block rounded-xl bg-[#09637e] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075a6b]"
          >
            Browse opportunities
          </Link>
        </div>
      </main>
    );
  }

  // Success
  return (
    <main className="container-custom py-10">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-sm text-[#09637e] transition hover:text-[#075a6b]"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#09637e] md:text-4xl">
              {opportunity.title}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-gray-600">
              <Briefcase size={16} />
              {opportunity.organization}
              <span className="mx-1">•</span>
              <MapPin size={16} />
              {opportunity.location}
            </p>
          </div>
          <span className="rounded-full bg-[#d1eef2] px-4 py-1.5 text-sm font-medium text-[#09637e]">
            {opportunity.category}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-8 flex flex-wrap gap-2">
        <span className="rounded-full bg-[#ebf4f6] px-3 py-1 text-xs font-medium text-[#09637e]">
          {opportunity.type}
        </span>
        <span className="rounded-full bg-[#ebf4f6] px-3 py-1 text-xs font-medium text-[#09637e]">
          <Calendar size={12} className="inline mr-1" />
          {new Date(opportunity.deadline).toLocaleDateString()}
        </span>
        {opportunity.tags?.map((tag) => (
          <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
            <Tag size={10} className="inline mr-1" />
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-[#09637e]">Description</h2>
        <div className="rounded-2xl border border-[#d1eef2] bg-white p-6">
          <p className="text-gray-700 leading-relaxed">{opportunity.description}</p>
        </div>
      </section>

      {/* Requirements */}
      <section className="mb-8">
        <h2 className="mb-3 text-xl font-semibold text-[#09637e]">Requirements</h2>
        <div className="rounded-2xl border border-[#d1eef2] bg-white p-6">
          <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
            {opportunity.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Apply Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
        <div>
          <p className="text-sm text-gray-500">Ready to apply?</p>
          <p className="font-medium text-[#09637e]">{opportunity.organization}</p>
        </div>
        <div className="flex gap-3">
          <a
            href={opportunity.applyLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-[#09637e] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075a6b]"
          >
            Apply Now →
          </a>
          <Link
            href={`/${locale}/opportunities`}
            className="rounded-xl border border-[#d1eef2] px-6 py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
          >
            Back
          </Link>
        </div>
      </div>
    </main>
  );
}