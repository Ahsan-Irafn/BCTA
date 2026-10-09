import { RegionInfo, TrustStat } from './types';

export const SITE_CONFIG = {
  name: 'BCTA - Building and Construction Training Australia',
  shortName: 'BCTA',
  tagline: 'Practical, Nationally Recognised Building & Construction Courses',
  rtoCode: '22597',
  phone: '1300 11 2282',
  email: 'enquiries@bcta.vic.edu.au',
  mainWebsite: 'https://bcta.edu.au',
  lmsUrl: 'https://lms.bcta.vic.edu.au',
  applyUrl: '/enquire-now/#enq1',
  socialLinks: {
    facebook: 'https://www.facebook.com/BCTAaustralia/?_rdc=2&_rdr#',
    instagram: 'https://www.instagram.com/bcta_australia/',
    linkedin: 'https://au.linkedin.com/company/bctaaustralia',
    pinterest: 'https://www.pinterest.com.au/bctaaustralia/',
    youtube: 'https://www.youtube.com/@bctaaustralia',
  },
  addresses: {
    sa: 'Level 30, 91 King William Street, Adelaide SA 5000',
    wa: 'Unit 1, 220 Carr Pl, Leederville WA 6007, Australia',
    vic: 'Melbourne & Regional Victoria Training Facilities',
  },
} as const;

export const REGIONS: RegionInfo[] = [
  {
    id: 'vic',
    name: 'Victoria',
    shortName: 'VIC',
    courseCount: 5,
    code: 'V',
    url: 'https://www.bcta.vic.edu.au/home/',
    isExternal: true,
    address: 'Melbourne & Regional Victoria Training Sites',
    phone: '1300 11 2282',
    badge: 'Government Subsidised Options Available',
    description: 'Explore carpentry, civil construction, building management and patisserie courses in Melbourne and regional Victoria.',
    image: '/images/states/victoria.png',
  },
  {
    id: 'sa',
    name: 'South Australia',
    shortName: 'SA',
    courseCount: 5,
    code: 'S',
    url: 'https://bcta.edu.au/south-australia/',
    isExternal: true,
    address: 'Level 30, 91 King William Street, Adelaide SA 5000',
    phone: '1300 11 2282',
    badge: 'Adelaide & Regional SA Delivery',
    description: 'Industry-focused qualifications designed to help you become a licensed builder or skilled trades professional in South Australia.',
    image: '/images/states/south-australia.png',
  },
  {
    id: 'wa',
    name: 'Western Australia',
    shortName: 'WA',
    courseCount: 5,
    code: 'W',
    url: 'https://bcta.edu.au/western-australia/',
    isExternal: true,
    address: 'Unit 1, 220 Carr Pl, Leederville WA 6007, Australia',
    phone: '1300 11 2282',
    badge: 'Perth & Regional WA Training',
    description: 'Nationally accredited training pathways for aspiring builders, site supervisors, and trade specialists across Western Australia.',
    image: '/images/states/western-australia.png',
  },
];

export const TRUST_STATS: TrustStat[] = [
  {
    value: 'RTO # 22597',
    label: 'Nationally Recognised',
    detail: 'Australian Skills Quality Authority (ASQA) registered training organisation.',
  },
  {
    value: '3 States',
    label: 'Cross-State Delivery',
    detail: 'Accredited training across Victoria, South Australia, and Western Australia.',
  },
  {
    value: 'Industry-Led',
    label: 'Experienced Trainers',
    detail: 'Hands-on practical training guided by active licensed trade practitioners.',
  },
  {
    value: 'Career-Focused',
    label: 'Licensing Pathways',
    detail: 'Qualifications structured towards builder registration and trade mastery.',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Study Locations',
    children: [
      { label: 'Victoria', href: 'https://www.bcta.vic.edu.au/home/', external: true },
      { label: 'South Australia', href: 'https://bcta.edu.au/south-australia/', external: true },
      { label: 'Western Australia', href: 'https://bcta.edu.au/western-australia/', external: true },
    ],
  },
  {
    label: 'Courses',
    children: [
      { label: 'Certificate III in Carpentry', href: 'https://bcta.edu.au/courses/certificate-iii-in-carpentry-south-australia/', external: true },
      { label: 'Certificate III in Civil Construction Plant Operations', href: 'https://bcta.edu.au/courses/certificate-iii-in-civil-construction-plant-operations-south-australia/', external: true },
      { label: 'Certificate IV in Building & Construction', href: 'https://bcta.edu.au/courses/certificate-iv-in-building-construction-building-south-australia/', external: true },
      { label: 'Diploma of Building and Construction', href: 'https://bcta.edu.au/courses/diploma-of-building-and-construction-south-australia/', external: true },
      { label: 'SIT40721 - Certificate IV in Patisserie', href: 'https://bcta.edu.au/courses/sit40721-certificate-iv-in-patisserie-south-australia/', external: true },
    ],
  },
  { label: 'About Us', href: 'https://bcta.edu.au/about-us-south-australia/', external: true },
  { label: 'Reviews', href: 'https://bcta.edu.au/reviews-south-australia/', external: true },
  { label: 'Contact', href: 'https://bcta.edu.au/contact-us-south-australia/', external: true },
];

export const FOOTER_EXPLORE_LINKS = [
  { label: 'Fees', href: 'https://bcta.edu.au/fees', external: true },
  { label: 'Forms', href: 'https://bcta.edu.au/forms', external: true },
  { label: 'Referral Agents', href: null },
  { label: 'RPL / RCC & CT', href: null },
  { label: 'Privacy Policy', href: 'https://bcta.edu.au/privacy-policy', external: true },
  { label: 'Online Service Standards', href: null },
];

export const FOOTER_CONTACT_LINKS = [
  { label: 'Contacts Us', href: 'https://bcta.edu.au/contact-us-south-australia/', external: true },
  { label: 'About Us', href: 'https://bcta.edu.au/about-us-south-australia/', external: true },
  { label: 'Reviews', href: 'https://bcta.edu.au/reviews-south-australia/', external: true },
];
