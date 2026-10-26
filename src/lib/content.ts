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
    overview: 'The CPC40120 Certificate IV in Building and Construction is Australia’s benchmark qualification for carpentry and trade professionals looking to step up into site management or apply for Domestic Builder registration (DB-U in Victoria, General Building Work in South Australia and WA). Learn structural principles, NCC compliance, project estimating, contracts, and on-site occupational safety from licensed industry practitioners.',
    licensingOutcome: 'Fulfills the prescribed educational criteria for Victorian Building Authority (VBA) Domestic Builder Unlimited (DB-U) and Consumer & Business Services (CBS) South Australia builder licensing.',
    entryRequirements: [
      'Must be at least 18 years of age.',
      'Hold trade experience in building and construction (preferred 2+ years on-site).',
      'Satisfactory completion of Language, Literacy, and Numeracy (LLN) assessment.',
      'Access to a computer/tablet with broadband internet and basic digital literacy.',
    ],
    units: [
      { code: 'CPCCBC4001', title: 'Apply building codes and standards to the construction process for Class 1 and 10 buildings', type: 'Core' },
      { code: 'CPCCBC4002', title: 'Manage occupational health and safety in the building and construction workplace', type: 'Core' },
      { code: 'CPCCBC4003', title: 'Select, prepare and administer a construction contract', type: 'Core' },
      { code: 'CPCCBC4004', title: 'Identify and produce estimated costs for building and construction projects', type: 'Core' },
      { code: 'CPCCBC4005', title: 'Produce labour and material schedules for ordering', type: 'Core' },
      { code: 'CPCCBC4007', title: 'Plan building or construction work', type: 'Core' },
      { code: 'CPCCBC4008', title: 'Conduct on-site supervision of building and construction projects', type: 'Core' },
      { code: 'CPCCBC4009', title: 'Apply legal requirements to building and construction projects', type: 'Core' },
      { code: 'CPCCBC4010', title: 'Apply structural principles to residential and commercial constructions', type: 'Core' },
      { code: 'CPCCBC4012', title: 'Read and interpret plans and specifications', type: 'Core' },
      { code: 'CPCCBC4018', title: 'Apply site surveys and set-out procedures to building projects', type: 'Core' },
      { code: 'CPCCBC4024', title: 'Resolve business disputes', type: 'Elective' },
    ],
    fundingOptions: [
      { state: 'VIC', scheme: 'Skills First Funding', note: 'Victorian government subsidies available for eligible domestic students.' },
      { state: 'SA', scheme: 'Fee-for-Service & Traineeships', note: 'Flexible payment plans and corporate group delivery options available.' },
      { state: 'WA', scheme: 'Jobs & Skills WA / Subsidies', note: 'Eligible students may qualify for WA state-subsidised tuition.' },
    ],
    faqs: [
      {
        question: 'Does this course qualify me to become a registered builder?',
        answer: 'Yes, CPC40120 is the recognised educational qualification required by the Victorian Building Authority (VBA) and South Australian CBS. You will also need to demonstrate relevant practical building experience when applying to the regulator.',
      },
      {
        question: 'Can I study while continuing full-time work on site?',
        answer: 'Absolutely. Our blended delivery features evening virtual tutorials, recorded lectures, and flexible weekend practical workshops so you never lose working hours.',
      },
      {
        question: 'Is Recognition of Prior Learning (RPL) available?',
        answer: 'Yes! If you have extensive on-site experience, our assessors can evaluate your prior evidence to grant unit exemptions, significantly shortening your time to completion.',
      },
    ],
    careerOutcomes: ['Licensed Residential Builder', 'Site Supervisor', 'Construction Project Coordinator', 'Building Inspector Assistant'],
    externalUrl: '/courses/certificate-iv-in-building-construction-building-south-australia',
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
    overview: 'The CPC50220 Diploma of Building and Construction (Building) takes your career to the highest commercial and residential tiers. You will master medium-rise structural systems (up to 3 storeys), complex contract administration, high-value site budgeting, and multi-team subcontract coordination.',
    licensingOutcome: 'Fulfills technical criteria for Commercial Builder and unlimited Residential Builder registration across all Australian jurisdictions.',
    entryRequirements: [
      'Completion of Certificate IV in Building & Construction OR equivalent substantial construction supervision experience.',
      'Must be at least 18 years of age.',
      'Sound digital literacy and completion of LLN evaluation.',
    ],
    units: [
      { code: 'CPCCBC5001', title: 'Apply building codes and standards to the construction process for Type B and C constructions', type: 'Core' },
      { code: 'CPCCBC5002', title: 'Monitor costing systems on complex building and construction projects', type: 'Core' },
      { code: 'CPCCBC5003', title: 'Supervise the planning of on-site medium rise building or construction work', type: 'Core' },
      { code: 'CPCCBC5004', title: 'Apply inspection principles to complex building and construction projects', type: 'Core' },
      { code: 'CPCCBC5005', title: 'Select and manage building and construction contractors', type: 'Core' },
      { code: 'CPCCBC5007', title: 'Administer the legal obligations of a building and construction contractor', type: 'Core' },
      { code: 'CPCCBC5010', title: 'Manage design process for medium rise building and construction projects', type: 'Core' },
      { code: 'CPCCBC5018', title: 'Manage structural principles for medium rise buildings', type: 'Core' },
    ],
    fundingOptions: [
      { state: 'VIC', scheme: 'Skills First & Payment Plans', note: 'Concession and subsidised funding criteria apply for eligible Victorian residents.' },
      { state: 'SA & WA', scheme: 'Employer-Supported & Direct Instalments', note: 'Interest-free split payment schedules available across duration.' },
    ],
    faqs: [
      {
        question: 'What types of buildings does this qualification cover?',
        answer: 'CPC50220 covers residential and commercial buildings up to 3 storeys, classified as Type B and C construction in the National Construction Code.',
      },
      {
        question: 'How does this compare to the Certificate IV?',
        answer: 'While the Certificate IV targets low-rise residential structures (Class 1 & 10), the Diploma elevates your competency into complex medium-rise engineering, advanced contract law, and multi-million-dollar financial forecasting.',
      },
    ],
    careerOutcomes: ['General Builder (Medium Rise)', 'Construction Manager', 'Head Site Superintendent', 'Principal Contractor'],
    externalUrl: '/courses/diploma-of-building-and-construction-south-australia',
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
    overview: 'The CPC30220 Certificate III in Carpentry is the definitive trade qualification for carpenters in residential and commercial sectors. Train in real trade workshop environments with dedicated toolsets, learning precision setting out, subfloor framing, wall and roof truss construction, pitching roofs, hanging doors, and finishing work.',
    licensingOutcome: 'Trade qualification required for Trade Contractor licensing and carpenter trade recognition throughout Australia.',
    entryRequirements: [
      'Must have registered Australian Apprenticeship agreement OR relevant employer sponsorship.',
      'Must be at least 16 years of age (parental consent if under 18).',
      'Construction Induction Card (White Card) required prior to entering practical workshops.',
    ],
    units: [
      { code: 'CPCCCA3001', title: 'Carry out general setting out', type: 'Core' },
      { code: 'CPCCCA3002', title: 'Carry out setting out for sub-floor framing', type: 'Core' },
      { code: 'CPCCCA3003', title: 'Install flooring systems', type: 'Core' },
      { code: 'CPCCCA3004', title: 'Construct and erect wall frames', type: 'Core' },
      { code: 'CPCCCA3005', title: 'Construct ceiling frames', type: 'Core' },
      { code: 'CPCCCA3006', title: 'Construct pitched roofs', type: 'Core' },
      { code: 'CPCCCA3007', title: 'Construct eaves', type: 'Core' },
      { code: 'CPCCCA3008', title: 'Construct and erect roof trusses', type: 'Core' },
      { code: 'CPCCWHS2001', title: 'Apply WHS requirements, policies and procedures in the construction industry', type: 'Core' },
    ],
    fundingOptions: [
      { state: 'VIC', scheme: 'Victorian Apprenticeship Subsidy', note: 'Significant government co-contributions for apprentices and host employers.' },
      { state: 'SA', scheme: 'Skilled Careers SA', note: 'Subsidised apprentice funding pathways.' },
    ],
    faqs: [
      {
        question: 'Do I need my own tools during practical workshops?',
        answer: 'BCTA provides fully equipped modern workshop benches and power tools at our dedicated trade facilities, though having personal trade PPE is essential.',
      },
      {
        question: 'Can mature-age students enrol?',
        answer: 'Yes, we train apprentices and trade pathway participants of all ages. Mature-age apprentices may also be eligible for RPL credits.',
      },
    ],
    careerOutcomes: ['Qualified Residential Carpenter', 'Formwork Carpenter', 'Finishing Carpenter', 'Building Contractor Subcontractor'],
    externalUrl: '/courses/certificate-iii-in-carpentry-south-australia',
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
    overview: 'The RII30820 Certificate III in Civil Construction Plant Operations equips you with the tickets and operational competencies to handle massive earthmoving machinery across major state infrastructure, roadworks, subdivisions, and civil projects.',
    licensingOutcome: 'Nationally accredited plant tickets recognized on civil project sites across Australia.',
    entryRequirements: [
      'Valid driver licence and minimum 18 years of age.',
      'General Construction Induction Training (White Card).',
      'Physical capability to operate heavy machinery safely.',
    ],
    units: [
      { code: 'RIIMPO318F', title: 'Conduct civil construction excavator operations', type: 'Core' },
      { code: 'RIIMPO320F', title: 'Conduct civil construction wheeled front end loader operations', type: 'Core' },
      { code: 'RIIMPO319E', title: 'Conduct civil construction backhoe/loader operations', type: 'Core' },
      { code: 'RIIMPO317F', title: 'Conduct civil construction roller operations', type: 'Core' },
      { code: 'RIICCM206E', title: 'Support plant operations', type: 'Core' },
      { code: 'RIIWHS204E', title: 'Work safely at heights', type: 'Elective' },
    ],
    fundingOptions: [
      { state: 'National', scheme: 'Workplace & Employer Sponsored', note: 'Tailored on-site assessment for civil fleets and contractors.' },
    ],
    faqs: [
      {
        question: 'Are plant machinery tickets included?',
        answer: 'Yes, competency assessments cover major equipment classes including excavators, front-end loaders, backhoes, and rollers.',
      },
    ],
    careerOutcomes: ['Civil Plant Operator', 'Excavator Operator', 'Earthmoving Contractor', 'Civil Infrastructure Specialist'],
    externalUrl: '/courses/certificate-iii-in-civil-construction-plant-operations-south-australia',
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
    overview: 'The SIT40721 Certificate IV in Patisserie prepares you to become an elite pastry chef and kitchen supervisor. Train in commercial culinary facilities, perfecting French patisserie techniques, artisan sourdough and Viennoiserie, chocolate tempering, showpieces, and commercial kitchen management.',
    licensingOutcome: 'Specialist culinary trade qualification recognized worldwide in fine dining, hotels, and artisan bakeries.',
    entryRequirements: [
      'Minimum 18 years of age.',
      'SIT30821 Certificate III in Commercial Cookery OR SIT31021 Certificate III in Patisserie (or relevant industry culinary background).',
      'Completion of LLN testing and food safety orientation.',
    ],
    units: [
      { code: 'SITHPAT016', title: 'Produce cakes', type: 'Core' },
      { code: 'SITHPAT017', title: 'Produce pastries', type: 'Core' },
      { code: 'SITHPAT018', title: 'Produce yeast-based bakery products', type: 'Core' },
      { code: 'SITHPAT019', title: 'Produce petit fours', type: 'Core' },
      { code: 'SITHPAT020', title: 'Produce desserts', type: 'Core' },
      { code: 'SITHPAT021', title: 'Prepare and model marzipan', type: 'Core' },
      { code: 'SITHPAT022', title: 'Produce chocolate confectionery', type: 'Core' },
      { code: 'SITHCCC043', title: 'Work effectively as a cook', type: 'Core' },
    ],
    fundingOptions: [
      { state: 'State-by-State', scheme: 'Government Subsidies & Traineeships', note: 'Available in accredited campus locations.' },
    ],
    faqs: [
      {
        question: 'Are kitchen uniforms and equipment required?',
        answer: 'Students are provided with a complete chef knife toolkit and BCTA culinary uniform kit upon orientation.',
      },
    ],
    careerOutcomes: ['Head Pastry Chef', 'Speciality Baker', 'Chocolatier / Confectioner', 'Patisserie Business Owner'],
    externalUrl: '/courses/sit40721-certificate-iv-in-patisserie-south-australia',
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
