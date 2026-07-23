export const DASHBOARD_TYPE_DATA = [
  { name: 'Remote', value: 59, color: '#09637e' },
  { name: 'On-site', value: 28, color: '#7c3aed' },
  { name: 'Hybrid', value: 13, color: '#f59e0b' },
];

export const DASHBOARD_CATEGORY_DATA = [
  { label: 'Jobs', value: 45, max: 120, color: '#09637e' },
  { label: 'Internships', value: 33, max: 120, color: '#7c3aed' },
  { label: 'Scholarships', value: 28, max: 120, color: '#f59e0b' },
  { label: 'Remote', value: 14, max: 120, color: '#10b981' },
  { label: 'Training', value: 6, max: 120, color: '#f43f5e' },
];

export const DASHBOARD_TYPE_KEYS: Record<string, string> = {
  Remote: 'remote',
  'On-site': 'onSite',
  Hybrid: 'hybrid',
};