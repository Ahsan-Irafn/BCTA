'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight, HelpCircle } from 'lucide-react';
import styles from './MotionFeeCalculator.module.css';

type FundingTier = 'standard' | 'subsidised' | 'concession';

interface FeeRow {
  code: string;
  title: string;
  units: string;
  standardFee: number;
  subsidisedFee: number;
  concessionFee: number;
  slug: string;
}

const COURSES_FEE_DATA: FeeRow[] = [
  {
    code: 'CPC40120',
    title: 'Certificate IV in Building & Construction (Building)',
    units: '19 Units (Inc. 6 Mandatory CBS Units)',
    standardFee: 6500,
    subsidisedFee: 446,
    concessionFee: 175,
    slug: 'certificate-iv-in-building-construction-building-south-australia',
  },
  {
    code: 'CPC50220',
    title: 'Diploma of Building & Construction (Building)',
    units: '27 Units (Medium Rise Structural & Costing)',
    standardFee: 9500,
    subsidisedFee: 1065,
    concessionFee: 395,
    slug: 'diploma-of-building-and-construction-south-australia',
  },
];

/**
 * 21st.dev Component: Interactive Funding & Fee Comparison Calculator
 * Source: https://21st.dev/@shadcn/components/pricing
 * Adapted for Skills SA Subsidised Training comparison (RTO #45145 / 22597).
 */
export default function MotionFeeCalculator() {
  const [tier, setTier] = useState<FundingTier>('subsidised');

  return (
    <div className={styles.calculatorCard}>
      <div className={styles.calculatorHeader}>
        <div>
          <span className={styles.eyebrow}>
            <ShieldCheck size={14} /> Skills SA Funding Schedule
          </span>
          <h3 className={styles.calculatorTitle}>Compare Tuition &amp; Government Subsidies</h3>
          <p className={styles.calculatorSubtitle}>
            See your exact out-of-pocket course contribution fee based on government eligibility criteria.
          </p>
        </div>

        {/* Tier Selector Pills */}
        <div className={styles.pillContainer} role="tablist">
          <button
            type="button"
            className={`${styles.pillBtn} ${tier === 'standard' ? styles.pillBtnActive : ''}`}
            onClick={() => setTier('standard')}
          >
            {tier === 'standard' && (
              <motion.div
                layoutId="feeTierPill"
                className={styles.pillActiveBg}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className={styles.pillText}>Full Fee (No Subsidy)</span>
          </button>

          <button
            type="button"
            className={`${styles.pillBtn} ${tier === 'subsidised' ? styles.pillBtnActive : ''}`}
            onClick={() => setTier('subsidised')}
          >
            {tier === 'subsidised' && (
              <motion.div
                layoutId="feeTierPill"
                className={styles.pillActiveBg}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className={styles.pillText}>
              Skills SA Subsidised <span className={styles.popularBadge}>Most Common</span>
            </span>
          </button>

          <button
            type="button"
            className={`${styles.pillBtn} ${tier === 'concession' ? styles.pillBtnActive : ''}`}
            onClick={() => setTier('concession')}
          >
            {tier === 'concession' && (
              <motion.div
                layoutId="feeTierPill"
                className={styles.pillActiveBg}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
              />
            )}
            <span className={styles.pillText}>Concession Card Holder</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className={styles.feeGrid}>
        {COURSES_FEE_DATA.map((course) => {
          const activePrice =
            tier === 'standard'
              ? course.standardFee
              : tier === 'subsidised'
              ? course.subsidisedFee
              : course.concessionFee;

          const savings = course.standardFee - activePrice;

          return (
            <div key={course.code} className={styles.courseFeeCard}>
              <div className={styles.courseTop}>
                <span className={styles.codeBadge}>{course.code}</span>
                <h4 className={styles.courseHeading}>{course.title}</h4>
                <p className={styles.unitsSub}>{course.units}</p>
              </div>

              <div className={styles.priceContainer}>
                <div className={styles.priceRow}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${course.code}-${tier}`}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={styles.priceNumber}
                    >
                      ${activePrice.toLocaleString()}
                    </motion.div>
                  </AnimatePresence>
                  <span className={styles.priceSuffix}>AUD Student Contribution</span>
                </div>

                {savings > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.savingsBadge}
                  >
                    <Sparkles size={13} />
                    <span>Government saves you ${savings.toLocaleString()}</span>
                  </motion.div>
                )}
              </div>

              <ul className={styles.inclusionsList}>
                <li>
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>Nationally accredited ASQA training</span>
                </li>
                <li>
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>Licensed master builder mentorship</span>
                </li>
                <li>
                  <CheckCircle2 size={15} color="#10b981" />
                  <span>Direct CBS builder licensing alignment</span>
                </li>
              </ul>

              <a href={`/courses/${course.slug}`} className={styles.applyBtn}>
                <span>Check Enrolment Eligibility</span>
                <ArrowRight size={15} />
              </a>
            </div>
          );
        })}
      </div>

      <div className={styles.calculatorFootnote}>
        <HelpCircle size={14} />
        <span>
          *Subsidised fees apply to eligible South Australian citizens, permanent residents, and visa holders enrolled under the Skills SA Subsidised Training List. Additional concessions apply for Services Australia Health Care Card and Pensioner Concession Card holders.
        </span>
      </div>
    </div>
  );
}
