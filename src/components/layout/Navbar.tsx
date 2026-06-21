'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Menu, X, Sun, Globe} from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/30 backdrop-blur-xl shadow-sm">
      
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-lg text-[#075A6B] tracking-wide"
        >
          KaarYab
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-sm font-bold text-gray-800">
          <Link href="/opportunities" className="hover:text-[#075A6B] transition-colors">
            Opportunities
          </Link>
          <Link href="/dashboard" className="hover:text-[#075A6B] transition-colors">
            Dashboard
          </Link>
          <Link href="/about" className="hover:text-[#075A6B] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#075A6B] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Theme */}
          <button className="p-2 rounded-lg hover:bg-white/40 transition">
            <Sun size={18} />
          </button>

          {/* Language */}
          <button className="p-2 rounded-lg hover:bg-white/40 transition">
            <Globe size={18} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/40 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-semibold text-gray-700">
          <Link href="/opportunities" className="block hover:text-[#075A6B]">
            Opportunities
          </Link>
          <Link href="/dashboard" className="block hover:text-[#075A6B]">
            Dashboard
          </Link>
          <Link href="/about" className="block hover:text-[#075A6B]">
            About
          </Link>
          <Link href="/contact" className="block hover:text-[#075A6B]">
            Contact
          </Link>
        </div>
      )}

    </header>
  );
}