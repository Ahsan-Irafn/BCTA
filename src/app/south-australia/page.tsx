import React from 'react';
import { Metadata } from 'next';
import RegionalStatePage from '@/components/regional/RegionalStatePage';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Building and Construction Courses in South Australia',
  description:
    'Explore nationally recognised building and construction qualifications in South Australia with BCTA (RTO # 22597). Carpentry, builder registration, civil operations & patisserie.',
  canonical: '/south-australia',
});

export default function SouthAustraliaPage() {
  return <RegionalStatePage stateKey="sa" />;
}
