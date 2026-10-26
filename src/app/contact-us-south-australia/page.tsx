import React from 'react';
import type { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us South Australia | BCTA Adelaide Campus',
  description:
    'Contact Building & Construction Training Australia (BCTA) in South Australia. Level 30, 91 King William St Adelaide. Call 1300 11 2282 for course enquiries and Skills SA funding.',
  alternates: {
    canonical: 'https://bcta.edu.au/contact-us-south-australia/',
  },
};

export default function ContactSouthAustraliaPage() {
  return <ContactPage stateKey="sa" />;
}
