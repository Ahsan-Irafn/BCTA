import React from 'react';
import { Metadata } from 'next';
import { COURSES_DATA } from '@/lib/content';
import { constructMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CoursesClient from './CoursesClient';
import { ShieldCheck, Award, GraduationCap, CheckCircle } from 'lucide-react';
import styles from './courses.module.css';

export const metadata: Metadata = constructMetadata({
  title: 'Nationally Accredited Building & Construction Courses',
  description:
    'Explore nationally recognised building, carpentry, civil plant, and patisserie qualifications with BCTA (RTO # 22597). Flexible delivery across Victoria, South Australia, and Western Australia.',
  canonical: '/courses',
});

export default function CoursesPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Hero Banner */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Award size={14} aria-hidden="true" />
              <span>Nationally Recognised Training</span>
            </div>
            <h1 className={styles.heroTitle}>
              Industry-Focused Building & Construction Qualifications
            </h1>
            <p className={styles.heroSubtitle}>
              Whether you are aiming for your domestic builder registration, mastering carpentry craftsmanship, or stepping into civil infrastructure operations, BCTA delivers hands-on courses led by seasoned trade professionals.
            </p>

            <div className={styles.trustChips}>
              <div className={styles.trustChip}>
                <ShieldCheck size={16} aria-hidden="true" />
                <span>ASQA Regulated (RTO # 22597)</span>
              </div>
              <div className={styles.trustChip}>
                <GraduationCap size={16} aria-hidden="true" />
                <span>AQF Compliant Qualifications</span>
              </div>
              <div className={styles.trustChip}>
                <CheckCircle size={16} aria-hidden="true" />
                <span>VIC · SA · WA Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Courses', href: '/courses' }]} />

      {/* Interactive Directory */}
      <CoursesClient courses={COURSES_DATA} />
    </div>
  );
}
