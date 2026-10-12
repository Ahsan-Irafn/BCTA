'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Award,
  Clock,
  ArrowRight,
  Phone,
  Play,
  Pause,
  MapPin,
  CheckCircle,
  Briefcase,
  BookOpen,
  Check,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import EnquiryForm from '@/components/common/EnquiryForm';
import styles from './RegionalStatePage.module.css';

interface RegionalStatePageProps {
  stateKey: 'sa' | 'wa';
}

interface CourseItem {
  id: string;
  code: string;
  title: string;
  category: string;
  duration: string;
  deliveryMode: string;
  image: string;
  description: string;
  slug: string;
  externalUrl: string;
  careerOutcomes: string[];
}

const REGIONAL_COURSES: CourseItem[] = [
  {
    id: 'cpc40120',
    code: 'CPC40120',
    title: 'Certificate IV in Building and Construction (Building)',
    category: 'Building & Construction',
    duration: 'Up to 12 Months',
    deliveryMode: 'Blended Delivery',
    image: '/images/courses/cpc40120.jpg',
    description:
      'Australia’s benchmark qualification for trade professionals looking to step up into site management or apply for residential builder registration.',
    slug: 'certificate-iv-in-building-construction',
    externalUrl:
      'https://bcta.edu.au/courses/certificate-iv-in-building-construction-building-south-australia/',
    careerOutcomes: ['Licensed Builder', 'Site Supervisor', 'Construction Project Coordinator'],
  },
  {
    id: 'cpc50220',
    code: 'CPC50220',
    title: 'Diploma of Building and Construction (Building)',
    category: 'Commercial Construction',
    duration: '1 to 2 Years',
    deliveryMode: 'Classroom & On-site',
    image: '/images/courses/cpc50220.jpg',
    description:
      'Master medium-rise structural engineering, complex contract administration, high-value estimating, and site safety management for senior builder licensing.',
    slug: 'diploma-of-building-and-construction',
    externalUrl:
      'https://bcta.edu.au/courses/diploma-of-building-and-construction-south-australia/',
    careerOutcomes: ['Commercial Builder', 'Construction Manager', 'Head Site Superintendent'],
  },
  {
    id: 'cpc30220',
    code: 'CPC30220',
    title: 'Certificate III in Carpentry',
    category: 'Trade Apprenticeship',
    duration: 'Trade Pathway',
    deliveryMode: 'Workshop & On-site',
    image: '/images/courses/cpc30220.jpg',
    description:
      'Hands-on trade qualification covering precision setting out, subfloor framing, pitched roof construction, eaves, doors, and exterior cladding.',
    slug: 'certificate-iii-in-carpentry',
    externalUrl:
      'https://bcta.edu.au/courses/certificate-iii-in-carpentry-south-australia/',
    careerOutcomes: ['Qualified Carpenter', 'Formwork Carpenter', 'Finishing Specialist'],
  },
  {
    id: 'sit40721',
    code: 'SIT40721',
    title: 'Certificate IV in Patisserie',
    category: 'Culinary Arts & Hospitality',
    duration: '1 to 2 Years',
    deliveryMode: 'Commercial Kitchen',
    image: '/images/courses/sit40721.jpg',
    description:
      'Specialist culinary qualification delivering classical gateaux, chocolate artistry, sourdough and Viennoiserie pastries, and kitchen team leadership.',
    slug: 'sit40721-certificate-iv-in-patisserie',
    externalUrl:
      'https://bcta.edu.au/courses/sit40721-certificate-iv-in-patisserie-south-australia/',
    careerOutcomes: ['Head Pastry Chef', 'Speciality Baker', 'Chocolatier / Confectioner'],
  },
  {
    id: 'rii30820',
    code: 'RII30820',
    title: 'Certificate III in Civil Construction Plant Operations',
    category: 'Heavy Infrastructure',
    duration: '12 to 24 Months',
    deliveryMode: 'Plant Machinery Fleet',
    image: '/images/courses/rii30820.jpg',
    description:
      'Gain hands-on practical competency in operating heavy civil plant machinery including excavators, wheeled loaders, backhoes, and rollers on major projects.',
    slug: 'certificate-iii-in-civil-construction-plant-operations',
    externalUrl:
      'https://bcta.edu.au/courses/certificate-iii-in-civil-construction-plant-operations-south-australia/',
    careerOutcomes: ['Civil Plant Operator', 'Excavator Operator', 'Earthmoving Contractor'],
  },
];

