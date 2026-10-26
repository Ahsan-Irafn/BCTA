'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MotionSpotlightCard from '@/components/ui/MotionSpotlightCard';
import MotionFeeCalculator from '@/components/ui/MotionFeeCalculator';
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  DollarSign,
  Award,
  Phone,
  FileCheck,
  Layers,
  Search,
} from 'lucide-react';
import styles from './FundingPage.module.css';

const ELIGIBLE_VISAS = [
  { code: '491', name: 'Skilled Work Regional (Provisional)' },
  { code: '489', name: 'Skilled Regional (Provisional)' },
  { code: '494', name: 'Skilled Employer Sponsored Regional' },
  { code: '820 & 309', name: 'Partner (Provisional / Temporary)' },
  { code: '785', name: 'Safe Haven Enterprise Visa (SHEV)' },
  { code: '790', name: 'Temporary Protection Visa (TPV)' },
  { code: '786', name: 'Temporary (Humanitarian Concern)' },
  { code: '475 & 487', name: 'Skilled Regional Sponsored' },
  { code: '495 & 187', name: 'Regional Sponsored Migration Scheme' },
];

export default function FundingPage() {
  const [livesInSA, setLivesInSA] = useState<boolean | null>(true);
  const [visaStatus, setVisaStatus] = useState<string>('citizen');
  const [isAgeValid, setIsAgeValid] = useState<boolean | null>(true);

  const isEligible =
    livesInSA === true &&
    (visaStatus === 'citizen' || visaStatus === 'pr' || visaStatus === 'eligible_visa') &&
    isAgeValid === true;

  return (
    <div className={styles.pageWrapper}>
      <Header currentState="sa" />

      {/* =========================================================================
         1. HERO SECTION (Authoritative Skills SA Subsidised Training)
         ========================================================================= */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/south-australia" className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive}>
              Government Subsidised Training (South Australia)
            </span>
          </nav>

          <div className={styles.heroGrid}>
            {/* Left Column: Text & Badges */}
            <div className={styles.heroTextCol}>
              <div className={styles.badgeGroup}>
                <span className={styles.rtoBadge}>
                  <ShieldCheck size={14} color="#ffb605" />
                  Skills SA Contracted RTO #45145
                </span>
                <span className={styles.stateBadge}>
                  <Award size={14} />
                  Subsidised Training List Approved
                </span>
              </div>

              <h1 className={styles.heroTitle}>
                Skills SA Subsidised Training for <br />
                <span className={styles.heroTitleAccent}>Building &amp; Construction</span>
              </h1>

              <p className={styles.heroLead}>
                Eligible South Australians and qualifying visa holders can access heavily subsidised tuition fees for nationally accredited building courses. Pay only the designated student contribution fee: <strong>$446*</strong> for a Certificate IV or <strong>$1,065*</strong> for a Diploma.
              </p>

              <div className={styles.heroActions}>
                <a href="#eligibility-checker" className={styles.primaryCta}>
                  <span>Check Your Eligibility</span>
                  <ArrowRight size={16} />
                </a>
                <a href="#funded-courses" className={styles.ghostCta}>
                  <span>View Subsidised Fees</span>
                  <DollarSign size={15} color="#ffb605" />
                </a>
              </div>
            </div>

            {/* Right Column: Structured Funding Matrix Card */}
            <div className={styles.heroMatrixCard}>
              <div className={styles.matrixCardHeader}>
                <div className={styles.matrixLabel}>Subsidised Contribution Fees</div>
                <h3 className={styles.matrixTitle}>Skills SA Funded Intake</h3>
              </div>

              <ul className={styles.matrixRows}>
                <li className={styles.matrixRowItem}>
                  <div>
                    <div className={styles.matrixCourseName}>Certificate IV in Building &amp; Construction</div>
                    <div className={styles.matrixCourseCode}>CPC40120 | 19 Units (Inc. 6 CBS Units)</div>
                  </div>
                  <div className={styles.matrixPriceCol}>
                    <div className={styles.matrixFee}>$446*</div>
                    <span className={styles.matrixFeeOriginal}>$6,500+ standard</span>
                  </div>
                </li>

                <li className={styles.matrixRowItem}>
                  <div>
                    <div className={styles.matrixCourseName}>Diploma of Building &amp; Construction</div>
                    <div className={styles.matrixCourseCode}>CPC50220 | 27 Units (Medium Rise)</div>
                  </div>
                  <div className={styles.matrixPriceCol}>
                    <div className={styles.matrixFee}>$1,065*</div>
                    <span className={styles.matrixFeeOriginal}>$9,500+ standard</span>
                  </div>
                </li>
              </ul>

              <p className={styles.matrixFootnote}>
                *Student contribution fees apply to eligible South Australian residents. Concession card holders may be eligible for further fee reductions or waivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. INTERACTIVE DIAGNOSTIC ELIGIBILITY CHECKER
         ========================================================================= */}
      <section className={styles.checkerSection} id="eligibility-checker">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <Search size={14} /> Diagnostic Assessment
            </div>
            <h2 className={styles.sectionTitle}>Are You Eligible for Skills SA Funding?</h2>
            <p className={styles.sectionSubtext}>
              Answer the three eligibility criteria below to check if you qualify for state government course subsidies.
            </p>
          </div>

          <div className={styles.checkerCard}>
            <div className={styles.checkerQuestionsGrid}>
              {/* Question 1 */}
              <div className={styles.questionBlock}>
                <div className={styles.questionTitle}>
                  <span className={styles.questionNumber}>1</span>
                  <span>Do you currently live or work in South Australia?</span>
                </div>
                <div className={styles.optionsRow}>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${livesInSA === true ? styles.optionBtnActive : ''}`}
                    onClick={() => setLivesInSA(true)}
                  >
                    Yes, I live or work in SA
                  </button>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${livesInSA === false ? styles.optionBtnActive : ''}`}
                    onClick={() => setLivesInSA(false)}
                  >
                    No, interstate
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div className={styles.questionBlock}>
                <div className={styles.questionTitle}>
                  <span className={styles.questionNumber}>2</span>
                  <span>What is your citizenship or residency status?</span>
                </div>
                <div className={styles.optionsRow}>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${visaStatus === 'citizen' ? styles.optionBtnActive : ''}`}
                    onClick={() => setVisaStatus('citizen')}
                  >
                    Australian / NZ Citizen
                  </button>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${visaStatus === 'pr' ? styles.optionBtnActive : ''}`}
                    onClick={() => setVisaStatus('pr')}
                  >
                    Permanent Resident
                  </button>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${visaStatus === 'eligible_visa' ? styles.optionBtnActive : ''}`}
                    onClick={() => setVisaStatus('eligible_visa')}
                  >
                    Eligible Visa (e.g. 491, 489, 494)
                  </button>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${visaStatus === 'other' ? styles.optionBtnActive : ''}`}
                    onClick={() => setVisaStatus('other')}
                  >
                    Other Visa Class
                  </button>
                </div>
              </div>

              {/* Question 3 */}
              <div className={styles.questionBlock}>
                <div className={styles.questionTitle}>
                  <span className={styles.questionNumber}>3</span>
                  <span>Are you 18 years or older and not currently enrolled in secondary school?</span>
                </div>
                <div className={styles.optionsRow}>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${isAgeValid === true ? styles.optionBtnActive : ''}`}
                    onClick={() => setIsAgeValid(true)}
                  >
                    Yes, 18+ and finished school
                  </button>
                  <button
                    type="button"
                    className={`${styles.optionBtn} ${isAgeValid === false ? styles.optionBtnActive : ''}`}
                    onClick={() => setIsAgeValid(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            {/* Diagnostic Result */}
            <div
              className={`${styles.checkerResultBox} ${isEligible ? styles.resultEligible : styles.resultReview}`}
            >
              <div className={styles.resultIconBox}>
                {isEligible ? <CheckCircle2 size={28} /> : <HelpCircle size={28} />}
              </div>
              <div className={styles.resultContent}>
                <h4>
                  {isEligible
                    ? 'Eligible for Skills SA Funding'
                    : 'Personalised Review Recommended'}
                </h4>
                <p>
                  {isEligible
                    ? 'You meet the primary criteria for government subsidised training in South Australia. Complete the Upfront Assessment of Need (UAN) to confirm your enrolment place.'
                    : 'You may still qualify under special visa categories or fee-for-service payment plans. Contact our Adelaide course advisors for a full assessment.'}
                </p>
                <Link
                  href={isEligible ? '/enrol-south-australia#enrol-form' : '/contact-us-south-australia'}
                  className={styles.resultCtaBtn}
                >
                  <span>{isEligible ? 'Apply For Funded Place' : 'Speak with an Advisor'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. FUNDED COURSES & FEES COMPARISON
         ========================================================================= */}
      <section className={styles.coursesSection} id="funded-courses">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <DollarSign size={14} /> Course Fee Schedule
            </div>
            <h2 className={styles.sectionTitle}>Subsidised Qualification Fees in SA</h2>
            <p className={styles.sectionSubtext}>
              Courses delivered with funding support from the Government of South Australia.
            </p>
          </div>

          {/* 21st.dev Interactive Fee Comparison Calculator */}
          <div style={{ marginBottom: '3.5rem' }}>
            <MotionFeeCalculator />
          </div>

          <div className={styles.coursesGrid}>
            {/* Certificate IV Card */}
            <MotionSpotlightCard className={styles.courseCard} spotlightColor="rgba(255, 182, 5, 0.16)">
              <span className={styles.courseCardBadge}>Licensing Pathway</span>
              <h3 className={styles.courseCardTitle}>
                Certificate IV in Building &amp; Construction (Building)
              </h3>
              <div className={styles.courseCardCode}>Course Code: CPC40120 | 19 Nationally Recognised Units</div>

              <div className={styles.pricingBlock}>
                <div className={styles.priceLabel}>Student Contribution Fee</div>
                <div className={styles.priceValueRow}>
                  <span className={styles.priceAmount}>$446*</span>
                  <span className={styles.priceOriginal}>$6,500+ standard</span>
                </div>
                <p className={styles.priceAsteriskNote}>
                  *For eligible South Australian residents via Skills SA subsidised funding.
                </p>
              </div>

              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>Includes 6 CBS Business Units:</strong> Fulfills the mandatory business criteria for the SA Building Work Contractor Licence.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>Flexible Evening Delivery:</strong> Blended live webinars and hands-on site review suited to working tradespeople.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>Nationally Recognised:</strong> AQF Level 4 accredited qualification.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>Practitioner Trainers:</strong> Led by active Australian licensed builders.
                  </span>
                </li>
              </ul>

              <Link
                href="/courses/certificate-iv-in-building-construction-building-south-australia"
                className={styles.courseCardCta}
              >
                <span>View Full Course Syllabus</span>
                <ArrowRight size={15} />
              </Link>
            </MotionSpotlightCard>

            {/* Diploma Card */}
            <MotionSpotlightCard className={styles.courseCard} spotlightColor="rgba(255, 182, 5, 0.16)">
              <span className={styles.courseCardBadge}>Medium Rise Qualification</span>
              <h3 className={styles.courseCardTitle}>
                Diploma of Building &amp; Construction (Building)
              </h3>
              <div className={styles.courseCardCode}>Course Code: CPC50220 | 27 Nationally Recognised Units</div>

              <div className={styles.pricingBlock}>
                <div className={styles.priceLabel}>Student Contribution Fee</div>
                <div className={styles.priceValueRow}>
                  <span className={styles.priceAmount}>$1,065*</span>
                  <span className={styles.priceOriginal}>$9,500+ standard</span>
                </div>
                <p className={styles.priceAsteriskNote}>
                  *For eligible South Australian residents via Skills SA subsidised funding.
                </p>
              </div>

              <ul className={styles.featuresList}>
                <li className={styles.featureItem}>
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>Medium Rise Supervision:</strong> Covers structural engineering principles and site management up to 3 storeys.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>Commercial Contracts &amp; Costing:</strong> Complete building contract administration and legal compliance.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>Executive Trade Career:</strong> Prepares site supervisors, estimators, and registered general builders.
                  </span>
                </li>
                <li className={styles.featureItem}>
                  <CheckCircle2 size={16} />
                  <span>
                    <strong>Up to 85% Subsidised:</strong> Save over $8,400 in direct tuition costs under Skills SA.
                  </span>
                </li>
              </ul>

              <Link
                href="/courses/diploma-of-building-and-construction-south-australia"
                className={styles.courseCardCta}
              >
                <span>View Full Course Syllabus</span>
                <ArrowRight size={15} />
              </Link>
            </MotionSpotlightCard>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. UPFRONT ASSESSMENT OF NEED (UAN)
         ========================================================================= */}
      <section className={styles.uanSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <FileCheck size={14} color="#ffb605" /> Skills SA Standard
            </div>
            <h2 className={styles.sectionTitle} style={{ color: '#ffffff' }}>
              The Upfront Assessment of Need (UAN)
            </h2>
            <p className={styles.sectionSubtext} style={{ color: '#cbd5e1' }}>
              All students seeking state subsidised training complete a 3-part assessment to ensure academic suitability and identify learning support.
            </p>
          </div>

          <div className={styles.uanGrid}>
            <div className={styles.uanCard}>
              <div className={styles.uanCardNumber}>01</div>
              <h3 className={styles.uanCardTitle}>Suitability &amp; Support Needs</h3>
              <p className={styles.uanCardDesc}>
                We evaluate your career goals, device access, and study timetable to arrange tailored academic support before training commences.
              </p>
            </div>

            <div className={styles.uanCard}>
              <div className={styles.uanCardNumber}>02</div>
              <h3 className={styles.uanCardTitle}>ACER CSPA LLN Assessment</h3>
              <p className={styles.uanCardDesc}>
                Administered via the Australian Council for Educational Research (ACER) Core Skills Profile for Adults tool to benchmark reading and numeracy.
              </p>
            </div>

            <div className={styles.uanCard}>
              <div className={styles.uanCardNumber}>03</div>
              <h3 className={styles.uanCardTitle}>Pre-Training Review</h3>
              <p className={styles.uanCardDesc}>
                A structured interview with an academic advisor to review prior trade experience, assess Credit Transfer / RPL, and finalize course units.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. 6-STEP SUBMITTED ENROLMENT JOURNEY
         ========================================================================= */}
      <section className={styles.pathwaySection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <Layers size={14} /> Admissions Journey
            </div>
            <h2 className={styles.sectionTitle}>Your 6-Step Subsidised Enrolment Process</h2>
            <p className={styles.sectionSubtext}>
              How to secure your state subsidised training place with BCTA in South Australia.
            </p>
          </div>

          <div className={styles.timelineGrid}>
            <div className={styles.timelineCard}>
              <span className={styles.stepBadge}>Step 01</span>
              <h3 className={styles.timelineTitle}>Enquire Online</h3>
              <p className={styles.timelineDesc}>
                Submit an enquiry online or call our Adelaide office to register for the upcoming subsidised intake.
              </p>
            </div>

            <div className={styles.timelineCard}>
              <span className={styles.stepBadge}>Step 02</span>
              <h3 className={styles.timelineTitle}>Document Verification</h3>
              <p className={styles.timelineDesc}>
                Provide proof of South Australian residency (driver licence/utility bill) and citizenship or visa documents.
              </p>
            </div>

            <div className={styles.timelineCard}>
              <span className={styles.stepBadge}>Step 03</span>
              <h3 className={styles.timelineTitle}>UAN &amp; ACER CSPA</h3>
              <p className={styles.timelineDesc}>
                Complete the online Upfront Assessment of Need and literacy &amp; numeracy benchmarking via ACER.
              </p>
            </div>

            <div className={styles.timelineCard}>
              <span className={styles.stepBadge}>Step 04</span>
              <h3 className={styles.timelineTitle}>Pre-Training Review</h3>
              <p className={styles.timelineDesc}>
                Review your prior trade experience, confirm credit transfers, and verify your licensing pathway.
              </p>
            </div>

            <div className={styles.timelineCard}>
              <span className={styles.stepBadge}>Step 05</span>
              <h3 className={styles.timelineTitle}>Confirm Enrolment</h3>
              <p className={styles.timelineDesc}>
                Finalise your enrolment, pay the low subsidised student contribution fee ($446 or $1,065), and receive course materials.
              </p>
            </div>

            <div className={styles.timelineCard}>
              <span className={styles.stepBadge}>Step 06</span>
              <h3 className={styles.timelineTitle}>Commence Training</h3>
              <p className={styles.timelineDesc}>
                Begin classes with experienced licensed master builders and work towards your builder licence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. ELIGIBLE VISAS DIRECTORY
         ========================================================================= */}
      <section className={styles.visasSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <Award size={14} /> Visa Categories
            </div>
            <h2 className={styles.sectionTitle}>Eligible Temporary &amp; Provisional Visas</h2>
            <p className={styles.sectionSubtext}>
              Holders of the following visa subclasses may qualify for Skills SA subsidised training in South Australia:
            </p>
          </div>

          <div className={styles.visasCloud}>
            {ELIGIBLE_VISAS.map((visa) => (
              <div key={visa.code} className={styles.visaTag}>
                <span className={styles.visaCode}>Subclass {visa.code}</span>
                <span className={styles.visaName}>{visa.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         7. HIGH-IMPACT CTA BANNER
         ========================================================================= */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to Secure Your Subsidised Place?</h2>
            <p className={styles.ctaText}>
              Subsidised allocations under the Skills SA Subsidised Training List are subject to state funding availability. Contact our Adelaide course advisory team today to check available places.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/enrol-south-australia#enrol-form" className={styles.ctaPrimaryBtn}>
                <span>Apply for South Australia Enrolment</span>
                <ArrowRight size={16} />
              </Link>
              <a href="tel:1300112282" className={styles.ctaCallBtn}>
                <Phone size={16} color="#ffb605" />
                <span>Call Adelaide: 1300 11 2282</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer currentState="sa" />
    </div>
  );
}
