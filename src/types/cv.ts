export type CVData = {
  personal: {
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  skills: string[];
  experience: {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }[];
  education: {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description?: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }[];
  languages: {
    id: string;
    name: string;
    level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Beginner';
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }[];
};