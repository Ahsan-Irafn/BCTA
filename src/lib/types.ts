export type RegionCode = 'vic' | 'sa' | 'wa';

export interface RegionInfo {
  id: RegionCode;
  name: string;
  shortName: string;
  courseCount: number;
  url: string;
  isExternal?: boolean;
  address: string;
  phone: string;
  badge: string;
  description: string;
  image: string;
  code: string;
}

export interface CourseUnit {
  code: string;
  title: string;
  type: 'Core' | 'Elective';
}

export interface Course {
  id: string;
  code: string;
  title: string;
  slug: string;
  category: 'Building & Construction' | 'Patisserie & Hospitality' | 'Civil Construction';
  deliveryMode: 'Classroom & On-site' | 'Blended' | 'Workplace';
  duration: string;
  regions: RegionCode[];
  featured: boolean;
  description: string;
  careerOutcomes: string[];
  externalUrl?: string;
  image: string;
  aqfLevel?: string;
  overview?: string;
  licensingOutcome?: string;
  entryRequirements?: string[];
  units?: CourseUnit[];
  fundingOptions?: {
    state: string;
    scheme: string;
    note: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
}

export interface Review {
  id: string;
  author: string;
  role: string;
  course: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
  location: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  publishedAt: string;
  status: 'published' | 'draft';
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonical?: string;
  };
}

export interface LocalArea {
  id: string;
  name: string;
  slug: string;
  state: 'Victoria' | 'South Australia' | 'Western Australia';
  heading: string;
  intro: string;
  relevantCourses: string[]; // course codes
  overview: string;
  localIndustryInsight: string;
  featuredImage: string;
  faqs: { question: string; answer: string }[];
  status: 'published' | 'draft';
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface TrustStat {
  value: string;
  label: string;
  detail: string;
}
