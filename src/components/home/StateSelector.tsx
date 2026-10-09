import React from 'react';
import Image from 'next/image';
import { REGIONS } from '@/lib/constants';
import { ArrowUpRight, HelpCircle } from 'lucide-react';
import styles from './StateSelector.module.css';

export default function StateSelector() {
  return (
    <section id="state-selector" className={styles.stateSelectorSection} aria-label="Select Training State">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Choose Your Location</span>
          <h2 className="section-title">Select your state to explore courses</h2>
          <p className="section-description">
            Course structures, timetable schedules, and funding eligibility vary by state jurisdiction. 
            Choose your home state below to view accredited offerings.
          </p>
        </div>

        {/* 3 State Cards */}
        <div className={styles.cardsGrid}>
          {REGIONS.map((region) => (
            <a
              key={region.id}
              href={region.url}
              className={styles.stateCard}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Explore ${region.name} courses - ${region.courseCount} courses available`}
            >
              <div className={styles.cardHeader}>
                <Image
                  src={region.image}
                  alt={`Map outline of ${region.name}`}
                  width={85}
                  height={85}
                  className={styles.stateMap}
                />
                <span className={styles.badge}>{region.shortName}</span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.courseCount}>{region.courseCount} Courses</span>
                <h3 className={styles.stateName}>{region.name}</h3>
                <p className={styles.stateDescription}>{region.description}</p>

                <div className={styles.actionLink}>
                  <span>View courses</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
              </div>

              {/* Verified State Watermark */}
              <div className={styles.watermark} aria-hidden="true">
                {region.code}
              </div>
            </a>
          ))}
        </div>

        {/* Preserved Guidance Box */}
        <div className={styles.guidanceBox}>
          <HelpCircle size={32} className={styles.guidanceIcon} aria-hidden="true" />
          <div>
            <h4 className={styles.guidanceTitle}>Not sure which state applies to you?</h4>
            <p className={styles.guidanceText}>
              If you’re studying online or blended, choose the state you currently reside in — funding eligibility and licensing regulations depend on your physical location.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
