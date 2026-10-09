import { Metadata } from 'next';
import { SITE_CONFIG } from './constants';
import { Course } from './types';

export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bcta.edu.au';

export function constructMetadata({
  title,
  description,
  image = '/images/hero-banner.webp',
  canonical = '/',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const fullTitle = title
    ? `${title} | BCTA`
    : 'Building & Construction Courses Australia | BCTA (RTO # 22597)';

  const fullDescription =
    description ||
    'Select your location to explore BCTA’s building, construction, and patisserie courses across Victoria, South Australia, and Western Australia. Nationally recognised training, flexible delivery, and direct licensing pathways.';

  const canonicalUrl = `${BASE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`;

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: canonicalUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: 'BCTA - Building & Construction Training Australia',
      images: [
        {
          url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: 'BCTA Building & Construction Training Australia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image.startsWith('http') ? image : `${BASE_URL}${image}`],
    },
    icons: {
      icon: '/images/logo.png',
      apple: '/images/logo.png',
    },
  };
}

export function getOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Building & Construction Training Australia (BCTA)',
    alternateName: 'BCTA',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: 'Registered Training Organisation (RTO # 22597) delivering nationally accredited building, construction, and hospitality qualifications in Victoria, South Australia, and Western Australia.',
    telephone: '1300 11 2282',
    email: 'enquiries@bcta.vic.edu.au',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Level 30, 91 King William Street',
        addressLocality: 'Adelaide',
        addressRegion: 'SA',
        postalCode: '5000',
        addressCountry: 'AU',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Unit 1, 220 Carr Pl',
        addressLocality: 'Leederville',
        addressRegion: 'WA',
        postalCode: '6007',
        addressCountry: 'AU',
      },
    ],
    sameAs: [
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.instagram,
      SITE_CONFIG.socialLinks.linkedin,
      SITE_CONFIG.socialLinks.youtube,
      SITE_CONFIG.socialLinks.pinterest,
    ],
  };
}

export function getCourseStructuredData(course: Course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${course.code} - ${course.title}`,
    description: course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Building & Construction Training Australia',
      sameAs: BASE_URL,
    },
    courseCode: course.code,
    occupationalCredentialAwarded: course.title,
    timeRequired: course.duration,
  };
}
