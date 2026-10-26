export interface UnitDef {
  code: string;
  title: string;
  type: 'Core' | 'Elective';
}

export interface CourseData {
  id: string;
  slug: string;
  code: string;
  title: string;
  subtitle?: string;
  qualificationLevel: string;
  aqfLevel: string;
  state: 'sa' | 'wa';
  stateName: string;
  fundingBadge: string;
  duration: string;
  durationShort: string;
  deliveryMethod: string;
  courseFeeSubsidised?: string;
  courseFeeSubsidisedLabel?: string;
  courseFeeFull: string;
  courseFeeFullLabel?: string;
  fundingScheme?: string;
  employmentOutcomes: {
    role: string;
    desc: string;
    tags: string[];
  }[];
  overviewQuote: string;
  overviewParagraphs: string[];
  inclusions: string[];
  deliveryDetails: {
    format1Title: string;
    format1Badge: string;
    format1Desc: string;
    format1Activities: string[];
    format2Title: string;
    format2Badge: string;
    format2Desc: string;
    format2Hours: string;
    format2HoursLabel: string;
    format3Title: string;
    format3Badge: string;
    format3Desc: string;
    format3Hours: string;
    format3HoursLabel: string;
    workloadSummary: string;
  };
  entryRequirements: {
    age: string;
    ptr: string;
    llnd: string;
    specific?: string;
  };
  targetAudience: {
    description: string;
    inclusivity: string;
    brokerNote: string;
  };
  feesFunding: {
    subsidised?: {
      title: string;
      amount: string;
      currency: string;
      subtext: string;
      description: string;
      criteria: string[];
      checkerUrl?: string;
    };
    fullFee: {
      title: string;
      amount: string;
      currency: string;
      subtext: string;
      description: string;
      features: string[];
      infoline?: string;
    };
  };
  studyPathways: {
    title: string;
    description: string;
  };
  licensingPathway?: {
    regulator: string;
    title: string;
    description: string;
  };
  units: {
    coreCount: number;
    electiveCount: number;
    list: UnitDef[];
  };
  heroImage: string;
  secondaryImage: string;
  zohoCourseOption: string;
  leadSource: 'South Aus form' | 'Western Aus Form';
  stateAddress: string;
}

