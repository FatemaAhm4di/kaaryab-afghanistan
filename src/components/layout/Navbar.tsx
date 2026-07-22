'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sun, Moon, Globe, Menu, X, Bookmark, Home, Plus, User, LogOut, LogIn,
  LayoutDashboard, Briefcase, Info, Phone, FileText
} from 'lucide-react';
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
    <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-[#09637e]">
      {avatarSrc ? (
        <Image src={avatarSrc} alt="Avatar" width={32} height={32} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#d1eef2] text-xs font-bold text-[#09637e]">
          {profile?.firstName?.[0]?.toUpperCase() ?? <User size={16} />}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const navItems = [
    { href: '', label: t('home'), icon: Home },
    { href: '/opportunities', label: t('opportunities'), icon: Briefcase },
    { href: '/saved', label: t('saved'), icon: Bookmark },
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/cv-builder', label: 'CV Builder', icon: FileText },
    { href: '/about', label: t('about'), icon: Info },
    { href: '/contact', label: t('contact'), icon: Phone },
  ];

  const isActive = (path: string) =>
    path === ''
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(`/${locale}/${path}`);

  const iconBtn =
    'w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-[#d1eef2] hover:text-[#09637e] border border-transparent hover:border-[#a8d8df] transition-colors';

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b border-[#d1eef2] dark:border-gray-700 bg-[rgba(235,244,246,0.85)] dark:bg-[rgba(15,23,42,0.85)] backdrop-blur-xl shadow-sm md:hidden">
        <div className="px-4 h-[60px] flex items-center justify-between">
          <button onClick={() => setIsSidebarOpen(true)} className={iconBtn}>
            <Menu size={22} />
          </button>

          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg text-[#09637e] tracking-tight">
            <span className="w-2 h-2 rounded-full bg-[#088395] inline-block" />
            KaarYab
          </Link>

          <div className="flex items-center gap-1">
            <button onClick={toggleTheme} className={iconBtn}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href={`/${locale}/profile`} className={iconBtn}>
              <Avatar profile={profile} avatarSrc={avatarSrc} />
            </Link>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-[72px] md:z-50 md:border-r md:border-[#d1eef2] md:dark:border-gray-700 md:bg-[rgba(235,244,246,0.95)] md:dark:bg-[rgba(15,23,42,0.95)] md:backdrop-blur-xl md:shadow-sm md:transition-all md:duration-300 hover:md:w-[220px] group/sidebar">
        <div className="flex flex-col items-center h-full py-4">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="flex items-center justify-center w-full mb-6 px-2 group-hover/sidebar:justify-start"
          >
            <div className="flex items-center gap-2 font-bold text-lg text-[#09637e] tracking-tight">
              <span className="w-2 h-2 rounded-full bg-[#088395] inline-block shrink-0" />
              <span className="hidden group-hover/sidebar:inline">KaarYab</span>
              <span className="inline group-hover/sidebar:hidden text-xl">K</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 w-full px-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${active 
                      ? 'bg-[#d1eef2] dark:bg-gray-700 text-[#09637e] dark:text-[#088395]' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-[#d1eef2] dark:hover:bg-gray-700 hover:text-[#09637e] dark:hover:text-[#088395]'
                    }
                    justify-center group-hover/sidebar:justify-start
                  `}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="hidden group-hover/sidebar:inline truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="w-full px-2 space-y-1 border-t border-[#d1eef2] dark:border-gray-700 pt-3 mt-2">
            {/* Language Dropdown */}
            <div className="relative w-full">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  text-gray-600 dark:text-gray-400 hover:bg-[#d1eef2] dark:hover:bg-gray-700 hover:text-[#09637e]
                  w-full justify-center group-hover/sidebar:justify-start
                `}
              >
                <Globe size={20} className="shrink-0" />
                <span className="hidden group-hover/sidebar:inline truncate">
                  {languages.find((l) => l.code === locale)?.label || 'EN'}
                </span>
              </button>
              {langOpen && (
                <div className="absolute bottom-full left-0 mb-1 w-48 rounded-xl border border-[#d1eef2] dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-1 z-50">
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                text-gray-600 dark:text-gray-400 hover:bg-[#d1eef2] dark:hover:bg-gray-700 hover:text-[#09637e]
                w-full justify-center group-hover/sidebar:justify-start
              `}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span className="hidden group-hover/sidebar:inline truncate">
                {theme === 'dark' ? common('lightMode') : common('darkMode')}
              </span>
            </button>

            {/* User / Auth */}
            {user ? (
              <>
                <Link
                  href={`/${locale}/profile`}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    text-gray-600 dark:text-gray-400 hover:bg-[#d1eef2] dark:hover:bg-gray-700 hover:text-[#09637e]
                    w-full justify-center group-hover/sidebar:justify-start
                  `}
                >
                  <Avatar profile={profile} avatarSrc={avatarSrc} />
                  <span className="hidden group-hover/sidebar:inline truncate">
                    {profile?.firstName || t('profile')}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                    w-full justify-center group-hover/sidebar:justify-start
                  `}
                >
                  <LogOut size={20} className="shrink-0" />
                  <span className="hidden group-hover/sidebar:inline truncate">{t('logout')}</span>
                </button>
              </>
            ) : (
              <Link
                href={`/${locale}/login`}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  bg-[#09637e] text-white hover:bg-[#075a6b]
                  w-full justify-center group-hover/sidebar:justify-start
                `}
              >
                <LogIn size={20} className="shrink-0" />
                <span className="hidden group-hover/sidebar:inline truncate">{t('login')}</span>
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-[60px] border-b border-[#d1eef2] dark:border-gray-700">
            <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg text-[#09637e]">
              <span className="w-2 h-2 rounded-full bg-[#088395] inline-block" />
              KaarYab
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className={iconBtn}>
              <X size={22} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={`/${locale}${item.href}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${active 
                      ? 'bg-[#d1eef2] dark:bg-gray-700 text-[#09637e] dark:text-[#088395]' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-[#d1eef2] dark:hover:bg-gray-700 hover:text-[#09637e]'
                    }
                  `}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="px-3 py-4 border-t border-[#d1eef2] dark:border-gray-700 space-y-1">
            {/* Mobile Languages */}
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsSidebarOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    locale === lang.code
                      ? 'bg-[#09637e] text-white'
                      : 'bg-[#d1eef2] dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {user ? (
              <button
                onClick={() => { handleLogout(); setIsSidebarOpen(false); }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut size={20} />
                {t('logout')}
              </button>
            ) : (
              <Link
                href={`/${locale}/login`}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium bg-[#09637e] text-white hover:bg-[#075a6b]"
              >
                <LogIn size={20} />
                {t('login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}