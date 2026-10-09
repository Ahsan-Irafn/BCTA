import { Course, Review, BlogPost, LocalArea } from './types';

export const COURSES_DATA: Course[] = [
  {
    id: 'cpc40120',
    code: 'CPC40120',
    title: 'Certificate IV in Building and Construction (Building)',
    slug: 'certificate-iv-in-building-construction',
    category: 'Building & Construction',
    deliveryMode: 'Blended',
    duration: 'Up to 12 Months',
    regions: ['vic', 'sa', 'wa'],
    featured: true,
    description: 'Designed for tradespeople and professionals seeking supervisory roles, site management, or registration as a licensed builder in residential construction.',
    careerOutcomes: ['Licensed Residential Builder', 'Site Supervisor', 'Construction Project Coordinator', 'Building Inspector Assistant'],
    externalUrl: 'https://bcta.edu.au/courses/certificate-iv-in-building-construction-building-south-australia/',
    image: '/images/hero-banner.webp',
  },
  {
    id: 'cpc50220',
    code: 'CPC50220',
    title: 'Diploma of Building and Construction (Building)',
    slug: 'diploma-of-building-and-construction',
    category: 'Building & Construction',
    deliveryMode: 'Classroom & On-site',
    duration: '1 to 2 Years',
    regions: ['vic', 'sa', 'wa'],
    featured: true,
    description: 'Master medium-rise building projects, contract administration, structural principles, cost planning, and site risk management for senior builder licensing.',
    careerOutcomes: ['General Builder (Medium Rise)', 'Construction Manager', 'Head Site Superintendent', 'Principal Contractor'],
    externalUrl: 'https://bcta.edu.au/courses/diploma-of-building-and-construction-south-australia/',
    image: '/images/hero-banner.webp',
  },
  {
    id: 'cpc30220',
    code: 'CPC30220',
    title: 'Certificate III in Carpentry',
    slug: 'certificate-iii-in-carpentry',
    category: 'Building & Construction',
    deliveryMode: 'Classroom & On-site',
    duration: 'Apprenticeship / Trade Pathway',
    regions: ['vic', 'sa', 'wa'],
    featured: true,
    description: 'Hands-on trade qualification covering setting out, framing, pitched roofing, exterior cladding, interior finishing, and work health & safety.',
    careerOutcomes: ['Qualified Residential Carpenter', 'Formwork Carpenter', 'Finishing Carpenter', 'Building Contractor Subcontractor'],
    externalUrl: 'https://bcta.edu.au/courses/certificate-iii-in-carpentry-south-australia/',
    image: '/images/hero-banner.webp',
  },
  {
    id: 'rii30820',
    code: 'RII30820',
    title: 'Certificate III in Civil Construction Plant Operations',
    slug: 'certificate-iii-in-civil-construction-plant-operations',
    category: 'Civil Construction',
    deliveryMode: 'Workplace',
    duration: '12 to 24 Months',
    regions: ['vic', 'sa', 'wa'],
    featured: true,
    description: 'Gain practical competency in operating heavy civil plant machinery including excavators, wheeled loaders, backhoes, and skid steers on civil infrastructure sites.',
    careerOutcomes: ['Civil Plant Operator', 'Excavator Operator', 'Earthmoving Contractor', 'Civil Infrastructure Specialist'],
    externalUrl: 'https://bcta.edu.au/courses/certificate-iii-in-civil-construction-plant-operations-south-australia/',
    image: '/images/hero-banner.webp',
  },
  {
    id: 'sit40721',
    code: 'SIT40721',
    title: 'Certificate IV in Patisserie',
    slug: 'certificate-iv-in-patisserie',
    category: 'Patisserie & Hospitality',
    deliveryMode: 'Classroom & On-site',
    duration: '1 to 2 Years',
    regions: ['vic', 'sa', 'wa'],
    featured: false,
    description: 'Specialist culinary qualification delivering classical and contemporary gateaux, chocolate artistry, pastries, sugar confection, and team kitchen leadership.',
    careerOutcomes: ['Head Pastry Chef', 'Speciality Baker', 'Chocolatier / Confectioner', 'Patisserie Business Owner'],
    externalUrl: 'https://bcta.edu.au/courses/sit40721-certificate-iv-in-patisserie-south-australia/',
    image: '/images/hero-banner.webp',
  },
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Daniel M.',
    role: 'Licensed Builder (VIC)',
    course: 'Certificate IV in Building & Construction',
    rating: 5,
    content: 'BCTA’s practical approach made all the difference. The trainers bring real job-site experience and guided me step-by-step through the VBA builder registration knowledge requirements.',
    date: 'August 2026',
    verified: true,
    location: 'Melbourne, VIC',
  },
  {
    id: 'rev-2',
    author: 'Samira K.',
    role: 'Site Supervisor',
    course: 'Diploma of Building and Construction',
    rating: 5,
    content: 'Flexible evening workshops allowed me to keep working on site while completing my Diploma. The structural principles and contract management units were extremely valuable.',
    date: 'July 2026',
    verified: true,
    location: 'Adelaide, SA',
  },
  {
    id: 'rev-3',
    author: 'Marcus T.',
    role: 'Qualified Carpenter & Subcontractor',
    course: 'Certificate III in Carpentry',
    rating: 5,
    content: 'Great workshop facilities and supportive assessors. The practical set-out sessions at Keysborough were fantastic for perfecting roof pitch framing and leveling.',
    date: 'June 2026',
    verified: true,
    location: 'Geelong, VIC',
  },
  {
    id: 'rev-4',
    author: 'Brendan L.',
    role: 'Civil Plant Operator',
    course: 'Cert III in Civil Construction Plant Operations',
    rating: 5,
    content: 'Hands-on seat time on the machinery and clear safety procedures. Got my qualification recognized and stepped into major infrastructure projects straight away.',
    date: 'May 2026',
    verified: true,
    location: 'Perth, WA',
  },
];

