'use client';

import {createContext, useContext, useEffect, useState} from 'react';

type SavedContextType = {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const SavedContext = createContext<SavedContextType | null>(null);

export function SavedOpportunitiesProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];

    const stored = localStorage.getItem('saved-opportunities');

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      'saved-opportunities',
      JSON.stringify(savedIds)
    );
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const isSaved = (id: string) => {
    return savedIds.includes(id);
  };

  return (
    <SavedContext.Provider
      value={{
        savedIds,
        toggleSave,
        isSaved
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSavedOpportunities() {
  const context = useContext(SavedContext);

  if (!context) {
    throw new Error(
      'useSavedOpportunities must be used inside SavedOpportunitiesProvider'
    );
  }

  return context;
}