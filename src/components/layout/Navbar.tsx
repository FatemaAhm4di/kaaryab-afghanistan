'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Globe, Menu, X, Bookmark, Home, Plus, User, LogOut, LogIn } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { useProfile } from '@/context/ProfileContext';
import { useTheme } from '@/context/ThemeContext';

type ProfileType = {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  gender: string | null;
};

function Avatar({ profile, avatarSrc }: { profile: ProfileType | null; avatarSrc: string | null }) {
  return (
    <div className="h-7 w-7 overflow-hidden rounded-full border-2 border-[#09637e]">
      {avatarSrc ? (
        <Image src={avatarSrc} alt="Avatar" width={28} height={28} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#d1eef2] text-xs font-bold text-[#09637e]">
          {profile?.firstName?.[0]?.toUpperCase() ?? <User size={14} />}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const { profile, refreshProfile } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const router = useRouter();

  const t = useTranslations('nav');
  const common = useTranslations('common');

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fa', label: 'فارسی' },
    { code: 'ps', label: 'پښتو' },
  ];

  const changeLanguage = (lang: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${lang}`);
    router.push(newPathname);
    setLangOpen(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user) await refreshProfile();
    };

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      await refreshProfile();
    });

    return () => subscription.unsubscribe();
  }, [refreshProfile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push(`/${locale}`);
    router.refresh();
  };

  const avatarSrc = profile?.avatar
    ? profile.avatar
    : profile?.gender === 'Female'
    ? '/illustrations/avatar-female.svg'
    : profile?.gender === 'Male'
    ? '/illustrations/avatar-male.svg'
    : null;

  const isActive = (path: string) =>
    path === ''
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(`/${locale}/${path}`);

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-[#d1eef2] text-[#09637e]'
        : 'text-gray-700 dark:text-gray-300 hover:bg-[#d1eef2] hover:text-[#09637e]'
    }`;

  const mobileLinkClass = (path: string) =>
    `block px-3 py-2.5 rounded-lg text-sm font-medium ${
      isActive(path)
        ? 'bg-[#d1eef2] text-[#09637e]'
        : 'text-gray-700 dark:text-gray-300 hover:bg-[#d1eef2] hover:text-[#09637e]'
    }`;

  const iconBtn =
    'w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-[#d1eef2] hover:text-[#09637e] border border-transparent hover:border-[#a8d8df] transition-colors';

  return (
    <header className="sticky top-0 z-50 border-b border-[#d1eef2] dark:border-gray-700 bg-[rgba(235,244,246,0.85)] dark:bg-[rgba(15,23,42,0.85)] backdrop-blur-xl shadow-sm">

      <div className="max-w-6xl mx-auto px-4 h-[60px] flex items-center justify-between">

        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg text-[#09637e] tracking-tight">
          <span className="w-2 h-2 rounded-full bg-[#088395] inline-block" />
          KaarYab
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href={`/${locale}`} className={linkClass('')}>{t('home')}</Link>
          <Link href={`/${locale}/opportunities`} className={linkClass('opportunities')}>{t('opportunities')}</Link>
          <Link href={`/${locale}/dashboard`} className={linkClass('dashboard')}>{t('dashboard')}</Link>
          <Link href={`/${locale}/about`} className={linkClass('about')}>{t('about')}</Link>
          <Link href={`/${locale}/contact`} className={linkClass('contact')}>{t('contact')}</Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link href={`/${locale}/saved`} className={iconBtn} title={t('saved')}>
            <Bookmark size={18} />
          </Link>

          <button onClick={toggleTheme} className={iconBtn} title={common('theme')}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="w-px h-5 bg-[#d1d5db] dark:bg-gray-600 mx-1" />

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={iconBtn}
              title={common('language')}
            >
              <Globe size={18} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-[#d1eef2] dark:hover:bg-gray-700 ${
                      locale === lang.code
                        ? 'bg-[#d1eef2] dark:bg-gray-700 font-semibold text-[#09637e] dark:text-[#088395]'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <>
              <Link href={`/${locale}/profile`} className={`${iconBtn} overflow-hidden`} title={profile?.firstName ?? t('profile')}>
                <Avatar profile={profile} avatarSrc={avatarSrc} />
              </Link>
              <button onClick={handleLogout} className={iconBtn} title={t('logout')}>
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link
              href={`/${locale}/login`}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[#09637e] px-3 py-1.5 text-sm font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
            >
              <LogIn size={16} />
              {t('login')}
            </Link>
          )}

          <Link
            href={`/${locale}/add-opportunity`}
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg bg-[#27738b] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#d1e8ed]"
          >
            <Plus size={16} />
            {t('add')}
          </Link>
          <button className={`md:hidden ${iconBtn}`} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {open && (
        <div className="md:hidden border-t border-[#d1eef2] dark:border-gray-700 px-4 py-3 flex flex-col gap-1">
          <Link href={`/${locale}`} className={mobileLinkClass('')} onClick={() => setOpen(false)}>
            <span className="flex items-center gap-2"><Home size={15} />{t('home')}</span>
          </Link>
          <Link href={`/${locale}/opportunities`} className={mobileLinkClass('opportunities')} onClick={() => setOpen(false)}>{t('opportunities')}</Link>
          <Link href={`/${locale}/dashboard`} className={mobileLinkClass('dashboard')} onClick={() => setOpen(false)}>{t('dashboard')}</Link>
          <Link href={`/${locale}/about`} className={mobileLinkClass('about')} onClick={() => setOpen(false)}>{t('about')}</Link>
          <Link href={`/${locale}/contact`} className={mobileLinkClass('contact')} onClick={() => setOpen(false)}>{t('contact')}</Link>

          <div className="border-t border-[#d1eef2] dark:border-gray-700 mt-2 pt-2 flex flex-col gap-1">
            <Link
              href={`/${locale}/saved`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#d1eef2] hover:text-[#09637e]"
              onClick={() => setOpen(false)}
            >
              <Bookmark size={16} />
              {t('saved')}
            </Link>

            {/* Mobile Language Options */}
            <div className="flex flex-col gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium w-full ${
                    locale === lang.code
                      ? 'bg-[#d1eef2] dark:bg-gray-700 text-[#09637e] dark:text-[#088395]'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-[#d1eef2] hover:text-[#09637e]'
                  }`}
                >
                  <Globe size={16} />
                  {lang.label}
                </button>
              ))}
            </div>

            {user ? (
              <>
                <Link
                  href={`/${locale}/profile`}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#d1eef2] hover:text-[#09637e]"
                  onClick={() => setOpen(false)}
                >
                  <Avatar profile={profile} avatarSrc={avatarSrc} />
                  {profile?.firstName ? `${profile.firstName} ${profile.lastName ?? ''}` : t('profile')}
                </Link>
                <button
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full"
                >
                  <LogOut size={16} />
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link
                href={`/${locale}/login`}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-[#09637e] border border-[#09637e] hover:bg-[#d1eef2]"
                onClick={() => setOpen(false)}
              >
                <LogIn size={16} />
                {t('login')}
              </Link>
            )}

            <Link
              href={`/${locale}/add-opportunity`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-white bg-[#09637e]"
              onClick={() => setOpen(false)}
            >
              <Plus size={16} />
              {t('add')}
            </Link>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#d1eef2] hover:text-[#09637e] w-full"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              {theme === 'dark' ? common('lightMode') : common('darkMode')}
            </button>
          </div>
        </div>
      )}

    </header>
  );
}