export const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 'post-1',
    title: 'How to Become a Licensed Builder in South Australia',
    slug: 'how-to-become-a-licensed-builder-in-south-australia',
    excerpt: 'A comprehensive step-by-step guide outlining educational requirements, consumer and business services (CBS) licensing criteria, and pathway courses.',
    content: `
      <h2>Steps to Building Contractor Registration in South Australia</h2>
      <p>Obtaining your building license in South Australia through Consumer and Business Services (CBS) requires a combination of accredited qualifications, demonstrated supervisory experience, and business management acumen.</p>
      <h3>1. Educational Foundation</h3>
      <p>Completing a nationally recognised qualification such as the CPC40120 Certificate IV in Building & Construction or CPC50220 Diploma of Building and Construction provides the core technical competency required for general building work.</p>
      <h3>2. Practical Site Experience</h3>
      <p>Candidates must document site management, supervision, and trade execution under registered building practitioners.</p>
    `,
    featuredImage: '/images/hero-banner.webp',
    author: 'BCTA Industry Specialist Team',
    category: 'Licensing & Careers',
    publishedAt: '2026-09-08',
    status: 'published',
    seo: {
      metaTitle: 'How to Become a Licensed Builder in South Australia | BCTA Guide',
      metaDescription: 'Step-by-step pathway to becoming a licensed building contractor in South Australia with BCTA qualification guidance.',
    },
  },
  {
    id: 'post-2',
    title: 'Addressing Regional Construction Skills Shortages in 2026',
    slug: 'addressing-regional-construction-skills-shortages',
    excerpt: 'Why regional Victoria, South Australia, and WA require qualified carpenters and supervisors, and how subsidised training can fast-track your trade career.',
    content: `
      <h2>The Growing Demand for Qualified Builders and Trades</h2>
      <p>Infrastructure expansions and residential housing demands across regional hubs have amplified the need for qualified site supervisors, plant operators, and carpenters.</p>
    `,
    featuredImage: '/images/hero-banner.webp',
    author: 'BCTA Education Team',
    category: 'Industry Insights',
    publishedAt: '2026-08-15',
    status: 'published',
    seo: {
      metaTitle: 'Regional Construction Skills Shortages & Trade Pathways | BCTA',
      metaDescription: 'Discover how BCTA accredited qualifications help fill critical carpentry and building supervision shortages in regional Australia.',
    },
  },
];

