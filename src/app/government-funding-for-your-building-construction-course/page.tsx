import React from 'react';
import type { Metadata } from 'next';
import FundingPage from '@/components/funding/FundingPage';

export const metadata: Metadata = {
  title: 'Government Funding for Building & Construction Courses | Skills SA Subsidised Training | BCTA',
  description:
    'Access government subsidised building and construction qualifications in South Australia. Skills SA subsidised fees from $446 for Cert IV and $1,065 for Diploma. Check eligibility now.',
  alternates: {
    canonical: 'https://bcta.edu.au/government-funding-for-your-building-construction-course/',
  },
};

export default function GovernmentFundingPage() {
  return <FundingPage />;
}
