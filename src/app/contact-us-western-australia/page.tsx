import React from 'react';
import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us Western Australia | BCTA Perth Leederville Campus',
  description:
    'Contact Building & Construction Training Australia (BCTA) in Western Australia. Unit 1, 220 Carr Pl, Leederville WA. Call 1300 228 228 for building and construction course enquiries.',
  alternates: {
    canonical: 'https://bcta.edu.au/contact-us-western-australia/',
  },
};

export default function ContactWesternAustraliaPage() {
  return <ContactPage stateKey="wa" />;
}
