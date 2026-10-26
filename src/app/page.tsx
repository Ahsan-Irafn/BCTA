import React from 'react';
import { Metadata } from 'next';
import RegionalStatePage from '@/components/regional/RegionalStatePage';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Building & Construction Courses Australia | BCTA (RTO # 22597)',
  description:
    'Nationally recognised building, construction, and patisserie qualifications delivered across Australia by BCTA (RTO # 22597). Flexible study, hands-on training, and builder licensing pathways.',
  canonical: '/',
});

export default function HomePage() {
  return <RegionalStatePage stateKey="sa" />;
}
