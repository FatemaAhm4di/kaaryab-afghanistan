'use client';

import { motion } from 'framer-motion';

type LoadingStateProps = {
  message?: string;
  className?: string;
};

export function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="h-10 w-10 rounded-full border-4 border-[#d1eef2] border-t-[#09637e] dark:border-gray-700 dark:border-t-[#088395]"
      />
      <p className="mt-4 text-sm text-[var(--color-text-secondary)]">{message}</p>
    </div>
  );
}