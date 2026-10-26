import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CourseTemplatePage from '@/components/course/CourseTemplatePage';
import { ALL_COURSES } from '@/lib/coursesData';
import { SITE_CONFIG } from '@/lib/constants';

const COURSE_SLUG = 'sit40721-certificate-iv-in-patisserie-south-australia';

export const metadata: Metadata = {
  title: 'SIT40721 Certificate IV in Patisserie SA | BCTA Culinary Training',
  description:
    'Study SIT40721 Certificate IV in Patisserie in South Australia. 60 weeks including 72 hours commercial kitchen placement. Master cakes, chocolate artistry, pastries, and kitchen supervision.',
  alternates: {
    canonical: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
  },
  openGraph: {
    title: 'SIT40721 Certificate IV in Patisserie | BCTA South Australia',
    description:
      'Nationally accredited patisserie qualification. Master artisan bakery, sugar craft, chocolate confectionery, and commercial kitchen management.',
    url: `https://bcta.edu.au/courses/${COURSE_SLUG}/`,
    siteName: 'Building and Construction Training Australia',
    images: [
      {
        url: '/images/courses/sit40721.jpg',
        width: 1200,
        height: 630,
        alt: 'BCTA SIT40721 Certificate IV in Patisserie',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
};

export default function PatisserieSouthAustraliaRoute() {
  const course = ALL_COURSES[COURSE_SLUG];

  if (!course) {
    notFound();
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'SIT40721 Certificate IV in Patisserie',
    courseCode: 'SIT40721',
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
    educationalCredentialAwarded: 'Certificate IV in Patisserie',
    occupationalCredentialAwarded: 'Chef De Partie / Chef Patissier',
    timeRequired: 'P60W',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Onsite and Commercial Kitchen',
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
