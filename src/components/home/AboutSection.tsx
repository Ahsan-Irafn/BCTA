import React from 'react';
import Image from 'next/image';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import styles from './AboutSection.module.css';

export default function AboutSection() {
  return (
    <section className={styles.aboutSection} aria-label="About BCTA">
      <div className="container">
        <div className={styles.aboutGrid}>
          {/* Left Column: Text */}
          <div className={styles.aboutContent}>
            <span className="section-badge" style={{ alignSelf: 'flex-start' }}>About BCTA</span>
            <h2 className={styles.aboutTitle}>
              Empowering Australia’s Future Builders & Trades Leaders
            </h2>

            <p className={styles.leadParagraph}>
              Building and Construction Training Australia (BCTA) is a Registered Training Organisation (RTO # 22597) dedicated to delivering real-world vocational training.
            </p>

            <p className={styles.bodyParagraph}>
              Whether you are an apprentice taking your first trade steps, an experienced carpenter seeking a builder’s licence, or looking to transition into construction management, BCTA provides the accredited structure, mentor guidance, and practical workshops you need to succeed.
            </p>

            <ul className={styles.highlightsList}>
              <li className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.highlightIcon} aria-hidden="true" />
                <span className={styles.highlightText}>
                  Nationally recognized qualifications accredited under the Australian Qualifications Framework (AQF).
                </span>
              </li>
              <li className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.highlightIcon} aria-hidden="true" />
                <span className={styles.highlightText}>
                  Dedicated training sites and practical workshops simulating real job-site scenarios.
                </span>
              </li>
              <li className={styles.highlightItem}>
                <CheckCircle2 size={18} className={styles.highlightIcon} aria-hidden="true" />
                <span className={styles.highlightText}>
                  Trainers who are active licensed builders and seasoned trade veterans.
                </span>
              </li>
            </ul>

            <div style={{ marginTop: '1rem' }}>
              <a
                href="https://bcta.edu.au/about-us-south-australia/"
                className="section-badge"
                style={{ textTransform: 'none', background: 'var(--color-primary)', color: '#ffffff', borderColor: 'var(--color-primary)', padding: '0.75rem 1.5rem' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Read More About Our Approach</span>
                <ArrowRight size={14} style={{ marginLeft: 6 }} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Authentic Image */}
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/hero-banner.webp"
                alt="BCTA instructors and students at real construction training facility"
                width={700}
                height={520}
                className={styles.imageFrame}
              />
            </div>

            <div className={styles.floatingExperienceCard}>
              <span className={styles.expNumber}>RTO 22597</span>
              <p className={styles.expLabel}>
                Registered under the Australian Skills Quality Authority (ASQA)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
