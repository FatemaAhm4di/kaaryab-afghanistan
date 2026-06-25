'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Sun, Globe, Menu, X, Bookmark, Home} from 'lucide-react';
import {usePathname} from 'next/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'fa';

  const isActive = (path: string) =>
    path === ''
      ? pathname === `/${locale}` || pathname === `/${locale}/`
      : pathname.startsWith(`/${locale}/${path}`);

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-[#d1eef2] text-[#09637e]'
        : 'text-gray-700 hover:bg-[#d1eef2] hover:text-[#09637e]'
    }`;

  const mobileLinkClass = (path: string) =>
    `block px-3 py-2.5 rounded-lg text-sm font-medium ${
      isActive(path)
        ? 'bg-[#d1eef2] text-[#09637e]'
        : 'text-gray-700 hover:bg-[#d1eef2] hover:text-[#09637e]'
    }`;

  const iconBtn =
    'w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-[#d1eef2] hover:text-[#09637e] border border-transparent hover:border-[#a8d8df] transition-colors';

  return (
    <header className="sticky top-0 z-50 border-b border-[#d1eef2] bg-[rgba(235,244,246,0.85)] backdrop-blur-xl shadow-sm">

      <div className="max-w-6xl mx-auto px-4 h-[60px] flex items-center justify-between">

        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-bold text-lg text-[#09637e] tracking-tight"
        >
          <span className="w-2 h-2 rounded-full bg-[#088395] inline-block" />
          KaarYab
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href={`/${locale}`} className={linkClass('')}>
            Home
          </Link>
          <Link href={`/${locale}/opportunities`} className={linkClass('opportunities')}>
            Opportunities
          </Link>
          <Link href={`/${locale}/dashboard`} className={linkClass('dashboard')}>
            Dashboard
          </Link>
          <Link href={`/${locale}/about`} className={linkClass('about')}>
            About
          </Link>
          <Link href={`/${locale}/contact`} className={linkClass('contact')}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-1">
          <Link href={`/${locale}/saved`} className={iconBtn} title="Saved">
            <Bookmark size={18} />
          </Link>
          <button className={iconBtn} title="Dark mode">
            <Sun size={18} />
          </button>
          <div className="w-px h-5 bg-[#d1d5db] mx-1" />
          <button className={iconBtn} title="Language">
            <Globe size={18} />
          </button>
          <button
            className={`md:hidden ${iconBtn}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {open && (
        <div className="md:hidden border-t border-[#d1eef2] px-4 py-3 flex flex-col gap-1">
          <Link href={`/${locale}`} className={mobileLinkClass('')} onClick={() => setOpen(false)}>
            <span className="flex items-center gap-2">
              <Home size={15} />
              Home
            </span>
          </Link>
          <Link href={`/${locale}/opportunities`} className={mobileLinkClass('opportunities')} onClick={() => setOpen(false)}>
            Opportunities
          </Link>
          <Link href={`/${locale}/dashboard`} className={mobileLinkClass('dashboard')} onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link href={`/${locale}/about`} className={mobileLinkClass('about')} onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href={`/${locale}/contact`} className={mobileLinkClass('contact')} onClick={() => setOpen(false)}>
            Contact
          </Link>

          <div className="border-t border-[#d1eef2] mt-2 pt-2">
            <Link
              href={`/${locale}/saved`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#d1eef2] hover:text-[#09637e]"
              onClick={() => setOpen(false)}
            >
              <Bookmark size={16} />
              Saved Opportunities
            </Link>
            <button className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#d1eef2] hover:text-[#09637e] w-full">
              <Globe size={16} />
              Language
            </button>
          </div>
        </div>
      )}

    </header>
  );
}