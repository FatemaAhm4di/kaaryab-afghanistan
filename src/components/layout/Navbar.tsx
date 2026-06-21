import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#D7E6EA] bg-[#EBF4F6]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        
        <Link
          href="/"
          className="text-lg font-bold text-[#075A6B]"
        >
          KaarYab
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-[#0F172A]/70">
          <Link className="hover:text-[#075A6B] transition" href="/opportunities">
            Opportunities
          </Link>
          <Link className="hover:text-[#075A6B] transition" href="/dashboard">
            Dashboard
          </Link>
          <Link className="hover:text-[#075A6B] transition" href="/saved">
            Saved
          </Link>
        </nav>

        <button className="rounded-md bg-[#09637E] px-3 py-1 text-sm text-white hover:bg-[#075A6B] transition">
          Theme
        </button>

      </div>
    </header>
  );
}