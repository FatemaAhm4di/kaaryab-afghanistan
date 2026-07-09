'use client';

import {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {supabase} from '@/lib/supabase';

type Profile = {
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  gender: string | null;
};

type ProfileContextType = {
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({children}: {children: React.ReactNode}) {
  const [profile, setProfile] = useState<Profile | null>(null);

  const refreshProfile = useCallback(async () => {
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {setProfile(null); return;}

    const {data} = await supabase
      .from('Profile')
      .select('firstName, lastName, avatar, gender')
      .eq('userId', user.id)
      .single();

    setProfile(data);
  }, []);

  useEffect(() => {
    refreshProfile();
    const {data: {subscription}} = supabase.auth.onAuthStateChange(() => {
      refreshProfile();
    });
    return () => subscription.unsubscribe();
  }, [refreshProfile]);

  return (
    <ProfileContext.Provider value={{profile, refreshProfile}}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('Must be inside ProfileProvider');
  return ctx;
}