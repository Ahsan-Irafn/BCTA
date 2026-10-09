import React from 'react';
import { WHY_CHOOSE_ITEMS } from '@/lib/content';
import { Hammer, Award, Users, Clock, FileCheck, Compass } from 'lucide-react';
import styles from './WhyChooseBcta.module.css';

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer size={24} aria-hidden="true" />,
  Award: <Award size={24} aria-hidden="true" />,
  Users: <Users size={24} aria-hidden="true" />,
  Clock: <Clock size={24} aria-hidden="true" />,
  FileCheck: <FileCheck size={24} aria-hidden="true" />,
  Compass: <Compass size={24} aria-hidden="true" />,
};

export default function WhyChooseBcta() {
  return (
    <section className={styles.whyChooseSection} aria-label="Why Study With BCTA">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Why BCTA</span>
          <h2 className="section-title">Built for Builders, Run by Trades</h2>
          <p className="section-description">
            We focus on practical outcomes that translate directly into licencing, supervisory capability, and industry respect on Australian construction sites.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {WHY_CHOOSE_ITEMS.map((item) => (
            <div key={item.title} className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                {iconMap[item.icon] || <Award size={24} aria-hidden="true" />}
              </div>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
