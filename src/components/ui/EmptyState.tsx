'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  image?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  image,
  action,
  className = '',
}: EmptyStateProps) {
  // اگر تصویر داده نشده، از تصویر پیش‌فرض استفاده کن
  const defaultImage = '/illustrations/illustration-empty.svg';
  const imageSrc = image || defaultImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#a8d8df] dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-16 text-center ${className}`}
    >
      {imageSrc ? (
        <Image 
          src={imageSrc} 
          alt="Empty" 
          width={180} 
          height={140} 
          className="mb-4 opacity-80 dark:opacity-60" 
        />
      ) : icon ? (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d1eef2] dark:bg-gray-700 text-[#09637e] dark:text-[#088395]">
          {icon}
        </div>
      ) : null}

      <h3 className="text-xl font-bold text-[var(--color-primary-dark)] dark:text-white">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)] dark:text-gray-400">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 rounded-xl bg-[#09637e] dark:bg-[#088395] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#075a6b] dark:hover:bg-[#067a8a]"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}