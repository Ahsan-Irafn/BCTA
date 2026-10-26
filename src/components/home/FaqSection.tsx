'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle } from 'lucide-react';
import MotionAccordion from '@/components/ui/MotionAccordion';
import styles from './FaqSection.module.css';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const HOMEPAGE_FAQS: FaqItem[] = [
  {
    id: 'faq-courses-offered',
    question: 'What courses does BCTA offer?',
    answer:
      'BCTA provides nationally recognised vocational courses in building and construction, including the Certificate IV in Building & Construction and Diploma of Building & Construction (Building), as well as other related qualifications.',
  },
  {
    id: 'faq-study-mode',
    question: 'Can I study online or only in-person?',
    answer:
      'BCTA offers both onsite (face-to-face) and online learning options, giving flexibility for students to choose the delivery mode that suits their needs.',
  },
  {
    id: 'faq-course-duration',
    question: 'How long do BCTA courses take to complete?',
    answer:
      'Course durations vary depending on the qualification you choose. For example, the Certificate IV in Building & Construction typically runs for about 36 weeks, while the Diploma of Building & Construction (Building) is around 62 weeks (excluding holidays).',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    // Fallback safety
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '60px' }
    );

    observer.observe(section);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="homepage-faqs"
      className={styles.section}
      aria-label="Frequently Asked Questions"
    >
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.headerVisible : ''}`}>
          <div className={styles.badge}>
            <HelpCircle size={14} aria-hidden="true" />
            <span>Got Questions?</span>
          </div>
          <h2 className={styles.title}>
            Frequently Asked <span className={styles.titleHighlight}>Questions</span>
          </h2>
          <p className={styles.subtitle}>
            Explore essential answers regarding our nationally accredited vocational programs,
            flexible study modes, and course durations.
          </p>
        </div>

        {/* Accordion Container using 21st.dev MotionAccordion */}
        <div className={`${styles.accordionWrapper} ${isVisible ? styles.accordionVisible : ''}`}>
          <MotionAccordion items={HOMEPAGE_FAQS} defaultExpandedIndex={0} />
        </div>

        {/* Bottom Support Callout */}
        <div className={styles.supportCallout}>
          <p>
            Have a question not listed here?{' '}
            <a href="#enq1" className={styles.supportLink}>
              Speak with a BCTA course advisor
            </a>{' '}
            or call{' '}
            <a href="tel:1300112282" className={styles.phoneLink}>
              1300 11 2282
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
