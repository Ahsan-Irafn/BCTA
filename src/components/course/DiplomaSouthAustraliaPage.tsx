'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  Download,
  Users,
  Compass,
  Laptop,
  Check,
  HelpCircle,
  ExternalLink,
  Phone,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Building2,
  HardHat,
  TrendingUp,
  FileCheck2,
  Zap,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RegisterNowSection from '@/components/home/RegisterNowSection';
import styles from './DiplomaSouthAustraliaPage.module.css';

interface UnitDef {
  code: string;
  title: string;
  type: 'Core' | 'Elective';
}

const DIPLOMA_UNITS: UnitDef[] = [
  // 24 Core Units
  { code: 'BSBOPS504', title: 'Manage business risk', type: 'Core' },
  { code: 'BSBWHS513', title: 'Lead WHS risk management', type: 'Core' },
  {
    code: 'CPCCBC4001',
    title: 'Apply building codes and standards to the construction process for Class 1 and 10 buildings',
    type: 'Core',
  },
  {
    code: 'CPCCBC4003',
    title: 'Select, prepare and administer a construction contract',
    type: 'Core',
  },
  {
    code: 'CPCCBC4004',
    title: 'Identify and produce estimated costs for building and construction projects',
    type: 'Core',
  },
  {
    code: 'CPCCBC4005',
    title: 'Produce labour and material schedules for ordering',
    type: 'Core',
  },
  {
    code: 'CPCCBC4008',
    title: 'Supervise site communication and administration processes for building and construction projects',
    type: 'Core',
  },
  {
    code: 'CPCCBC4009',
    title: 'Apply legal requirements to building and construction projects',
    type: 'Core',
  },
  {
    code: 'CPCCBC4010',
    title: 'Apply structural principles to residential and commercial constructions',
    type: 'Core',
  },
  { code: 'CPCCBC4012', title: 'Read and interpret plans and specifications', type: 'Core' },
  { code: 'CPCCBC4013', title: 'Prepare and evaluate tender documentation', type: 'Core' },
  { code: 'CPCCBC4014', title: 'Prepare simple building sketches and drawings', type: 'Core' },
  {
    code: 'CPCCBC4018',
    title: 'Apply site surveys and set-out procedures to building and construction projects',
    type: 'Core',
  },
  {
    code: 'CPCCBC4053',
    title: 'Apply building codes and standards to the construction process for Class 2 to 9 Type C buildings',
    type: 'Core',
  },
  {
    code: 'CPCCBC5001',
    title: 'Apply building codes and standards to the construction process for Type B construction',
    type: 'Core',
  },
  {
    code: 'CPCCBC5002',
    title: 'Monitor costing systems on complex building and construction projects',
    type: 'Core',
  },
  {
    code: 'CPCCBC5003',
    title: 'Supervise the planning of on-site building and construction work',
    type: 'Core',
  },
  {
    code: 'CPCCBC5005',
    title: 'Select and manage building and construction contractors',
    type: 'Core',
  },
  {
    code: 'CPCCBC5007',
    title: 'Administer the legal obligations of a building and construction contractor',
    type: 'Core',
  },
  { code: 'CPCCBC5010', title: 'Manage construction work', type: 'Core' },
  {
    code: 'CPCCBC5011',
    title: 'Manage environmental management practices and processes in building and construction',
    type: 'Core',
  },
  {
    code: 'CPCCBC5013',
    title: 'Manage professional technical and legal reports on building and construction projects',
    type: 'Core',
  },
  {
    code: 'CPCCBC5018',
    title: 'Apply structural principles to the construction of buildings up to three storeys',
    type: 'Core',
  },
  {
    code: 'CPCCBC5019',
    title: 'Manage building and construction business finances',
    type: 'Core',
  },

  // 3 Elective Units
  { code: 'BSBPMG532', title: 'Manage project quality', type: 'Elective' },
  {
    code: 'CPCCBC4052',
    title: 'Lead and manage teams in the building and construction industry',
    type: 'Elective',
  },
  {
    code: 'BSBPMG538',
    title: 'Manage project stakeholder engagement',
    type: 'Elective',
  },
];

interface CourseFaq {
  question: string;
  answer: string;
}

