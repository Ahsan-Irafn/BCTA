'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  Award,
  ShieldCheck,
  Briefcase,
  HardHat,
  Hammer,
  Clock,
  HeartHandshake,
  TrendingUp,
  ChevronRight,
  Layers,
  Compass,
} from 'lucide-react';
import styles from './WhyChooseBcta.module.css';

interface BenefitItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface BlueprintLayer {
  id: string;
  layerCode: string;
  title: string;
  subtitle: string;
  benefits: BenefitItem[];
}

const BLUEPRINT_LAYERS: BlueprintLayer[] = [
  {
    id: 'layer-standards',
    layerCode: 'LVL-01 / DWG-A',
    title: 'Recognition & Standards',
    subtitle: 'National ASQA & NCC Accreditation',
    benefits: [
      {
        id: 'b-1',
        title: 'Nationally Recognised',
        description: 'Government approved qualifications across Australia.',
        icon: <Award size={22} aria-hidden="true" />,
      },
      {
        id: 'b-2',
        title: 'Compliance Driven',
        description: 'Courses aligned with NCC, ASQA standards.',
        icon: <ShieldCheck size={22} aria-hidden="true" />,
      },
    ],
  },
  {
    id: 'layer-industry',
    layerCode: 'LVL-02 / DWG-B',
    title: 'Industry & Experience',
    subtitle: 'Licensed Practitioners & Active Sites',
    benefits: [
      {
        id: 'b-3',
        title: 'Industry Focused',
        description: 'Real-world training for construction careers.',
        icon: <Briefcase size={22} aria-hidden="true" />,
      },
      {
        id: 'b-4',
        title: 'Experienced Trainers',
        description: 'Learn from experts with industry experience.',
        icon: <HardHat size={22} aria-hidden="true" />,
      },
    ],
  },
  {
    id: 'layer-learning',
    layerCode: 'LVL-03 / DWG-C',
    title: 'Learning & Flexibility',
    subtitle: 'Job-Site Workshops & Blended Study',
    benefits: [
      {
        id: 'b-5',
        title: 'Practical Learning',
        description: 'Practical activities using real construction projects.',
        icon: <Hammer size={22} aria-hidden="true" />,
      },
      {
        id: 'b-6',
        title: 'Flexible Study',
        description: 'Flexible online and blended learning options.',
        icon: <Clock size={22} aria-hidden="true" />,
      },
    ],
  },
  {
    id: 'layer-support',
    layerCode: 'LVL-04 / DWG-D',
    title: 'Support & Progression',
    subtitle: 'Licensing Guidance & Mentorship',
    benefits: [
      {
        id: 'b-7',
        title: 'Student Support',
        description: 'Supportive team from enrolment to completion.',
        icon: <HeartHandshake size={22} aria-hidden="true" />,
      },
      {
        id: 'b-8',
        title: 'Career Pathways',
        description: 'Skills unlocking opportunities in the construction industry.',
        icon: <TrendingUp size={22} aria-hidden="true" />,
      },
    ],
  },
];

