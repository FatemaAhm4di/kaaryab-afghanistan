'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CVForm } from '@/components/cv-builder/CVForm';
import { CVData } from '@/types/cv';
import { MotionWrapper } from '@/components/ui/MotionWrapper';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CVPreview = dynamic(
  () => import('@/components/cv-builder/CVPreview').then((mod) => mod.CVPreview),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[500px] rounded-2xl border border-[#d1eef2] bg-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#d1eef2] border-t-[#09637e] mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)] text-sm">Loading PDF Preview...</p>
        </div>
      </div>
    )
  }
);

const initialCVData: CVData = {
  personal: {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: '',
  },
  summary: '',
  skills: [],
  experience: [],
  education: [],
  projects: [],
  languages: [],
  certifications: [],
};

export default function CVBuilderPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('cv');
  const common = useTranslations('common');
  const [cvData, setCvData] = useState<CVData>(initialCVData);
  const isRtl = locale === 'fa' || locale === 'ps';

  const updateCVData = (newData: Partial<CVData>) => {
    setCvData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <main className="min-h-screen bg-[var(--color-background)] py-4 sm:py-10" dir={isRtl ? 'rtl' : 'ltr'}>
      <section className="container-custom">
        <MotionWrapper delay={0.1}>
          <Link 
            href={`/${locale}`} 
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[#09637e] transition mb-4"
          >
            <ArrowLeft size={16} />
            {common('back')}
          </Link>
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-[#09637e]" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09637e] md:text-4xl">
                {t('title')}
              </h1>
            </div>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
              {t('subtitle')}
            </p>
          </div>
        </MotionWrapper>

        <div className="grid gap-6 lg:grid-cols-2">
          <MotionWrapper delay={0.2}>
            <div className="rounded-2xl border border-[#d1eef2] bg-white p-4 sm:p-6 max-h-[600px] sm:max-h-[800px] overflow-y-auto">
              <CVForm data={cvData} onChange={updateCVData} />
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.3}>
            <div className="rounded-2xl border border-[#d1eef2] bg-white p-4 sm:p-6 h-[600px] sm:h-[800px]">
              <CVPreview data={cvData} />
            </div>
          </MotionWrapper>
        </div>
      </section>
    </main>
  );
}