export const ALL_COURSES: Record<string, CourseData> = {
  // 1. CPC40120 - Certificate IV in Building & Construction (Building) SA
  'certificate-iv-in-building-construction-building-south-australia': {
    id: 'cpc40120-sa',
    slug: 'certificate-iv-in-building-construction-building-south-australia',
    code: 'CPC40120',
    title: 'Certificate IV in Building & Construction',
    subtitle: '(Building)',
    qualificationLevel: 'Certificate IV',
    aqfLevel: 'AQF Level 4',
    state: 'sa',
    stateName: 'South Australia',
    fundingBadge: 'Government Funding Available',
    duration: '36 Weeks Excluding Holidays',
    durationShort: '36 WEEKS',
    deliveryMethod: 'Face To Face & Virtual Online',
    courseFeeSubsidised: '$446 AUD',
    courseFeeSubsidisedLabel: 'Student Contribution Fee (Skills SA)',
    courseFeeFull: '$10,488 AUD',
    courseFeeFullLabel: 'Flexible payment plans available',
    fundingScheme: 'Skills SA',
    employmentOutcomes: [
      {
        role: 'Licensed Builder',
        desc: 'Meet core educational criteria towards builder registration for residential building projects.',
        tags: ['Licensing Pathway', 'Residential Class 1 & 10', 'Contract Administration'],
      },
      {
        role: 'Construction Supervisor',
        desc: 'Supervise on-site operations, trade contractors, and compliance with National Construction Codes.',
        tags: ['Site Supervision', 'NCC Compliance', 'WHS Management'],
      },
      {
        role: 'Site Supervisor',
        desc: 'Oversee trade execution, safety standards, and project schedules on active residential jobsites.',
        tags: ['Trade Coordination', 'Quality Assurance', 'Resource Management'],
      },
      {
        role: 'Leading Hand',
        desc: 'Lead frontline carpentry and trade teams while coordinating daily work with site management.',
        tags: ['Frontline Leadership', 'Work Scheduling', 'Trade Oversight'],
      },
    ],
    overviewQuote:
      'This qualification is designed to meet the needs of builders and managers of small to medium-sized building businesses.',
    overviewParagraphs: [
      'The CPC40120 Certificate IV in Building & Construction (Building) is the foundational qualification for tradespeople aspiring to become licensed builders or site supervisors in South Australia.',
      'You will gain practical skills in applying Australian building codes and standards for Class 1 and Class 10 buildings, managing work health and safety, planning construction operations, estimating project costs, and administering legal building contracts.',
    ],
    inclusions: [
      'Complete BCTA Student Handbook & Study Guides',
      'Online Lectures & Interactive Digital Classrooms',
      'Access to Australian Standards & National Construction Code references',
    ],
    deliveryDetails: {
      format1Title: 'Interactive Weekly Class',
      format1Badge: 'Format 01 · Live Evening Class',
      format1Desc:
        'Delivered with a weekly live class conducted virtually in a real-time classroom environment through Microsoft Teams.',
      format1Activities: [
        'Trainer-Led Real-Time Instruction',
        'Practical Scenarios & Case Studies',
        'Discussion & Industry Collaboration',
        'Site Planning & Sketch Exercises',
      ],
      format2Title: 'Dedicated Self-Study',
      format2Badge: 'Format 02 · Self-Directed',
      format2Desc:
        'Allocate approximately 10 hours per week for self-directed study, reviewing lecture materials, drawings, and building codes.',
      format2Hours: '~10',
      format2HoursLabel: 'Hours / Week Self-Study',
      format3Title: 'Applied Assessments',
      format3Badge: 'Format 03 · Practical Tasks',
      format3Desc:
        'Allocate approximately 5 hours per week for assessment work, cost estimates, contracts, and site management plans.',
      format3Hours: '~5',
      format3HoursLabel: 'Hours / Week Assessment Tasks',
      workloadSummary:
        'Weekly Commitment: ~15 total study hours structured for working tradespeople without interrupting normal site work.',
    },
    entryRequirements: {
      age: 'Applicants must be aged 18 years or above at commencement.',
      ptr: 'A Pre-training Review (PTR) is conducted to ensure this course aligns with your vocational goals.',
      llnd: 'Learners must demonstrate Language, Literacy, Numeracy and Digital (LLND) skills aligned with the requirements of this qualification.',
    },
    targetAudience: {
      description:
        'Suitable for tradespeople, carpenters, subcontractors, and construction workers looking to transition into site supervision or builder licensing.',
      inclusivity:
        'People with disabilities are encouraged to apply. BCTA provides learning adjustments and support.',
      brokerNote:
        'Building and Construction Training Australia also works with approved brokers/marketing agents.',
    },
    feesFunding: {
      subsidised: {
        title: 'Skills SA Funded Training',
        amount: '$446',
        currency: 'AUD',
        subtext: 'Student Contribution Fee',
        description:
          'This training is delivered with South Australian Government funding through Skills SA for eligible students.',
        criteria: [
          'Citizenship & Residency: Australian or NZ citizen, permanent resident, or eligible humanitarian visa holder.',
          'Location: Must live or work in South Australia.',
          'Age: Must be 16 years or over and not enrolled at school (BCTA enrols students aged 18+).',
          'Course Limits: You may undertake up to two subsidised courses at the same time.',
          'Upfront Assessment of Need (UAN): Must be completed before enrolment.',
        ],
        checkerUrl: 'https://mytraining.skills.sa.gov.au/training/getting-started/check-eligibility',
      },
      fullFee: {
        title: 'Fee for Service (Full Fee)',
        amount: '$10,488',
        currency: 'AUD',
        subtext: 'Self-Funded / Payment Plan',
        description:
          'For applicants who do not meet Skills SA funding eligibility or prefer fee-for-service enrolment.',
        features: [
          'Flexible interest-free payment plans available',
          'Corporate & employer sponsorship invoicing supported',
          'Potential tax deductibility for trade career development',
        ],
        infoline: '1800 673 097',
      },
    },
    studyPathways: {
      title: 'CPC50220 - Diploma of Building and Construction (Building)',
      description:
        'Upon successful completion of the Certificate IV, graduates have a direct articulation pathway into the Diploma of Building and Construction (Building) to expand scope into medium-rise commercial builds.',
    },
    licensingPathway: {
      regulator: 'Consumer and Business Services (CBS SA)',
      title: 'South Australia Builder Licensing Alignment',
      description:
        'CPC40120 provides the core educational credentials assessed by CBS SA for residential building contractor licence categories in South Australia.',
    },
    units: {
      coreCount: 11,
      electiveCount: 8,
      list: [
        { code: 'CPCCBC4001', title: 'Apply building codes and standards to the construction process for Class 1 and 10 buildings', type: 'Core' },
        { code: 'CPCCBC4002', title: 'Manage work health and safety in the building and construction workplace', type: 'Core' },
        { code: 'CPCCBC4007', title: 'Plan building and construction work', type: 'Core' },
        { code: 'CPCCBC4008', title: 'Supervise site communication and administration processes for building and construction projects', type: 'Core' },
        { code: 'CPCCBC4009', title: 'Apply legal requirements to building and construction projects', type: 'Core' },
        { code: 'CPCCBC4010', title: 'Apply structural principles to residential and commercial constructions', type: 'Core' },
        { code: 'CPCCBC4012', title: 'Read and interpret plans and specifications', type: 'Core' },
        { code: 'CPCCBC4014', title: 'Prepare simple building sketches and drawings', type: 'Core' },
        { code: 'CPCCBC4018', title: 'Apply site surveys and set-out procedures to building and construction projects', type: 'Core' },
        { code: 'CPCCBC4021', title: 'Minimise waste on the building and construction site', type: 'Core' },
        { code: 'CPCCBC4053', title: 'Apply building codes and standards to the construction process for Class 2 to 9 Type C buildings', type: 'Core' },
        { code: 'CPCCBC4024', title: 'Resolve business disputes', type: 'Elective' },
        { code: 'BSBPMG422', title: 'Apply project quality management techniques', type: 'Elective' },
        { code: 'BSBESB407', title: 'Manage finances for new business ventures', type: 'Elective' },
        { code: 'CPCCBC4003', title: 'Select, prepare and administer a construction contract', type: 'Elective' },
        { code: 'CPCCBC4004', title: 'Identify and produce estimated costs for building and construction projects', type: 'Elective' },
        { code: 'CPCCBC4005', title: 'Produce labour and material schedules for ordering', type: 'Elective' },
        { code: 'CPCCBC4006', title: 'Select, procure and store construction materials for building and construction projects', type: 'Elective' },
        { code: 'CPCSUS4002', title: 'Use building science principles to construct energy efficient buildings', type: 'Elective' },
      ],
    },
    heroImage: '/images/courses/cpc40120.jpg',
    secondaryImage: '/images/courses/cpc50220-builder.jpg',
    zohoCourseOption: 'CPC40120 Certificate IV in Building and Construction (Building)',
    leadSource: 'South Aus form',
    stateAddress: 'Level 30, 91 King William Street, Adelaide SA 5000',
  },

  // 2. SIT40721 - Certificate IV in Patisserie SA
  'sit40721-certificate-iv-in-patisserie-south-australia': {
    id: 'sit40721-sa',
    slug: 'sit40721-certificate-iv-in-patisserie-south-australia',
    code: 'SIT40721',
    title: 'Certificate IV in Patisserie',
    subtitle: '',
    qualificationLevel: 'Certificate IV',
    aqfLevel: 'AQF Level 4',
    state: 'sa',
    stateName: 'South Australia',
    fundingBadge: 'Government Funding Available',
    duration: '60 Weeks (Including 72 Hours Work Placement)',
    durationShort: '60 WEEKS',
    deliveryMethod: 'Face to Face & Commercial Kitchen',
    courseFeeFull: '$13,962 AUD',
    courseFeeFullLabel: 'Tuition Fee (Including Material Fee) · Flexible payment plans',
    fundingScheme: 'Domestic Subsidies & Payment Plans',
    employmentOutcomes: [
      {
        role: 'Chef De Partie',
        desc: 'Lead the patisserie section of fine dining restaurants, hotels, and luxury catering venues.',
        tags: ['Fine Dining', 'Section Leadership', 'Culinary Craft'],
      },
      {
        role: 'Chef Patissier',
        desc: 'Specialist head pastry chef designing dessert menus, artisan pastries, and specialty gateaux.',
        tags: ['Menu Design', 'Artisan Pastry', 'Kitchen Management'],
      },
      {
        role: 'Pastry Kitchen Supervisor',
        desc: 'Supervise daily kitchen operations, food safety compliance, and junior culinary staff.',
        tags: ['Staff Rostering', 'Food Safety WHS', 'Budget Control'],
      },
      {
        role: 'Specialty Chocolatier / Confectioner',
        desc: 'Craft premium chocolate showpieces, handcrafted pralines, and modeled sugar confectionery.',
        tags: ['Chocolate Artistry', 'Sugar Showpieces', 'Confectionery'],
      },
    ],
    overviewQuote:
      'This qualification reflects the role of pastry chefs who have a supervisory or team-leading role in the kitchen. They operate independently or with limited guidance from others and use discretion to solve non-routine problems.',
    overviewParagraphs: [
      'The SIT40721 Certificate IV in Patisserie provides comprehensive training in classical and contemporary patisserie techniques combined with kitchen supervisory management.',
      'Students master artisan bakery products, complex gateaux, chocolate artistry, sugar decorations, and plated restaurant desserts while developing essential supervisory competencies in food safety programs, kitchen team management, and cost control.',
    ],
    inclusions: [
      'BCTA / Culinary Training Australia Student Handbook',
      'Specialist Pastry Chef Toolkit & Recipe Manuals',
      'All kitchen training ingredients during practical sessions',
    ],
    deliveryDetails: {
      format1Title: 'Weekly Theory Sessions',
      format1Badge: 'Format 01 · Face-to-Face Theory',
      format1Desc:
        'Face-to-face training sessions weekly to develop theoretical knowledge, recipe formulation, hygiene, and kitchen operations.',
      format1Activities: [
        'Interactive Classroom Delivery',
        'Food Science & Recipe Costing',
        'Food Safety & HACCP Planning',
        'Kitchen Team Leadership Scenarios',
      ],
      format2Title: 'Practical Commercial Kitchen',
      format2Badge: 'Format 02 · Practical Training',
      format2Desc:
        'Hands-on practical training weekly in an industry-standard commercial pastry kitchen developing artisan techniques.',
      format2Hours: 'Weekly',
      format2HoursLabel: 'Commercial Kitchen Labs',
      format3Title: 'Work Placement & Self-Study',
      format3Badge: 'Format 03 · Industry Placement',
      format3Desc:
        'Students complete 72 hours of work placement in a commercial kitchen plus 8 hours per week of self-study and assessment work.',
      format3Hours: '72 Hrs',
      format3HoursLabel: 'Industry Work Placement',
      workloadSummary:
        'Weekly Commitment: Classroom theory + hands-on commercial kitchen sessions + 72 hours industry placement.',
    },
    entryRequirements: {
      age: 'All Domestic Students must be over 18 years of age when commencing the course.',
      ptr: 'A Pre-training Review is conducted to evaluate culinary background and vocational suitability.',
      llnd: 'Learners are expected to have minimum LLND skills that align to Level 3 of the ACSF in order to successfully undertake the qualification. Additional support is provided if required.',
      specific: 'Each student is responsible for finding work placement in a commercial kitchen.',
    },
    targetAudience: {
      description:
        'Ideal for aspiring pastry chefs, kitchen hands, bakers, and hospitality professionals seeking supervisory culinary credentials.',
      inclusivity:
        'People with disabilities are encouraged to apply. Reasonable adjustments and support are available.',
      brokerNote:
        'Culinary Training Australia also works with authorized brokers and educational marketing agents.',
    },
    feesFunding: {
      fullFee: {
        title: 'Tuition Fee (Including Material Fee)',
        amount: '$13,962',
        currency: 'AUD',
        subtext: 'Flexible Payment Plans Available',
        description:
          'Comprehensive tuition fee covering all course materials, practical ingredients, and training instruction.',
        features: [
          'Material fee fully included in course price',
          'Flexible interest-free payment plan options',
          'Industry work placement support and guidance',
        ],
        infoline: '1300 11 2282',
      },
    },
    studyPathways: {
      title: 'Diploma of Hospitality Management',
      description:
        'Graduates can articulate directly into the Diploma of Hospitality Management to advance into senior hospitality leadership and venue management.',
    },
    units: {
      coreCount: 26,
      electiveCount: 6,
      list: [
        { code: 'BSBTWK501', title: 'Lead diversity and inclusion', type: 'Core' },
        { code: 'SITHCCC023', title: 'Use food preparation equipment', type: 'Core' },
        { code: 'SITHCCC027', title: 'Prepare dishes using basic methods of cookery', type: 'Core' },
        { code: 'SITHCCC034', title: 'Work effectively in a commercial kitchen', type: 'Core' },
        { code: 'SITHCCC042', title: 'Prepare food to meet special dietary requirements', type: 'Core' },
        { code: 'SITHKOP013', title: 'Plan cooking operations', type: 'Core' },
        { code: 'SITHPAT011', title: 'Produce cakes', type: 'Core' },
        { code: 'SITHPAT012', title: 'Produce specialised cakes', type: 'Core' },
        { code: 'SITHPAT013', title: 'Produce pastries', type: 'Core' },
        { code: 'SITHPAT014', title: 'Produce yeast-based bakery products', type: 'Core' },
        { code: 'SITHPAT015', title: 'Produce petits fours', type: 'Core' },
        { code: 'SITHPAT016', title: 'Produce desserts', type: 'Core' },
        { code: 'SITHPAT017', title: 'Prepare and model marzipan', type: 'Core' },
        { code: 'SITHPAT018', title: 'Produce chocolate confectionery', type: 'Core' },
        { code: 'SITHPAT019', title: 'Model sugar-based decorations', type: 'Core' },
        { code: 'SITHPAT020', title: 'Design and produce sweet showpieces', type: 'Core' },
        { code: 'SITXCOM010', title: 'Manage conflict', type: 'Core' },
        { code: 'SITXFIN009', title: 'Manage finances within a budget', type: 'Core' },
        { code: 'SITXFSA005', title: 'Use hygienic practices for food safety', type: 'Core' },
        { code: 'SITXFSA006', title: 'Participate in safe food handling practices', type: 'Core' },
        { code: 'SITXHRM007', title: 'Coach others in job skills', type: 'Core' },
        { code: 'SITXHRM008', title: 'Roster staff', type: 'Core' },
        { code: 'SITXHRM009', title: 'Lead and manage people', type: 'Core' },
        { code: 'SITXINV006', title: 'Receive, store and maintain stock', type: 'Core' },
        { code: 'SITXMGT004', title: 'Monitor work operations', type: 'Core' },
        { code: 'SITXWHS007', title: 'Implement and monitor work health and safety practices', type: 'Core' },
        { code: 'BSBSUS211', title: 'Participate in sustainable work practices', type: 'Elective' },
        { code: 'SITXWHS005', title: 'Participate in safe work practices', type: 'Elective' },
        { code: 'SITHKOP009', title: 'Clean kitchen premises and equipment', type: 'Elective' },
        { code: 'SITXFSA007', title: 'Transport and store food', type: 'Elective' },
        { code: 'SITXFSA008', title: 'Develop and implement a food safety program', type: 'Elective' },
        { code: 'SITHKOP010', title: 'Plan and cost recipes', type: 'Elective' },
      ],
    },
    heroImage: '/images/courses/sit40721.jpg',
    secondaryImage: '/images/courses/sit40721.jpg',
    zohoCourseOption: 'SIT40721 Certificate IV in Patisserie',
    leadSource: 'South Aus form',
    stateAddress: 'Level 30, 91 King William Street, Adelaide SA 5000',
  },

  // 3. RII30820 - Certificate III in Civil Construction Plant Operations SA
  'certificate-iii-in-civil-construction-plant-operations-south-australia': {
    id: 'rii30820-sa',
    slug: 'certificate-iii-in-civil-construction-plant-operations-south-australia',
    code: 'RII30820',
    title: 'Certificate III in Civil Construction',
    subtitle: 'Plant Operations',
    qualificationLevel: 'Certificate III',
    aqfLevel: 'AQF Level 3',
    state: 'sa',
    stateName: 'South Australia',
    fundingBadge: 'Government Funding Available',
    duration: '33 Weeks (Including 120 Hours Work Placement)',
    durationShort: '33 WEEKS',
    deliveryMethod: 'Classroom, Workshop & Plant Fleet Placement',
    courseFeeFull: '$10,081 AUD',
    courseFeeFullLabel: 'Flexible payment plans available',
    fundingScheme: 'Domestic Training & Employer Options',
    employmentOutcomes: [
      {
        role: 'Civil Plant Operator',
        desc: 'Operate heavy earthmoving plant machinery safely on infrastructure, roadworks, and civil projects.',
        tags: ['Heavy Machinery', 'Earthmoving', 'Civil Sites'],
      },
      {
        role: 'Excavator Operator',
        desc: 'Operate civil excavators for trenching, bulk excavation, loading, and underground service safety.',
        tags: ['Excavator Ops', 'Trenching', 'Service Protection'],
      },
      {
        role: 'Construction Labourer / General Hand',
        desc: 'Carry out civil site operations, levelling, material compaction, and drainage dewatering.',
        tags: ['Site Levelling', 'Compaction', 'Drainage Dewatering'],
      },
      {
        role: 'Backhoe & Roller Operator',
        desc: 'Operate backhoes, rollers, and self-propelled compactors across road and pipeline construction.',
        tags: ['Backhoe Ops', 'Roller Ops', 'Compaction Equipment'],
      },
    ],
    overviewQuote:
      'This qualification reflects the role of a skilled operator working with civil construction plant, who applies a broad range of skills in a varied work context.',
    overviewParagraphs: [
      'The RII30820 Certificate III in Civil Construction Plant Operations prepares you for high-demand operator roles across major road, infrastructure, and commercial earthworks projects in South Australia.',
      'Training covers hands-on operation of core civil machinery including excavators, backhoe/loaders, tip trucks, rollers, and compactors, combined with safety systems, reading civil plans, locating underground utilities, and environmental site drainage.',
    ],
    inclusions: [
      'Complete BCTA Student Handbook',
      'Online Lectures & Interactive Study Materials',
      'Civil Plant Operation Safety Checklists & Guides',
    ],
    deliveryDetails: {
      format1Title: 'Classroom & Workshop',
      format1Badge: 'Format 01 · 2 Days / Week (30 Wks)',
      format1Desc:
        'Classroom delivery for 2 days per week for 30 weeks off the job in a classroom and practical workshop.',
      format1Activities: [
        'Civil Plans & Job Specification Analysis',
        'Underground Utility Location & Protection',
        'Measurements, Calculations & Levelling',
        'Risk Management & WHS Site Protocols',
      ],
      format2Title: 'Work Placement Program',
      format2Badge: 'Format 02 · 120 Hours (3 Wks)',
      format2Desc:
        'Includes 120 hours of hands-on work placement (3 weeks) operating equipment under industry supervision on active civil works.',
      format2Hours: '120 Hrs',
      format2HoursLabel: 'Supervised Work Placement',
      format3Title: 'Virtual Sessions & Machine Fleet',
      format3Badge: 'Format 03 · Microsoft Teams',
      format3Desc:
        'Classes are also held virtually online on Microsoft Teams to support theory modules with maximum scheduling flexibility.',
      format3Hours: 'Blended',
      format3HoursLabel: 'Virtual + Practical Fleet',
      workloadSummary:
        '33 weeks total delivery time (30 weeks classroom/workshop 2 days/wk + 3 weeks work placement).',
    },
    entryRequirements: {
      age: 'Applicants must be aged 18 years or above.',
      ptr: 'Pre-training review ensures candidates have interest and capacity for heavy plant operations.',
      llnd: 'Learners must demonstrate Language, Literacy, Numeracy and Digital skills appropriate for civil site safety.',
      specific:
        'All applicants must be employed in civil construction work and have access to all required equipment, or participate in the approved placement program.',
    },
    targetAudience: {
      description:
        'Designed for infrastructure workers, plant operators, council workers, earthmoving contractors, and new industry entrants.',
      inclusivity:
        'People with disabilities are encouraged to apply. Tailored learning support is provided.',
      brokerNote:
        'Building and Construction Training Australia also works with brokers/marketing agents.',
    },
    feesFunding: {
      fullFee: {
        title: 'Course Fee',
        amount: '$10,081',
        currency: 'AUD',
        subtext: 'Flexible payment plans available',
        description:
          'Includes all comprehensive theoretical modules, workshop sessions, and placement supervision coordination.',
        features: [
          'Flexible interest-free payment schedules available',
          'Industry plant equipment training included',
          'Direct pathways into supervisory qualifications',
        ],
        infoline: '1300 11 2282',
      },
    },
    studyPathways: {
      title: 'Civil Construction Supervisory & Engineering Pathways',
      description:
        'Graduates can articulate into Certificate IV in Civil Construction Supervision, Diploma of Engineering Technology (Civil), or Advanced Diploma of Engineering Technology (Civil).',
    },
    units: {
      coreCount: 15,
      electiveCount: 5,
      list: [
        { code: 'RIIBEF201E', title: 'Plan and organise work', type: 'Core' },
        { code: 'RIICCM201E', title: 'Carry out measurements and calculations', type: 'Core' },
        { code: 'RIICCM202E', title: 'Identify, locate and protect underground services', type: 'Core' },
        { code: 'RIICCM203E', title: 'Read and interpret plans and job specifications', type: 'Core' },
        { code: 'RIICCM205F', title: 'Carry out manual excavation', type: 'Core' },
        { code: 'RIICCM206E', title: 'Support plant operations', type: 'Core' },
        { code: 'RIICCM207E', title: 'Spread and compact materials manually', type: 'Core' },
        { code: 'RIICCM208E', title: 'Carry out basic levelling', type: 'Core' },
        { code: 'RIICOM201E', title: 'Communicate in the workplace', type: 'Core' },
        { code: 'RIIRIS301E', title: 'Apply risk management processes', type: 'Core' },
        { code: 'RIISAM201E', title: 'Handle resources and infrastructure materials and safely dispose of nontoxic materials', type: 'Core' },
        { code: 'RIISAM203E', title: 'Use hand and power tools', type: 'Core' },
        { code: 'RIISAM204E', title: 'Operate small plant and equipment', type: 'Core' },
        { code: 'RIIWHS201E', title: 'Work safely and follow WHS policies and procedures', type: 'Core' },
        { code: 'RIIWMG203E', title: 'Drain and dewater civil construction sites', type: 'Core' },
        { code: 'RIIMPO320F', title: 'Conduct civil construction excavator operations', type: 'Elective' },
        { code: 'RIIMPO319E', title: 'Conduct backhoe/loader operations', type: 'Elective' },
        { code: 'RIIVEH304E', title: 'Conduct tip truck operations', type: 'Elective' },
        { code: 'RIIMPO317F', title: 'Conduct roller operations', type: 'Elective' },
        { code: 'RIIMPO316E', title: 'Conduct self-propelled compactor operations', type: 'Elective' },
      ],
    },
    heroImage: '/images/courses/rii30820.jpg',
    secondaryImage: '/images/courses/rii30820.jpg',
    zohoCourseOption: 'RII30820 Certificate III in Civil Construction Plant Operations',
    leadSource: 'South Aus form',
    stateAddress: 'Level 30, 91 King William Street, Adelaide SA 5000',
  },

  // 4. CPC30220 - Certificate III in Carpentry SA
  'certificate-iii-in-carpentry-south-australia': {
    id: 'cpc30220-sa',
    slug: 'certificate-iii-in-carpentry-south-australia',
    code: 'CPC30220',
    title: 'Certificate III in Carpentry',
    subtitle: '(Apprenticeship)',
    qualificationLevel: 'Certificate III',
    aqfLevel: 'AQF Level 3',
    state: 'sa',
    stateName: 'South Australia',
    fundingBadge: 'Government Funding Available',
    duration: '36 Months (Australian Apprenticeship)',
    durationShort: '36 MONTHS',
    deliveryMethod: 'Workplace-Based Training & Classroom',
    courseFeeFull: '$14,761 AUD',
    courseFeeFullLabel: 'Flexible payment plans available',
    fundingScheme: 'Australian Apprenticeship Scheme',
    employmentOutcomes: [
      {
        role: 'Qualified Carpenter',
        desc: 'Trade qualified carpenter working across residential frame, lockup, fix, and renovations.',
        tags: ['Trade Qualified', 'Framing & Trusses', 'Interior Fitout'],
      },
      {
        role: 'Formwork Carpenter',
        desc: 'Erect and dismantle engineered formwork for footings, slabs, columns, and structural concrete.',
        tags: ['Concrete Formwork', 'Slabs & Footings', 'Structural Framing'],
      },
      {
        role: 'Finishing Specialist',
        desc: 'Install precision lining, panelling, moulding, exterior cladding, windows, and exterior stairs.',
        tags: ['Architectural Linings', 'External Stairs', 'Precision Joinery'],
      },
      {
        role: 'Leading Hand Carpenter',
        desc: 'Supervise apprentice carpenters on site while coordinating timber deliveries and frame erection.',
        tags: ['Apprentice Mentoring', 'Site Coordination', 'Timber Framing'],
      },
    ],
    overviewQuote:
      'This qualification provides a trade outcome in carpentry, covering work in residential and commercial applications.',
    overviewParagraphs: [
      'The CPC30220 Certificate III in Carpentry is the nationally accredited trade apprenticeship qualification for carpentry professionals in South Australia.',
      'Delivered under the Australian Apprenticeship Scheme over 36 months, this qualification combines supervised on-the-job trade practice with structured classroom and workshop training sessions (1 session of 6 hours per fortnight).',
      'You will master setting out, subfloor framing, pitched roof framing, roof trusses, eaves, external stairs, formwork, wall frames, and interior linings.',
    ],
    inclusions: [
      'Complete BCTA Student Handbook & Trade Blueprint Packs',
      'Online Lectures & Interactive Digital Reference Materials',
      'Practical Carpentry Workshop Facility Access',
    ],
    deliveryDetails: {
      format1Title: 'Workplace-Based Training',
      format1Badge: 'Format 01 · On-the-Job Apprenticeship',
      format1Desc:
        'Apprentices are employed full-time in an appropriate carpentry workplace with supervision from a qualified employer/supervisor.',
      format1Activities: [
        'Subfloor Framing & Flooring Systems',
        'Wall Framing, Ceiling Framing & Pitched Roofs',
        'Erecting Roof Trusses & Constructing Eaves',
        'Windows, Doors, Mouldings & Cladding',
      ],
      format2Title: 'Classroom & Workshop Sessions',
      format2Badge: 'Format 02 · 1 Session / Fortnight (6 Hrs)',
      format2Desc:
        'Structured classroom and practical workshop session conducted once per fortnight for 6 hours.',
      format2Hours: '6 Hrs',
      format2HoursLabel: 'Per Fortnight Classroom',
      format3Title: 'Virtual & Onsite Support',
      format3Badge: 'Format 03 · Trainer Site Visits',
      format3Desc:
        'Regular workplace trainer assessments, logbook verifications, and online MS Teams learning support.',
      format3Hours: 'Regular',
      format3HoursLabel: 'Trainer Site Verifications',
      workloadSummary:
        '36 months duration delivered through workplace employment plus fortnightly 6-hour classroom training.',
    },
    entryRequirements: {
      age: 'Applicants must be aged 18 or above.',
      ptr: 'A Pre-training Review confirms vocational match for an Australian Carpentry Apprenticeship.',
      llnd: 'Learners must demonstrate Language, Literacy, Numeracy and Digital skills required for construction calculations.',
      specific:
        'Applicants must be employed under a registered Australian Apprenticeship arrangement with an eligible employer.',
    },
    targetAudience: {
      description:
        'Open to registered apprentices employed in residential or commercial carpentry across South Australia.',
      inclusivity:
        'People with disabilities are encouraged to apply. Support services and reasonable workplace adjustments are supported.',
      brokerNote:
        'Building and Construction Training Australia also works with approved brokers/marketing agents.',
    },
    feesFunding: {
      fullFee: {
        title: 'Apprenticeship Course Fee',
        amount: '$14,761',
        currency: 'AUD',
        subtext: 'Flexible payment plans available',
        description:
          'Total qualification investment for the 3-year apprenticeship program with flexible installment plans.',
        features: [
          'Spread payments across 36-month apprenticeship term',
          'Employer incentives and user choice subsidies may apply',
          'Covers all trade logbook reviews and fortnightly training sessions',
        ],
        infoline: '1300 11 2282',
      },
    },
    studyPathways: {
      title: 'CPC40120 & CPC50220 Building Pathways',
      description:
        'On completing trade qualifications, carpenters can advance into CPC40120 Certificate IV in Building and Construction (Building) or CPC50220 Diploma of Building and Construction (Building) to pursue builder registration.',
    },
    licensingPathway: {
      regulator: 'Consumer and Business Services (CBS SA)',
      title: 'South Australia Trade Contractor Licensing',
      description:
        'CPC30220 fulfills the technical qualification requirement for a South Australian Carpentry Trade Contractor Licence.',
    },
    units: {
      coreCount: 27,
      electiveCount: 7,
      list: [
        { code: 'CPCCCA2002', title: 'Use carpentry tools and equipment', type: 'Core' },
        { code: 'CPCCCA2011', title: 'Handle carpentry materials', type: 'Core' },
        { code: 'CPCCCA3001', title: 'Carry out general demolition of minor building structures', type: 'Core' },
        { code: 'CPCCCA3002', title: 'Carry out setting out', type: 'Core' },
        { code: 'CPCCCA3003', title: 'Install flooring systems', type: 'Core' },
        { code: 'CPCCCA3004', title: 'Construct and erect wall frames', type: 'Core' },
        { code: 'CPCCCA3005', title: 'Construct ceiling frames', type: 'Core' },
        { code: 'CPCCCA3006', title: 'Erect roof trusses', type: 'Core' },
        { code: 'CPCCCA3007', title: 'Construct pitched roofs', type: 'Core' },
        { code: 'CPCCCA3008', title: 'Construct eaves', type: 'Core' },
        { code: 'CPCCCA3010', title: 'Install windows and doors', type: 'Core' },
        { code: 'CPCCCA3016', title: 'Construct, assemble and install timber external stairs', type: 'Core' },
        { code: 'CPCCCA3017', title: 'Install exterior cladding', type: 'Core' },
        { code: 'CPCCCA3024', title: 'Install lining, panelling and moulding', type: 'Core' },
        { code: 'CPCCCA3025', title: 'Read and interpret plans, specifications and drawings for carpentry work', type: 'Core' },
        { code: 'CPCCCA3028', title: 'Erect and dismantle formwork for footings and slabs on ground', type: 'Core' },
        { code: 'CPCCCM2006', title: 'Apply basic levelling procedures', type: 'Core' },
        { code: 'CPCCCM2008', title: 'Erect and dismantle restricted height scaffolding', type: 'Core' },
        { code: 'CPCCCM2012', title: 'Work safely at heights', type: 'Core' },
        { code: 'CPCCCO2013', title: 'Carry out concreting to simple forms', type: 'Core' },
        { code: 'CPCCOM1012', title: 'Work effectively and sustainably in the construction industry', type: 'Core' },
        { code: 'CPCCOM1014', title: 'Conduct workplace communication', type: 'Core' },
        { code: 'CPCCOM1015', title: 'Carry out measurements and calculations', type: 'Core' },
        { code: 'CPCCOM3001', title: 'Perform construction calculations to determine carpentry material requirements', type: 'Core' },
        { code: 'CPCCOM3006', title: 'Carry out levelling operations', type: 'Core' },
        { code: 'CPCCWHS2001', title: 'Apply WHS requirements, policies and procedures in the construction industry', type: 'Core' },
        { code: 'CPCWHS3001', title: 'Identify construction work hazards and select risk control strategies', type: 'Core' },
        { code: 'CPCCCA3012', title: 'Frame and fit wet area fixtures', type: 'Elective' },
        { code: 'CPCCSF2004', title: 'Place and fix reinforcement materials', type: 'Elective' },
        { code: 'CPCCCA3009', title: 'Construct advanced roofs', type: 'Elective' },
        { code: 'CPCCCA3014', title: 'Construct and install bulkheads', type: 'Elective' },
        { code: 'CPCCCM3001', title: 'Operate elevated work platforms up to 11 metres', type: 'Elective' },
        { code: 'CPCCWC3003', title: 'Install dry wall passive fire-rated systems', type: 'Elective' },
        { code: 'CPCCWC3004', title: 'Install suspended ceilings', type: 'Elective' },
      ],
    },
    heroImage: '/images/courses/cpc30220.jpg',
    secondaryImage: '/images/courses/cpc30220.jpg',
    zohoCourseOption: 'CPC30220 Certificate III in Carpentry',
    leadSource: 'South Aus form',
    stateAddress: 'Level 30, 91 King William Street, Adelaide SA 5000',
  },

  // 5. CPC50220 - Diploma of Building and Construction (Building) WA
  'diploma-of-building-and-construction-western-australia': {
    id: 'cpc50220-wa',
    slug: 'diploma-of-building-and-construction-western-australia',
    code: 'CPC50220',
    title: 'Diploma of Building and Construction',
    subtitle: '(Building)',
    qualificationLevel: 'Diploma',
    aqfLevel: 'AQF Level 5',
    state: 'wa',
    stateName: 'Western Australia',
    fundingBadge: 'Nationally Recognised Training',
    duration: '62 Weeks Excluding Holidays',
    durationShort: '62 WEEKS',
    deliveryMethod: 'Face To Face & Virtual Online',
    courseFeeFull: '$15,975 AUD',
    courseFeeFullLabel: 'Course Fee · Flexible payment plans available',
    fundingScheme: 'Western Australia Enrolment',
    employmentOutcomes: [
      {
        role: 'Registered Builder (WA)',
        desc: 'Meet core educational qualifications required to apply for registration as a Building Practitioner with Building Commission WA.',
        tags: ['Building Commission WA', 'Medium-Rise Scope', 'Commercial & Residential'],
      },
      {
        role: 'General Foreperson',
        desc: 'Direct major site operations, trade subcontractors, programme delivery, and structural works up to 3 storeys.',
        tags: ['Senior Site Leadership', 'Programme Delivery', 'Quality Control'],
      },
      {
        role: 'Building Inspector',
        desc: 'Inspect buildings during and post-construction for compliance with National Construction Codes and WA statutory standards.',
        tags: ['Building Surveying', 'NCC Compliance', 'Statutory Reporting'],
      },
      {
        role: 'Construction Project Manager',
        desc: 'Administer major head contracts, lead procurement schedules, cost control, and multi-million dollar budgets.',
        tags: ['Contract Administration', 'Cost Systems', 'Risk Management'],
      },
    ],
    overviewQuote:
      'This qualification is designed to meet the needs of builders, including selecting contractors, overseeing the work and its quality, and liaising with clients.',
    overviewParagraphs: [
      'The CPC50220 Diploma of Building and Construction (Building) provides the advanced technical, financial, and structural skills required for builders operating in Western Australia.',
      'Covering residential and commercial construction up to 3 storeys (NCC Type B & C), students develop high-level proficiency in managing business risk, structural timber/steel/concrete principles, administering head contracts, complex cost systems, and legal obligations.',
    ],
    inclusions: [
      'Complete BCTA Student Handbook & Technical Blueprints',
      'Online Lectures & Interactive MS Teams Classroom Archives',
      'Full Access to Australian Standards & National Construction Code references',
    ],
    deliveryDetails: {
      format1Title: 'Weekly Live Virtual Class',
      format1Badge: 'Format 01 · Live Evening Class',
      format1Desc:
        'Delivered with a weekly live class (currently conducted virtually online via Microsoft Teams) led by seasoned building practitioners.',
      format1Activities: [
        'Expert Trainer-Led Real-Time Lectures',
        'Structural Plan Reading & Site Layout Scenarios',
        'Complex Construction Contract Administration',
        'Interactive Discussions & Industry Case Studies',
      ],
      format2Title: 'Dedicated Self-Study',
      format2Badge: 'Format 02 · Self-Directed',
      format2Desc:
        'Allocate approximately 10 hours per week for self-directed study, including reviewing technical drawings, codes, and digital study resources.',
      format2Hours: '~10',
      format2HoursLabel: 'Hours / Week Self-Study',
      format3Title: 'Applied Assessments',
      format3Badge: 'Format 03 · Practical Tasks',
      format3Desc:
        'Allocate approximately 5 hours per week for real-world assessment tasks, tender documentation, costing schedules, and safety plans.',
      format3Hours: '~5',
      format3HoursLabel: 'Hours / Week Assessments',
      workloadSummary:
        'Weekly Commitment: ~15 total study hours structured specifically for full-time working trades and site personnel.',
    },
    entryRequirements: {
      age: 'Applicants must be aged 18 years or above.',
      ptr: 'A Pre-training Review (PTR) is conducted to evaluate vocational background and suitability for diploma-level studies.',
      llnd: 'Learners must demonstrate Language, Literacy, Numeracy and Digital (LLND) competence suited to technical building calculations and legal reports.',
    },
    targetAudience: {
      description:
        'Aimed at licensed trade practitioners, site supervisors, project managers, and builders looking to attain registration in Western Australia.',
      inclusivity:
        'People with disabilities are encouraged to apply. BCTA provides tailored adjustments and learning accommodations.',
      brokerNote:
        'Building and Construction Training Australia also works with authorized brokers and educational marketing agents.',
    },
    feesFunding: {
      fullFee: {
        title: 'Course Fee',
        amount: '$15,975',
        currency: 'AUD',
        subtext: 'Flexible payment plans available',
        description:
          'Full qualification investment for students enrolling in Western Australia, with flexible monthly installment plans.',
        features: [
          'Interest-free installment schedules spread across the 62 weeks',
          'Employer invoicing & corporate sponsorship options supported',
          'Potential tax deductibility for professional construction advancement',
        ],
        infoline: '1300 11 2282',
      },
    },
    studyPathways: {
      title: 'Advanced Diploma of Building and Construction (Management)',
      description:
        'Graduates can articulate into the Advanced Diploma of Building and Construction (Management) or university bachelor degrees in construction management.',
    },
    licensingPathway: {
      regulator: 'Building Commission WA / Building Services Board',
      title: 'Western Australia Builder Registration Alignment',
      description:
        'CPC50220 fulfills the prescribed educational requirements to apply for registration as a Building Practitioner with the Western Australia Building Services Board.',
    },
    units: {
      coreCount: 24,
      electiveCount: 3,
      list: [
        { code: 'BSBOPS504', title: 'Manage business risk', type: 'Core' },
        { code: 'BSBWHS513', title: 'Lead WHS risk management', type: 'Core' },
        { code: 'CPCCBC4001', title: 'Apply building codes and standards to the construction process for Class 1 and 10 buildings', type: 'Core' },
        { code: 'CPCCBC4003', title: 'Select, prepare and administer a construction contract', type: 'Core' },
        { code: 'CPCCBC4004', title: 'Identify and produce estimated costs for building and construction projects', type: 'Core' },
        { code: 'CPCCBC4005', title: 'Produce labour and material schedules for ordering', type: 'Core' },
        { code: 'CPCCBC4008', title: 'Supervise site communication and administration processes for building and construction projects', type: 'Core' },
        { code: 'CPCCBC4009', title: 'Apply legal requirements to building and construction projects', type: 'Core' },
        { code: 'CPCCBC4010', title: 'Apply structural principles to residential and commercial constructions', type: 'Core' },
        { code: 'CPCCBC4012', title: 'Read and interpret plans and specifications', type: 'Core' },
        { code: 'CPCCBC4013', title: 'Prepare and evaluate tender documentation', type: 'Core' },
        { code: 'CPCCBC4014', title: 'Prepare simple building sketches and drawings', type: 'Core' },
        { code: 'CPCCBC4018', title: 'Apply site surveys and set-out procedures to building and construction projects', type: 'Core' },
        { code: 'CPCCBC4053', title: 'Apply building codes and standards to the construction process for Class 2 to 9 Type C buildings', type: 'Core' },
        { code: 'CPCCBC5001', title: 'Apply building codes and standards to the construction process for Type B construction', type: 'Core' },
        { code: 'CPCCBC5002', title: 'Monitor costing systems on complex building and construction projects', type: 'Core' },
        { code: 'CPCCBC5003', title: 'Supervise the planning of on-site building and construction work', type: 'Core' },
        { code: 'CPCCBC5005', title: 'Select and manage building and construction contractors', type: 'Core' },
        { code: 'CPCCBC5007', title: 'Administer the legal obligations of a building and construction contractor', type: 'Core' },
        { code: 'CPCCBC5010', title: 'Manage construction work', type: 'Core' },
        { code: 'CPCCBC5011', title: 'Manage environmental management practices and processes in building and construction', type: 'Core' },
        { code: 'CPCCBC5013', title: 'Manage professional technical and legal reports on building and construction projects', type: 'Core' },
        { code: 'CPCCBC5018', title: 'Apply structural principles to the construction of buildings up to three storeys', type: 'Core' },
        { code: 'CPCCBC5019', title: 'Manage building and construction business finances', type: 'Core' },
        { code: 'BSBPMG532', title: 'Manage project quality', type: 'Elective' },
        { code: 'CPCCBC4052', title: 'Lead and manage teams in the building and construction industry', type: 'Elective' },
        { code: 'BSBPMG538', title: 'Manage project stakeholder engagement', type: 'Elective' },
      ],
    },
    heroImage: '/images/courses/cpc50220.jpg',
    secondaryImage: '/images/courses/cpc50220-builder.jpg',
    zohoCourseOption: 'CPC50220 Diploma of Building & Construction (Building)',
    leadSource: 'Western Aus Form',
    stateAddress: 'Unit 1, 220 Carr Pl, Leederville WA 6007, Australia',
  },

  // 6. CPC50220 - Diploma of Building and Construction (Building) SA (Existing)
  'diploma-of-building-and-construction-south-australia': {
    id: 'cpc50220-sa',
    slug: 'diploma-of-building-and-construction-south-australia',
    code: 'CPC50220',
    title: 'Diploma of Building and Construction',
    subtitle: '(Building)',
    qualificationLevel: 'Diploma',
    aqfLevel: 'AQF Level 5',
    state: 'sa',
    stateName: 'South Australia',
    fundingBadge: 'Government Funding Available',
    duration: '62 Weeks Excluding Holidays',
    durationShort: '62 WEEKS',
    deliveryMethod: 'Face To Face & Virtual Online',
    courseFeeSubsidised: '$1,065 AUD',
    courseFeeSubsidisedLabel: 'Student Contribution Fee (Skills SA)',
    courseFeeFull: '$15,975 AUD',
    courseFeeFullLabel: 'Flexible monthly payment plans',
    fundingScheme: 'Skills SA',
    employmentOutcomes: [
      {
        role: 'Licensed Builder (SA)',
        desc: 'Meet core educational qualifications required to apply for a South Australian Building Work Contractor Licence through CBS SA.',
        tags: ['CBS SA Licensing', 'Residential & Commercial', 'Contract Administration'],
      },
      {
        role: 'General Foreperson',
        desc: 'Oversee major jobsite execution, manage trades, monitor safety standards, and deliver multi-storey building programs.',
        tags: ['Site Supervision', 'NCC Compliance', 'WHS Systems'],
      },
      {
        role: 'Building Inspector',
        desc: 'Inspect buildings during construction for compliance with the National Construction Code and South Australian statutory requirements.',
        tags: ['Building Surveying', 'Code Compliance', 'Technical Reports'],
      },
      {
        role: 'Construction Project Manager',
        desc: 'Lead high-value building projects, tender administration, contractor procurement, and financial cost modeling.',
        tags: ['Contract Management', 'Cost Systems', 'Risk Management'],
      },
    ],
    overviewQuote:
      'This qualification is designed to meet the needs of builders, including selecting contractors, overseeing the work and its quality, and liaising with clients.',
    overviewParagraphs: [
      'The CPC50220 Diploma of Building and Construction (Building) expands your technical capacity from low-rise residential builds into complex commercial, industrial, and medium-rise construction up to 3 storeys.',
      'You will develop critical competencies in interpreting high-specification architectural designs, administering major Australian construction contracts, cost modeling, risk mitigation, and structural timber, steel, and concrete engineering.',
    ],
    inclusions: [
      'Complete BCTA Student Handbook & Study Blueprints',
      'Recorded Online Lectures & Digital Learning Resources',
      'Australian Standards & NCC Reference Access',
    ],
    deliveryDetails: {
      format1Title: 'Interactive Weekly Class',
      format1Badge: 'Format 01 · Live Evening Class',
      format1Desc:
        'Delivered with a weekly live class (conducted virtually online via Microsoft Teams) led by licensed building practitioners.',
      format1Activities: [
        'Trainer-Led Real-Time Instruction',
        'Discussion & Debate',
        'Group Activities & Scenarios',
        'Case Studies & Role Plays',
      ],
      format2Title: 'Dedicated Self-Study',
      format2Badge: 'Format 02 · Self-Directed',
      format2Desc:
        'Allocate approximately 10 hours per week for self-directed study, including reviewing digital blueprints, Australian Standards, and online lectures.',
      format2Hours: '~10',
      format2HoursLabel: 'Hours / Week Self-Directed Study',
      format3Title: 'Applied Assessments',
      format3Badge: 'Format 03 · Practical Tasks',
      format3Desc:
        'Allocate approximately 5 hours per week for real-world assessment tasks, contract drafting, cost estimation, and site safety plans.',
      format3Hours: '~5',
      format3HoursLabel: 'Hours / Week Assessment Tasks',
      workloadSummary:
        'Weekly Commitment: ~15–18 total study hours structured specifically for full-time on-site tradespeople.',
    },
    entryRequirements: {
      age: 'Applicants must be aged 18 years or above at commencement of training.',
      ptr: 'A structured Pre-training Review is conducted to determine if the course is suitable and appropriate for your vocational goals.',
      llnd: 'Successful completion of BCTA’s Language, Literacy, Numeracy and Digital (LLND) assessment to ensure digital classroom readiness.',
    },
    targetAudience: {
      description:
        'This course welcomes qualified tradespeople, carpenters, contractors, building supervisors, and industry entrants with relevant site experience.',
      inclusivity:
        'People with disabilities are strongly encouraged to apply. BCTA provides reasonable adjustments and tailored learning support.',
      brokerNote:
        'Building and Construction Training Australia also collaborates with authorized brokers and educational marketing agents.',
    },
    feesFunding: {
      subsidised: {
        title: 'Skills SA Funded Training',
        amount: '$1,065',
        currency: 'AUD',
        subtext: 'Student Contribution Fee',
        description:
          'This training is delivered with South Australian Government funding through Skills SA for eligible students.',
        criteria: [
          'Citizenship & Residency: Australian or NZ citizen, Australian permanent resident, or eligible visa holder.',
          'Location: Must live or work in South Australia.',
          'Age: 16 years or over and not enrolled in school (BCTA enrols students aged 18+).',
          'Course Limits: May undertake up to two subsidised courses at the same time.',
          'Upfront Assessment of Need (UAN): Must be completed before enrolment.',
        ],
        checkerUrl: 'https://mytraining.skills.sa.gov.au/training/getting-started/check-eligibility',
      },
      fullFee: {
        title: 'Fee for Service (Full Fee)',
        amount: '$15,975',
        currency: 'AUD',
        subtext: 'Self-Funded / Payment Plan',
        description:
          'For students who do not meet Skills SA funding criteria, interstate applicants, or corporate sponsored candidates.',
        features: [
          'Interest-free split payment schedules available across duration',
          'Tax deductibility may apply for trade career advancement',
          'Employer and corporate invoicing options supported',
        ],
        infoline: '1800 673 097',
      },
    },
    studyPathways: {
      title: 'Advanced Diploma of Building and Construction (Management)',
      description:
        'On successful completion of this qualification, graduates can continue their academic progression into executive construction leadership.',
    },
    licensingPathway: {
      regulator: 'Consumer and Business Services (CBS SA)',
      title: 'South Australia Licensing Pathway',
      description:
        'Graduates fulfill the core educational qualifications required to apply for a South Australian Building Work Contractor Licence. Our curriculum aligns strictly with National Construction Code (NCC) Classes 1 through 9.',
    },
    units: {
      coreCount: 24,
      electiveCount: 3,
      list: [
        { code: 'BSBOPS504', title: 'Manage business risk', type: 'Core' },
        { code: 'BSBWHS513', title: 'Lead WHS risk management', type: 'Core' },
        { code: 'CPCCBC4001', title: 'Apply building codes and standards to the construction process for Class 1 and 10 buildings', type: 'Core' },
        { code: 'CPCCBC4003', title: 'Select, prepare and administer a construction contract', type: 'Core' },
        { code: 'CPCCBC4004', title: 'Identify and produce estimated costs for building and construction projects', type: 'Core' },
        { code: 'CPCCBC4005', title: 'Produce labour and material schedules for ordering', type: 'Core' },
        { code: 'CPCCBC4008', title: 'Supervise site communication and administration processes for building and construction projects', type: 'Core' },
        { code: 'CPCCBC4009', title: 'Apply legal requirements to building and construction projects', type: 'Core' },
        { code: 'CPCCBC4010', title: 'Apply structural principles to residential and commercial constructions', type: 'Core' },
        { code: 'CPCCBC4012', title: 'Read and interpret plans and specifications', type: 'Core' },
        { code: 'CPCCBC4013', title: 'Prepare and evaluate tender documentation', type: 'Core' },
        { code: 'CPCCBC4014', title: 'Prepare simple building sketches and drawings', type: 'Core' },
        { code: 'CPCCBC4018', title: 'Apply site surveys and set-out procedures to building and construction projects', type: 'Core' },
        { code: 'CPCCBC4053', title: 'Apply building codes and standards to the construction process for Class 2 to 9 Type C buildings', type: 'Core' },
        { code: 'CPCCBC5001', title: 'Apply building codes and standards to the construction process for Type B construction', type: 'Core' },
        { code: 'CPCCBC5002', title: 'Monitor costing systems on complex building and construction projects', type: 'Core' },
        { code: 'CPCCBC5003', title: 'Supervise the planning of on-site building and construction work', type: 'Core' },
        { code: 'CPCCBC5005', title: 'Select and manage building and construction contractors', type: 'Core' },
        { code: 'CPCCBC5007', title: 'Administer the legal obligations of a building and construction contractor', type: 'Core' },
        { code: 'CPCCBC5010', title: 'Manage construction work', type: 'Core' },
        { code: 'CPCCBC5011', title: 'Manage environmental management practices and processes in building and construction', type: 'Core' },
        { code: 'CPCCBC5013', title: 'Manage professional technical and legal reports on building and construction projects', type: 'Core' },
        { code: 'CPCCBC5018', title: 'Apply structural principles to the construction of buildings up to three storeys', type: 'Core' },
        { code: 'CPCCBC5019', title: 'Manage building and construction business finances', type: 'Core' },
        { code: 'BSBPMG532', title: 'Manage project quality', type: 'Elective' },
        { code: 'CPCCBC4052', title: 'Lead and manage teams in the building and construction industry', type: 'Elective' },
        { code: 'BSBPMG538', title: 'Manage project stakeholder engagement', type: 'Elective' },
      ],
    },
    heroImage: '/images/courses/cpc50220.jpg',
    secondaryImage: '/images/courses/cpc50220-builder.jpg',
    zohoCourseOption: 'CPC50220 Diploma of Building & Construction (Building)',
    leadSource: 'South Aus form',
    stateAddress: 'Level 30, 91 King William Street, Adelaide SA 5000',
  },
};
