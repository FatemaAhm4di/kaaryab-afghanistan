'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {supabase} from '@/lib/supabase';
import {Eye, EyeOff, LogIn} from 'lucide-react';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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

    const {error} = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push(`/${locale}`);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <Image
            src="/illustrations/illustration-login.svg"
            alt="Login"
            width={160}
            height={130}
            className="mx-auto mb-6"
          />
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xl font-bold text-[#09637e] mb-4">
            <span className="h-2 w-2 rounded-full bg-[#088395] inline-block" />
            KaarYab
          </Link>
          <h1 className="text-2xl font-extrabold text-[#09637e] mt-2">Welcome back</h1>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Sign in to your account to continue
          </p>
        </div>

        <div className="rounded-2xl border border-[#d1eef2] bg-white p-8">
          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#374151]">
                Email
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
                Password
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

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#09637e] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
            Don`t have an account?{' '}
            <Link href={`/${locale}/register`} className="font-semibold text-[#09637e] hover:underline">
              Create one
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}