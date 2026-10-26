import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseTemplatePage from '@/components/course/CourseTemplatePage';
import { ALL_COURSES } from '@/lib/coursesData';
import { SITE_CONFIG } from '@/lib/constants';

const COURSE_SLUG = 'certificate-iv-in-building-construction-building-south-australia';

export const metadata: Metadata = {
  title: 'CPC40120 Certificate IV in Building & Construction (Building) SA | BCTA',
  description:
    'Study CPC40120 Certificate IV in Building & Construction in South Australia. Skills SA subsidised student contribution fee $446 for eligible applicants. Direct residential builder licensing pathway.',
  alternates: {
    canonical: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
  },
  openGraph: {
    title: 'CPC40120 Certificate IV in Building & Construction | BCTA South Australia',
    description:
      'Gain residential builder licensing credentials in South Australia. 36 weeks blended delivery via MS Teams. Skills SA funding available.',
    url: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
    siteName: 'Building and Construction Training Australia',
    images: [
      {
        url: '/images/courses/cpc40120.jpg',
        width: 1200,
        height: 630,
        alt: 'BCTA CPC40120 Certificate IV in Building and Construction',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
};

export default function CertIVBuildingSouthAustraliaRoute() {
  const course = ALL_COURSES[COURSE_SLUG];

  if (!course) {
    notFound();
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CPC40120 Certificate IV in Building & Construction (Building)',
    courseCode: 'CPC40120',
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
    educationalCredentialAwarded: 'Certificate IV in Building & Construction (Building)',
    occupationalCredentialAwarded: 'Residential Builder Licensing Pathway',
    timeRequired: 'P36W',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: 'PT15H',
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