export default function WhyChooseBcta() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Viewport entrance observer (run entrance animation once)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = sectionRef.current;
    if (!node) return;

    if (reduceMotion) {
      setIsSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  // Subtle pointer-based 3D tilt on desktop (clamped to ±5 degrees)
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || typeof window === 'undefined' || window.innerWidth < 1024) return;
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;

      const relativeX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

      // Small rotation range: max ±4.5deg
      setTilt({
        x: relativeY * -9,
        y: relativeX * 9,
      });
    },
    [reduceMotion]
  );

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Keyboard navigation across tabs
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (index + 1) % BLUEPRINT_LAYERS.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (index - 1 + BLUEPRINT_LAYERS.length) % BLUEPRINT_LAYERS.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = BLUEPRINT_LAYERS.length - 1;
    }

    if (nextIndex !== index) {
      setActiveLayerIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const currentLayer = BLUEPRINT_LAYERS[activeLayerIndex];

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className={styles.blueprintSection}
      aria-label="Why Study With BCTA"
    >
      {/* Blueprint background grid with CAD markings */}
      <div className={styles.blueprintGridOverlay} aria-hidden="true" />

      <div className="container">
        <div className={styles.asymmetricGrid}>
          {/* ========================================================
             LEFT COLUMN: Intro, Heading, Description, Authentic Photo
             ======================================================== */}
          <div
            className={`${styles.leftColumn} ${
              isSectionVisible ? styles.leftColumnVisible : ''
            }`}
          >
            <div className={styles.introBadge}>
              <Compass size={14} aria-hidden="true" />
              <span>Blueprint to Real-World Skills</span>
            </div>

            <h2 className={styles.sectionHeading}>
              Why study with <span className={styles.headingAccent}>BCTA</span>
            </h2>

            <p className={styles.supportingText}>
              From regulatory architectural blueprints to licensed builder execution, our
              nationally accredited training connects technical standards with genuine job-site
              mastery.
            </p>

            {/* Authentic Workshop & Blueprint Training Photo */}
            <div className={styles.imageCardWrapper}>
              <div className={styles.imageFrame}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/builders/builder-02.jpg"
                  alt="BCTA licensed builder trainer explaining construction stairwell framing and architectural blueprints to apprentices on-site"
                  width={640}
                  height={400}
                  className={styles.authenticPhoto}
                  loading="eager"
                />
                <div className={styles.photoCadTag} aria-hidden="true">
                  <span className={styles.photoCadTagDot} />
                  <span>ON-SITE NCC & BLUEPRINT VERIFICATION</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
             RIGHT COLUMN: Interactive 3D Perspective Slabs & Reading Area
             ======================================================== */}
          <div
            className={`${styles.rightColumn} ${
              isSectionVisible ? styles.rightColumnVisible : ''
            }`}
          >
            {/* Interactive 3D Composition Viewport */}
            <div
              ref={sceneRef}
              className={styles.sceneContainer}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <div
                className={styles.isometricAssembly}
                style={{
                  transform:
                    reduceMotion || typeof window === 'undefined' || window.innerWidth < 1024
                      ? undefined
                      : `rotateX(${10 + tilt.x}deg) rotateY(${-6 + tilt.y}deg)`,
                }}
                role="tablist"
                aria-label="Blueprint architectural layers"
              >
                {BLUEPRINT_LAYERS.map((layer, index) => {
                  const isSelected = activeLayerIndex === index;
                  return (
                    <button
                      key={layer.id}
                      ref={(el) => {
                        tabRefs.current[index] = el;
                      }}
                      id={`tab-${layer.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls={`panel-${layer.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      className={`${styles.layerSlab} ${
                        isSelected ? styles.layerSlabActive : ''
                      }`}
                      onClick={() => setActiveLayerIndex(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    >
                      <div className={styles.slabHeader}>
                        <span className={styles.slabCodeBadge}>{layer.layerCode}</span>
                        <div className={styles.slabTitles}>
                          <span className={styles.slabTitle}>{layer.title}</span>
                          <span className={styles.slabSubtitle}>{layer.subtitle}</span>
                        </div>
                      </div>

                      <div className={styles.slabRight}>
                        <span
                          className={styles.activeIndicatorDot}
                          aria-hidden="true"
                        />
                        <ChevronRight
                          size={18}
                          className={styles.chevronIcon}
                          aria-hidden="true"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stable Reading Area Below the Composition */}
            <div
              id={`panel-${currentLayer.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${currentLayer.id}`}
              className={styles.readingArea}
            >
              <div className={styles.readingAreaHeader}>
                <h3 className={styles.readingAreaTitle}>
                  <Layers size={15} aria-hidden="true" />
                  <span>Layer {activeLayerIndex + 1}: {currentLayer.title}</span>
                </h3>
                <span className={styles.readingAreaBlueprintMeta}>
                  SPEC REF: {currentLayer.layerCode}
                </span>
              </div>

              {/* Two Benefits Revealed for Selected Layer */}
              <div key={currentLayer.id} className={styles.benefitsRow}>
                {currentLayer.benefits.map((benefit) => (
                  <div key={benefit.id} className={benefitCardClass(styles)}>
                    <div className={styles.benefitIconBox}>
                      {benefit.icon}
                    </div>
                    <div className={styles.benefitContent}>
                      <h4 className={styles.benefitHeading}>{benefit.title}</h4>
                      <p className={styles.benefitParagraph}>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Semantic Fallback for Screen Readers & Non-JS Parsers (All 8 Benefits) */}
        <div className={styles.srOnlyFallback}>
          <h3>Comprehensive BCTA Institutional Qualifications</h3>
          <ul>
            {BLUEPRINT_LAYERS.flatMap((layer) => layer.benefits).map((benefit) => (
              <li key={benefit.id}>
                <strong>{benefit.title}:</strong> {benefit.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function benefitCardClass(styles: Record<string, string>): string {
  return styles.benefitCard;
}
