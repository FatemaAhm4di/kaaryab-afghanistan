'use client';

import Image from 'next/image';
import {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import {
  Sun, Moon, Globe, Menu, X, Bookmark, Home, Plus, User, LogOut, LogIn,
  LayoutDashboard, Briefcase, Info, Phone, FileText, ChevronRight
} from 'lucide-react';
import {usePathname, useRouter} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {supabase} from '@/lib/supabase';
import type {User as SupabaseUser} from '@supabase/supabase-js';
import {useProfile} from '@/context/ProfileContext';
import {useTheme} from '@/context/ThemeContext';

type ProfileType = {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  gender: string | null;
};

function Avatar({profile, avatarSrc, size = 32}: {profile: ProfileType | null; avatarSrc: string | null; size?: number}) {
  return (
    <div
      style={{width: size, height: size}}
      className="overflow-hidden rounded-full border-2 border-[#09637e] shrink-0"
    >
      {avatarSrc ? (
        <Image src={avatarSrc} alt="Avatar" width={size} height={size} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#d1eef2] text-xs font-bold text-[#09637e]">
          {profile?.firstName?.[0]?.toUpperCase() ?? <User size={size * 0.5} />}
        </div>
      )}
    </div>
  );
}

function Tooltip({label, children}: {label: string; children: React.ReactNode}) {
  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 hidden group-hover/tooltip:block">
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap shadow-lg">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const {profile, refreshProfile} = useProfile();
  const {theme, toggleTheme} = useTheme();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const router = useRouter();
  const langRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  const t = useTranslations('nav');
  const common = useTranslations('common');

  const languages = [
    {code: 'en', label: 'English', flag: '🇺🇸'},
    {code: 'fa', label: 'فارسی', flag: '🇦🇫'},
    {code: 'ps', label: 'پښتو', flag: '🇦🇫'},
  ];

  const changeLanguage = (lang: string) => {
    const segments = pathname.split('/');
    segments[1] = lang;
    router.push(segments.join('/'));
    setLangOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      const {data} = await supabase.auth.getUser();
      setUser(data.user);
      if (data.user) await refreshProfile();
    };
    loadUser();
    const {data: {subscription}} = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      await refreshProfile();
    });
    return () => subscription.unsubscribe();
  }, [refreshProfile]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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
    {href: '', label: t('home'), icon: Home},
    {href: '/opportunities', label: t('opportunities'), icon: Briefcase},
    {href: '/saved', label: t('saved'), icon: Bookmark},
    {href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard},
    {href: '/cv-builder', label: 'CV Builder', icon: FileText},
    {href: '/about', label: t('about'), icon: Info},
    {href: '/contact', label: t('contact'), icon: Phone},
  ];

  const isActive = (path: string) =>
    path === ''
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(`/${locale}${path}`);

  const sidebarBg = isDark ? 'rgba(15,23,42,0.98)' : 'rgba(235,244,246,0.98)';
  const borderColor = isDark ? '#1e3a4a' : '#d1eef2';
  const textColor = isDark ? '#cbd5e1' : '#4b5563';
  const activeColor = '#09637e';
  const activeBg = isDark ? '#1e3a4a' : '#d1eef2';
  const hoverBg = isDark ? '#1e3a4a' : '#d1eef2';

  const NavItem = ({href, label, icon: Icon, onClick}: {href: string; label: string; icon: React.ElementType; onClick?: () => void}) => {
    const active = isActive(href);
    return (
      <Link
        href={`/${locale}${href}`}
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: sidebarExpanded ? '12px' : '0',
          justifyContent: sidebarExpanded ? 'flex-start' : 'center',
          padding: '10px 12px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: 500,
          transition: 'all 0.2s ease',
          backgroundColor: active ? activeBg : 'transparent',
          color: active ? activeColor : textColor,
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.backgroundColor = hoverBg;
            (e.currentTarget as HTMLElement).style.color = activeColor;
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLElement).style.color = textColor;
          }
        }}
      >
        <Icon size={20} style={{flexShrink: 0}} />
        {sidebarExpanded && <span style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>{label}</span>}
      </Link>
    );
  };

  return (
    <>
      {/* ====== MOBILE HEADER ====== */}
      <header
        className="md:hidden sticky top-0 z-40 backdrop-blur-xl shadow-sm"
        style={{
          background: sidebarBg,
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        <div className="px-4 h-[60px] flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            style={{color: textColor}}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#d1eef2] transition"
          >
            <Menu size={22} />
          </button>

          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
            style={{color: activeColor}}
          >
            <span className="w-2 h-2 rounded-full bg-[#088395] inline-block" />
            KaarYab
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleTheme}
              style={{color: textColor}}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#d1eef2] transition"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href={`/${locale}/profile`} className="flex items-center justify-center w-9 h-9">
              <Avatar profile={profile} avatarSrc={avatarSrc} size={30} />
            </Link>
          </div>
        </div>
      </header>

      {/* ====== DESKTOP SIDEBAR ====== */}
      <aside
        className="hidden md:flex flex-col fixed inset-y-0 left-0 z-50 transition-all duration-300"
        style={{
          width: sidebarExpanded ? '220px' : '68px',
          background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          backdropFilter: 'blur(20px)',
        }}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => {setSidebarExpanded(false); setLangOpen(false);}}
      >
        <div className="flex flex-col h-full py-4">

          {/* Logo */}
          <div
            className="flex items-center px-3 mb-6 overflow-hidden"
            style={{
              justifyContent: sidebarExpanded ? 'flex-start' : 'center',
              gap: sidebarExpanded ? '10px' : '0',
            }}
          >
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 font-bold text-lg tracking-tight"
              style={{color: activeColor}}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#088395] shrink-0 inline-block" />
              {sidebarExpanded && <span>KaarYab</span>}
            </Link>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-2 space-y-0.5">
            {navItems.map((item) => (
              sidebarExpanded ? (
                <NavItem key={item.href} {...item} />
              ) : (
                <Tooltip key={item.href} label={item.label}>
                  <NavItem {...item} />
                </Tooltip>
              )
            ))}

            {/* Add opportunity */}
            <Link
              href={`/${locale}/add-opportunity`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: sidebarExpanded ? '12px' : '0',
                justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                backgroundColor: '#09637e',
                color: '#fff',
                textDecoration: 'none',
                marginTop: '8px',
              }}
            >
              <Plus size={20} style={{flexShrink: 0}} />
              {sidebarExpanded && <span>Add</span>}
            </Link>
          </nav>

          {/* Bottom actions */}
          <div
            className="px-2 pt-3 space-y-0.5"
            style={{borderTop: `1px solid ${borderColor}`}}
          >
            {/* Language */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarExpanded ? '12px' : '0',
                  justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  color: textColor,
                  width: '100%',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <Globe size={20} style={{flexShrink: 0}} />
                {sidebarExpanded && (
                  <span style={{flex: 1, textAlign: 'left'}}>
                    {languages.find((l) => l.code === locale)?.label ?? 'EN'}
                  </span>
                )}
                {sidebarExpanded && <ChevronRight size={14} style={{transform: langOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s'}} />}
              </button>

              {langOpen && (
                <div
                  className="absolute bottom-full left-0 mb-1 w-48 rounded-xl shadow-xl py-1 z-50"
                  style={{background: isDark ? '#1e293b' : '#fff', border: `1px solid ${borderColor}`}}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '8px 16px',
                        fontSize: '13px',
                        fontWeight: locale === lang.code ? 600 : 400,
                        color: locale === lang.code ? activeColor : textColor,
                        backgroundColor: locale === lang.code ? activeBg : 'transparent',
                        cursor: 'pointer',
                        border: 'none',
                        textAlign: 'left',
                      }}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: sidebarExpanded ? '12px' : '0',
                justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 500,
                color: textColor,
                width: '100%',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {isDark ? <Sun size={20} style={{flexShrink: 0}} /> : <Moon size={20} style={{flexShrink: 0}} />}
              {sidebarExpanded && <span>{isDark ? common('lightMode') : common('darkMode')}</span>}
            </button>

            {/* User */}
            {user ? (
              <>
                <Link
                  href={`/${locale}/profile`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: sidebarExpanded ? '12px' : '0',
                    justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                    color: textColor,
                  }}
                >
                  <Avatar profile={profile} avatarSrc={avatarSrc} size={28} />
                  {sidebarExpanded && (
                    <span style={{fontSize: '13px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {profile?.firstName ?? t('profile')}
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: sidebarExpanded ? '12px' : '0',
                    justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                    padding: '10px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#ef4444',
                    width: '100%',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <LogOut size={20} style={{flexShrink: 0}} />
                  {sidebarExpanded && <span>{t('logout')}</span>}
                </button>
              </>
            ) : (
              <Link
                href={`/${locale}/login`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: sidebarExpanded ? '12px' : '0',
                  justifyContent: sidebarExpanded ? 'flex-start' : 'center',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  backgroundColor: '#09637e',
                  color: '#fff',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <LogIn size={20} style={{flexShrink: 0}} />
                {sidebarExpanded && <span>{t('login')}</span>}
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* ====== MOBILE OVERLAY ====== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)'}}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ====== MOBILE DRAWER ====== */}
      <div
        className="fixed inset-y-0 left-0 z-50 w-[280px] md:hidden flex flex-col shadow-2xl transition-transform duration-300"
        style={{
          background: isDark ? '#0f172a' : '#fff',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 h-[60px] shrink-0"
          style={{borderBottom: `1px solid ${borderColor}`}}
        >
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-lg" style={{color: activeColor}}>
            <span className="w-2 h-2 rounded-full bg-[#088395] inline-block" />
            KaarYab
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            style={{color: textColor}}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#d1eef2] transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: active ? activeColor : textColor,
                  backgroundColor: active ? activeBg : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}

          <Link
            href={`/${locale}/add-opportunity`}
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              backgroundColor: '#09637e',
              textDecoration: 'none',
              marginTop: '8px',
            }}
          >
            <Plus size={20} />
            Add opportunity
          </Link>
        </nav>

        {/* Bottom */}
        <div
          className="px-3 py-3 space-y-1 shrink-0"
          style={{borderTop: `1px solid ${borderColor}`}}
        >
          {/* Languages */}
          <div className="flex gap-2 flex-wrap mb-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: locale === lang.code ? 600 : 400,
                  backgroundColor: locale === lang.code ? '#09637e' : activeBg,
                  color: locale === lang.code ? '#fff' : textColor,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {lang.flag} {lang.label}
              </button>
            ))}
          </div>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '12px',
              fontSize: '14px',
              color: textColor,
              width: '100%',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            {isDark ? common('lightMode') : common('darkMode')}
          </button>

          {/* Auth */}
          {user ? (
            <button
              onClick={() => {handleLogout(); setMobileOpen(false);}}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                color: '#ef4444',
                width: '100%',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              <LogOut size={20} />
              {t('logout')}
            </button>
          ) : (
            <Link
              href={`/${locale}/login`}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#fff',
                backgroundColor: '#09637e',
                textDecoration: 'none',
              }}
            >
              <LogIn size={20} />
              {t('login')}
            </Link>
          )}
        </div>
      </div>
    </>
  );
}