'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

type SavedContextType = {
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const SavedContext = createContext<SavedContextType | null>(null);

function loadSaved(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem('saved-opportunities');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function SavedOpportunitiesProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [savedIds, setSavedIds] = useState<string[]>(loadSaved);

  useEffect(() => {
    localStorage.setItem('saved-opportunities', JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return (
    <SavedContext.Provider value={{ savedIds, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSavedOpportunities() {
  const ctx = useContext(SavedContext);
  if (!ctx) throw new Error('Must be inside provider');
  return ctx;
}