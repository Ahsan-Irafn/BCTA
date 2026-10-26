import React from 'react';
import { Metadata } from 'next';
import CourseTemplatePage from '@/components/course/CourseTemplatePage';
import { ALL_COURSES } from '@/lib/coursesData';
import { SITE_CONFIG } from '@/lib/constants';

const COURSE_SLUG = 'diploma-of-building-and-construction-south-australia';

export const metadata: Metadata = {
  title: 'CPC50220 Diploma of Building and Construction (Building) SA | BCTA',
  description:
    'Study the CPC50220 Diploma of Building and Construction (Building) in South Australia. Subsidised through Skills SA for eligible participants. Gain skills for medium-rise building contractor registration.',
  alternates: {
    canonical: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
  },
  openGraph: {
    title: 'CPC50220 Diploma of Building and Construction (Building) | BCTA South Australia',
    description:
      'Master medium-rise construction, contract administration, and site supervision. Subsidised through Skills SA for eligible students.',
    url: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
    siteName: 'Building and Construction Training Australia',
    images: [
      {
        url: '/images/courses/cpc50220-builder.jpg',
        width: 1200,
        height: 630,
        alt: 'BCTA CPC50220 Diploma of Building and Construction Student On Site',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPC50220 Diploma of Building and Construction (Building) | BCTA SA',
    description:
      'Advance to commercial and medium-rise site management in South Australia. Subsidised tuition available via Skills SA.',
    images: ['/images/courses/cpc50220-builder.jpg'],
  },
};

export default function DiplomaSouthAustraliaRoute() {
  const course = ALL_COURSES[COURSE_SLUG];

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'CPC50220 Diploma of Building and Construction (Building)',
    courseCode: 'CPC50220',
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
    educationalCredentialAwarded: 'Diploma of Building and Construction (Building)',
    occupationalCredentialAwarded: 'Building Work Contractor Licence Educational Criteria (CBS SA)',
    timeRequired: 'P62W',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended MS Teams Virtual and Practical',
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
