import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
      <div className="absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full bg-[var(--color-primary)] opacity-15 blur-3xl" />
      <div className="absolute -bottom-28 -right-24 h-[450px] w-[450px] rounded-full bg-[var(--color-secondary)] opacity-15 blur-3xl" />

      <section className="container-custom flex min-h-[calc(100vh-80px)] items-center justify-center py-20">
        <div className="w-full max-w-4xl text-center">

          

          <div className="mb-6 flex justify-center">
            <Image
              src="/illustrations/illustration-home.svg"
              alt="Find opportunities"
              width={320}
              height={260}
              className="w-[220px] md:w-[400px]"
            />
          </div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-4 py-2 text-sm font-medium text-[var(--color-primary-dark)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            Built for Afghan Youth
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-[var(--color-primary-dark)] md:text-6xl">
            Find Opportunities
            <br />
            That <span className="text-[var(--color-primary)]">Change Your Future</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-[var(--color-text-secondary)] md:text-lg">
            KaarYab Afghanistan brings jobs, internships, scholarships, and remote work together in one clean, easy-to-use platform.
          </p>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 px-6 sm:flex-row sm:px-0">
            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary-dark)] px-10 py-4 text-base font-semibold text-white shadow-md transition hover:opacity-90"
            >
              Explore Opportunities
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-10 py-4 text-base font-semibold text-[var(--color-primary-dark)] shadow-md ring-2 ring-[var(--color-primary-dark)] transition hover:bg-[#d1eef2]"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-secondary)]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary-dark)]">120+</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Opportunities</div>
            </div>
            <div className="hidden h-8 w-px bg-[var(--color-border)] md:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary-dark)]">8</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Categories</div>
            </div>
            <div className="hidden h-8 w-px bg-[var(--color-border)] md:block" />
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--color-primary-dark)]">Free</div>
              <div className="text-sm text-[var(--color-text-secondary)]">Always</div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 px-4 md:grid-cols-4 md:px-0">
  <div className="flex items-center gap-3 rounded-2xl border border-[#d1eef2] bg-white px-5 py-4">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[var(--color-primary-dark)]">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    </div>
    <div className="text-left">
      <div className="text-xs text-[var(--color-text-secondary)]">Jobs</div>
      <div className="text-base font-semibold text-[var(--color-text-primary)]">45 open</div>
    </div>
  </div>

  <div className="flex items-center gap-3 rounded-2xl border border-[#fde68a] bg-white px-5 py-4">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fef3c7] text-yellow-700">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
    </div>
    <div className="text-left">
      <div className="text-xs text-[var(--color-text-secondary)]">Scholarships</div>
      <div className="text-base font-semibold text-[var(--color-text-primary)]">28 active</div>
    </div>
  </div>

  <div className="flex items-center gap-3 rounded-2xl border border-[#ddd6fe] bg-white px-5 py-4">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ede9fe] text-purple-700">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    </div>
    <div className="text-left">
      <div className="text-xs text-[var(--color-text-secondary)]">Internships</div>
      <div className="text-base font-semibold text-[var(--color-text-primary)]">33 open</div>
    </div>
  </div>

  <div className="flex items-center gap-3 rounded-2xl border border-[#a7f3d0] bg-white px-5 py-4">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d1fae5] text-green-700">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
    </div>
    <div className="text-left">
      <div className="text-xs text-[var(--color-text-secondary)]">Remote</div>
      <div className="text-base font-semibold text-[var(--color-text-primary)]">14 open</div>
    </div>
  </div>
</div>
        </div>
      </section>
    </main>
  );
}