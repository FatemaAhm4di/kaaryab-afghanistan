'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CVTemplate } from './CVTemplate';
import { CVData } from '@/types/cv';
import { Download, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { ssr: false }
);

type CVPreviewProps = {
  data: CVData;
};

export function CVPreview({ data }: CVPreviewProps) {
  const t = useTranslations('cv');
  const [showPreview, setShowPreview] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const blob = await pdf(<CVTemplate data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${data.personal.firstName || 'CV'}_${data.personal.lastName || 'Builder'}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
    setDownloading(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-bold text-[#09637e]">{t('preview')}</h2>
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            disabled={downloading || !isMounted}
            className="rounded-xl bg-[#09637e] px-3 py-1.5 text-xs sm:text-sm font-medium text-white transition hover:opacity-90 flex items-center gap-1.5 disabled:opacity-60"
          >
            {downloading ? (
              <div className="h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Download size={14} className="sm:size-16" />
            )}
            <span className="hidden xs:inline">{t('download')}</span>
            <span className="xs:hidden">PDF</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-xl border border-[#d1eef2] bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-[#09637e] transition hover:bg-[#d1eef2] flex items-center gap-1.5"
          >
            {showPreview ? <EyeOff size={14} className="sm:size-16" /> : <Eye size={14} className="sm:size-16" />}
            <span className="hidden xs:inline">{showPreview ? 'Hide' : 'Show'}</span>
          </motion.button>
        </div>
      </div>

      {showPreview ? (
        <div className="flex-1 rounded-2xl border border-[#d1eef2] bg-white overflow-hidden" style={{ height: '500px', minHeight: '400px' }}>
          {isMounted ? (
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              <CVTemplate data={data} />
            </PDFViewer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#d1eef2] border-t-[#09637e] mx-auto mb-4" />
                <p className="text-[var(--color-text-secondary)] text-sm">Loading PDF Viewer...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 rounded-2xl border border-[#d1eef2] bg-white flex items-center justify-center p-8 text-center">
          <div className="text-[var(--color-text-secondary)]">
            <Eye size={48} className="mx-auto mb-4 opacity-30" />
            <p>Preview is hidden</p>
            <p className="text-sm">Click -Show- to view your CV</p>
          </div>
        </div>
      )}
    </div>
  );
}