'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import styles from './AdelaideLocationSection.module.css';

const ADELAIDE_ADDRESS = 'Lvl 30/91 King William St, Adelaide SA 5000, Australia';
const ENCODED_ADDRESS = encodeURIComponent(ADELAIDE_ADDRESS);
const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.368819036577!2d138.59972!3d-34.9258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0cedf54316d25%3A0x6b772421379f8be8!2s91%20King%20William%20St%2C%20Adelaide%20SA%205000!5e0!3m2!1sen!2sau!4v1710000000000!5m2!1sen!2sau';
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${ENCODED_ADDRESS}`;

export default function AdelaideLocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.location.hash === '#location-adelaide')
    ) {
      setIsVisible(true);
      return;
    }

    // Safety fallback: guarantee map and address visibility
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
      { threshold: 0.05, rootMargin: '60px' }
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
      id="location-adelaide"
      className={styles.section}
      aria-label="Adelaide Location and Directions"
    >
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Address, Contact and Directions */}
          <div className={`${styles.addressCard} ${isVisible ? styles.cardVisible : ''}`}>
            <div>
              <div className={styles.badge}>
                <MapPin size={13} aria-hidden="true" />
                <span>South Australia</span>
              </div>

              <h2 className={styles.heading}>Find Us in Adelaide</h2>

              {/* Exact Address Block */}
              <div className={styles.addressBlock}>
                <div className={styles.pinIconWrapper} aria-hidden="true">
                  <MapPin size={20} />
                </div>
                <div className={styles.addressDetails}>
                  <span className={styles.addressLabel}>Address</span>
                  <p className={styles.addressText}>{ADELAIDE_ADDRESS}</p>
                </div>
              </div>

              {/* Hours & Contact */}
              <div className={styles.detailsList}>
                <div className={styles.detailItem}>
                  <Clock size={16} aria-hidden="true" />
                  <span>Monday – Friday: 09:30 AM – 05:30 PM (ACST)</span>
                </div>
                <div className={styles.detailItem}>
                  <Phone size={16} aria-hidden="true" />
                  <span>Phone: {SITE_CONFIG.phone}</span>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
              aria-label={`Get directions to ${ADELAIDE_ADDRESS} on Google Maps`}
            >
              <Navigation size={17} aria-hidden="true" />
              <span>Get Directions</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Right Column: Real Google Maps Embed */}
          <div className={`${styles.mapCard} ${isVisible ? styles.mapVisible : ''}`}>
            <div className={styles.routeIndicator} aria-hidden="true">
              <span className={styles.routeDot} />
              <span>King William St CBD</span>
            </div>

            {isVisible ? (
              <iframe
                src={MAP_EMBED_URL}
                className={styles.mapIframe}
                loading="lazy"
                title={`Google Map showing ${ADELAIDE_ADDRESS}`}
                aria-label={`Google Map showing ${ADELAIDE_ADDRESS}`}
                allowFullScreen={false}
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div style={{ height: '100%', minHeight: 340, background: '#0b192b' }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
