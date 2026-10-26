'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, TrendingUp, DollarSign, Award, ExternalLink } from 'lucide-react';
import styles from './CareerOutlookSection.module.css';

interface MetricDef {
  id: string;
  target: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
  subtext: string;
  icon: React.ReactNode;
  growthIndicator?: string;
  scaleNote?: string;
  screenReaderLabel: string;
}

const METRICS: MetricDef[] = [
  {
    id: 'jobs',
    target: 2400,
    prefix: '',
    suffix: '',
    decimals: 0,
    label: 'Job Opportunities',
    subtext: 'Estimated active national opportunities across building & trade operations',
    icon: <Briefcase size={22} strokeWidth={2} />,
    screenReaderLabel: '2,400 Job Opportunities',
  },
  {
    id: 'growth',
    target: 9.2,
    prefix: '',
    suffix: '%',
    decimals: 1,
    label: 'Projected Growth',
    subtext: 'Five-year projected industry employment expansion rate',
    icon: <TrendingUp size={22} strokeWidth={2} />,
    growthIndicator: '▲ 9.2%',
    screenReaderLabel: '9.2% Projected Growth',
  },
  {
    id: 'earnings',
    target: 130,
    prefix: '$',
    suffix: 'K',
    decimals: 0,
    label: 'Typical Earnings',
    subtext: 'Typical annual package for qualified supervisors & registered builders',
    icon: <DollarSign size={22} strokeWidth={2} />,
    screenReaderLabel: '$130K Typical Earnings',
  },
  {
    id: 'satisfaction',
    target: 4.1,
    prefix: '',
    suffix: '',
    decimals: 1,
    label: 'Career Satisfaction',
    subtext: 'Positive role satisfaction index rated by Australian industry professionals',
    icon: <Award size={22} strokeWidth={2} />,
    scaleNote: 'out of 5',
    screenReaderLabel: '4.1 out of 5 Career Satisfaction',
  },
];

export default function CareerOutlookSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  // Numeric counter values state
  const [counts, setCounts] = useState<{ [key: string]: string }>({
    jobs: '0',
    growth: '0.0',
    earnings: '0',
    satisfaction: '0.0',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setCounts({
        jobs: '2,400',
        growth: '9.2',
        earnings: '130',
        satisfaction: '4.1',
      });
      hasAnimated.current = true;
      return;
    }

    // Safety fallback: ensure metrics are visible
    const timer = setTimeout(() => {
      if (!hasAnimated.current) {
        hasAnimated.current = true;
        setIsVisible(true);
        setCounts({
          jobs: '2,400',
          growth: '9.2',
          earnings: '130',
          satisfaction: '4.1',
        });
      }
    }, 800);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setIsVisible(true);
            observer.unobserve(entry.target);

            // Start RAF counter animation
            const duration = 1800; // 1.8s
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease out exponential
              const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

              setCounts({
                jobs: Math.round(ease * 2400).toLocaleString('en-US'),
                growth: (ease * 9.2).toFixed(1),
                earnings: Math.round(ease * 130).toString(),
                satisfaction: (ease * 4.1).toFixed(1),
              });

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                // Ensure exact terminal values
                setCounts({
                  jobs: '2,400',
                  growth: '9.2',
                  earnings: '130',
                  satisfaction: '4.1',
                });
              }
            };

            requestAnimationFrame(animate);
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

  return (
    <section
      ref={sectionRef}
      id="career-outlook"
      className={styles.section}
      aria-label="Career Opportunities and Estimated Income"
    >
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Editorial Overview */}
          <div className={`${styles.introCol} ${isVisible ? styles.introVisible : ''}`}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              <span>01 // Industry Outlook</span>
            </div>

            <h2 className={styles.title}>
              Career Opportunities &amp;{' '}
              <span className={styles.titleHighlight}>Estimated Income</span>
            </h2>

            <p className={styles.description}>
              Australia’s building and construction sectors continue to experience robust demand for
              licensed trades, certified site supervisors, and accredited builders. Gain recognized
              credentials to accelerate your commercial earning capacity and project leadership.
            </p>

            <div className={styles.sourceBox}>
              <span className={styles.sourceLabel}>
                Reference Source:{' '}
                <a
                  href="https://www.seek.com.au/career-advice/role/builder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.sourceLink}
                >
                  seek.com.au Career Insights
                  <ExternalLink size={12} style={{ display: 'inline', marginLeft: 4 }} aria-hidden="true" />
                </a>
              </span>
              <span className={styles.disclaimer}>
                Metrics represent provisional industry overview for Australian construction roles and
                do not guarantee specific employment or remuneration outcomes for graduates.
              </span>
            </div>
          </div>

          {/* Right Column: Open Editorial Metrics Layout */}
          <div className={`${styles.metricsCol} ${isVisible ? styles.metricsVisible : ''}`}>
            <div className={styles.metricsGrid}>
              {METRICS.map((metric) => (
                <div
                  key={metric.id}
                  className={styles.metricCard}
                  aria-label={metric.screenReaderLabel}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper} aria-hidden="true">
                      {metric.icon}
                    </div>
                    {metric.growthIndicator && (
                      <span className={styles.growthIndicator} aria-hidden="true">
                        {metric.growthIndicator}
                      </span>
                    )}
                    {metric.scaleNote && (
                      <span className={styles.ratingScale} aria-hidden="true">
                        {metric.scaleNote}
                      </span>
                    )}
                  </div>

                  <div className={styles.numberWrapper}>
                    <span className={styles.numberText} aria-hidden="true">
                      {metric.prefix}
                      {counts[metric.id]}
                      {metric.suffix}
                    </span>
                  </div>

                  <h3 className={styles.metricLabel}>{metric.label}</h3>
                  <p className={styles.metricSubtext}>{metric.subtext}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
