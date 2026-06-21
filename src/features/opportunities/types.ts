export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  category: 'Job' | 'Internship' | 'Scholarship' | 'Remote';
  location: string;
  type: 'Remote' | 'On-site';
  deadline: string;
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
};