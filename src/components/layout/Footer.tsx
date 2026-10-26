import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Phone, Globe, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
  currentState?: 'sa' | 'wa' | 'vic';
}

export default function Footer({ currentState = 'sa' }: FooterProps) {
  const isWA = currentState === 'wa';

  const exploreLinks = isWA
    ? [
        { label: 'Fees', href: '/fees', external: true },
        { label: 'Forms', href: 'https://bcta.edu.au/forms-western-australia/', external: true },
        { label: 'Referral Agents', href: null },
        { label: 'RPL / RCC & CT', href: null },
        { label: 'Privacy Policy', href: '/privacy-policy', external: false },
      ]
    : [
        { label: 'Fees', href: '/fees', external: true },
        { label: 'Government Funding', href: '/government-funding-for-your-building-construction-course', external: false },
        { label: 'Forms', href: '/forms', external: true },
        { label: 'Privacy Policy', href: '/privacy-policy', external: false },
      ];

  const contactLinks = isWA
    ? [
        { label: 'About Us', href: 'https://bcta.edu.au/about-us-western-australia/', external: true },
        { label: 'Reviews', href: 'https://bcta.edu.au/reviews-western-australia/', external: true },
        { label: 'Contact Us', href: '/contact-us-western-australia', external: false },
      ]
    : [
        { label: 'Contact Us', href: '/contact-us-south-australia', external: false },
        { label: 'About Us', href: 'https://bcta.edu.au/about-us-south-australia/', external: true },
        { label: 'Reviews', href: 'https://bcta.edu.au/reviews-south-australia/', external: true },
      ];

  const applyOnlineUrl = isWA
    ? '/enrol-western-australia#enrol-form'
    : '/enrol-south-australia#enrol-form';

  const addressText = isWA
    ? 'Unit 1, 220 Carr Pl, Leederville WA 6007, Australia'
    : 'Level 30, 91 King William Street Adelaide SA 5000';

  const mapUrl = isWA
    ? 'https://maps.google.com/?q=Unit+1+220+Carr+Pl+Leederville+WA+6007+Australia'
    : 'https://maps.google.com/?q=Level+30+91+King+William+Street+Adelaide+SA+5000';

  return (
    <footer className={styles.siteFooter} id="colophon">
      {/* 1. Main Footer 4-Column Grid */}
      <div className={styles.footerMain}>
        <div className={`container ${styles.footerGrid}`}>
          {/* Col 1: Logo & RTO Details */}
          <div className={styles.colLogo}>
            <Link href={isWA ? '/western-australia' : '/south-australia'} aria-label="BCTA Home">
              <Image
                src="/images/logo-white.png"
                alt="BCTA - Building & Construction Training Australia"
                width={180}
                height={55}
                className={styles.footerLogo}
              />
            </Link>
            <p className={styles.rtoText}>
              <strong>RTO#</strong> 22597
            </p>
            <div className={styles.socialRow} aria-label="Social media links">
              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.socialLinks.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Pinterest"
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.379-.057.237-.189.287-.436.172-1.629-.758-2.646-3.136-2.646-5.048 0-4.113 2.989-7.892 8.62-7.892 4.526 0 8.044 3.226 8.044 7.538 0 4.5-2.836 8.121-6.772 8.121-1.322 0-2.565-.688-2.991-1.501l-.814 3.104c-.295 1.127-1.093 2.54-1.628 3.407 1.214.375 2.508.579 3.847.579 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Indigenous & Torres Strait Islander Flags + Acknowledgement */}
          <div className={styles.colAcknowledgement}>
            <div className={styles.flagRow}>
              <Image
                src="/images/flags/torres-strait-islander-flag.jpg"
                alt="Torres Strait Islander flag"
                width={70}
                height={46}
                className={styles.flagImg}
              />
              <Image
                src="/images/flags/aboriginal-flag.png"
                alt="Aboriginal flag"
                width={70}
                height={46}
                className={styles.flagImg}
              />
            </div>
            <p className={styles.acknowledgementText}>
              We respectfully acknowledge the Traditional Owners and First Peoples of country throughout where we deliver training and live; and we pay respect to their cultures and Elders past, present and emerging
            </p>
          </div>

          {/* Col 3: Explore */}
          <div>
            <h5 className={styles.colHeading}>Explore</h5>
            <ul className={styles.footerLinkList}>
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                      {item.label}
                    </a>
                  ) : (
                    <span className={styles.disabledLink}>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Action Buttons */}
          <div className={styles.colContact}>
            <h5 className={styles.colHeading}>Contact</h5>
            <ul className={styles.footerLinkList}>
              {contactLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.footerButtons}>
              <Link
                href={applyOnlineUrl}
                className={styles.btnApply}
              >
                APPLY ONLINE
              </Link>
              <a
                href={SITE_CONFIG.lmsUrl}
                className={styles.btnLogin}
                target="_blank"
                rel="noopener noreferrer"
              >
                STUDENT LOGIN
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Contact Bar / Topbar */}
      <div className={styles.contactStrip}>
        <div className={`container ${styles.contactStripInner}`}>
          {/* Phone */}
          <a className={styles.contactItem} href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`}>
            <Phone size={16} className={styles.contactIcon} aria-hidden="true" />
            <span>{SITE_CONFIG.phone}</span>
          </a>

          {/* Website */}
          <a
            className={styles.contactItem}
            href="https://www.bcta.edu.au/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe size={16} className={styles.contactIcon} aria-hidden="true" />
            <span>www.bcta.edu.au</span>
          </a>

          {/* Email */}
          <a className={styles.contactItem} href={`mailto:${SITE_CONFIG.email}`}>
            <Mail size={16} className={styles.contactIcon} aria-hidden="true" />
            <span>{SITE_CONFIG.email}</span>
          </a>

          {/* State Specific Office Address */}
          <a
            className={styles.contactItem}
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={16} className={styles.contactIcon} aria-hidden="true" />
            <span>{addressText}</span>
          </a>
        </div>
      </div>

      {/* 3. Copyright Bar */}
      <div className={styles.copyrightBar}>
        <div className="container">
          <p className={styles.copyrightText}>
            © 2026 All rights reserved by BCTA - Building and Construction Training Australia
          </p>
        </div>
      </div>
    </footer>
  );
}
