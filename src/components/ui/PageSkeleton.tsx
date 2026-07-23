'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type PageSkeletonProps = {
  children: ReactNode;
  className?: string;
  count?: number;
  gridCols?: string;
};

export function PageSkeleton({ 
  children, 
  className = '', 
  count = 1, 
  gridCols = 'md:grid-cols-2 lg:grid-cols-3' 
}: PageSkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className={`grid gap-4 ${gridCols}`}>
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
          >
            {children}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// کامپوننت‌های آماده برای استفاده
export function CardSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-8 w-8 rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-6 w-3/4 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-2">
        <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-8 w-48 rounded-lg bg-gray-200 dark:bg-gray-700" />
      <div className="h-4 w-64 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function StatsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-${count}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
          <div className="mb-3 h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div className="h-7 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-1 h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mt-2 h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}