export const LOCAL_AREAS_DATA: LocalArea[] = [
  {
    id: 'bendigo',
    name: 'Bendigo',
    slug: 'bendigo',
    state: 'Victoria',
    heading: 'Building & Construction Courses in Bendigo, Victoria',
    intro: 'Advance your trade career in Greater Bendigo with nationally accredited building qualifications designed to support local residential growth.',
    relevantCourses: ['CPC40120', 'CPC50220', 'CPC30220'],
    overview: 'Bendigo has seen significant residential development and commercial renewal, driving demand for registered builders and certified tradespeople.',
    localIndustryInsight: 'Local builders who hold the Diploma or Certificate IV are well positioned to win regional tenders and manage residential developments across central Victoria.',
    featuredImage: '/images/hero-banner.webp',
    faqs: [
      {
        question: 'Can I study while continuing work on Bendigo building sites?',
        answer: 'Yes. BCTA offers flexible blended delivery combining evening classes and weekend practical workshops designed for working tradespeople.',
      },
    ],
    status: 'published',
    seo: {
      metaTitle: 'Building & Construction Courses in Bendigo | BCTA Victoria',
      metaDescription: 'Explore accredited carpentry and building qualifications available to students in Greater Bendigo with BCTA (RTO # 22597).',
    },
  },
  {
    id: 'shepparton',
    name: 'Shepparton',
    slug: 'shepparton',
    state: 'Victoria',
    heading: 'Construction & Civil Plant Training in Shepparton',
    intro: 'Gain practical certifications in building supervision and civil plant operation across the Goulburn Valley region.',
    relevantCourses: ['CPC40120', 'RII30820'],
    overview: 'Shepparton is a critical logistics and agricultural infrastructure hub with steady civil works and residential construction requirements.',
    localIndustryInsight: 'Civil operators holding the RII30820 qualification are in consistent demand on regional roadworks and irrigation projects.',
    featuredImage: '/images/hero-banner.webp',
    faqs: [
      {
        question: 'Are there funding subsidies available in Shepparton?',
        answer: 'Eligibility depends on Victorian Skills First criteria. Contact BCTA advisors to check your regional funding eligibility.',
      },
    ],
    status: 'published',
    seo: {
      metaTitle: 'Construction Training in Shepparton | BCTA (RTO # 22597)',
      metaDescription: 'Accredited building and civil plant operation training pathways for students in Shepparton and the Goulburn Valley.',
    },
  },
  {
    id: 'geelong',
    name: 'Geelong',
    slug: 'geelong',
    state: 'Victoria',
    heading: 'Building & Carpentry Qualifications in Geelong',
    intro: 'Prepare for your builder license in Geelong and the Bellarine Peninsula with industry-accredited courses.',
    relevantCourses: ['CPC40120', 'CPC50220', 'CPC30220'],
    overview: 'As Victoria’s largest regional city, Geelong continues to experience rapid residential expansion requiring qualified carpentry trades and licensed builders.',
    localIndustryInsight: 'Graduates from Geelong leverage BCTA qualifications to satisfy the technical criteria for registration with the Victorian Building Authority (VBA).',
    featuredImage: '/images/hero-banner.webp',
    faqs: [
      {
        question: 'How do these courses help with VBA registration in Geelong?',
        answer: 'The units directly cover Victorian legislation, National Construction Code (NCC) standards, and project financial management required for Domestic Builder (Unlimited) registration.',
      },
    ],
    status: 'published',
    seo: {
      metaTitle: 'Building Courses in Geelong | BCTA Registered Training',
      metaDescription: 'Prepare for your VBA builder registration with accredited construction courses for Geelong trades professionals.',
    },
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    icon: 'Hammer',
    title: 'Practical, Hands-on Training',
    description: 'We believe learning building skills requires real site experience. Our practical workshops at dedicated training sites give you genuine on-tools exposure.',
  },
  {
    icon: 'Award',
    title: 'Nationally Recognised (RTO # 22597)',
    description: 'All qualifications adhere strictly to the Australian Qualifications Framework (AQF) and are registered under ASQA for cross-state recognition.',
  },
  {
    icon: 'Users',
    title: 'Industry-Experienced Trainers',
    description: 'Our educators are licensed builders, project managers, and trade specialists who share current industry best practices and trade secrets.',
  },
  {
    icon: 'Clock',
    title: 'Flexible Schedules for Working Trades',
    description: 'Designed for working adults with evening classes, weekend workshops, and flexible online LMS course materials.',
  },
  {
    icon: 'FileCheck',
    title: 'Licensing & Registration Support',
    description: 'Curriculum structured around the regulatory requirements of VBA (Victoria), CBS (South Australia), and Building Commission (WA).',
  },
  {
    icon: 'Compass',
    title: 'Recognition of Prior Learning (RPL)',
    description: 'Got years of on-site experience without the ticket? Fast-track your qualification through our structured RPL assessment process.',
  },
];
