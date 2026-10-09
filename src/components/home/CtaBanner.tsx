import React from 'react';
import { SITE_CONFIG } from '@/lib/constants';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './CtaBanner.module.css';

export default function CtaBanner() {
  return (
    <section className={styles.ctaWrapper} aria-label="Course Enquiry and Enrolment Consultation">
      <div className={`container ${styles.ctaInner}`}>
        <div className={styles.ctaBadge}>
          <ShieldCheck size={16} aria-hidden="true" />
          <span>Accredited Vocational Education</span>
        </div>

        <h2 className={styles.ctaTitle}>
          Ready to Step Into Your Next Trade Milestone?
        </h2>

        <p className={styles.ctaSubtitle}>
          Talk directly to our course advisors about qualification prerequisites, regional funding eligibility, and upcoming intake dates in your state.
        </p>

        <div className={styles.buttonGroup}>
          <a
            href="https://bcta.edu.au/south-australia/#enquire"
            className={styles.primaryBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Apply Online Now</span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>

          <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className={styles.phoneBtn}>
            <Phone size={18} aria-hidden="true" />
            <span>Call {SITE_CONFIG.phone}</span>
          </a>
        </div>

        <p className={styles.reassuranceText}>
          No obligation enquiry • RTO # 22597 • Australian Qualifications Framework
        </p>
      </div>
    </section>
  );
}
