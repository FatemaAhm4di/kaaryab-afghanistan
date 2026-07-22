'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Globe,
  ShieldCheck,
  Heart,
  Accessibility,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { MotionWrapper, MotionCard, MotionStagger } from '@/components/ui/MotionWrapper';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <section className="container-custom py-16">

        {/* Hero */}
        <MotionWrapper delay={0.1}>
          <div className="mb-16 grid items-center gap-10 md:grid-cols-2">
            <div className="flex justify-center md:order-last">
              <Image
                src="/illustrations/illustration-about.svg"
                alt="Afghan youth connecting to opportunities"
                width={420}
                height={320}
                className="w-full max-w-sm"
              />
            </div>
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#a8d8df] bg-[#d1eef2] px-4 py-2 text-sm font-medium text-[#09637e]">
                <MapPin size={14} />
                Built in Herat, Afghanistan
              </div>
              <h1 className="text-4xl font-extrabold leading-tight text-[#09637e] md:text-5xl">
                Connecting Afghan Youth to{' '}
                <span className="text-[#088395]">Real Opportunities</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[var(--color-text-secondary)]">
                KaarYab was built because I got tired of seeing talented young
                Afghans miss out on opportunities simply because they did not
                know where to look. Everything in one place. Free. Always.
              </p>
            </div>
          </div>
        </MotionWrapper>

        {/* Mission */}
        <MotionWrapper delay={0.2}>
          <div className="mb-6 rounded-2xl border border-[#d1eef2] bg-white p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              The problem
            </p>
            <h2 className="mb-4 text-2xl font-bold text-[#09637e]">
              Opportunities exist they are just hard to find
            </h2>
            <p className="leading-relaxed text-[var(--color-text-secondary)]">
              Jobs, scholarships, internships, and remote work are scattered
              across dozens of websites, Telegram channels, and Facebook
              groups. Most young people in Afghanistan miss them not because
              they are not qualified but because no one told them in time.
              KaarYab changes that.
            </p>
          </div>
        </MotionWrapper>

        {/* Stats */}
        <MotionStagger staggerDelay={0.1}>
          <div className="mb-6 grid grid-cols-3 gap-4">
            <MotionCard>
              <div className="rounded-2xl border border-[#d1eef2] bg-white p-4 text-center md:p-6">
                <div className="text-2xl font-bold text-[#09637e] md:text-3xl">120+</div>
                <div className="mt-1 text-xs leading-snug text-[var(--color-text-secondary)] md:text-sm">Active opportunities</div>
              </div>
            </MotionCard>
            <MotionCard delay={0.1}>
              <div className="rounded-2xl border border-[#d1eef2] bg-white p-4 text-center md:p-6">
                <div className="text-2xl font-bold text-[#09637e] md:text-3xl">8</div>
                <div className="mt-1 text-xs leading-snug text-[var(--color-text-secondary)] md:text-sm">Categories</div>
              </div>
            </MotionCard>
            <MotionCard delay={0.2}>
              <div className="rounded-2xl border border-[#d1eef2] bg-white p-4 text-center md:p-6">
                <div className="text-2xl font-bold text-[#09637e] md:text-3xl">3</div>
                <div className="mt-1 text-xs leading-snug text-[var(--color-text-secondary)] md:text-sm">Languages</div>
              </div>
            </MotionCard>
          </div>
        </MotionStagger>

        {/* Values */}
        <MotionStagger staggerDelay={0.08}>
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <MotionCard>
              <div className="flex gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
                  <Accessibility size={20} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-[#09637e]">Free for everyone</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    No account needed. No hidden fees. Open to anyone who needs it.
                  </p>
                </div>
              </div>
            </MotionCard>
            <MotionCard delay={0.1}>
              <div className="flex gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-[#09637e]">Multilingual</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Available in Dari, Pashto, and English — because language shouldnt be a barrier.
                  </p>
                </div>
              </div>
            </MotionCard>
            <MotionCard delay={0.2}>
              <div className="flex gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-[#09637e]">Reviewed listings</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Every opportunity is checked before it goes live. No spam, no scams.
                  </p>
                </div>
              </div>
            </MotionCard>
            <MotionCard delay={0.3}>
              <div className="flex gap-4 rounded-2xl border border-[#d1eef2] bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d1eef2] text-[#09637e]">
                  <Heart size={20} />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-[#09637e]">Made with care</h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    Built by an Afghan woman who understands what it means to search and find nothing.
                  </p>
                </div>
              </div>
            </MotionCard>
          </div>
        </MotionStagger>

        {/* Founder */}
        <MotionWrapper delay={0.4}>
          <div className="mb-6 rounded-2xl border border-[#d1eef2] bg-white p-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#088395]">
              The person behind it
            </p>
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#d1eef2] text-xl font-bold text-[#09637e]">
                ف
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#09637e]">Fatema Ahmadi</h3>
                <p className="mb-3 text-sm text-[#088395]">Founder · Herat, Afghanistan</p>
                <p className="leading-relaxed text-[var(--color-text-secondary)]">
                  Im a self-taught frontend developer from Herat. When access
                  to education became limited, I turned to the internet — and
                  learned everything from scratch. KaarYab is my way of making
                  sure others dont have to search as hard as I did.
                </p>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* CTA */}
        <MotionWrapper delay={0.5}>
          <div className="rounded-2xl bg-[#09637e] p-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">
              Ready to find your opportunity?
            </h2>
            <p className="mb-6 text-[rgba(255,255,255,0.75)]">
              Browse jobs, scholarships, internships and more — all in one place.
            </p>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-[#09637e] transition hover:bg-[#d1eef2]"
            >
              Explore opportunities
              <ArrowRight size={17} />
            </Link>
          </div>
        </MotionWrapper>

      </section>
    </main>
  );
}