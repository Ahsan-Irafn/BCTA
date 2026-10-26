import type { Metadata } from 'next';
import EnrolPage from '@/components/enrol/EnrolPage';

export const metadata: Metadata = {
  title: 'Enrol South Australia | BCTA Course Admissions & Enrolment',
  description:
    'Enrol in nationally accredited building and construction courses in South Australia. Subsidised training options via Skills SA. Speak with our Adelaide course advisors today.',
  keywords: [
    'Enrol South Australia BCTA',
    'Adelaide construction course enrolment',
    'Skills SA subsidised enrolment',
    'Diploma of Building and Construction Adelaide',
    'Certificate IV Building Construction Adelaide',
    'BCTA enrol online',
  ],
  alternates: {
    canonical: 'https://bcta.edu.au/enrol-south-australia/',
  },
  openGraph: {
    title: 'Enrol South Australia | BCTA Admissions',
    description: 'Enrol in accredited building and construction courses in South Australia with BCTA. Subsidised funding available.',
    url: 'https://bcta.edu.au/enrol-south-australia/',
    siteName: 'BCTA - Building & Construction Training Australia',
    locale: 'en_AU',
    type: 'website',
  },
};

export default function EnrolSouthAustraliaRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'Building & Construction Training Australia (BCTA) - South Australia',
            url: 'https://bcta.edu.au/enrol-south-australia/',
            logo: 'https://bcta.edu.au/wp-content/uploads/2026/08/cropped-loigo-bcta.webp',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Level 30, 91 King William Street',
              addressLocality: 'Adelaide',
              addressRegion: 'SA',
              postalCode: '5000',
              addressCountry: 'AU',
            },
            telephone: '1300 228 228',
            sameAs: [
              'https://bcta.edu.au/south-australia/',
            ],
          }),
        }}
      />
      <EnrolPage stateKey="sa" />
    </>
  );
}