const COURSE_FAQS: CourseFaq[] = [
  {
    question: 'How long does the CPC50220 Diploma take to complete in South Australia?',
    answer:
      'The qualification runs for 62 weeks (excluding scheduled term holidays). It includes structured weekly interactive training sessions combined with approximately 10 hours per week of self-directed study and 5 hours of applied assessment activities.',
  },
  {
    question: 'Who is eligible for the South Australian Government Skills SA funded rate?',
    answer:
      'To qualify for the subsidised $1,065 student contribution fee, you must live or work in South Australia, be an Australian/NZ citizen, permanent resident or eligible visa holder, and be aged 18 or over. Prospective students must also complete the mandatory Upfront Assessment of Need (UAN) prior to formal enrolment.',
  },
  {
    question: 'Does this diploma meet the educational requirements for a builder licence in SA?',
    answer:
      'Yes. CPC50220 Diploma of Building and Construction (Building) is recognized by Consumer and Business Services (CBS SA) as fulfilling the prescribed technical education criteria for a Building Work Contractor Licence. Candidates must also demonstrate the required hands-on industry building experience when applying to CBS.',
  },
  {
    question: 'How is the course delivered, and can I study while working full-time on site?',
    answer:
      'The course is specifically structured for working trade professionals. Classes are delivered via weekly evening virtual sessions on Microsoft Teams featuring trainer-led instruction, group discussion, case studies, and digital blueprints. This allows you to advance your supervisory qualification without taking days off site.',
  },
  {
    question: 'What are the pathways to further study after completing the Diploma?',
    answer:
      'Graduates can articulate into higher-level management qualifications such as the Advanced Diploma of Building and Construction (Management) or pursue executive university pathways in construction project management, quantity surveying, and civil infrastructure.',
  },
];

interface CareerRole {
  id: string;
  number: string;
  role: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  desc: string;
  scope: string;
  tags: string[];
}

const CAREER_ROLES: CareerRole[] = [
  {
    id: 'licensed-builder',
    number: '01',
    role: 'Licensed Builder',
    icon: Building2,
    desc: 'Operate your own registered building business or manage head contracts for residential and commercial construction projects.',
    scope: 'Residential & Commercial Head Contracts',
    tags: ['Registered Builder', 'Head Contracts', 'Class 1–9'],
  },
  {
    id: 'general-foreperson',
    number: '02',
    role: 'General Foreperson',
    icon: HardHat,
    desc: 'Direct and coordinate daily trades, site logistics, safety protocols, and subcontractor delivery on medium-rise active sites.',
    scope: 'Medium-Rise Site Logistics & Trades',
    tags: ['Trade Logistics', 'Site Protocols', 'Subcontractors'],
  },
  {
    id: 'building-inspector',
    number: '03',
    role: 'Building Inspector',
    icon: ShieldCheck,
    desc: 'Perform compliance assessments, defect audits, and regulatory verification against the National Construction Code and Australian Standards.',
    scope: 'NCC & Australian Standards Audits',
    tags: ['Compliance Audits', 'Defect Analysis', 'NCC Codes'],
  },
  {
    id: 'site-manager',
    number: '04',
    role: 'Construction Site Manager',
    icon: TrendingUp,
    desc: 'Oversee multi-million dollar commercial packages, progress claims, procurement schedules, and high-stakes client relationships.',
    scope: 'Commercial Packages & Financial Controls',
    tags: ['Commercial Packages', 'Progress Claims', 'Procurement'],
  },
];

