'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Course } from '@/lib/types';
import { Search, Clock, Award, CheckCircle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import styles from './courses.module.css';

interface CoursesClientProps {
  courses: Course[];
}

export default function CoursesClient({ courses }: CoursesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('all');

  const categories = useMemo(() => {
    return ['All', 'Building & Construction', 'Civil Construction', 'Patisserie & Hospitality'];
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.careerOutcomes.some((outcome) =>
          outcome.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesState =
        selectedState === 'all' || course.regions.includes(selectedState as 'vic' | 'sa' | 'wa');

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [courses, searchTerm, selectedCategory, selectedState]);

  return (
    <div className={styles.directorySection}>
      <div className="container">
        {/* Controls & Search */}
        <div className={styles.controlsBar}>
          <div className={styles.searchRow}>
            <Search size={18} className={styles.searchIcon} aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by course code, qualification title, or career goal (e.g. CPC40120, Carpentry, Builder)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              aria-label="Search courses"
            />
          </div>

          <div className={styles.filterRow}>
            {/* Category Filter */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Discipline:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.filterBtn} ${selectedCategory === cat ? styles.active : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* State Filter */}
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Study State:</span>
              <button
                type="button"
                onClick={() => setSelectedState('all')}
                className={`${styles.filterBtn} ${selectedState === 'all' ? styles.active : ''}`}
              >
                All States (VIC / SA / WA)
              </button>
              <button
                type="button"
                onClick={() => setSelectedState('vic')}
                className={`${styles.filterBtn} ${selectedState === 'vic' ? styles.active : ''}`}
              >
                Victoria
              </button>
              <button
                type="button"
                onClick={() => setSelectedState('sa')}
                className={`${styles.filterBtn} ${selectedState === 'sa' ? styles.active : ''}`}
              >
                South Australia
              </button>
              <button
                type="button"
                onClick={() => setSelectedState('wa')}
                className={`${styles.filterBtn} ${selectedState === 'wa' ? styles.active : ''}`}
              >
                Western Australia
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className={styles.coursesGrid}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <article key={course.id} className={styles.courseCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.topBadges}>
                    <span className={styles.codeBadge}>{course.code}</span>
                    <span className={styles.aqfBadge}>{course.aqfLevel || 'AQF Certified'}</span>
                  </div>
                  <h3 className={styles.courseTitle}>
                    <Link href={`/courses/${course.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {course.title}
                    </Link>
                  </h3>
                </div>

                <div className={styles.cardBody}>
                  <p className={styles.description}>{course.description}</p>

                  <div className={styles.metaList}>
                    <div className={styles.metaItem}>
                      <Clock size={16} aria-hidden="true" />
                      <span><strong>Duration:</strong> {course.duration}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Award size={16} aria-hidden="true" />
                      <span><strong>Delivery:</strong> {course.deliveryMode}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <ShieldCheck size={16} aria-hidden="true" />
                      <span><strong>National Code:</strong> {course.code} (RTO # 22597)</span>
                    </div>
                  </div>

                  <div className={styles.regionBadges}>
                    <span className={styles.regionLabel}>
                      <MapPin size={12} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
                      Locations:
                    </span>
                    {course.regions.map((reg) => (
                      <span key={reg} className={styles.stateTag}>
                        {reg.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <Link href={`/courses/${course.slug}`} className={styles.viewBtn}>
                    <span>View Course Details</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className={styles.noResults}>
              <h3 className={styles.noResultsTitle}>No Courses Found Matching Your Criteria</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                Try adjusting your search query, or clear your discipline and state filters.
              </p>
              <button
                type="button"
                className={styles.viewBtn}
                style={{ display: 'inline-flex', width: 'auto' }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedState('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
