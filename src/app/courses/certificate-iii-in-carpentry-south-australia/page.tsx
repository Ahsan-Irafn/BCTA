import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseTemplatePage from '@/components/course/CourseTemplatePage';
import { ALL_COURSES } from '@/lib/coursesData';
import { SITE_CONFIG } from '@/lib/constants';

const COURSE_SLUG = 'certificate-iii-in-carpentry-south-australia';

export const metadata: Metadata = {
  title: 'CPC30220 Certificate III in Carpentry SA (Apprenticeship) | BCTA',
  description:
    'Study CPC30220 Certificate III in Carpentry in South Australia. 36-month Australian Apprenticeship pathway combining on-the-job training with fortnightly workshop sessions.',
  alternates: {
    canonical: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
  },
  openGraph: {
    title: 'CPC30220 Certificate III in Carpentry | BCTA South Australia',
    description:
      'Trade carpentry qualification in South Australia. Master roof trusses, wall framing, flooring systems, external cladding, and formwork.',
    url: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
    siteName: 'Building and Construction Training Australia',
    images: [
      {
        url: '/images/courses/cpc30220.jpg',
        width: 1200,
        height: 630,
        alt: 'BCTA CPC30220 Certificate III in Carpentry Apprentice On Site',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
};

export default function CarpentrySouthAustraliaRoute() {
  const course = ALL_COURSES[COURSE_SLUG];

  if (!course) {
    notFound();
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CPC30220 Certificate III in Carpentry (Apprenticeship)',
    courseCode: 'CPC30220',
    description: course.overviewParagraphs[0],
    provider: {
      '@type': 'EducationalOrganization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      identifier: 'RTO # 22597',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Level 30, 91 King William Street',
        addressLocality: 'Adelaide',
        addressRegion: 'SA',
        postalCode: '5000',
        addressCountry: 'AU',
      },
    },
    educationalCredentialAwarded: 'Certificate III in Carpentry',
    occupationalCredentialAwarded: 'Trade Qualified Carpenter',
    timeRequired: 'P36M',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Apprenticeship Workplace and Fortnightly Workshop',
      location: 'South Australia',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <CourseTemplatePage course={course} />
    </>
  );
}