export default function DiplomaSouthAustraliaPage() {
  const [unitFilter, setUnitFilter] = useState<'All' | 'Core' | 'Elective'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [unitsExpanded, setUnitsExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadName, setDownloadName] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadPhone, setDownloadPhone] = useState('');
  const [downloadSubmitted, setDownloadSubmitted] = useState(false);

  // 3D Pointer Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const heroCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || typeof window === 'undefined' || window.innerWidth < 1024) return;
      const rect = heroCardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({
        x: Math.max(-4, Math.min(4, relY * -8)),
        y: Math.max(-4, Math.min(4, relX * 8)),
      });
    },
    [reduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadName.trim() || !downloadEmail.trim()) return;
    setDownloadSubmitted(true);
    setTimeout(() => {
      setDownloadModalOpen(false);
      setDownloadSubmitted(false);
      setDownloadName('');
      setDownloadEmail('');
      setDownloadPhone('');
    }, 2500);
  };

  const filteredUnits = DIPLOMA_UNITS.filter((unit) => {
    const matchesFilter = unitFilter === 'All' || unit.type === unitFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      unit.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const isUnitsFiltered = searchQuery.trim() !== '' || unitFilter !== 'All';
  const displayedUnits = isUnitsFiltered || unitsExpanded ? filteredUnits : filteredUnits.slice(0, 8);

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Header with South Australia Context */}
      <Header currentState="sa" />

      {/* 2. Hero Section: Asymmetric Composition with Architectural Rigor */}
      <section id="course-hero" className={styles.heroSection} aria-label="Course Hero">
        <div className={styles.heroBackgroundPattern} aria-hidden="true" />

        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbLink}>Courses</span>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbCurrent} aria-current="page">
              CPC50220 Diploma of Building and Construction
            </span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Column: Course Credentials & Editorial Value */}
            <div className={styles.heroContent}>
              <div className={styles.heroBadgeRow}>
                <span className={styles.codeBadge}>CPC50220</span>
                <span className={styles.stateBadge}>South Australia</span>
                <span className={styles.statusBadge}>
                  <span className={styles.pulseDot} />
                  Applications Open
                </span>
              </div>

              <h1 className={styles.heroTitle}>
                Diploma of Building and Construction{' '}
                <span className={styles.heroTitleAccent}>(Building)</span>
              </h1>

              <p className={styles.heroLead}>
                South Australia’s premier qualification for experienced tradespeople, site
                supervisors, and construction managers aiming for commercial and medium-rise
                builder licensing.
              </p>

              {/* Verified Trust Strip */}
              <div className={styles.heroTrustStrip}>
                <div className={styles.trustItem}>
                  <div className={styles.nrtLogoWrapper}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/nrt-logo.png"
                      alt="Nationally Recognised Training Logo"
                      className={styles.nrtLogoImg}
                      width={44}
                      height={44}
                    />
                  </div>
                  <div className={styles.trustText}>
                    <span className={styles.trustTitle}>Nationally Recognised Training</span>
                    <span className={styles.trustSubtitle}>ASQA Regulated · RTO # 22597</span>
                  </div>
                </div>

                <div className={styles.trustDivider} aria-hidden="true" />

                <div className={styles.trustItem}>
                  <div className={styles.fundingShieldWrapper}>
                    <ShieldCheck size={28} className={styles.fundingShieldIcon} />
                  </div>
                  <div className={styles.trustText}>
                    <span className={styles.trustTitle}>Government Funding Available</span>
                    <span className={styles.trustSubtitle}>
                      Skills SA Subsidised for Eligible Students*
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className={styles.heroActions}>
                <a href="#enquire-form" className={styles.primaryCta}>
                  <span>Enquire for Next Intake</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={() => setDownloadModalOpen(true)}
                  className={styles.secondaryCta}
                >
                  <Download size={18} aria-hidden="true" />
                  <span>Download Course Guide</span>
                </button>
              </div>

              <p className={styles.fundingDisclaimer}>
                *Delivered with South Australian Government funding through Skills SA for eligible
                residents. Full fee-for-service options with flexible payment plans also available.
              </p>
            </div>

            {/* Right Column: 3D Architectural Layered Photograph */}
            <div className={styles.heroVisualCol}>
              <div
                ref={heroCardRef}
                className={styles.perspectiveFrame}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                style={{
                  transform: reduceMotion
                    ? 'none'
                    : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                }}
              >
                <div className={styles.photoContainer}>
                  <Image
                    src="/images/courses/cpc50220.jpg"
                    alt="BCTA Construction Supervisor on multi-storey site holding plans"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className={styles.heroPhoto}
                  />
                  <div className={styles.photoVignette} />

                  {/* Drafting Overlay Coordinate Grid */}
                  <div className={styles.draftingMeta} aria-hidden="true">
                    <span>ELEVATION: LEVEL 30 // ADELAIDE CBD</span>
                    <span>SPEC: CPC50220 / NCC TYPE B &amp; C</span>
                  </div>

                  {/* Floating Highlights Tag */}
                  <div className={styles.floatingHighlightCard}>
                    <div className={styles.floatingHighlightBadge}>
                      <Clock size={16} />
                      <span>62 WEEKS</span>
                    </div>
                    <div className={styles.floatingHighlightText}>
                      <strong>$1,065 Subsidised</strong>
                      <span>Skills SA Student Contribution</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Course Quick Facts Strip */}
      <section className={styles.factsSection} aria-label="Course Fast Facts">
        <div className={styles.container}>
          <div className={styles.factsGrid}>
            <div className={styles.factCard}>
              <div className={styles.factIconCircle}>
                <Clock size={20} />
              </div>
              <div className={styles.factDetails}>
                <span className={styles.factLabel}>Duration</span>
                <strong className={styles.factValue}>62 Weeks</strong>
                <span className={styles.factNote}>Excluding scheduled holidays</span>
              </div>
            </div>

            <div className={styles.factCard}>
              <div className={styles.factIconCircle}>
                <Laptop size={20} />
              </div>
              <div className={styles.factDetails}>
                <span className={styles.factLabel}>Delivery Mode</span>
                <strong className={styles.factValue}>Blended Virtual</strong>
                <span className={styles.factNote}>Interactive MS Teams + Onsite support</span>
              </div>
            </div>

            <div className={styles.factCard}>
              <div className={styles.factIconCircle}>
                <Award size={20} />
              </div>
              <div className={styles.factDetails}>
                <span className={styles.factLabel}>Course Level</span>
                <strong className={styles.factValue}>Diploma (AQF 5)</strong>
                <span className={styles.factNote}>Medium-Rise Building Scope</span>
              </div>
            </div>

            <div className={styles.factCard}>
              <div className={styles.factIconCircle}>
                <ShieldCheck size={20} />
              </div>
              <div className={styles.factDetails}>
                <span className={styles.factLabel}>Government Subsidised</span>
                <strong className={styles.factValue}>$1,065 AUD</strong>
                <span className={styles.factNote}>Student Contribution Fee (Skills SA)</span>
              </div>
            </div>

            <div className={styles.factCard}>
              <div className={styles.factIconCircle}>
                <Briefcase size={20} />
              </div>
              <div className={styles.factDetails}>
                <span className={styles.factLabel}>Full Fee-for-Service</span>
                <strong className={styles.factValue}>$15,975 AUD</strong>
                <span className={styles.factNote}>Flexible monthly payment plans</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Qualification Overview & Scope (Editorial Layout) */}
      <section className={styles.overviewSection} aria-label="Qualification Description">
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            <div className={styles.overviewText}>
              <div className={styles.sectionEyebrow}>
                <Compass size={14} aria-hidden="true" />
                <span>Qualification Description</span>
              </div>

              <h2 className={styles.sectionHeading}>
                Designed for the Demands of Today’s Professional Builders
              </h2>

              <blockquote className={styles.sourceQuote}>
                &ldquo;This qualification is designed to meet the needs of builders, including
                selecting contractors, overseeing the work and its quality, and liaising with
                clients.&rdquo;
              </blockquote>

              <p className={styles.bodyParagraph}>
                The CPC50220 Diploma of Building and Construction (Building) expands your technical
                capacity from low-rise residential builds into complex commercial, industrial, and
                medium-rise construction up to 3 storeys. You will develop critical competencies in
                interpreting high-specification architectural designs, administering major
                Australian construction contracts, cost modeling, risk mitigation, and structural
                timber/steel/concrete engineering.
              </p>

              {/* Free Material Inclusions */}
              <div className={styles.inclusionsBox}>
                <h3 className={styles.inclusionsTitle}>
                  <Sparkles size={18} aria-hidden="true" />
                  <span>Free Course Materials Included</span>
                </h3>
                <ul className={styles.inclusionsList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Complete BCTA Student Handbook &amp; Study Blueprints</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Recorded Online Lectures &amp; Digital Learning Resources</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.checkIcon} />
                    <span>Australian Standards &amp; NCC Reference Access</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className={styles.overviewMediaCard}>
              <div className={styles.secondaryImageFrame}>
                <Image
                  src="/images/courses/cpc50220-builder.jpg"
                  alt="Builder on site inspecting structural plans"
                  width={600}
                  height={420}
                  className={styles.secondaryImage}
                />
              </div>

              <div className={styles.licensingCallout}>
                <div className={styles.licensingHeader}>
                  <Award size={24} className={styles.licensingIcon} />
                  <div>
                    <h4 className={styles.licensingTitle}>South Australia Licensing Pathway</h4>
                    <p className={styles.licensingSubtitle}>
                      Consumer and Business Services (CBS SA) Alignment
                    </p>
                  </div>
                </div>
                <p className={styles.licensingBody}>
                  Graduates fulfill the core educational qualifications required to apply for a
                  South Australian Building Work Contractor Licence. Our curriculum aligns
                  strictly with National Construction Code (NCC) Classes 1 through 9.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Career Outcomes & Educational Pathways */}
      <section className={styles.careerSection} aria-label="Career Outcomes and Pathways">
        <div className={styles.container}>
          <div className={styles.sectionCenterHeader}>
            <div className={styles.sectionEyebrow}>
              <Briefcase size={14} aria-hidden="true" />
              <span>Employment Outcomes</span>
            </div>
            <h2 className={styles.sectionHeading}>Industry Pathways &amp; Career Opportunities</h2>
            <p className={styles.sectionSubtext}>
              Gain verified credentials recognized by major commercial construction enterprises,
              subcontractors, and building regulators.
            </p>
          </div>

          <div className={styles.careerGrid}>
            {CAREER_ROLES.map((role) => {
              const RoleIcon = role.icon;
              return (
                <div key={role.id} className={styles.careerCard}>
                  <div className={styles.careerCardHeader}>
                    <div className={styles.careerIconWrap}>
                      <RoleIcon size={22} className={styles.careerRoleIcon} />
                    </div>
                    <span className={styles.careerNumber}>{role.number}</span>
                  </div>

                  <h3 className={styles.careerRole}>{role.role}</h3>
                  <p className={styles.careerDesc}>{role.desc}</p>

                  <div className={styles.careerTags}>
                    {role.tags.map((tag) => (
                      <span key={tag} className={styles.careerTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pathway to Further Study Banner */}
          <div className={styles.pathwayBanner}>
            <div className={styles.pathwayLeft}>
              <GraduationCap size={28} className={styles.pathwayIcon} />
              <div>
                <span className={styles.pathwayEyebrow}>Pathways to Further Study</span>
                <h4 className={styles.pathwayTitle}>
                  Advanced Diploma of Building and Construction (Management)
                </h4>
                <p className={styles.pathwayText}>
                  On successful completion of this qualification, graduates can continue their
                  academic progression into executive construction leadership.
                </p>
              </div>
            </div>
            <a href="#enquire-form" className={styles.pathwayCta}>
              <span>Discuss Study Pathways</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Course Structure: Interactive Unit Explorer (27 Units Total) */}
      <section id="course-units" className={styles.unitsSection} aria-label="Course Units">
        <div className={styles.container}>
          <div className={styles.unitsHeaderRow}>
            <div>
              <div className={styles.sectionEyebrow}>
                <BookOpen size={14} aria-hidden="true" />
                <span>Course Structure</span>
              </div>
              <h2 className={styles.sectionHeading}>
                27 Nationally Accredited Units{' '}
                <span className={styles.unitsHighlight}>
                  (24 Core + 3 Electives)
                </span>
              </h2>
              <p className={styles.sectionSubtext}>
                Every unit is prescribed under the National Training Package to guarantee rigorous
                structural, contract, and safety competency.
              </p>
            </div>

            {/* Filter Pills & Live Search */}
            <div className={styles.unitsControls}>
              <div className={styles.filterPills}>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${unitFilter === 'All' ? styles.filterActive : ''}`}
                  onClick={() => setUnitFilter('All')}
                >
                  All ({DIPLOMA_UNITS.length})
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${unitFilter === 'Core' ? styles.filterActive : ''}`}
                  onClick={() => setUnitFilter('Core')}
                >
                  Core (24)
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${unitFilter === 'Elective' ? styles.filterActive : ''}`}
                  onClick={() => setUnitFilter('Elective')}
                >
                  Electives (3)
                </button>
              </div>

              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search by code or title (e.g. CPCCBC5001)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search course units"
                />
              </div>
            </div>
          </div>

          {/* Units Table */}
          <div className={styles.tableCard}>
            <div className={styles.tableResponsive}>
              <table className={styles.unitsTable}>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '180px' }}>
                      Unit Code
                    </th>
                    <th scope="col">Unit Title</th>
                    <th scope="col" style={{ width: '130px', textAlign: 'center' }}>
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedUnits.length > 0 ? (
                    displayedUnits.map((unit) => (
                      <tr key={unit.code}>
                        <td className={styles.unitCodeCell}>
                          <code>{unit.code}</code>
                        </td>
                        <td className={styles.unitTitleCell}>{unit.title}</td>
                        <td className={styles.unitTypeCell}>
                          <span
                            className={
                              unit.type === 'Core' ? styles.badgeCore : styles.badgeElective
                            }
                          >
                            {unit.type}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className={styles.noUnitsCell}>
                        No units match your search query &ldquo;{searchQuery}&rdquo;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {!isUnitsFiltered && filteredUnits.length > 8 && (
              <div className={styles.tableExpandBar}>
                <button
                  type="button"
                  className={styles.tableExpandBtn}
                  onClick={() => setUnitsExpanded(!unitsExpanded)}
                  aria-expanded={unitsExpanded}
                >
                  <span>
                    {unitsExpanded
                      ? 'Collapse Units (Show Top 8)'
                      : `View All 27 Units (${filteredUnits.length - 8} more units)`}
                  </span>
                  {unitsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            )}

            <div className={styles.tableFooter}>
              <span>
                Showing {displayedUnits.length} of {filteredUnits.length} units
              </span>
              <span className={styles.tableFooterNote}>
                Packaging rules: 24 Core units + 3 Elective units must be completed for award of
                diploma.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Course Delivery & Weekly Timetable - Animated Progression Workflow */}
      <section className={styles.deliverySection} aria-label="Course Delivery and Format">
        <div className={styles.container}>
          <div className={styles.sectionCenterHeader}>
            <div className={styles.sectionEyebrow}>
              <Calendar size={14} aria-hidden="true" />
              <span>Learning Experience</span>
            </div>
            <h2 className={styles.sectionHeading}>Structured Weekly Delivery &amp; Study Schedule</h2>
            <p className={styles.sectionSubtext}>
              Flexible blended training engineered so tradespeople can continue earning while
              learning.
            </p>
          </div>

          <div className={styles.deliveryWorkflowWrapper}>
            {/* Animated Progression Beam */}
            <div className={styles.workflowTrack} aria-hidden="true">
              <div className={styles.workflowBeam} />
            </div>

            <div className={styles.deliveryGrid}>
              {/* Format 01 */}
              <div className={`${styles.deliveryCard} ${styles.deliveryCardFeatured}`}>
                <div className={styles.deliveryCardTop}>
                  <div className={styles.deliveryIconWrap}>
                    <Laptop size={22} className={styles.deliveryCardIcon} />
                  </div>
                  <div className={styles.deliveryBadgePill}>
                    <span className={styles.livePulseDot} />
                    <span>Format 01 · Live Evening</span>
                  </div>
                </div>

                <h3 className={styles.deliveryCardTitle}>Interactive Weekly Class</h3>
                <p className={styles.deliveryCardText}>
                  Delivered with a weekly live class (currently conducted virtually online via
                  Microsoft Teams) led by licensed building practitioners.
                </p>

                <div className={styles.deliveryActivities}>
                  <span className={styles.activityPill}>Trainer-Led Instruction</span>
                  <span className={styles.activityPill}>Discussion &amp; Debate</span>
                  <span className={styles.activityPill}>Group Activities</span>
                  <span className={styles.activityPill}>Case Studies &amp; Role Plays</span>
                </div>
              </div>

              {/* Format 02 */}
              <div className={styles.deliveryCard}>
                <div className={styles.deliveryCardTop}>
                  <div className={styles.deliveryIconWrap}>
                    <BookOpen size={22} className={styles.deliveryCardIcon} />
                  </div>
                  <div className={styles.deliveryBadgePill}>
                    <Clock size={12} />
                    <span>Format 02 · Self-Directed</span>
                  </div>
                </div>

                <h3 className={styles.deliveryCardTitle}>Dedicated Self-Study</h3>
                <p className={styles.deliveryCardText}>
                  Allocate approximately <strong>10 hours per week</strong> for self-directed study,
                  including reviewing digital blueprints, Australian Standards, and online lectures.
                </p>

                <div className={styles.hourMetric}>
                  <span className={styles.hourNumber}>~10</span>
                  <span className={styles.hourLabel}>Hours / Week Self-Directed Study</span>
                </div>
              </div>

              {/* Format 03 */}
              <div className={styles.deliveryCard}>
                <div className={styles.deliveryCardTop}>
                  <div className={styles.deliveryIconWrap}>
                    <FileCheck2 size={22} className={styles.deliveryCardIcon} />
                  </div>
                  <div className={styles.deliveryBadgePill}>
                    <FileText size={12} />
                    <span>Format 03 · Practical</span>
                  </div>
                </div>

                <h3 className={styles.deliveryCardTitle}>Applied Assessments</h3>
                <p className={styles.deliveryCardText}>
                  Allocate approximately <strong>5 hours per week</strong> for real-world assessment
                  tasks, contract drafting, cost estimation, and site safety plans.
                </p>

                <div className={styles.hourMetric}>
                  <span className={styles.hourNumber}>~5</span>
                  <span className={styles.hourLabel}>Hours / Week Assessment Tasks</span>
                </div>
              </div>
            </div>

            {/* Compact Workload Commitment Bar */}
            <div className={styles.workloadStrip}>
              <div className={styles.workloadLeft}>
                <Clock size={16} className={styles.workloadIcon} />
                <span>
                  <strong>Weekly Commitment:</strong> ~15–18 total study hours structured specifically for full-time on-site tradespeople.
                </span>
              </div>
              <span className={styles.workloadBadge}>Zero Site-Time Loss</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Entry & Admission Requirements */}
      <section className={styles.admissionsSection} aria-label="Entry and Admission Requirements">
        <div className={styles.container}>
          <div className={styles.admissionsGrid}>
            <div>
              <div className={styles.sectionEyebrow}>
                <CheckCircle2 size={14} aria-hidden="true" />
                <span>Admissions</span>
              </div>
              <h2 className={styles.sectionHeading}>Entry &amp; Admission Requirements</h2>
              <p className={styles.bodyParagraph}>
                BCTA maintains supportive and transparent entry evaluations to ensure students have
                the background required to succeed in supervisory construction roles.
              </p>

              <div className={styles.requirementsList}>
                <div className={styles.reqItem}>
                  <div className={styles.reqIconWrapper}>
                    <Check size={18} />
                  </div>
                  <div>
                    <h4 className={styles.reqTitle}>Age Requirement</h4>
                    <p className={styles.reqDesc}>
                      Applicants must be aged 18 years or above at commencement of training.
                    </p>
                  </div>
                </div>

                <div className={styles.reqItem}>
                  <div className={styles.reqIconWrapper}>
                    <Check size={18} />
                  </div>
                  <div>
                    <h4 className={styles.reqTitle}>Pre-training Review (PTR)</h4>
                    <p className={styles.reqDesc}>
                      A structured Pre-training Review is conducted to determine if the course is
                      suitable and appropriate for your individual vocational goals.
                    </p>
                  </div>
                </div>

                <div className={styles.reqItem}>
                  <div className={styles.reqIconWrapper}>
                    <Check size={18} />
                  </div>
                  <div>
                    <h4 className={styles.reqTitle}>LLND Evaluation</h4>
                    <p className={styles.reqDesc}>
                      Successful completion of BCTA’s Language, Literacy, Numeracy and Digital
                      (LLND) assessment to ensure digital classroom readiness.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Audience & Inclusivity Card */}
            <div className={styles.targetAudienceCard}>
              <div className={styles.targetBadge}>
                <Users size={16} />
                <span>Inclusive Community</span>
              </div>
              <h3 className={styles.targetHeading}>Target Audience &amp; Diversity</h3>
              <p className={styles.targetText}>
                This course welcomes qualified tradespeople, carpenters, contractors, building
                supervisors, and industry entrants with relevant site experience.
              </p>
              <div className={styles.inclusivityNotice}>
                <p>
                  <strong>People with disabilities are strongly encouraged to apply.</strong> BCTA
                  provides reasonable adjustments and tailored learning support throughout your
                  enrolment.
                </p>
              </div>
              <p className={styles.brokerNotice}>
                Building and Construction Training Australia also collaborates with authorized
                brokers and educational marketing agents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Fees, Funding & Skills SA Eligibility Conditions */}
      <section id="fees-funding" className={styles.feesSection} aria-label="Course Fees and Funding">
        <div className={styles.container}>
          <div className={styles.sectionCenterHeader}>
            <div className={styles.sectionEyebrow}>
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Investment &amp; Subsidies</span>
            </div>
            <h2 className={styles.sectionHeading}>
              Transparent Course Fees &amp; Government Funding
            </h2>
            <p className={styles.sectionSubtext}>
              Take advantage of South Australian Government subsidised training through Skills SA
              if eligible.
            </p>
          </div>

          <div className={styles.feesComparisonGrid}>
            {/* Government Subsidised Card */}
            <div className={`${styles.feeCard} ${styles.feeCardFeatured}`}>
              <div className={styles.feeFeaturedBadge}>South Australia Subsidised</div>
              <span className={styles.feeSchemeTitle}>Skills SA Funded</span>
              <div className={styles.priceRow}>
                <span className={styles.priceAmount}>$1,065</span>
                <span className={styles.priceCurrency}>AUD</span>
              </div>
              <span className={styles.priceSubtext}>Student Contribution Fee</span>

              <p className={styles.feeSummary}>
                This training is delivered with South Australian Government funding through Skills SA
                for eligible students.
              </p>

              <div className={styles.eligibilityCriteria}>
                <h4 className={styles.criteriaTitle}>Skills SA Eligibility Requirements:</h4>
                <ul className={styles.criteriaList}>
                  <li>
                    <CheckCircle2 size={16} className={styles.criteriaIcon} />
                    <span>
                      <strong>Citizenship &amp; Residency:</strong> Australian or NZ citizen,
                      Australian permanent resident, or eligible visa holder.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.criteriaIcon} />
                    <span>
                      <strong>Location:</strong> Must live or work in South Australia.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.criteriaIcon} />
                    <span>
                      <strong>Age:</strong> 16 years or over and not enrolled in school (BCTA enrols
                      students aged 18+).
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.criteriaIcon} />
                    <span>
                      <strong>Course Limits:</strong> May undertake up to two subsidised courses at
                      the same time.
                    </span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className={styles.criteriaIcon} />
                    <span>
                      <strong>Upfront Assessment:</strong> Complete the Upfront Assessment of Need
                      (UAN) before enrolment.
                    </span>
                  </li>
                </ul>
              </div>

              <div className={styles.feeCardActions}>
                <a
                  href="https://mytraining.skills.sa.gov.au/training/getting-started/check-eligibility"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.eligibilityCheckerBtn}
                >
                  <span>Check Skills SA Eligibility</span>
                  <ExternalLink size={15} />
                </a>

                <a href="#enquire-form" className={styles.applySubsidisedBtn}>
                  <span>Apply with Subsidised Rate</span>
                </a>
              </div>
            </div>

            {/* Non-Government Funded / Fee for Service Card */}
            <div className={styles.feeCard}>
              <span className={styles.feeSchemeTitle}>Fee for Service (Full Fee)</span>
              <div className={styles.priceRow}>
                <span className={styles.priceAmount}>$15,975</span>
                <span className={styles.priceCurrency}>AUD</span>
              </div>
              <span className={styles.priceSubtext}>Self-Funded / Employer Sponsored</span>

              <p className={styles.feeSummary}>
                For students who do not meet Skills SA funding criteria, interstate applicants, or
                corporate sponsored candidates.
              </p>

              <div className={styles.paymentPlansList}>
                <div className={styles.planItem}>
                  <CheckCircle2 size={16} className={styles.criteriaIcon} />
                  <span>Interest-free split payment schedules available across duration</span>
                </div>
                <div className={styles.planItem}>
                  <CheckCircle2 size={16} className={styles.criteriaIcon} />
                  <span>Tax deductibility may apply for trade career advancement</span>
                </div>
                <div className={styles.planItem}>
                  <CheckCircle2 size={16} className={styles.criteriaIcon} />
                  <span>Employer and corporate invoicing options supported</span>
                </div>
              </div>

              <div className={styles.helpBox}>
                <h4 className={styles.helpTitle}>Need Financial Assistance?</h4>
                <p className={styles.helpText}>
                  Call the Skills SA Infoline on{' '}
                  <a href="tel:1800673097" className={styles.infolineLink}>
                    1800 673 097
                  </a>{' '}
                  to learn about loan and allowance options.
                </p>
              </div>

              <div className={styles.feeCardActions}>
                <a href="#enquire-form" className={styles.applyFeeForServiceBtn}>
                  <span>Enquire for Payment Plans</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Course FAQs Accordion */}
      <section id="course-faqs" className={styles.faqsSection} aria-label="Course Frequently Asked Questions">
        <div className={styles.container}>
          <div className={styles.sectionCenterHeader}>
            <div className={styles.sectionEyebrow}>
              <HelpCircle size={14} aria-hidden="true" />
              <span>Questions Answered</span>
            </div>
            <h2 className={styles.sectionHeading}>Diploma Frequently Asked Questions</h2>
            <p className={styles.sectionSubtext}>
              Detailed answers about licensing, virtual delivery, attendance, and assessment.
            </p>
          </div>

          <div className={styles.faqList}>
            {COURSE_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const buttonId = `course-faq-btn-${index}`;
              const panelId = `course-faq-panel-${index}`;

              return (
                <div
                  key={index}
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                >
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className={styles.faqTrigger}
                      onClick={() => toggleFaq(index)}
                    >
                      <span className={styles.faqQuestionText}>
                        <span className={styles.faqNumber} aria-hidden="true">
                          0{index + 1}
                        </span>
                        {faq.question}
                      </span>
                      <span
                        className={`${styles.faqIconWrapper} ${isOpen ? styles.faqIconOpen : ''}`}
                        aria-hidden="true"
                      >
                        <Plus size={18} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={`${styles.faqPanel} ${isOpen ? styles.faqPanelOpen : ''}`}
                  >
                    <div className={styles.faqAnswerContent}>
                      <p className={styles.faqAnswerText}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Official Zoho Registration Form: Preselected for CPC50220 */}
      <RegisterNowSection
        id="enquire-form"
        initialCourse="CPC50220 Diploma of Building &amp; Construction (Building)"
        leadSource="South Aus form"
        stateName="South Australia"
        stateAddress="Level 30, 91 King William Street, Adelaide SA 5000"
      />

      {/* 12. Authentic State Footer */}
      <Footer currentState="sa" />

      {/* Download Course Guide Modal */}
      {downloadModalOpen && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setDownloadModalOpen(false)}
        >
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setDownloadModalOpen(false)}
              aria-label="Close modal"
            >
              ×
            </button>

            <div className={styles.modalIconWrapper}>
              <FileText size={28} />
            </div>

            <h3 id="modal-title" className={styles.modalTitle}>
              Download Diploma PDF Guide
            </h3>
            <p className={styles.modalDesc}>
              Receive the complete qualification handbook, full unit breakdown, and Skills SA
              funding schedule directly to your inbox.
            </p>

            {downloadSubmitted ? (
              <div className={styles.modalSuccess}>
                <CheckCircle2 size={36} className={styles.modalSuccessIcon} />
                <p>
                  <strong>Thank you!</strong> Your course guide has been dispatched to{' '}
                  {downloadEmail}. Check your inbox shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} className={styles.modalForm}>
                <div className={styles.modalField}>
                  <label htmlFor="modal-name">Full Name *</label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    placeholder="e.g. John Miller"
                    value={downloadName}
                    onChange={(e) => setDownloadName(e.target.value)}
                  />
                </div>

                <div className={styles.modalField}>
                  <label htmlFor="modal-email">Email Address *</label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder="e.g. john@example.com.au"
                    value={downloadEmail}
                    onChange={(e) => setDownloadEmail(e.target.value)}
                  />
                </div>

                <div className={styles.modalField}>
                  <label htmlFor="modal-phone">Mobile Phone (Optional)</label>
                  <input
                    id="modal-phone"
                    type="tel"
                    placeholder="e.g. 0400 000 000"
                    value={downloadPhone}
                    onChange={(e) => setDownloadPhone(e.target.value)}
                  />
                </div>

                <button type="submit" className={styles.modalSubmitBtn}>
                  <Download size={18} />
                  <span>Download PDF Guide</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
