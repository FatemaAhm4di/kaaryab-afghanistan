'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {supabase} from '@/lib/supabase';
import {Eye, EyeOff, UserPlus} from 'lucide-react';
import { useTranslations } from 'next-intl';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const router = useRouter();
  const t = useTranslations('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');

    const {data: authData, error: authError} = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      await supabase.from('Profile').insert({
        userId: authData.user.id,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }

    router.push(`/${locale}`);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <Image
            src="/illustrations/illustration-register.svg"
            alt="Register"
            width={160}
            height={130}
            className="mx-auto mb-6"
          />
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xl font-bold text-[#09637e] mb-4">
            <span className="h-2 w-2 rounded-full bg-[#088395] inline-block" />
            KaarYab
          </Link>
          <h1 className="text-2xl font-extrabold text-[#09637e] mt-2">{t('createAccount')}</h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {t('registerSubtitle')}
          </p>
        </div>

        <div className="rounded-2xl border border-[#d1eef2] bg-white p-8">
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  {t('firstName')}
                </label>
                <input
                  type="text"
                  placeholder="Fatema"
                  {...register('firstName')}
                  className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                  {t('lastName')}
                </label>
                <input
                  type="text"
                  placeholder="Ahmadi"
                  {...register('lastName')}
                  className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                {t('email')}
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password')}
                  className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                {t('confirmPassword')}
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword')}
                  className="w-full rounded-xl border border-[#d1eef2] bg-white px-4 py-2.5 pr-10 text-sm outline-none transition focus:border-[#09637e] focus:ring-2 focus:ring-[#d1eef2]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#09637e] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <UserPlus size={16} />
              )}
              {loading ? t('creating') : t('register')}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            {t('hasAccount')}{' '}
            <Link href={`/${locale}/login`} className="font-semibold text-[#09637e] hover:underline">
              {t('loginNow')}
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}