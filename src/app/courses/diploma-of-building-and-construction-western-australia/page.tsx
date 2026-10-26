import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseTemplatePage from '@/components/course/CourseTemplatePage';
import { ALL_COURSES } from '@/lib/coursesData';
import { SITE_CONFIG } from '@/lib/constants';

const COURSE_SLUG = 'diploma-of-building-and-construction-western-australia';

export const metadata: Metadata = {
  title: 'CPC50220 Diploma of Building and Construction (Building) WA | BCTA',
  description:
    'Study CPC50220 Diploma of Building and Construction in Western Australia. 62 weeks flexible blended delivery via MS Teams. Builder registration pathway with Building Commission WA.',
  alternates: {
    canonical: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
  },
  openGraph: {
    title: 'CPC50220 Diploma of Building and Construction | BCTA Western Australia',
    description:
      'Master medium-rise commercial construction, contract administration, structural principles, and site management in Western Australia. Builder registration pathway.',
    url: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
    siteName: 'Building and Construction Training Australia',
    images: [
      {
        url: '/images/courses/cpc50220-builder.jpg',
        width: 1200,
        height: 630,
        alt: 'BCTA CPC50220 Diploma of Building and Construction WA Student On Site',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
};

export default function DiplomaWesternAustraliaRoute() {
  const course = ALL_COURSES[COURSE_SLUG];

  if (!course) {
    notFound();
  }

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
        streetAddress: 'Unit 1, 220 Carr Pl',
        addressLocality: 'Leederville',
        addressRegion: 'WA',
        postalCode: '6007',
        addressCountry: 'AU',
      },
    },
    educationalCredentialAwarded: 'Diploma of Building and Construction (Building)',
    occupationalCredentialAwarded: 'Building Practitioner Registration Pathway (Building Commission WA)',
    timeRequired: 'P62W',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended MS Teams Virtual and Practical',
      location: 'Western Australia',
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
