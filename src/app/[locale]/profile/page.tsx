'use client';

import Image from 'next/image';
import {useState, useEffect, useRef} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {supabase} from '@/lib/supabase';
import {User, Save, ArrowLeft, Pencil, LogOut, Camera, X} from 'lucide-react';
import Link from 'next/link';
import {useProfile} from '@/context/ProfileContext';
import { useTranslations } from 'next-intl';
import { ErrorState } from '@/components/ui/ErrorState';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  birthDay: z.string().optional(),
  birthMonth: z.string().optional(),
  birthYear: z.string().optional(),
  gender: z.enum(['Male', 'Female', 'PreferNotToSay']).optional(),
  title: z.string().optional(),
  job: z.string().optional(),
  bio: z.string().max(160, 'Bio must be under 160 characters').optional(),
  about: z.string().max(500, 'About must be under 500 characters').optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  'w-full rounded-xl border border-[#d1eef2] bg-white dark:bg-gray-800 dark:border-gray-700 px-4 py-2.5 text-sm text-[#1f2937] dark:text-white outline-none transition focus:border-[#09637e] dark:focus:border-[#088395] focus:ring-2 focus:ring-[#d1eef2] dark:focus:ring-gray-700';

const readonlyClass =
  'w-full rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-[#f8fbfc] dark:bg-gray-800 px-4 py-2.5 text-sm text-[#1f2937] dark:text-gray-300';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// ============ SKELETON ============
