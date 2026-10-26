import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseTemplatePage from '@/components/course/CourseTemplatePage';
import { ALL_COURSES } from '@/lib/coursesData';
import { SITE_CONFIG } from '@/lib/constants';

const COURSE_SLUG = 'certificate-iii-in-civil-construction-plant-operations-south-australia';

export const metadata: Metadata = {
  title: 'RII30820 Certificate III in Civil Construction Plant Operations SA | BCTA',
  description:
    'Study RII30820 Certificate III in Civil Construction Plant Operations in South Australia. 33 weeks practical training with 120 hours plant fleet placement. Operate excavators, backhoes, and rollers.',
  alternates: {
    canonical: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
  },
  openGraph: {
    title: 'RII30820 Certificate III in Civil Construction Plant Operations | BCTA South Australia',
    description:
      'Gain hands-on competency operating civil heavy machinery including excavators, rollers, backhoes, and trucks. 120 hours supervised placement.',
    url: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
    siteName: 'Building and Construction Training Australia',
    images: [
      {
        url: '/images/courses/rii30820.jpg',
        width: 1200,
        height: 630,
        alt: 'BCTA RII30820 Certificate III in Civil Construction Plant Operations',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
};

export default function CivilPlantSouthAustraliaRoute() {
  const course = ALL_COURSES[COURSE_SLUG];

  if (!course) {
    notFound();
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'RII30820 Certificate III in Civil Construction Plant Operations',
    courseCode: 'RII30820',
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
    educationalCredentialAwarded: 'Certificate III in Civil Construction Plant Operations',
    occupationalCredentialAwarded: 'Civil Plant Operator / Excavator Operator',
    timeRequired: 'P33W',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Classroom, Workshop and Plant Operations Placement',
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
