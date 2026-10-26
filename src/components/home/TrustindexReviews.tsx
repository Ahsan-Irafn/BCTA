'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Star, ExternalLink, ShieldCheck } from 'lucide-react';
import styles from './TrustindexReviews.module.css';

interface TrustindexReviewsProps {
  title?: string;
  subtitle?: string;
}

const TRUSTINDEX_SRC = 'https://cdn.trustindex.io/loader.js?91651d6595d046790a1636ad7f8';
const GOOGLE_REVIEWS_VERIFIED_URL =
  'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJfzvI-2CVKWsRM-mGkx_V_Ko';

export default function TrustindexReviews({
  title = 'What Students Say About Us',
  subtitle = 'Discover why students love being part of our programs. Real experiences, practical learning, and success stories that inspire.',
}: TrustindexReviewsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // 1. Entrance animation observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // Safety fallback
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

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

  // 2. Client-side isolated Trustindex script loading with Strict Mode & SPA navigation safety
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset state on mount
    setIsLoading(true);
    setHasError(false);

    // Safeguard timeout: prevent infinite loading indicator if script is blocked (e.g., ad blocker)
    const timeoutId = setTimeout(() => {
      // If after 8 seconds no widget was injected, mark as fallback
      if (!container.querySelector('.ti-widget')) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 8000);

    // MutationObserver to detect when Trustindex injects its widget into container
    const mutationObserver = new MutationObserver(() => {
      if (container.querySelector('.ti-widget')) {
        setIsLoading(false);
        setHasError(false);
        clearTimeout(timeoutId);
      }
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    // Check if widget is already present
    if (container.querySelector('.ti-widget')) {
      setIsLoading(false);
      clearTimeout(timeoutId);
    } else {
      // Create and inject script tag into the container
      const script = document.createElement('script');
      script.src = TRUSTINDEX_SRC;
      script.defer = true;
      script.async = true;
      script.setAttribute('data-trustindex-host', 'react-client');

      script.onerror = () => {
        setIsLoading(false);
        setHasError(true);
        clearTimeout(timeoutId);
      };

      container.appendChild(script);

      // If Trustindex global is already active from previous navigation, trigger re-render
      const win = window as any;
      if (typeof win.renderTrustindexWidgets === 'function') {
        win.renderTrustindexWidgets();
      }
    }

    return () => {
      clearTimeout(timeoutId);
      mutationObserver.disconnect();

      // Clean up widget instances and container on unmount to prevent duplicate widgets on return
      try {
        const win = window as any;
        if (win.Trustindex && typeof win.Trustindex.destroyWidgets === 'function') {
          win.Trustindex.destroyWidgets();
        }
      } catch {
        // Ignore cleanup errors
      }

      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="student-reviews"
      className={styles.section}
      aria-label="Student Google & Customer Reviews"
    >
      <div className={styles.inner}>
        {/* Header with gentle entrance animation */}
        <div className={`${styles.header} ${isVisible ? styles.headerVisible : ''}`}>
          <div className={styles.eyebrow}>
            <span className={styles.googleIcon} aria-hidden="true">
              {/* Google G logo */}
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </span>
            <span>Customer & Google Reviews</span>
            <span className={styles.eyebrowStars} aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="currentColor" stroke="none" />
              ))}
            </span>
          </div>

          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Reviews Widget Body */}
        <div className={`${styles.widgetWrapper} ${isVisible ? styles.widgetVisible : ''}`}>
          {/* Skeleton Shimmer while loading */}
          {isLoading && (
            <div className={styles.skeletonContainer} aria-hidden="true">
              {[1, 2, 3].map((card) => (
                <div key={card} className={styles.skeletonCard}>
                  <div className={styles.skeletonHeader}>
                    <div className={styles.skeletonAvatar} />
                    <div className={styles.skeletonLines}>
                      <div className={styles.skeletonLineShort} />
                      <div className={styles.skeletonLineTiny} />
                    </div>
                  </div>
                  <div className={styles.skeletonStars} />
                  <div className={styles.skeletonBody} />
                </div>
              ))}
            </div>
          )}

          {/* Graceful Fallback if blocked by network or ad blockers */}
          {hasError && (
            <div className={styles.fallbackContainer}>
              <p className={styles.fallbackTitle}>Customer Reviews</p>
              <p className={styles.fallbackText}>
                Student reviews could not be loaded directly. If you use an ad or tracking blocker,
                reviews may be temporarily restricted by your browser.
              </p>
              <a
                href={GOOGLE_REVIEWS_VERIFIED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.fallbackLink}
              >
                <span>Read Verified Google Reviews</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          )}

          {/* Dedicated container where Trustindex dynamically injects its widget */}
          <div ref={containerRef} className={styles.widgetContainer} />
        </div>
      </div>
    </section>
  );
}
