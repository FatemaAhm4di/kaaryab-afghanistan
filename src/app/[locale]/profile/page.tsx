'use client';

import Image from 'next/image';
import {useState, useEffect} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {supabase} from '@/lib/supabase';
import {User, Save, ArrowLeft} from 'lucide-react';
import Link from 'next/link';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  birthYear: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'PreferNotToSay']).optional(),
  title: z.string().optional(),
  job: z.string().optional(),
  bio: z.string().max(160, 'Bio must be under 160 characters').optional(),
  about: z.string().max(500, 'About must be under 500 characters').optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  'w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm text-[#1f2937] outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]';

export default function ProfilePage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'PreferNotToSay'>('PreferNotToSay');
  const [email, setEmail] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchGender = watch('gender');

  useEffect(() => {
    if (watchGender) setGender(watchGender);
  }, [watchGender]);

  useEffect(() => {
    const loadProfile = async () => {
      const {data: {user}} = await supabase.auth.getUser();

      if (!user) {
        router.push(`/${locale}/login`);
        return;
      }

      setEmail(user.email ?? '');

      const {data: profile} = await supabase
        .from('Profile')
        .select('*')
        .eq('userId', user.id)
        .single();

      if (profile) {
        reset({
          firstName: profile.firstName ?? '',
          lastName: profile.lastName ?? '',
          birthYear: profile.birthYear?.toString() ?? '',
          gender: profile.gender ?? 'PreferNotToSay',
          title: profile.title ?? '',
          job: profile.job ?? '',
          bio: profile.bio ?? '',
          about: profile.about ?? '',
        });
        setGender(profile.gender ?? 'PreferNotToSay');
      }

      setLoading(false);
    };

    loadProfile();
  }, [reset, router, locale]);

  const getAvatar = () => {
    if (gender === 'Female') return '/illustrations/avatar-female.svg';
    if (gender === 'Male') return '/illustrations/avatar-male.svg';
    return null;
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    setError('');
    setSuccess(false);

    const {data: {user}} = await supabase.auth.getUser();
    if (!user) return;

    const {error: err} = await supabase
      .from('Profile')
      .upsert({
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        birthYear: data.birthYear ? parseInt(data.birthYear) : null,
        gender: data.gender,
        title: data.title,
        job: data.job,
        bio: data.bio,
        about: data.about,
        updatedAt: new Date().toISOString(),
      }, {onConflict: 'userId'});

    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }

    setSaving(false);
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

        <div className="mb-8 flex items-center gap-4">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#09637e]"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">

          {/* Avatar + header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#d1eef2] bg-[#d1eef2] overflow-hidden">
              {getAvatar() ? (
                <Image
                  src={getAvatar()!}
                  alt="Avatar"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={48} className="text-[#09637e]" />
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-[#09637e]">My Profile</h1>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{email}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-[#d1eef2] bg-white p-8">

            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                Profile saved successfully!
              </div>
            )}

            {/* Basic info */}
            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              Basic information
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  First name <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Fatema" {...register('firstName')} className={inputClass} />
                {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input type="text" placeholder="Ahmadi" {...register('lastName')} className={inputClass} />
                {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Birth year
                </label>
                <input type="number" placeholder="2004" {...register('birthYear')} className={inputClass} />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Gender
                </label>
                <select {...register('gender')} className={inputClass}>
                  <option value="PreferNotToSay">Prefer not to say</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>

            {/* Professional info */}
            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              Professional information
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Title
                </label>
                <input type="text" placeholder="Frontend Developer" {...register('title')} className={inputClass} />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Job
                </label>
                <input type="text" placeholder="UI Designer at KaarYab" {...register('job')} className={inputClass} />
              </div>
            </div>

            {/* About */}
            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              About
            </p>

            <div className="mb-6 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  Bio
                  <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">(max 160 characters)</span>
                </label>
                <input
                  type="text"
                  placeholder="A short bio about yourself..."
                  {...register('bio')}
                  className={inputClass}
                />
                {errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  About
                  <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">(max 500 characters)</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell more about yourself, your experience and goals..."
                  {...register('about')}
                  className={`${inputClass} resize-none`}
                />
                {errors.about && <p className="mt-1 text-xs text-red-500">{errors.about.message}</p>}
              </div>
            </div>

            <div className="flex justify-end">
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
                {saving ? 'Saving...' : 'Save profile'}
              </button>
            </div>

          </form>
        </div>
      </section>
    </main>
  );
}