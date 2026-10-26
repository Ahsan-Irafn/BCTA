'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { COURSES_DATA } from '@/lib/content';
import { RegionCode } from '@/lib/types';
import { Check, ArrowRight, Clock } from 'lucide-react';
import styles from './FeaturedCourses.module.css';

type FilterType = 'all' | RegionCode;

export default function FeaturedCourses() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredCourses = COURSES_DATA.filter((course) => {
    if (activeFilter === 'all') return true;
    return course.regions.includes(activeFilter);
  });

  return (
    <section id="featured-courses" className={styles.coursesSection} aria-label="Featured Courses and Training Pathways">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Accredited Training</span>
          <h2 className="section-title">Nationally Recognised Qualifications</h2>
          <p className="section-description">
            Industry-designed courses created to empower carpenters, supervisors, and builders to achieve their professional licensing goals.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs} role="tablist" aria-label="Course state filter">
          <button
            role="tab"
            aria-selected={activeFilter === 'all'}
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Qualifications
          </button>
          <button
            role="tab"
            aria-selected={activeFilter === 'vic'}
            className={`${styles.filterBtn} ${activeFilter === 'vic' ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter('vic')}
          >
            Victoria
          </button>
          <button
            role="tab"
            aria-selected={activeFilter === 'sa'}
            className={`${styles.filterBtn} ${activeFilter === 'sa' ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter('sa')}
          >
            South Australia
          </button>
          <button
            role="tab"
            aria-selected={activeFilter === 'wa'}
            className={`${styles.filterBtn} ${activeFilter === 'wa' ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter('wa')}
          >
            Western Australia
          </button>
        </div>

        {/* Courses Grid */}
        <div className={styles.coursesGrid}>
          {filteredCourses.map((course) => (
            <article key={course.id} className={styles.courseCard}>
              <div className={styles.cardTop}>
                <span className={styles.courseCode}>{course.code}</span>
                <span className={styles.deliveryBadge}>{course.deliveryMode}</span>
              </div>

              <h3 className={styles.courseTitle}>{course.title}</h3>
              <p className={styles.courseDescription}>{course.description}</p>

              <div className={styles.outcomesBox}>
                <span className={styles.outcomesLabel}>Career Pathways:</span>
                <ul className={styles.outcomesList}>
                  {course.careerOutcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome} className={styles.outcomeItem}>
                      <Check size={14} className={styles.outcomeIcon} aria-hidden="true" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.durationInfo}>
                  <Clock size={13} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
                  <span>{course.duration}</span>
                </div>

                {course.externalUrl?.startsWith('/') ? (
                  <Link href={course.externalUrl} className={styles.courseLink}>
                    <span>View Details</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : (
                  <a
                    href={course.externalUrl || `https://bcta.edu.au/courses/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.courseLink}
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
