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
import BuildersSlider from '@/components/common/BuildersSlider';
import WhyChooseBcta from '@/components/home/WhyChooseBcta';
import ReviewsSection from '@/components/home/ReviewsSection';
import TrustindexReviews from '@/components/home/TrustindexReviews';
import CareerOutlookSection from '@/components/home/CareerOutlookSection';
import RegisterNowSection from '@/components/home/RegisterNowSection';
import AdelaideLocationSection from '@/components/home/AdelaideLocationSection';
import FaqSection from '@/components/home/FaqSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MotionSpotlightCard from '@/components/ui/MotionSpotlightCard';
import MotionFeeCalculator from '@/components/ui/MotionFeeCalculator';
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
    duration: '36 Weeks Excluding Holidays',
    deliveryMode: 'Face To Face & Virtual Online',
    image: '/images/courses/cpc40120.jpg',
    description:
      'Australia’s benchmark qualification for trade professionals looking to step up into site management or apply for residential builder registration.',
    slug: 'certificate-iv-in-building-construction-building-south-australia',
    externalUrl:
      '/courses/certificate-iv-in-building-construction-building-south-australia',
    careerOutcomes: ['Licensed Builder', 'Site Supervisor', 'Leading Hand'],
  },
  {
    id: 'cpc50220',
    code: 'CPC50220',
    title: 'Diploma of Building and Construction (Building)',
    category: 'Commercial Construction',
    duration: '62 Weeks Excluding Holidays',
    deliveryMode: 'Face To Face & Virtual Online',
    image: '/images/courses/cpc50220.jpg',
    description:
      'Master medium-rise structural engineering, complex contract administration, high-value estimating, and site safety management for senior builder licensing.',
    slug: 'diploma-of-building-and-construction-south-australia',
    externalUrl:
      '/courses/diploma-of-building-and-construction-south-australia',
    careerOutcomes: ['Commercial Builder', 'General Foreperson', 'Building Inspector'],
  },
  {
    id: 'cpc30220',
    code: 'CPC30220',
    title: 'Certificate III in Carpentry',
    category: 'Trade Apprenticeship',
    duration: '36 Months (Apprenticeship)',
    deliveryMode: 'Workshop & On-site',
    image: '/images/courses/cpc30220.jpg',
    description:
      'Hands-on trade qualification covering precision setting out, subfloor framing, pitched roof construction, eaves, doors, and exterior cladding.',
    slug: 'certificate-iii-in-carpentry-south-australia',
    externalUrl:
      '/courses/certificate-iii-in-carpentry-south-australia',
    careerOutcomes: ['Qualified Carpenter', 'Formwork Carpenter', 'Finishing Specialist'],
  },
  {
    id: 'sit40721',
    code: 'SIT40721',
    title: 'Certificate IV in Patisserie',
    category: 'Culinary Arts & Hospitality',
    duration: '60 Weeks (Including 72h Placement)',
    deliveryMode: 'Face-to-Face Commercial Kitchen',
    image: '/images/courses/sit40721.jpg',
    description:
      'Specialist culinary qualification delivering classical gateaux, chocolate artistry, sourdough and Viennoiserie pastries, and kitchen team leadership.',
    slug: 'sit40721-certificate-iv-in-patisserie-south-australia',
    externalUrl:
      '/courses/sit40721-certificate-iv-in-patisserie-south-australia',
    careerOutcomes: ['Chef De Partie', 'Chef Patissier', 'Pastry Supervisor'],
  },
  {
    id: 'rii30820',
    code: 'RII30820',
    title: 'Certificate III in Civil Construction Plant Operations',
    category: 'Heavy Infrastructure',
    duration: '33 Weeks (Including 120h Placement)',
    deliveryMode: 'Classroom & Plant Fleet',
    image: '/images/courses/rii30820.jpg',
    description:
      'Gain hands-on practical competency in operating heavy civil plant machinery including excavators, wheeled loaders, backhoes, and rollers on major projects.',
    slug: 'certificate-iii-in-civil-construction-plant-operations-south-australia',
    externalUrl:
      '/courses/certificate-iii-in-civil-construction-plant-operations-south-australia',
    careerOutcomes: ['Civil Plant Operator', 'Excavator Operator', 'General Hand'],
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      {/* 1. Authentic Header Navigation */}
      <Header currentState={stateKey} />

      {/* 2. Hero Section with Optimized Hero Banner & On-Demand Video */}
      <section className={styles.heroSection} aria-label={`BCTA ${stateName} Hero`}>
        {/* Background Hero Banner Image (LCP Optimized) & Video Container */}
        <div className={styles.videoBackgroundContainer} aria-hidden="true">
          <Image
            src="/images/hero-banner.webp"
            alt="BCTA Construction Training Background"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            className={styles.fallbackPoster}
          />
          {isPlaying && (
            <iframe
              src="https://www.youtube-nocookie.com/embed/MNB4XUPyjWY?autoplay=1&mute=1&loop=1&playlist=MNB4XUPyjWY&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1"
              title="Hero Background Video"
              className={styles.videoIframe}
              allow="autoplay; encrypted-media; picture-in-picture"
              loading="lazy"
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
                <MotionSpotlightCard
                  key={course.id}
                  className={styles.courseCard}
                  spotlightColor="rgba(255, 182, 5, 0.16)"
                >
                  <div className={`${styles.cardImageContainer} ${styles.topCardHeight}`}>
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={580}
                      height={340}
                      className={styles.cardTopImage}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                      <Link
                        href={`/courses/${course.id === 'cpc50220' && stateKey === 'wa' ? 'diploma-of-building-and-construction-western-australia' : course.slug}`}
                        className={styles.viewCourseBtn}
                        aria-label={`View ${course.title} course details`}
                      >
                        <span>View Course</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </MotionSpotlightCard>
              ))}
            </div>

            {/* Row 2: Bottom 3 Staggered Grid Cards */}
            <div className={styles.bottomRowSplit}>
              {bottomCourses.map((course) => (
                <MotionSpotlightCard
                  key={course.id}
                  className={styles.courseCard}
                  spotlightColor="rgba(255, 182, 5, 0.16)"
                >
                  <div className={`${styles.cardImageContainer} ${styles.bottomCardHeight}`}>
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={420}
                      height={260}
                      className={styles.cardTopImage}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                      <Link
                        href={`/courses/${course.id === 'cpc50220' && stateKey === 'wa' ? 'diploma-of-building-and-construction-western-australia' : course.slug}`}
                        className={styles.viewCourseBtn}
                        aria-label={`View ${course.title} course details`}
                      >
                        <span>View Course</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </MotionSpotlightCard>
              ))}
            </div>
          </div>

          {/* Interactive Skills SA Funding & Fee Comparison Calculator (21st.dev Component) */}
          <div style={{ marginTop: '3.5rem' }}>
            <MotionFeeCalculator />
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
                  <Image
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    width={48}
                    height={48}
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

      {/* 6. "Training our next Generation of Builders" Responsive Image Slider */}
      <BuildersSlider />

      {/* 7. "Why study with BCTA" - 3D Interactive Blueprint Section */}
      <WhyChooseBcta />

      {/* 8. "What Our Students Say About Us" - Cinematic Student-Story Gallery */}
      <ReviewsSection />

      {/* 9. "What Students Say About Us" - Verified Google / Trustindex Customer Reviews */}
      <TrustindexReviews />

      {/* 10. "Career Opportunities and Estimated Income" - Animated Architectural Outlook */}
      <CareerOutlookSection />

      {/* 11. "Register Now" - Official Zoho WebToLeadForm Integration */}
      <RegisterNowSection
        stateName={stateName}
        stateAddress={stateAddress}
        leadSource={stateKey === 'wa' ? 'Western Aus Form' : 'South Aus form'}
      />

      {/* 12. "Find Us in Adelaide" Location Section (South Australia Only) */}
      {isSA && <AdelaideLocationSection />}

      {/* 13. Frequently Asked Questions Section */}
      <FaqSection />

      {/* 14. Authentic State Footer (SA or WA) */}
      <Footer currentState={stateKey} />
    </div>
  );
}