interface WhatYouLearnItem {
  title: string;
  icon: string;
  description: string;
}

const WHAT_YOU_LEARN: WhatYouLearnItem[] = [
  {
    title: 'Building Codes & Compliance',
    icon: '/images/icons/learn-01.png',
    description:
      'Apply Australian building codes, standards, and regulatory requirements used in real construction projects.',
  },
  {
    title: 'Construction Planning & Supervision',
    icon: '/images/icons/learn-02.png',
    description:
      'Plan, coordinate, and supervise building activities, site operations, and trades effectively.',
  },
  {
    title: 'Work Health & Safety (WHS)',
    icon: '/images/icons/learn-03.png',
    description:
      'Identify hazards and apply WHS systems to maintain safe and compliant construction sites.',
  },
  {
    title: 'Plans, Documentation & Communication',
    icon: '/images/icons/learn-04.png',
    description:
      'Read and interpret drawings, specifications, and contracts while communicating professionally with industry stakeholders.',
  },
];

export default function RegionalStatePage({ stateKey }: RegionalStatePageProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const isSA = stateKey === 'sa';
  const stateName = isSA ? 'South Australia' : 'Western Australia';
  const stateShort = isSA ? 'SA' : 'WA';
  const stateAddress = isSA ? SITE_CONFIG.addresses.sa : SITE_CONFIG.addresses.wa;
  const regulatorName = isSA
    ? 'Consumer & Business Services (CBS SA)'
    : 'Building Commission WA';

  // Split courses for balanced editorial presentation:
  // Top 2: High-impact horizontal split (Building Cert IV + Building Diploma)
  // Bottom 3: 3-column trade & specialization grid (Carpentry, Patisserie, Civil Plant)
  const topCourses = REGIONAL_COURSES.slice(0, 2);
  const bottomCourses = REGIONAL_COURSES.slice(2);

  return (
    <div className={styles.pageWrapper}>
      {/* 1. Header Navigation */}
      <header className={styles.topNav}>
        <div className={`container ${styles.navContainer}`}>
          <div className={styles.logoGroup}>
            <Link href="/" className={styles.logoLink} aria-label="BCTA Home">
              <Image
                src="/images/logo.png"
                alt="BCTA - Building & Construction Training Australia"
                width={150}
                height={48}
                priority
              />
            </Link>
            <span className={styles.stateTag}>
              <MapPin size={12} aria-hidden="true" />
              <span>{stateName} Portal</span>
            </span>
          </div>

          <div className={styles.navActions}>
            <div className={styles.stateSwitcher} aria-label="State selector">
              <Link
                href="/south-australia"
                className={`${styles.switchLink} ${isSA ? styles.switchLinkActive : ''}`}
              >
                SA
              </Link>
              <Link
                href="/western-australia"
                className={`${styles.switchLink} ${!isSA ? styles.switchLinkActive : ''}`}
              >
                WA
              </Link>
              <Link href="https://www.bcta.vic.edu.au/home/" className={styles.switchLink}>
                VIC ↗
              </Link>
            </div>

            <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className={styles.phoneLink}>
              <Phone size={14} aria-hidden="true" />
              <span>{SITE_CONFIG.phone}</span>
            </a>

            <a
              href="https://bcta.edu.au/south-australia/#enquire"
              className={styles.enquireBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with YouTube Background Video (Reduced 20% Overlay) */}
      <section className={styles.heroSection} aria-label={`BCTA ${stateName} Hero`}>
        {/* Background YouTube Video Embed */}
        <div className={styles.videoBackgroundContainer} aria-hidden="true">
          {isPlaying ? (
            <iframe
              src="https://www.youtube-nocookie.com/embed/MNB4XUPyjWY?autoplay=1&mute=1&loop=1&playlist=MNB4XUPyjWY&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1"
              title="Hero Background Video"
              className={styles.videoIframe}
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          ) : (
            <Image
              src="/images/hero-banner.webp"
              alt="BCTA Construction Training Background"
              fill
              priority
              className={styles.fallbackPoster}
            />
          )}
        </div>

        {/* Reduced 20% overlay for vivid video visibility */}
        <div className={styles.heroDarkOverlay} aria-hidden="true" />

        {/* Hero Content */}
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <ShieldCheck size={16} aria-hidden="true" />
            <span>RTO # 22597 · ASQA Regulated Vocational Education</span>
          </div>

          <h1 className={styles.heroTitle}>
            Building and Construction Courses
            <span className={styles.heroAccentLine}>in {stateName}</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Gain nationally recognised qualifications led by licensed Australian trade
            professionals. Tailored flexible delivery, employer traineeships, and direct pathways to
            trade licensing across {stateName}.
          </p>

          <div className={styles.heroCtas}>
            <a href="#courses" className={styles.primaryCta}>
              <span>Explore 5 Accredited Qualifications</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>

            <a
              href="https://bcta.edu.au/south-australia/#enquire"
              className={styles.secondaryCta}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Check Eligibility & Subsidies</span>
            </a>
          </div>
        </div>

        {/* Play/Pause Video Toggle Button */}
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className={styles.videoControlBtn}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
        >
          {isPlaying ? (
            <>
              <Pause size={13} aria-hidden="true" />
              <span>Pause Motion</span>
            </>
          ) : (
            <>
              <Play size={13} aria-hidden="true" />
              <span>Play Video</span>
            </>
          )}
        </button>
      </section>

      {/* 3. Quick Trust Strip */}
      <section className={styles.trustStrip} aria-label="Key Accreditations">
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <div className={styles.trustIconBox}>
                <ShieldCheck size={22} aria-hidden="true" />
              </div>
              <div>
                <h4 className={styles.trustTextTitle}>National ASQA Regulated</h4>
                <p className={styles.trustTextSub}>RTO # 22597 Provider</p>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIconBox}>
                <Award size={22} aria-hidden="true" />
              </div>
              <div>
                <h4 className={styles.trustTextTitle}>Nationally Recognised</h4>
                <p className={styles.trustTextSub}>Accredited Australian Training</p>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIconBox}>
                <CheckCircle size={22} aria-hidden="true" />
              </div>
              <div>
                <h4 className={styles.trustTextTitle}>{regulatorName}</h4>
                <p className={styles.trustTextSub}>Licensing Criteria Aligned</p>
              </div>
            </div>

            <div className={styles.trustItem}>
              <div className={styles.trustIconBox}>
                <Clock size={22} aria-hidden="true" />
              </div>
              <div>
                <h4 className={styles.trustTextTitle}>Flexible Delivery</h4>
                <p className={styles.trustTextSub}>Blended Evening & Weekend</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Editorial Course Section (With AQF Level Removed) */}
      <section id="courses" className={styles.coursesSection} aria-label="Available Qualifications">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <Briefcase size={15} aria-hidden="true" />
              <span>Available Qualifications in {stateShort}</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Industry-Leading Trade & Supervisory Qualifications
            </h2>
            <p className={styles.sectionDesc}>
              Structured learning pathways designed for ambitious tradespeople, carpenters, and
              aspiring licensed builders. Explore all 5 courses below:
            </p>
          </div>

          <div className={styles.editorialLayout}>
            {/* Row 1: Top 2 Horizontal Split Feature Cards */}
            <div className={styles.topRowSplit}>
              {topCourses.map((course) => (
                <article key={course.id} className={styles.courseCard}>
                  <div className={`${styles.cardImageContainer} ${styles.topCardHeight}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className={styles.cardTopImage}
                      loading="eager"
                    />
                    <div className={styles.imageGradientVignette} />
                    <span className={styles.floatingCodeBadge}>{course.code}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <div>
                      <div className={styles.cardCategory}>{course.category}</div>
                      <h3 className={styles.cardTitle}>{course.title}</h3>
                      <p className={styles.cardDescription}>{course.description}</p>
                    </div>

                    <div>
                      <div className={styles.cardMetaRow}>
                        <span className={styles.metaItem}>
                          <Clock size={14} aria-hidden="true" />
                          <span>{course.duration}</span>
                        </span>
                        <span className={styles.metaItem}>
                          <Award size={14} aria-hidden="true" />
                          <span>{course.deliveryMode}</span>
                        </span>
                      </div>

                      <div className={styles.outcomesRow}>
                        {course.careerOutcomes.map((outcome) => (
                          <span key={outcome} className={styles.outcomeTag}>
                            {outcome}
                          </span>
                        ))}
                      </div>

                      <Link href={`/courses/${course.slug}`} className={styles.viewCourseBtn}>
                        <span>View Course</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Row 2: Bottom 3 Staggered Grid Cards */}
            <div className={styles.bottomRowSplit}>
              {bottomCourses.map((course) => (
                <article key={course.id} className={styles.courseCard}>
                  <div className={`${styles.cardImageContainer} ${styles.bottomCardHeight}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className={styles.cardTopImage}
                      loading="eager"
                    />
                    <div className={styles.imageGradientVignette} />
                    <span className={styles.floatingCodeBadge}>{course.code}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <div>
                      <div className={styles.cardCategory}>{course.category}</div>
                      <h3 className={styles.cardTitle}>{course.title}</h3>
                      <p className={styles.cardDescription}>{course.description}</p>
                    </div>

                    <div>
                      <div className={styles.cardMetaRow}>
                        <span className={styles.metaItem}>
                          <Clock size={14} aria-hidden="true" />
                          <span>{course.duration}</span>
                        </span>
                        <span className={styles.metaItem}>
                          <Award size={14} aria-hidden="true" />
                          <span>{course.deliveryMode}</span>
                        </span>
                      </div>

                      <div className={styles.outcomesRow}>
                        {course.careerOutcomes.map((outcome) => (
                          <span key={outcome} className={styles.outcomeTag}>
                            {outcome}
                          </span>
                        ))}
                      </div>

                      <Link href={`/courses/${course.slug}`} className={styles.viewCourseBtn}>
                        <span>View Course</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. "What You'll Learn" Section (4 Balanced Columns with Hover & Animations) */}
      <section className={styles.whatYoullLearnSection} aria-label="What You'll Learn">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <BookOpen size={15} aria-hidden="true" />
              <span>Course Syllabus & Practical Outcomes</span>
            </div>
            <h2 className={styles.sectionTitle}>What You&apos;ll Learn</h2>
            <p className={styles.sectionDesc}>
              Practical knowledge, technical proficiency, and Australian regulatory competency built
              directly into your curriculum.
            </p>
          </div>

          <div className={styles.learnGrid}>
            {WHAT_YOU_LEARN.map((item, index) => (
              <div key={index} className={styles.learnCard}>
                <div className={styles.learnIconWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt={item.title}
                    className={styles.learnIconImg}
                    loading="lazy"
                  />
                </div>
                <h3 className={styles.learnTitle}>{item.title}</h3>
                <p className={styles.learnDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Regional Campus & Consultation Details */}
      <section className={styles.stateDetailSection} aria-label="Campus and Enrolment Info">
        <div className="container">
          <div className={styles.stateGrid}>
            <div className={styles.stateInfoBox}>
              <h3>Study Locally in {stateName}</h3>
              <p>
                BCTA offers accredited face-to-face workshops and virtual tutorial sessions tailored
                for working trades across {stateName}. Training hubs are equipped with industry-grade
                materials, estimating software, and dedicated trainers with decades of on-site building
                experience.
              </p>

              <ul className={styles.featureList}>
                <li className={styles.featureListItem}>
                  <Check size={18} aria-hidden="true" />
                  <span>
                    <strong>Training Facility:</strong> {stateAddress}
                  </span>
                </li>
                <li className={styles.featureListItem}>
                  <Check size={18} aria-hidden="true" />
                  <span>
                    <strong>Licensing Authority Alignment:</strong> Fully compliant curriculum matching{' '}
                    {regulatorName} builder licensing evidence guidelines.
                  </span>
                </li>
                <li className={styles.featureListItem}>
                  <Check size={18} aria-hidden="true" />
                  <span>
                    <strong>Trade Recognition (RPL):</strong> Fast-track your qualification using prior
                    on-site construction experience.
                  </span>
                </li>
              </ul>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}
                  className={styles.enquireBtn}
                  style={{ display: 'inline-flex' }}
                >
                  <Phone size={16} aria-hidden="true" />
                  <span>Speak to a {stateShort} Advisor</span>
                </a>
              </div>
            </div>

            <div className={styles.consultBox}>
              <h3 className={styles.consultTitle}>Enrol in {stateName}</h3>
              <p className={styles.consultSubtitle}>
                Request course info packs, timetable options, or eligibility assessments for upcoming cohorts.
              </p>
              <EnquiryForm
                initialState={stateShort}
                title={`Fast-Track Your Enrolment in ${stateShort}`}
                subtitle="Fill in your details below and a BCTA advisor will contact you within 1 business day."
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Regional Footer */}
      <footer className={styles.regionalFooter}>
        <div className="container">
          <div className={styles.footerTop}>
            <Image
              src="/images/logo.png"
              alt="BCTA Logo"
              width={140}
              height={45}
            />
            <div className={styles.footerRto}>
              <strong>RTO # 22597</strong> · Building and Construction Training Australia ({stateName} Division)
            </div>
          </div>
          <div className={styles.footerCopy}>
            © 2026 Building and Construction Training Australia (BCTA). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
