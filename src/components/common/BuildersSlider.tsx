'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, Pause, HardHat } from 'lucide-react';
import styles from './BuildersSlider.module.css';

export interface BuilderPhoto {
  id: string;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  badge: string;
}

const BUILDER_PHOTOS: BuilderPhoto[] = [
  {
    id: 'photo-1',
    image: '/images/builders/builder-01.jpg',
    alt: 'BCTA students and trainers standing together in front of a modern double-storey residential home under construction',
    title: 'On-Site Practical Cohort',
    subtitle: 'Apprentices and building practitioners inspecting active residential construction framing, scaffolding, and structural integrity.',
    badge: 'Real Job Sites',
  },
  {
    id: 'photo-2',
    image: '/images/builders/builder-02.jpg',
    alt: 'Licensed builder instructor discussing staircase framing and architectural blueprints with apprentices',
    title: 'Plan Interpretation & Stairwell Briefing',
    subtitle: 'Experienced licensed builders walking students through architectural drawings, stairwell clearances, and NCC compliance.',
    badge: 'Expert Mentorship',
  },
  {
    id: 'photo-3',
    image: '/images/builders/builder-03.jpg',
    alt: 'Instructor showing students brickwork alignment and footing inspection techniques at residential construction site',
    title: 'Masonry & Foundation Walkthrough',
    subtitle: 'Hands-on site analysis examining brick tie placement, perimeter weep holes, and subfloor ventilation systems.',
    badge: 'Building Standards',
  },
  {
    id: 'photo-4',
    image: '/images/builders/builder-04.jpg',
    alt: 'Practical trade demonstration of structural tolerances and brick lintel placement on an active residential site',
    title: 'Structural Principles in Action',
    subtitle: 'Interactive discussions on load-bearing masonry, lintel installation, and structural tolerances under Australian standards.',
    badge: 'Practical Learning',
  },
  {
    id: 'photo-5',
    image: '/images/builders/builder-05.jpg',
    alt: 'Group of BCTA construction students celebrating practical workshop milestones outside newly completed building',
    title: 'Next Generation Trade Leaders',
    subtitle: 'BCTA students equipped with real-world site supervision skills, ready for builder licensing registration.',
    badge: 'Licensing Ready',
  },
];

interface BuildersSliderProps {
  heading?: string;
  eyebrow?: string;
  description?: string;
  className?: string;
}

export default function BuildersSlider({
  heading = 'Training our next Generation of Builders',
  eyebrow = 'Practical On-Site Learning',
  description = 'Authentic trade workshops, real residential build walkthroughs, and hands-on site mentorship led by licensed Australian builders.',
  className,
}: BuildersSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);

  // Drag / touch gesture state
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive items count calculation
  const updateVisibleCount = useCallback(() => {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCount(1);
    } else if (width < 1024) {
      setVisibleCount(2);
    } else {
      setVisibleCount(3);
    }
  }, []);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount, { passive: true });
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [updateVisibleCount]);

  // Reduced motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Viewport entrance observer
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const node = sectionRef.current;
    if (!node) return;

    if (reduceMotion) {
      setSectionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const maxIndex = Math.max(0, BUILDER_PHOTOS.length - visibleCount);

  // Boundary check on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Autoplay timer
  useEffect(() => {
    if (reduceMotion || isPaused || isHovered || isFocused || isDragging) return;

    const interval = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [reduceMotion, isPaused, isHovered, isFocused, isDragging, handleNext]);

  // Touch & Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    const threshold = 45; // 45px swipe threshold

    if (touchDeltaX < -threshold) {
      handleNext();
    } else if (touchDeltaX > threshold) {
      handlePrev();
    }

    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsDragging(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Calculate percentage offset per slide
  const slideWidthPercent = 100 / visibleCount;
  const currentTranslateX = -(currentIndex * slideWidthPercent);

  return (
    <section
      ref={sectionRef}
      className={`${styles.sliderSection} ${className || ''}`}
      aria-label="Training our next Generation of Builders"
      id="builders-gallery"
    >
      <div className="container">
        {/* Section Header */}
        <div
          className={`${styles.sectionHeader} ${
            sectionVisible ? styles.sectionHeaderVisible : ''
          }`}
        >
          <div className={styles.eyebrow}>
            <HardHat size={15} aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>

          <h2 className={styles.heading}>
            {heading.split('next Generation of Builders')[0]}
            <span className={styles.highlightText}>Next Generation of Builders</span>
          </h2>

          <p className={styles.description}>{description}</p>
        </div>

        {/* Slider Viewport */}
        <div
          className={`${styles.sliderWrapper} ${
            sectionVisible ? styles.sliderWrapperVisible : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Student and Apprentices Practical Training Photo Gallery"
          onKeyDown={handleKeyDown}
        >
          <div
            className={styles.carouselViewport}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              ref={trackRef}
              className={`${styles.carouselTrack} ${
                isDragging ? styles.trackNoTransition : ''
              }`}
              style={{
                transform: `translateX(${currentTranslateX}%)`,
              }}
            >
              {BUILDER_PHOTOS.map((item, index) => (
                <div
                  key={item.id}
                  className={styles.slideItem}
                  style={{ width: `${slideWidthPercent}%` }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${BUILDER_PHOTOS.length}: ${item.title}`}
                >
                  <article className={styles.slideCard}>
                    <div className={styles.imageBox}>
                      <span className={styles.badgeOverlay}>{item.badge}</span>
                      <Image
                        src={item.image}
                        alt={item.alt}
                        width={1024}
                        height={768}
                        className={styles.slideImg}
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.slideTitle}>{item.title}</h3>
                      <p className={styles.slideSubtitle}>{item.subtitle}</p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Accessible Controls Bar */}
          <div className={styles.controlsBar}>
            {/* Play/Pause Control */}
            <button
              type="button"
              className={styles.playPauseBtn}
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume image slider autoplay' : 'Pause image slider autoplay'}
              aria-pressed={isPaused}
            >
              {isPaused ? (
                <>
                  <Play size={14} aria-hidden="true" />
                  <span>Resume Autoplay</span>
                </>
              ) : (
                <>
                  <Pause size={14} aria-hidden="true" />
                  <span>Pause Autoplay</span>
                </>
              )}
            </button>

            {/* Pagination Dots */}
            <div className={styles.dotsWrapper} role="tablist" aria-label="Slider pagination">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`${styles.dotBtn} ${
                    currentIndex === dotIdx ? styles.dotBtnActive : ''
                  }`}
                  onClick={() => handleDotClick(dotIdx)}
                  aria-label={`Go to slide page ${dotIdx + 1}`}
                  aria-selected={currentIndex === dotIdx}
                  role="tab"
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className={styles.navButtonsGroup}>
              <button
                type="button"
                className={styles.navArrowBtn}
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>

              <button
                type="button"
                className={styles.navArrowBtn}
                onClick={handleNext}
                aria-label="Next slide"
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
