'use client';

import {useState, useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useOpportunities} from '@/context/OpportunitiesContext';
import {ArrowLeft, Save, X} from 'lucide-react';
import Link from 'next/link';

const schema = z.object({
  title: z.string().min(3, 'Title is required'),
  organization: z.string().min(2, 'Organization is required'),
  category: z.enum(['Job', 'Internship', 'Scholarship', 'Remote', 'Training', 'Volunteer', 'Course']),
  type: z.enum(['Remote', 'OnSite', 'Hybrid']),
  location: z.string().min(2, 'Location is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  description: z.string().min(10, 'Description is required'),
  requirements: z.string().optional(),
  applyLink: z.string().url('Must be a valid URL').or(z.literal('#')),
  tags: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  'w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm text-[#1f2937] outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]';

export default function EditOpportunityPage({params}: {params: Promise<{id: string}>}) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const router = useRouter();
  const {opportunities, updateOpportunity} = useOpportunities();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState('');

  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    params.then(({id: resolvedId}) => {
      setId(resolvedId);
      const opportunity = opportunities.find((o) => o.id === resolvedId);
      if (opportunity) {
        reset({
          title: opportunity.title,
          organization: opportunity.organization,
          category: opportunity.category as FormData['category'],
          type: opportunity.type as FormData['type'],
          location: opportunity.location,
          deadline: opportunity.deadline?.split('T')[0] ?? '',
          description: opportunity.description,
          requirements: opportunity.requirements?.join('\n') ?? '',
          applyLink: opportunity.applyLink,
          tags: opportunity.tags?.join(', ') ?? '',
        });
        setLoading(false);
      }
    });
  }, [params, opportunities, reset]);

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    await updateOpportunity(id, {
      ...data,
      requirements: data.requirements ? data.requirements.split('\n').filter(Boolean) : [],
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    });
    setSaving(false);
    router.push(`/${locale}/opportunities`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#d1eef2] border-t-[#09637e]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-12">

        <div className="mb-8">
          <Link href={`/${locale}/opportunities`} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#09637e]">
            <ArrowLeft size={16} />
            Back to opportunities
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-[#09637e]">Edit opportunity</h1>
            <p className="mt-2 text-[var(--color-text-secondary)]">Update the details of this opportunity.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-[#d1eef2] bg-white p-8">

            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              Basic information
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Title <span className="text-red-500">*</span></label>
                <input type="text" {...register('title')} className={inputClass} />
                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Organization <span className="text-red-500">*</span></label>
                <input type="text" {...register('organization')} className={inputClass} />
                {errors.organization && <p className="mt-1 text-xs text-red-500">{errors.organization.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Category <span className="text-red-500">*</span></label>
                <select {...register('category')} className={inputClass}>
                  <option value="Job">Job</option>
                  <option value="Internship">Internship</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Remote">Remote</option>
                  <option value="Training">Training</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Course">Course</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Type <span className="text-red-500">*</span></label>
                <select {...register('type')} className={inputClass}>
                  <option value="Remote">Remote</option>
                  <option value="OnSite">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Location <span className="text-red-500">*</span></label>
                <input type="text" {...register('location')} className={inputClass} />
                {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Deadline <span className="text-red-500">*</span></label>
                <input type="date" {...register('deadline')} className={inputClass} />
                {errors.deadline && <p className="mt-1 text-xs text-red-500">{errors.deadline.message}</p>}
              </div>
            </div>

            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              Details
            </p>

            <div className="mb-6 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Description <span className="text-red-500">*</span></label>
                <textarea rows={4} {...register('description')} className={`${inputClass} resize-none`} />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Requirements
                  <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">(one per line)</span>
                </label>
                <textarea rows={3} {...register('requirements')} className={`${inputClass} resize-none`} />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">Apply link <span className="text-red-500">*</span></label>
                <input type="text" {...register('applyLink')} className={inputClass} />
                {errors.applyLink && <p className="mt-1 text-xs text-red-500">{errors.applyLink.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Tags
                  <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">(comma separated)</span>
                </label>
                <input type="text" placeholder="React, Frontend, Remote" {...register('tags')} className={inputClass} />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 rounded-xl border border-[#d1eef2] bg-white px-6 py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
              >
                <X size={15} />
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#09637e] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {saving ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Save size={15} />
                )}
                {saving ? 'Saving...' : 'Save changes'}
              </button>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}