import Image from 'next/image';
import { MapPin } from 'lucide-react';
import BuildersSlider from '@/components/common/BuildersSlider';
import styles from './CampusExperience.module.css';

interface SiteFeature {
  state: string;
  name: string;
  image: string;
  description: string;
  highlights: string[];
}

const TRAINING_SITES: SiteFeature[] = [
  {
    state: 'Victoria',
    name: 'Melbourne Practical Training Facilities',
    image: '/images/hero-banner.webp',
    description: 'Hands-on set-out sessions at Keysborough, Highett, and dedicated regional workshops covering frame erection, leveling, and structural inspection.',
    highlights: ['Keysborough Practical Set-out Area', 'Active Building Site Walkthroughs', 'VBA Registration Exam Coaching'],
  },
  {
    state: 'South Australia',
    name: 'Adelaide Executive Training Centre',
    image: '/images/hero-banner.webp',
    description: 'Located at Level 30, 91 King William Street, providing blended evening seminars, contract law classes, and CBS builder licensing pathways.',
    highlights: ['Central Adelaide CBD Location', 'Consumer & Business Services (CBS) Alignment', 'Industry Expert Led Workshops'],
  },
  {
    state: 'Western Australia',
    name: 'Perth & Leederville Delivery Hub',
    image: '/images/hero-banner.webp',
    description: 'Situated at Unit 1, 220 Carr Pl, Leederville WA, supporting apprentices, civil plant candidates, and building practitioners across WA.',
    highlights: ['Leederville Trade Facility', 'Civil Plant Practical Simulators', 'WA Building Commission Criteria Coverage'],
  },
];

export default function CampusExperience() {
  return (
    <>
      <BuildersSlider />
      <section className={styles.experienceSection} aria-label="Learning Facilities and Practical Sites">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Real Facilities</span>
          <h2 className="section-title">Authentic On-Site Learning Environments</h2>
          <p className="section-description">
            Building isn’t learned solely from textbooks. Our students gain practical competence across purpose-built workshops, practical set-out sessions, and corporate hubs.
          </p>
        </div>

        <div className={styles.experienceGrid}>
          {TRAINING_SITES.map((site) => (
            <article key={site.name} className={styles.locationCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={site.image}
                  alt={`${site.name} practical training venue`}
                  fill
                  className={styles.locationImage}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>

              <div className={styles.cardBody}>
                <span className={styles.locationTag}>
                  <MapPin size={13} aria-hidden="true" />
                  <span>{site.state}</span>
                </span>
                <h3 className={styles.locationTitle}>{site.name}</h3>
                <p className={styles.locationText}>{site.description}</p>

                <ul className={styles.facilitiesList}>
                  {site.highlights.map((h) => (
                    <li key={h} className={styles.facilityItem}>
                      <span className={styles.facilityDot} aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  </>
);
}
