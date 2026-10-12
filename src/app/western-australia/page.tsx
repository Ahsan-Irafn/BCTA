import React from 'react';
import { Metadata } from 'next';
import RegionalStatePage from '@/components/regional/RegionalStatePage';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Building and Construction Courses in Western Australia',
  description:
    'Explore nationally recognised building and construction qualifications in Western Australia with BCTA (RTO # 22597). Carpentry, builder registration, civil operations & patisserie.',
  canonical: '/western-australia',
});

export default function WesternAustraliaPage() {
  return <RegionalStatePage stateKey="wa" />;
}
