'use client';

import {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {Opportunity} from '@/features/opportunities/types';

type OpportunitiesContextType = {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;  // ✅ اضافه شد
  createOpportunity: (data: Omit<Opportunity, 'id'>) => Promise<void>;
  updateOpportunity: (id: string, data: Partial<Opportunity>) => Promise<void>;
  deleteOpportunity: (id: string) => Promise<void>;
  refreshOpportunities: () => Promise<void>;
};

const OpportunitiesContext = createContext<OpportunitiesContextType | null>(null);

export function OpportunitiesProvider({children}: {children: React.ReactNode}) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  // ✅ اضافه شد

  const refreshOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);  // ✅ ریست خطا
    try {
      // ✅ تاخیر ۱ ثانیه برای دیدن لودینگ
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const res = await fetch('/api/opportunities');
      if (!res.ok) {
        throw new Error('Failed to fetch opportunities');
      }
      const data = await res.json();
      setOpportunities(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load opportunities. Please try again.');
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshOpportunities();
  }, [refreshOpportunities]);

  const createOpportunity = async (data: Omit<Opportunity, 'id'>) => {
    setError(null);
    try {
      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create');
      }
      await refreshOpportunities();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create');
      throw err;
    }
  };

  const updateOpportunity = async (id: string, data: Partial<Opportunity>) => {
    setError(null);
    try {
      const res = await fetch(`/api/opportunities/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to update');
      }
      await refreshOpportunities();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
      throw err;
    }
  };

  const deleteOpportunity = async (id: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/opportunities/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to delete');
      }
      await refreshOpportunities();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      throw err;
    }
  };

  return (
    <OpportunitiesContext.Provider value={{
      opportunities,
      loading,
      error,  // ✅ اضافه شد
      createOpportunity,
      updateOpportunity,
      deleteOpportunity,
      refreshOpportunities,
    }}>
      {children}
    </OpportunitiesContext.Provider>
  );
}

export function useOpportunities() {
  const ctx = useContext(OpportunitiesContext);
  if (!ctx) throw new Error('Must be inside OpportunitiesProvider');
  return ctx;
}