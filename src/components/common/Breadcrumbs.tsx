import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BASE_URL } from '@/lib/seo';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Home', href: '/' }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={styles.nav}>
        <div className="container">
          <ol className={styles.list}>
            {allItems.map((item, index) => {
              const isLast = index === allItems.length - 1;
              return (
                <li key={index} className={styles.item}>
                  {index > 0 && <ChevronRight size={14} className={styles.separator} aria-hidden="true" />}
                  {isLast || !item.href ? (
                    <span className={styles.current} aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className={styles.link}>
                      {index === 0 ? (
                        <>
                          <Home size={14} style={{ display: 'inline', marginRight: 4 }} aria-hidden="true" />
                          <span>Home</span>
                        </>
                      ) : (
                        item.label
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
