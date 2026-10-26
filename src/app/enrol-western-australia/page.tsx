import type { Metadata } from 'next';
import EnrolPage from '@/components/enrol/EnrolPage';

export const metadata: Metadata = {
  title: 'Enrol Western Australia | BCTA Course Admissions & Enrolment',
  description:
    'Enrol in nationally accredited building and construction courses in Western Australia. Leederville campus and flexible study modes. Speak with our Perth course advisors today.',
  keywords: [
    'Enrol Western Australia BCTA',
    'Perth construction course enrolment',
    'Diploma of Building and Construction Perth',
    'Certificate IV Building Construction WA',
    'BCTA Leederville enrol online',
  ],
  alternates: {
    canonical: 'https://bcta.edu.au/enrol-western-australia/',
  },
  openGraph: {
    title: 'Enrol Western Australia | BCTA Admissions',
    description: 'Enrol in accredited building and construction courses in Western Australia with BCTA.',
    url: 'https://bcta.edu.au/enrol-western-australia/',
    siteName: 'BCTA - Building & Construction Training Australia',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function EnrolWesternAustraliaRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Building & Construction Training Australia (BCTA) - Western Australia',
            url: 'https://bcta.edu.au/enrol-western-australia/',
            logo: 'https://bcta.edu.au/wp-content/uploads/2026/08/cropped-loigo-bcta.webp',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Unit 1, 220 Carr Pl',
              addressLocality: 'Leederville',
              addressRegion: 'WA',
              postalCode: '6007',
              addressCountry: 'AU',
            },
            telephone: '1300 228 228',
            sameAs: [
              'https://bcta.edu.au/western-australia/',
            ],
          }),
        }}
      />
      <EnrolPage stateKey="wa" />
    </>
  );
}
