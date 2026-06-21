import Link from 'next/link';

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
      <div className="absolute -left-24 -top-24 h-[300px] w-[300px] rounded-full bg-[var(--color-primary)] opacity-20 blur-3xl" />

      <div className="absolute -bottom-28 -right-24 h-[350px] w-[350px] rounded-full bg-[var(--color-secondary)] opacity-20 blur-3xl" />

      <section className="container-custom flex min-h-[calc(100vh-80px)] items-center justify-center">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-[var(--color-primary-dark)] md:text-6xl">
            Find Opportunities
            <br />
            That Change Your Future
          </h1>

          <p className="mt-6 text-base text-[var(--color-text-secondary)] md:text-lg">
            KaarYab Afghanistan helps you discover jobs, internships,
            scholarships, and remote work in one place.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row">
            <Link
              href="/opportunities"
              className="rounded-xl bg-[var(--color-primary-dark)] px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Explore Opportunities
            </Link>

            <Link
              href="/about"
              className="rounded-xl border border-[var(--color-primary-dark)] px-6 py-3 font-semibold text-[var(--color-primary-dark)] transition hover:bg-white/50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}