'use client';

import Image from 'next/image';
import {useState} from 'react';
import {Plus, Send, X} from 'lucide-react';
import {usePathname, useRouter} from 'next/navigation';
import {useOpportunities} from '@/context/OpportunitiesContext';

const inputClass =
  'w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm text-[#1f2937] outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]';

export default function AddOpportunityPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const router = useRouter();
  const {createOpportunity} = useOpportunities();

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    organization: '',
    category: 'Job',
    type: 'Remote',
    location: '',
    deadline: '',
    description: '',
    requirements: '',
    applyLink: '',
  });

  const set = (key: string, value: string) => {
    setForm((prev) => ({...prev, [key]: value}));
    setErrors((prev) => ({...prev, [key]: ''}));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput('');
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title) e.title = 'Title is required';
    if (!form.organization) e.organization = 'Organization is required';
    if (!form.location) e.location = 'Location is required';
    if (!form.deadline) e.deadline = 'Deadline is required';
    if (!form.description) e.description = 'Description is required';
    if (!form.applyLink) e.applyLink = 'Apply link is required';
    if (form.applyLink && !form.applyLink.startsWith('http'))
      e.applyLink = 'Must be a valid URL starting with http';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }

    setSubmitting(true);
    await createOpportunity({
      title: form.title,
      organization: form.organization,
      category: form.category as any,
      type: form.type as any,
      location: form.location,
      deadline: form.deadline,
      description: form.description,
      requirements: form.requirements.split('\n').filter(Boolean),
      applyLink: form.applyLink,
      tags,
      featured: false,
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-16">
          <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-[#d1eef2] bg-white py-16 text-center">
            <Image
              src="/illustrations/illustration-add-opportunity.svg"
              alt="Opportunity submitted"
              width={200}
              height={160}
              className="mb-6"
            />
            <h2 className="mb-2 text-xl font-bold text-[#09637e]">Opportunity submitted!</h2>
            <p className="mb-6 max-w-xs text-sm text-[var(--color-text-secondary)]">
              Thank you for sharing. It will be reviewed and listed shortly.
            </p>
            <button
              onClick={() => router.push(`/${locale}/opportunities`)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#09637e] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Browse opportunities
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-16">

        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex flex-col items-center text-center">
            <Image
              src="/illustrations/illustration-add-opportunity.svg"
              alt="Add an opportunity"
              width={220}
              height={180}
              className="mb-6"
            />
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-4 py-2 text-sm font-medium text-[#09637e]">
              <Plus size={14} />
              New listing
            </div>
            <h1 className="mb-3 text-3xl font-extrabold text-[#09637e] md:text-4xl">
              Add an opportunity
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Share a job, scholarship, internship, or remote work opportunity with Afghan youth.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-[#d1eef2] bg-white p-8">
            <p className="mb-6 text-xs text-[var(--color-text-secondary)]">
              Fields marked with <span className="text-red-500">*</span> are required.
            </p>

            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              Basic information
            </p>

            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Title <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="e.g. Frontend Developer Intern" value={form.title} onChange={(e) => set('title', e.target.value)} className={inputClass} />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Organization <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="e.g. Kabul Tech Community" value={form.organization} onChange={(e) => set('organization', e.target.value)} className={inputClass} />
                {errors.organization && <p className="mt-1 text-xs text-red-500">{errors.organization}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Category <span className="text-red-500">*</span></label>
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputClass}>
                  <option>Job</option>
                  <option>Internship</option>
                  <option>Scholarship</option>
                  <option>Remote</option>
                  <option>Training</option>
                  <option>Volunteer</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Type <span className="text-red-500">*</span></label>
                <select value={form.type} onChange={(e) => set('type', e.target.value)} className={inputClass}>
                  <option value="Remote">Remote</option>
                  <option value="OnSite">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Location <span className="text-red-500">*</span></label>
                <input type="text" placeholder="e.g. Kabul or Online" value={form.location} onChange={(e) => set('location', e.target.value)} className={inputClass} />
                {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Deadline <span className="text-red-500">*</span></label>
                <input type="date" value={form.deadline} onChange={(e) => set('deadline', e.target.value)} className={inputClass} />
                {errors.deadline && <p className="mt-1 text-xs text-red-500">{errors.deadline}</p>}
              </div>
            </div>

            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              Details
            </p>

            <div className="mb-4 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Description <span className="text-red-500">*</span></label>
                <textarea rows={4} placeholder="Describe the opportunity in a few sentences..." value={form.description} onChange={(e) => set('description', e.target.value)} className={`${inputClass} resize-none`} />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Requirements
                  <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">(one per line)</span>
                </label>
                <textarea rows={3} placeholder="Basic React" value={form.requirements} onChange={(e) => set('requirements', e.target.value)} className={`${inputClass} resize-none`} />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Apply link <span className="text-red-500">*</span></label>
                <input type="url" placeholder="https://..." value={form.applyLink} onChange={(e) => set('applyLink', e.target.value)} className={inputClass} />
                {errors.applyLink && <p className="mt-1 text-xs text-red-500">{errors.applyLink}</p>}
              </div>
            </div>

            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              Tags
            </p>

            <div className="mb-8 flex flex-wrap gap-2 rounded-xl border border-[#d1eef2] bg-white p-3">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 rounded-full bg-[#d1eef2] px-3 py-1 text-xs font-medium text-[#09637e]">
                  {tag}
                  <button type="button" onClick={() => setTags(tags.filter((t) => t !== tag))}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add a tag and press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="min-w-[140px] flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-text-secondary)]"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border border-[#d1eef2] bg-white px-6 py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-[#09637e] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Send size={15} />
                )}
                {submitting ? 'Submitting...' : 'Submit opportunity'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}