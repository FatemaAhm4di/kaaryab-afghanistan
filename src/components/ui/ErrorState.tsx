'use client';

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';

type ErrorStateProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export function ErrorState({
  title = 'Something went wrong',
  message = 'There was an error loading this content. Please try again.',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/20 px-6 py-16 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: 'spring' }}
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-800/50 text-red-500 dark:text-red-400"
      >
        <AlertCircle size={32} />
      </motion.div>

      <h3 className="text-xl font-bold text-red-700 dark:text-red-400">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-red-600 dark:text-red-300">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <RefreshCw size={16} />
          Try again
        </button>
      )}
    </motion.div>
  );
}