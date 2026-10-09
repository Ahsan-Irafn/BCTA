import React from 'react';
import { REVIEWS_DATA } from '@/lib/content';
import { Star, ArrowRight } from 'lucide-react';
import styles from './ReviewsSection.module.css';

export default function ReviewsSection() {
  return (
    <section className={styles.reviewsSection} aria-label="Student Testimonials and Reviews">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Student Feedback</span>
          <h2 className="section-title">What Our Graduates Say</h2>
          <p className="section-description">
            Read first-hand feedback from graduates who advanced their careers, passed licensing interviews, and earned trade qualifications through BCTA.
          </p>
        </div>

        <div className={styles.reviewsGrid}>
          {REVIEWS_DATA.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.starRow} aria-label={`${review.rating} out of 5 stars`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" aria-hidden="true" />
                ))}
              </div>

              <blockquote className={styles.quoteText}>
                &ldquo;{review.content}&rdquo;
              </blockquote>

              <div className={styles.reviewerMeta}>
                <span className={styles.authorName}>{review.author}</span>
                <span className={styles.courseTag}>{review.course}</span>
                <span className={styles.locationTag}>{review.location}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.reviewsFooter}>
          <a
            href="https://bcta.edu.au/reviews-south-australia/"
            className={styles.viewAllReviewsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View All Student Reviews</span>
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
