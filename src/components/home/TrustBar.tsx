import React from 'react';
import { TRUST_STATS } from '@/lib/constants';
import styles from './TrustBar.module.css';

export default function TrustBar() {
  return (
    <section className={styles.trustBarWrapper} aria-label="Accreditation and Regulatory Compliance">
      <div className={`container ${styles.trustGrid}`}>
        {TRUST_STATS.map((stat) => (
          <div key={stat.label} className={styles.trustCard}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statDetail}>{stat.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
