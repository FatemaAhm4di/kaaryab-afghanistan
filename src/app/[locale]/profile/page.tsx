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
  'w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm text-[#1f2937] outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]';

const readonlyClass =
  'w-full rounded-xl border border-[#d1eef2] bg-[#f8fbfc] px-4 py-2.5 text-sm text-[#1f2937]';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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
      const {data: {user}} = await supabase.auth.getUser();
      if (!user) {router.push(`/${locale}/login`); return;}
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
      setLoading(false);
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

    const {data: {user}} = await supabase.auth.getUser();
    if (!user) return;

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

    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
      setEditMode(false);
      setProfileData({...profileData, ...data});
      await refreshProfile();
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

        <div className="mb-8 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#09637e]">
            <ArrowLeft size={16} />
            {common('back')}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={15} />
            {t('signOut')}
          </button>
        </div>

        <div className="mx-auto max-w-2xl">

          <div className="mb-8 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#d1eef2] bg-[#d1eef2] overflow-hidden">
                {getAvatar() ? (
                  <Image src={getAvatar()!} alt="Avatar" width={112} height={112} className="h-full w-full object-cover" />
                ) : (
                  <User size={48} className="text-[#09637e]" />
                )}
              </div>
              {editMode && (
                <>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#09637e] text-white shadow-md"
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

            <h1 className="text-2xl font-extrabold text-[#09637e]">
              {profileData.firstName && profileData.lastName
                ? `${profileData.firstName} ${profileData.lastName}`
                : t('myProfile')}
            </h1>
            {profileData.title && (
              <p className="mt-1 text-sm font-medium text-[#088395]">{profileData.title}</p>
            )}
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{email}</p>

            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#d1eef2] bg-white px-4 py-2 text-sm font-medium text-[#09637e] transition hover:bg-[#d1eef2]"
              >
                <Pencil size={14} />
                {t('editProfile')}
              </button>
            )}
          </div>

          {success && (
            <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
              {t('saveSuccess')}
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-[#d1eef2] bg-white p-8">

            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              {t('basicInfo')}
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('firstName')} <span className="text-red-500">*</span></label>
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
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('lastName')} <span className="text-red-500">*</span></label>
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
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('dob')}</label>
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
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('gender')}</label>
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

            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              {t('professionalInfo')}
            </p>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('title')}</label>
                {editMode ? (
                  <input type="text" placeholder={t('titlePlaceholder')} {...register('title')} className={inputClass} />
                ) : (
                  <div className={readonlyClass}>{profileData.title || t('notSet')}</div>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">{t('job')}</label>
                {editMode ? (
                  <input type="text" placeholder={t('jobPlaceholder')} {...register('job')} className={inputClass} />
                ) : (
                  <div className={readonlyClass}>{profileData.job || t('notSet')}</div>
                )}
              </div>
            </div>

            <p className="mb-4 border-b border-[#d1eef2] pb-2 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              {t('about')}
            </p>

            <div className="mb-6 flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  {t('bio')} <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">({t('bioHint')})</span>
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
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  {t('aboutLabel')} <span className="ml-1 text-xs font-normal text-[var(--color-text-secondary)]">({t('aboutHint')})</span>
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
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d1eef2] bg-white px-6 py-2.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
                >
                  <X size={15} />
                  {common('cancel')}
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