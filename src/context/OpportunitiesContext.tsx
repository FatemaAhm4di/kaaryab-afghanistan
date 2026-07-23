'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Opportunity } from '@/features/opportunities/types';

// ============================================================
//  Types
// ============================================================
type OpportunitiesContextType = {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;
  createOpportunity: (data: Omit<Opportunity, 'id'>) => Promise<void>;
  updateOpportunity: (id: string, data: Partial<Opportunity>) => Promise<void>;
  deleteOpportunity: (id: string) => Promise<void>;
  refreshOpportunities: () => Promise<void>;
};

// ============================================================
//  API Functions (جداسازی منطق API)
// ============================================================
const API = {
  fetchAll: async () => {
    const res = await fetch('/api/opportunities');
    if (!res.ok) throw new Error('Failed to fetch opportunities');
    return res.json();
  },

  create: async (data: Omit<Opportunity, 'id'>) => {
    const res = await fetch('/api/opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create');
    }
    return res.json();
  },

  update: async (id: string, data: Partial<Opportunity>) => {
    const res = await fetch(`/api/opportunities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to update');
    }
    return res.json();
  },

  delete: async (id: string) => {
    const res = await fetch(`/api/opportunities/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to delete');
    }
    return res.json();
  },
};

// ============================================================
//  Context Provider
// ============================================================
const OpportunitiesContext = createContext<OpportunitiesContextType | null>(null);

export function OpportunitiesProvider({ children }: { children: React.ReactNode }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ----- Refresh -----
  const refreshOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // تاخیر برای دیدن لودینگ
      const data = await API.fetchAll();
      setOpportunities(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load opportunities. Please try again.');
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ----- Create -----
  const createOpportunity = async (data: Omit<Opportunity, 'id'>) => {
    setError(null);
    try {
      await API.create(data);
      await refreshOpportunities();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create';
      setError(message);
      throw err;
    }
  };

  // ----- Update -----
  const updateOpportunity = async (id: string, data: Partial<Opportunity>) => {
    setError(null);
    try {
      await API.update(id, data);
      await refreshOpportunities();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update';
      setError(message);
      throw err;
    }
  };

  // ----- Delete -----
  const deleteOpportunity = async (id: string) => {
    setError(null);
    try {
      await API.delete(id);
      await refreshOpportunities();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete';
      setError(message);
      throw err;
    }
  };

  // ----- Initial Load -----
  useEffect(() => {
    refreshOpportunities();
  }, [refreshOpportunities]);

  return (
    <OpportunitiesContext.Provider
      value={{
        opportunities,
        loading,
        error,
        createOpportunity,
        updateOpportunity,
        deleteOpportunity,
        refreshOpportunities,
      }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
}

// ============================================================
//  Hook
// ============================================================
export function useOpportunities() {
  const ctx = useContext(OpportunitiesContext);
  if (!ctx) throw new Error('useOpportunities must be used within OpportunitiesProvider');
  return ctx;
}