import React from 'react';
import { BLOG_POSTS_DATA } from '@/lib/content';
import { ArrowRight, Calendar, User } from 'lucide-react';
import styles from './ArticleHighlights.module.css';

export default function ArticleHighlights() {
  return (
    <section className={styles.articlesSection} aria-label="Latest Industry Guides and Articles">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Licensing Insights</span>
          <h2 className="section-title">Guides & Trade Regulations</h2>
          <p className="section-description">
            Clear, authoritative guides to help you navigate Australian building licensing bodies, legislation requirements, and trade advancements.
          </p>
        </div>

        <div className={styles.articlesGrid}>
          {BLOG_POSTS_DATA.map((article) => (
            <article key={article.id} className={styles.articleCard}>
              <div className={styles.cardBody}>
                <div className={styles.articleMeta}>
                  <span className={styles.categoryBadge}>{article.category}</span>
                  <span>
                    <Calendar size={13} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
                    {new Date(article.publishedAt).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.articleExcerpt}>{article.excerpt}</p>

                <a
                  href={`https://bcta.edu.au/${article.slug}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readMoreLink}
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
