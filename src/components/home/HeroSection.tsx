'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Play, Pause, Award, CheckCircle } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => setVideoAvailable(false));
      setIsPlaying(true);
    }
  };

  return (
    <section className={styles.heroContainer} aria-label="Introduction and Study Options">
      {/* Background Poster (LCP and Fallback) */}
      <Image
        src="/images/hero-banner.webp"
        alt="BCTA building and construction training in session"
        fill
        priority
        className={styles.posterImage}
        sizes="100vw"
      />

      {/* Background Video */}
      {videoAvailable && (
        <video
          ref={videoRef}
          className={styles.videoBackground}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero-banner.webp"
          aria-hidden="true"
          onError={() => setVideoAvailable(false)}
        >
          <source src="/videos/hero-campus.mp4" type="video/mp4" />
        </video>
      )}

      {/* Blueprint grid effect & dark lighting overlay */}
      <div className={styles.blueprintGrid} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={`container ${styles.heroContent}`}>
        {/* Trust badge */}
        <div className={styles.badgeRow}>
          <Award size={16} aria-hidden="true" />
          <span>RTO # 22597 • Nationally Recognised Training</span>
        </div>

        {/* Primary Headline */}
        <h1 className={styles.heroHeadline}>
          Building and construction courses{' '}
          <span className={styles.highlightText}>delivered across three states</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.heroSubhead}>
          Practical, industry-led qualifications in Victoria, South Australia, and Western Australia. 
          Learn from experienced trade practitioners and fast-track your pathway to becoming a licensed builder.
        </p>

        {/* Action Buttons */}
        <div className={styles.actionRow}>
          <a href="#state-selector" className={styles.primaryCta}>
            <span>Select Your State</span>
            <ArrowRight size={18} aria-hidden="true" />
          </a>

          <a href="#featured-courses" className={styles.secondaryCta}>
            <span>Browse All Courses</span>
          </a>
        </div>

        {/* Pause/Play accessible button */}
        {videoAvailable && (
          <button
            type="button"
            className={styles.videoToggleBtn}
            onClick={togglePlayback}
            aria-label={isPlaying ? 'Pause background hero video' : 'Play background hero video'}
          >
            {isPlaying ? (
              <>
                <Pause size={13} aria-hidden="true" />
                <span>Pause Motion</span>
              </>
            ) : (
              <>
                <Play size={13} aria-hidden="true" />
                <span>Play Motion</span>
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