function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-12 animate-pulse">
        <div className="mx-auto max-w-2xl">
          {/* Header Skeleton */}
          <div className="mb-8 flex items-center justify-between">
            <div className="h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-9 w-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Avatar Skeleton */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="h-28 w-28 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="h-7 w-48 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-1 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-1 h-3 w-40 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-4 h-9 w-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Form Skeleton */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8">
            <div className="space-y-6">
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="mb-1.5 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <div className="mb-1.5 h-4 w-28 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-11 rounded-xl bg-gray-200 dark:bg-gray-700" />
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1.5 h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="mb-1.5 h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                  </div>
                ))}
              </div>
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-4">
                <div>
                  <div className="mb-1.5 h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-11 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>
                <div>
                  <div className="mb-1.5 h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-24 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <div className="h-11 w-24 rounded-xl bg-gray-200 dark:bg-gray-700" />
                <div className="h-11 w-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProfilePage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const router = useRouter();
  const t = useTranslations('profile');
  const common = useTranslations('common');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {refreshProfile} = useProfile();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [gender, setGender] = useState<'Male' | 'Female' | 'PreferNotToSay'>('PreferNotToSay');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [profileData, setProfileData] = useState<Record<string, string | null>>({});

  const {register, handleSubmit, reset, watch, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchGender = watch('gender');

  useEffect(() => {
    if (watchGender) setGender(watchGender);
  }, [watchGender]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const {data: {user}} = await supabase.auth.getUser();
        if (!user) {
          router.push(`/${locale}/login`);
          return;
        }
        setEmail(user.email ?? '');

        const {data: profile, error: profileError} = await supabase
          .from('Profile')
          .select('*')
          .eq('userId', user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          throw new Error(profileError.message);
        }

        if (profile) {
          reset({
            firstName: profile.firstName ?? '',
            lastName: profile.lastName ?? '',
            birthDay: profile.birthDay?.toString() ?? '',
            birthMonth: profile.birthMonth?.toString() ?? '',
            birthYear: profile.birthYear?.toString() ?? '',
            gender: profile.gender ?? 'PreferNotToSay',
            title: profile.title ?? '',
            job: profile.job ?? '',
            bio: profile.bio ?? '',
            about: profile.about ?? '',
          });
          setGender(profile.gender ?? 'PreferNotToSay');
          setAvatarUrl(profile.avatar ?? null);
          setProfileData(profile);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [reset, router, locale]);

  const getAvatar = () => {
    if (avatarPreview) return avatarPreview;
    if (avatarUrl) return avatarUrl;
    if (gender === 'Female') return '/illustrations/avatar-female.svg';
    if (gender === 'Male') return '/illustrations/avatar-male.svg';
    return null;
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
    setUploadingAvatar(true);

    try {
      const {data: {user}} = await supabase.auth.getUser();
      if (!user) return;

      const ext = file.name.split('.').pop();
      const path = `avatars/${user.id}.${ext}`;

      const {error: uploadError} = await supabase.storage
        .from('avatars')
        .upload(path, file, {upsert: true});

      if (!uploadError) {
        const {data} = supabase.storage.from('avatars').getPublicUrl(path);
        setAvatarUrl(data.publicUrl);
      }
    } catch (err) {
      console.error('Avatar upload error:', err);
    }

    setUploadingAvatar(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${locale}`);
    router.refresh();
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const {data: {user}} = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const {error: err} = await supabase
        .from('Profile')
        .upsert({
          userId: user.id,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDay: data.birthDay ? parseInt(data.birthDay) : null,
          birthMonth: data.birthMonth ? parseInt(data.birthMonth) : null,
          birthYear: data.birthYear ? parseInt(data.birthYear) : null,
          gender: data.gender,
          title: data.title,
          job: data.job,
          bio: data.bio,
          about: data.about,
          avatar: avatarUrl,
          updatedAt: new Date().toISOString(),
        }, {onConflict: 'userId'});

      if (err) throw new Error(err.message);

      setSuccess(true);
      setEditMode(false);
      setProfileData({...profileData, ...data});
      await refreshProfile();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
    }
    setSaving(false);
  };

  // Skeleton Loading
  if (loading) {
    return <ProfileSkeleton />;
  }

  // Error State
  if (error && !editMode) {
    return (
      <main className="min-h-screen bg-[var(--color-background)]">
        <section className="container-custom py-12">
          <ErrorState
            title="Failed to load profile"
            message={error}
            onRetry={() => {
              setError('');
              setLoading(true);
              window.location.reload();
            }}
          />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-12">

        <div className="mb-8 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#09637e] dark:text-gray-400 dark:hover:text-[#088395]">
            <ArrowLeft size={16} />
            {common('back')}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-200 dark:border-red-800 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-red-500 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <LogOut size={15} />
            {t('signOut')}
          </button>
        </div>

        <div className="mx-auto max-w-2xl">

          <div className="mb-8 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#d1eef2] dark:border-gray-700 bg-[#d1eef2] dark:bg-gray-700 overflow-hidden">
                {getAvatar() ? (
                  <Image src={getAvatar()!} alt="Avatar" width={112} height={112} className="h-full w-full object-cover" />
                ) : (
                  <User size={48} className="text-[#09637e] dark:text-[#088395]" />
                )}
              </div>
              {editMode && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#09637e] dark:bg-[#088395] text-white shadow-md"
                  >
                    {uploadingAvatar ? (
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Camera size={14} />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </>
              )}
            </div>

            <h1 className="text-2xl font-extrabold text-[#09637e] dark:text-white">
              {profileData.firstName && profileData.lastName
                ? `${profileData.firstName} ${profileData.lastName}`
                : t('myProfile')}
            </h1>
            {profileData.title && (
              <p className="mt-1 text-sm font-medium text-[#088395] dark:text-[#088395]">{profileData.title}</p>
            )}
            <p className="mt-1 text-xs text-[var(--color-text-secondary)] dark:text-gray-400">{email}</p>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-[#09637e] dark:text-[#088395] transition hover:bg-[#d1eef2] dark:hover:bg-gray-700"
              >
                <Pencil size={14} />
                {t('editProfile')}
              </button>
            )}
          </div>

          {success && (
            <div className="mb-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 px-4 py-3 text-sm text-green-600 dark:text-green-400">
              {t('saveSuccess')}
            </div>
          )}

          {error && editMode && (
            <div className="mb-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 p-8">

            <p className="mb-4 border-b border-[#d1eef2] dark:border-gray-700 pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395] dark:text-[#088395]">
              {t('basicInfo')}
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('firstName')} <span className="text-red-500">*</span></label>
                {editMode ? (
                  <>
                    <input type="text" placeholder="Fatema" {...register('firstName')} className={inputClass} />
                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
                  </>
                ) : (
                  <div className={readonlyClass}>{profileData.firstName || t('notSet')}</div>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('lastName')} <span className="text-red-500">*</span></label>
                {editMode ? (
                  <>
                    <input type="text" placeholder="Ahmadi" {...register('lastName')} className={inputClass} />
                    {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
                  </>
                ) : (
                  <div className={readonlyClass}>{profileData.lastName || t('notSet')}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('dob')}</label>
                {editMode ? (
                  <div className="grid grid-cols-3 gap-2">
                    <input type="number" placeholder={t('day')} min="1" max="31" {...register('birthDay')} className={inputClass} />
                    <select {...register('birthMonth')} className={inputClass}>
                      <option value="">{t('month')}</option>
                      {months.map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <input type="number" placeholder={t('year')} min="1900" max="2025" {...register('birthYear')} className={inputClass} />
                  </div>
                ) : (
                  <div className={readonlyClass}>
                    {profileData.birthDay && profileData.birthMonth && profileData.birthYear
                      ? `${profileData.birthDay} ${months[parseInt(profileData.birthMonth) - 1]} ${profileData.birthYear}`
                      : t('notSet')}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('gender')}</label>
                {editMode ? (
                  <select {...register('gender')} className={inputClass}>
                    <option value="PreferNotToSay">{t('preferNot')}</option>
                    <option value="Female">{t('female')}</option>
                    <option value="Male">{t('male')}</option>
                  </select>
                ) : (
                  <div className={readonlyClass}>
                    {profileData.gender === 'PreferNotToSay' ? t('preferNot') : profileData.gender || t('notSet')}
                  </div>
                )}
              </div>
            </div>

            <p className="mb-4 border-b border-[#d1eef2] dark:border-gray-700 pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395] dark:text-[#088395]">
              {t('professionalInfo')}
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('title')}</label>
                {editMode ? (
                  <input type="text" placeholder={t('titlePlaceholder')} {...register('title')} className={inputClass} />
                ) : (
                  <div className={readonlyClass}>{profileData.title || t('notSet')}</div>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">{t('job')}</label>
                {editMode ? (
                  <input type="text" placeholder={t('jobPlaceholder')} {...register('job')} className={inputClass} />
                ) : (
                  <div className={readonlyClass}>{profileData.job || t('notSet')}</div>
                )}
              </div>
            </div>

            <p className="mb-4 border-b border-[#d1eef2] dark:border-gray-700 pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395] dark:text-[#088395]">
              {t('about')}
            </p>

            <div className="mb-6 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">
                  {t('bio')} <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)] dark:text-gray-400">({t('bioHint')})</span>
                </label>
                {editMode ? (
                  <>
                    <input type="text" placeholder={t('bioPlaceholder')} {...register('bio')} className={inputClass} />
                    {errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>}
                  </>
                ) : (
                  <div className={readonlyClass}>{profileData.bio || t('notSet')}</div>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151] dark:text-gray-300">
                  {t('aboutLabel')} <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)] dark:text-gray-400">({t('aboutHint')})</span>
                </label>
                {editMode ? (
                  <>
                    <textarea rows={4} placeholder={t('aboutPlaceholder')} {...register('about')} className={`${inputClass} resize-none`} />
                    {errors.about && <p className="mt-1 text-xs text-red-500">{errors.about.message}</p>}
                  </>
                ) : (
                  <div className={`${readonlyClass} min-h-[100px]`}>{profileData.about || t('notSet')}</div>
                )}
              </div>
            </div>

            {editMode && (
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-2.5 text-sm font-semibold text-[#09637e] dark:text-[#088395] transition hover:bg-[#d1eef2] dark:hover:bg-gray-700"
                >
                  <X size={15} />
                  {common('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#09637e] dark:bg-[#088395] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  {saving ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Save size={15} />
                  )}
                  {saving ? t('saving') : t('saveProfile')}
                </button>
              </div>
            )}

          </form>
        </div>
      </section>
    </main>
  );
}