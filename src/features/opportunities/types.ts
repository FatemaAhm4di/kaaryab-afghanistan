export type Opportunity = {
  id: string;
  title: string;
  organization: string;
  category: 'Job' | 'Internship' | 'Scholarship' | 'Remote' | 'Training' | 'Volunteer' | 'Course';
  location: string;
  type: 'Remote' | 'OnSite' | 'Hybrid';
  deadline: string;
  description: string;
  requirements: string[];
  applyLink: string;
  tags: string[];
  featured?: boolean;
};