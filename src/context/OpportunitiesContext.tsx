'use client';

import {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {Opportunity} from '@/features/opportunities/types';

type OpportunitiesContextType = {
  opportunities: Opportunity[];
  loading: boolean;
  createOpportunity: (data: Omit<Opportunity, 'id'>) => Promise<void>;
  updateOpportunity: (id: string, data: Partial<Opportunity>) => Promise<void>;
  deleteOpportunity: (id: string) => Promise<void>;
  refreshOpportunities: () => Promise<void>;
};

const OpportunitiesContext = createContext<OpportunitiesContextType | null>(null);

export function OpportunitiesProvider({children}: {children: React.ReactNode}) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshOpportunities = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/opportunities');
    const data = await res.json();
    setOpportunities(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refreshOpportunities();
  }, [refreshOpportunities]);

  const createOpportunity = async (data: Omit<Opportunity, 'id'>) => {
    await fetch('/api/opportunities', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    await refreshOpportunities();
  };

  const updateOpportunity = async (id: string, data: Partial<Opportunity>) => {
    await fetch(`/api/opportunities/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    });
    await refreshOpportunities();
  };

  const deleteOpportunity = async (id: string) => {
    await fetch(`/api/opportunities/${id}`, {method: 'DELETE'});
    await refreshOpportunities();
  };

  return (
    <OpportunitiesContext.Provider value={{
      opportunities,
      loading,
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