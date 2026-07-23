import { ReactNode } from 'react';
import { Briefcase, GraduationCap, BookOpen, Globe, Users } from 'lucide-react';

export const CATEGORY_ICONS: Record<string, ReactNode> = {
  Job: <Briefcase size={20} />,
  Internship: <GraduationCap size={20} />,
  Scholarship: <BookOpen size={20} />,
  Remote: <Globe size={20} />,
  Training: <Users size={20} />,
  Volunteer: <Users size={20} />,
  Course: <BookOpen size={20} />,
};

export const CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string; darkBg: string; darkText: string }
> = {
  Job: { bg: '#d1eef2', text: '#09637e', darkBg: '#1e3a4a', darkText: '#38bdf8' },
  Internship: { bg: '#ede9fe', text: '#5b21b6', darkBg: '#2e1065', darkText: '#a78bfa' },
  Scholarship: { bg: '#fef3c7', text: '#92400e', darkBg: '#3d2000', darkText: '#fbbf24' },
  Remote: { bg: '#d1fae5', text: '#065f46', darkBg: '#052e16', darkText: '#34d399' },
  Training: { bg: '#ffedd5', text: '#9a3412', darkBg: '#3d1200', darkText: '#fb923c' },
  Volunteer: { bg: '#fce7f3', text: '#9d174d', darkBg: '#3d0020', darkText: '#f472b6' },
  Course: { bg: '#dbeafe', text: '#1e40af', darkBg: '#1e1b4b', darkText: '#60a5fa' },
};

export const CATEGORY_BG_COLORS: Record<string, string> = {
  Job: 'bg-[#d1eef2]',
  Internship: 'bg-[#ede9fe]',
  Scholarship: 'bg-[#fef3c7]',
  Remote: 'bg-[#d1fae5]',
  Training: 'bg-[#fce7f3]',
  Volunteer: 'bg-[#dbeafe]',
  Course: 'bg-[#ffedd5]',
};

export const CATEGORY_TAG_CLASSES: Record<string, string> = {
  Job: 'bg-[#d1eef2] text-[#09637e]',
  Internship: 'bg-[#ede9fe] text-purple-700',
  Scholarship: 'bg-[#fef3c7] text-yellow-700',
  Remote: 'bg-[#d1fae5] text-green-700',
  Training: 'bg-[#fee2e2] text-red-700',
  Volunteer: 'bg-[#e0e7ff] text-indigo-700',
  Course: 'bg-[#fce7f3] text-pink-700',
};