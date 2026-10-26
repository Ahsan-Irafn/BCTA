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
  Search,
  Download,
  Users,
  Compass,
  Laptop,
  Check,
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
import { CourseData, UnitDef } from '@/lib/coursesData';
import styles from './DiplomaSouthAustraliaPage.module.css';

interface CourseTemplatePageProps {
  course: CourseData;
}

const OUTCOME_ICONS = [Building2, HardHat, TrendingUp, ShieldCheck];

export default function CourseTemplatePage({ course }: CourseTemplatePageProps) {
  // Live Unit Filter & Live Search state
  const [unitFilter, setUnitFilter] = useState<'All' | 'Core' | 'Elective'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [unitsExpanded, setUnitsExpanded] = useState(false);

  // Download Modal State
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadName, setDownloadName] = useState('');
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadPhone, setDownloadPhone] = useState('');
  const [downloadSubmitted, setDownloadSubmitted] = useState(false);

  // 3D Perspective Tilt on Hero Image Card
  const heroCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || !heroCardRef.current) return;
      const rect = heroCardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = -((y - centerY) / centerY) * 7;
      const tiltY = ((x - centerX) / centerX) * 7;
      setTilt({ x: tiltX, y: tiltY });
    },
    [reduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Filter Units based on type and search query
  const filteredUnits = course.units.list.filter((unit) => {
    const matchesFilter =
      unitFilter === 'All'
        ? true
        : unitFilter === 'Core'
        ? unit.type === 'Core'
        : unit.type === 'Elective';
    const matchesQuery =
      unit.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const isUnitsFiltered = searchQuery.trim().length > 0 || unitFilter !== 'All';
  const displayedUnits = unitsExpanded || isUnitsFiltered ? filteredUnits : filteredUnits.slice(0, 8);

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!downloadName || !downloadEmail) return;
    setDownloadSubmitted(true);
    setTimeout(() => {
      setDownloadModalOpen(false);
      setDownloadSubmitted(false);
      setDownloadName('');
      setDownloadEmail('');
      setDownloadPhone('');
    }, 3200);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Authentic Header Navigation with Active State */}
      <Header currentState={course.state} />

      {/* 2. Hero Section */}
      <section className={styles.heroSection} aria-label={`${course.code} Hero Overview`}>
        <div className={styles.heroBackgroundPattern} aria-hidden="true" />

        <div className={styles.container}>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href={course.state === 'wa' ? '/western-australia' : '/south-australia'} className={styles.breadcrumbLink}>
              {course.stateName}
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive}>{course.code} {course.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Column: Heading, Badges, Summary & CTAs */}
            <div className={styles.heroTextCol}>
              <div className={styles.badgeGroup}>
                <span className={styles.rtoBadge}>
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>RTO # 22597 · ASQA Regulated</span>
                </span>
                <span className={styles.govFundedBadge}>
                  <Award size={14} aria-hidden="true" />
                  <span>{course.fundingBadge}</span>
                </span>
              </div>

              <h1 className={styles.heroTitle}>
                <span className={styles.codePrefix}>{course.code}</span>
                <span className={styles.titleMain}>{course.title}</span>
                {course.subtitle && <span className={styles.bracketScope}>{course.subtitle}</span>}
              </h1>

              <p className={styles.heroLead}>{course.overviewQuote}</p>

              {/* Fast Spec Pills */}
              <div className={styles.quickSpecPills}>
                <div className={styles.specPill}>
                  <Clock size={16} className={styles.pillIcon} aria-hidden="true" />
                  <span>{course.duration}</span>
                </div>
                <div className={styles.specPill}>
                  <Laptop size={16} className={styles.pillIcon} aria-hidden="true" />
                  <span>{course.deliveryMethod}</span>
                </div>
                <div className={styles.specPill}>
                  <Award size={16} className={styles.pillIcon} aria-hidden="true" />
                  <span>{course.aqfLevel}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.heroCtaGroup}>
                <a href="#enquire-form" className={styles.primaryCta}>
                  <span>Register Now</span>
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

                <a href="tel:1300112282" className={styles.phoneCta}>
                  <Phone size={16} aria-hidden="true" />
                  <span>1300 11 2282</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3D Layered Course Visual */}
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={course.heroImage}
                    alt={`${course.code} ${course.title}`}
                    className={styles.heroPhoto}
                    loading="eager"
                  />
                  <div className={styles.photoVignette} />

                  {/* Drafting Overlay Coordinate Grid */}
                  <div className={styles.draftingMeta} aria-hidden="true">
                    <span>{course.state === 'wa' ? 'PERTH // WA TRAINING' : 'ADELAIDE // SA DELIVERY'}</span>
                    <span>SPEC: {course.code} // {course.aqfLevel}</span>
                  </div>

                  {/* Floating Highlights Tag */}
                  <div className={styles.floatingHighlightCard}>
                    <div className={styles.floatingHighlightBadge}>
                      <Clock size={16} />
                      <span>{course.durationShort}</span>
                    </div>
                    <div className={styles.floatingHighlightText}>
                      <strong>{course.courseFeeSubsidised || course.courseFeeFull}</strong>
                      <span>{course.courseFeeSubsidisedLabel || 'Full Course Fee'}</span>
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
                <strong className={styles.factValue}>{course.duration.split(' ')[0]} {course.duration.split(' ')[1] || 'Duration'}</strong>
                <span className={styles.factNote}>{course.duration}</span>
              </div>
            </div>

            <div className={styles.factCard}>
              <div className={styles.factIconCircle}>
                <Laptop size={20} />
              </div>
              <div className={styles.factDetails}>
                <span className={styles.factLabel}>Delivery Method</span>
                <strong className={styles.factValue}>{course.deliveryMethod.split('&')[0].trim()}</strong>
                <span className={styles.factNote}>{course.deliveryMethod}</span>
              </div>
            </div>

            <div className={styles.factCard}>
              <div className={styles.factIconCircle}>
                <Award size={20} />
              </div>
              <div className={styles.factDetails}>
                <span className={styles.factLabel}>Course Level</span>
                <strong className={styles.factValue}>{course.qualificationLevel}</strong>
                <span className={styles.factNote}>{course.aqfLevel}</span>
              </div>
            </div>

            {course.courseFeeSubsidised ? (
              <div className={styles.factCard}>
                <div className={styles.factIconCircle}>
                  <ShieldCheck size={20} />
                </div>
                <div className={styles.factDetails}>
                  <span className={styles.factLabel}>Subsidised Fee</span>
                  <strong className={styles.factValue}>{course.courseFeeSubsidised}</strong>
                  <span className={styles.factNote}>{course.courseFeeSubsidisedLabel}</span>
                </div>
              </div>
            ) : null}

            <div className={styles.factCard}>
              <div className={styles.factIconCircle}>
                <Briefcase size={20} />
              </div>
              <div className={styles.factDetails}>
                <span className={styles.factLabel}>Course Fee</span>
                <strong className={styles.factValue}>{course.courseFeeFull.split(' ')[0]} {course.courseFeeFull.split(' ')[1] || 'AUD'}</strong>
                <span className={styles.factNote}>{course.courseFeeFullLabel || 'Flexible payment plans'}</span>
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
                Designed for Practical Industry Leadership
              </h2>

              <blockquote className={styles.sourceQuote}>
                &ldquo;{course.overviewQuote}&rdquo;
              </blockquote>

              {course.overviewParagraphs.map((para, idx) => (
                <p key={idx} className={styles.bodyParagraph}>
                  {para}
                </p>
              ))}

              {/* Free Material Inclusions */}
              <div className={styles.inclusionsBox}>
                <h3 className={styles.inclusionsTitle}>
                  <Sparkles size={18} aria-hidden="true" />
                  <span>Free Material Included</span>
                </h3>
                <ul className={styles.inclusionsList}>
                  {course.inclusions.map((item, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.overviewMediaCard}>
              <div className={styles.secondaryImageFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.secondaryImage}
                  alt={course.title}
                  className={styles.secondaryImage}
                  loading="lazy"
                />
              </div>

              {course.licensingPathway && (
                <div className={styles.licensingCallout}>
                  <div className={styles.licensingHeader}>
                    <Award size={24} className={styles.licensingIcon} />
                    <div>
                      <h4 className={styles.licensingTitle}>{course.licensingPathway.title}</h4>
                      <p className={styles.licensingSubtitle}>
                        {course.licensingPathway.regulator}
                      </p>
                    </div>
                  </div>
                  <p className={styles.licensingBody}>
                    {course.licensingPathway.description}
                  </p>
                </div>
              )}
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
              Gain nationally recognized skills aligned to active workplace roles and contractor standards across {course.stateName}.
            </p>
          </div>

          <div className={styles.careerGrid}>
            {course.employmentOutcomes.map((role, idx) => {
              const RoleIcon = OUTCOME_ICONS[idx % OUTCOME_ICONS.length];
              return (
                <div key={role.role} className={styles.careerCard}>
                  <div className={styles.careerCardHeader}>
                    <div className={styles.careerIconWrap}>
                      <RoleIcon size={22} className={styles.careerRoleIcon} />
                    </div>
                    <span className={styles.careerNumber}>0{idx + 1}</span>
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
                  {course.studyPathways.title}
                </h4>
                <p className={styles.pathwayText}>
                  {course.studyPathways.description}
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

      {/* 6. Course Structure: Interactive Unit Explorer (Compact 8-unit view with Toggle) */}
      <section id="course-units" className={styles.unitsSection} aria-label="Course Units">
        <div className={styles.container}>
          <div className={styles.unitsHeaderRow}>
            <div>
              <div className={styles.sectionEyebrow}>
                <BookOpen size={14} aria-hidden="true" />
                <span>Course Structure</span>
              </div>
              <h2 className={styles.sectionHeading}>
                {course.units.list.length} Nationally Accredited Units{' '}
                <span className={styles.unitsHighlight}>
                  ({course.units.coreCount} Core + {course.units.electiveCount} Electives)
                </span>
              </h2>
              <p className={styles.sectionSubtext}>
                Every unit of competency is prescribed under the National Training Package to guarantee rigorous workplace proficiency.
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
                  All ({course.units.list.length})
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${unitFilter === 'Core' ? styles.filterActive : ''}`}
                  onClick={() => setUnitFilter('Core')}
                >
                  Core ({course.units.coreCount})
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${unitFilter === 'Elective' ? styles.filterActive : ''}`}
                  onClick={() => setUnitFilter('Elective')}
                >
                  Electives ({course.units.electiveCount})
                </button>
              </div>

              <div className={styles.searchBox}>
                <Search size={16} className={styles.searchIcon} aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search by code or title..."
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
                      Unit Type
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
                      : `View All ${course.units.list.length} Units (${filteredUnits.length - 8} more units)`}
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
                Packaging rules: {course.units.coreCount} Core + {course.units.electiveCount} Electives must be completed for qualification award.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Course Delivery & Schedule - Animated Progression Workflow */}
      <section className={styles.deliverySection} aria-label="Course Delivery and Format">
        <div className={styles.container}>
          <div className={styles.sectionCenterHeader}>
            <div className={styles.sectionEyebrow}>
              <Calendar size={14} aria-hidden="true" />
              <span>Learning Experience</span>
            </div>
            <h2 className={styles.sectionHeading}>Structured Delivery &amp; Study Schedule</h2>
            <p className={styles.sectionSubtext}>
              Engineered for flexibility so students can continue earning while developing accredited skills.
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
                    <span>{course.deliveryDetails.format1Badge}</span>
                  </div>
                </div>

                <h3 className={styles.deliveryCardTitle}>{course.deliveryDetails.format1Title}</h3>
                <p className={styles.deliveryCardText}>
                  {course.deliveryDetails.format1Desc}
                </p>

                <div className={styles.deliveryActivities}>
                  {course.deliveryDetails.format1Activities.map((act) => (
                    <span key={act} className={styles.activityPill}>
                      {act}
                    </span>
                  ))}
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
                    <span>{course.deliveryDetails.format2Badge}</span>
                  </div>
                </div>

                <h3 className={styles.deliveryCardTitle}>{course.deliveryDetails.format2Title}</h3>
                <p className={styles.deliveryCardText}>
                  {course.deliveryDetails.format2Desc}
                </p>

                <div className={styles.hourMetric}>
                  <span className={styles.hourNumber}>{course.deliveryDetails.format2Hours}</span>
                  <span className={styles.hourLabel}>{course.deliveryDetails.format2HoursLabel}</span>
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
                    <span>{course.deliveryDetails.format3Badge}</span>
                  </div>
                </div>

                <h3 className={styles.deliveryCardTitle}>{course.deliveryDetails.format3Title}</h3>
                <p className={styles.deliveryCardText}>
                  {course.deliveryDetails.format3Desc}
                </p>

                <div className={styles.hourMetric}>
                  <span className={styles.hourNumber}>{course.deliveryDetails.format3Hours}</span>
                  <span className={styles.hourLabel}>{course.deliveryDetails.format3HoursLabel}</span>
                </div>
              </div>
            </div>

            {/* Compact Workload Commitment Bar */}
            <div className={styles.workloadStrip}>
              <div className={styles.workloadLeft}>
                <Clock size={16} className={styles.workloadIcon} />
                <span>
                  <strong>Workload Structure:</strong> {course.deliveryDetails.workloadSummary}
                </span>
              </div>
              <span className={styles.workloadBadge}>Flexible Progression</span>
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
                BCTA conducts supportive evaluations to ensure every candidate is matched with the appropriate course.
              </p>

              <div className={styles.requirementsList}>
                <div className={styles.reqItem}>
                  <div className={styles.reqIconWrapper}>
                    <Check size={18} />
                  </div>
                  <div>
                    <h4 className={styles.reqTitle}>Age Requirement</h4>
                    <p className={styles.reqDesc}>{course.entryRequirements.age}</p>
                  </div>
                </div>

                <div className={styles.reqItem}>
                  <div className={styles.reqIconWrapper}>
                    <Check size={18} />
                  </div>
                  <div>
                    <h4 className={styles.reqTitle}>Pre-training Review (PTR)</h4>
                    <p className={styles.reqDesc}>{course.entryRequirements.ptr}</p>
                  </div>
                </div>

                <div className={styles.reqItem}>
                  <div className={styles.reqIconWrapper}>
                    <Check size={18} />
                  </div>
                  <div>
                    <h4 className={styles.reqTitle}>LLND Evaluation</h4>
                    <p className={styles.reqDesc}>{course.entryRequirements.llnd}</p>
                  </div>
                </div>

                {course.entryRequirements.specific && (
                  <div className={styles.reqItem}>
                    <div className={styles.reqIconWrapper}>
                      <Check size={18} />
                    </div>
                    <div>
                      <h4 className={styles.reqTitle}>Course Prerequisites</h4>
                      <p className={styles.reqDesc}>{course.entryRequirements.specific}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Target Audience & Inclusivity Card */}
            <div className={styles.targetAudienceCard}>
              <div className={styles.targetBadge}>
                <Users size={16} />
                <span>Target Audience</span>
              </div>
              <h3 className={styles.targetHeading}>Learner Profile &amp; Inclusivity</h3>
              <p className={styles.targetText}>{course.targetAudience.description}</p>
              <div className={styles.inclusivityNotice}>
                <p>
                  <strong>{course.targetAudience.inclusivity}</strong>
                </p>
              </div>
              <p className={styles.brokerNotice}>{course.targetAudience.brokerNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Fees & Funding Details */}
      <section id="fees-funding" className={styles.feesSection} aria-label="Course Fees and Funding">
        <div className={styles.container}>
          <div className={styles.sectionCenterHeader}>
            <div className={styles.sectionEyebrow}>
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Investment &amp; Subsidies</span>
            </div>
            <h2 className={styles.sectionHeading}>
              Transparent Course Fees &amp; Funding Options
            </h2>
            <p className={styles.sectionSubtext}>
              Nationally accredited vocational training with clear fees and flexible payment schedules.
            </p>
          </div>

          <div className={styles.feesComparisonGrid}>
            {course.feesFunding.subsidised && (
              <div className={`${styles.feeCard} ${styles.feeCardFeatured}`}>
                <div className={styles.feeFeaturedBadge}>South Australia Subsidised</div>
                <span className={styles.feeSchemeTitle}>{course.feesFunding.subsidised.title}</span>
                <div className={styles.priceRow}>
                  <span className={styles.priceAmount}>{course.feesFunding.subsidised.amount}</span>
                  <span className={styles.priceCurrency}>{course.feesFunding.subsidised.currency}</span>
                </div>
                <span className={styles.priceSubtext}>{course.feesFunding.subsidised.subtext}</span>

                <p className={styles.feeSummary}>
                  {course.feesFunding.subsidised.description}
                </p>

                <div className={styles.eligibilityCriteria}>
                  <h4 className={styles.criteriaTitle}>Eligibility Requirements:</h4>
                  <ul className={styles.criteriaList}>
                    {course.feesFunding.subsidised.criteria.map((c, i) => (
                      <li key={i}>
                        <CheckCircle2 size={16} className={styles.criteriaIcon} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.feeCardActions}>
                  {course.feesFunding.subsidised.checkerUrl && (
                    <a
                      href={course.feesFunding.subsidised.checkerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.eligibilityCheckerBtn}
                    >
                      <span>Check Skills SA Eligibility</span>
                      <ExternalLink size={15} />
                    </a>
                  )}

                  <a href="#enquire-form" className={styles.applySubsidisedBtn}>
                    <span>Apply with Subsidised Rate</span>
                  </a>
                </div>
              </div>
            )}

            {/* Non-Government / Full Fee Card */}
            <div className={styles.feeCard}>
              <span className={styles.feeSchemeTitle}>{course.feesFunding.fullFee.title}</span>
              <div className={styles.priceRow}>
                <span className={styles.priceAmount}>{course.feesFunding.fullFee.amount}</span>
                <span className={styles.priceCurrency}>{course.feesFunding.fullFee.currency}</span>
              </div>
              <span className={styles.priceSubtext}>{course.feesFunding.fullFee.subtext}</span>

              <p className={styles.feeSummary}>
                {course.feesFunding.fullFee.description}
              </p>

              <div className={styles.paymentPlansList}>
                {course.feesFunding.fullFee.features.map((feat, i) => (
                  <div key={i} className={styles.planItem}>
                    <CheckCircle2 size={16} className={styles.criteriaIcon} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {course.feesFunding.fullFee.infoline && (
                <div className={styles.helpBox}>
                  <h4 className={styles.helpTitle}>Questions About Fees?</h4>
                  <p className={styles.helpText}>
                    Call BCTA student support on{' '}
                    <a href={`tel:${course.feesFunding.fullFee.infoline.replace(/\s+/g, '')}`} className={styles.infolineLink}>
                      {course.feesFunding.fullFee.infoline}
                    </a>{' '}
                    to discuss payment plans and fee schedules.
                  </p>
                </div>
              )}

              <div className={styles.feeCardActions}>
                <a href="#enquire-form" className={styles.applyFeeForServiceBtn}>
                  <span>Enquire for Payment Plans</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Official Zoho Registration Form: Preselected for this course */}
      <RegisterNowSection
        id="enquire-form"
        initialCourse={course.zohoCourseOption}
        leadSource={course.leadSource}
        stateName={course.stateName}
        stateAddress={course.stateAddress}
      />

      {/* 11. Authentic State Footer (SA or WA) */}
      <Footer currentState={course.state} />

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
              Download {course.code} PDF Guide
            </h3>
            <p className={styles.modalDesc}>
              Receive the complete qualification handbook, full unit breakdown, and fee schedule directly to your inbox.
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
