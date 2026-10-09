'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';
import { Phone, Mail, ChevronDown, Menu, X, ExternalLink, LogIn } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className={styles.headerWrapper}>
      {/* Top Utility Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topBarLeft}>
            <span className={styles.rtoBadge}>RTO # 22597</span>
            <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className={styles.topBarItem}>
              <Phone size={14} aria-hidden="true" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className={styles.topBarItem}>
              <Mail size={14} aria-hidden="true" />
              <span>{SITE_CONFIG.email}</span>
            </a>
          </div>

          <div className={styles.topBarRight}>
            <a
              href={SITE_CONFIG.lmsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.studentLoginLink}
            >
              <LogIn size={14} aria-hidden="true" />
              <span>Student Portal Login</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={styles.mainNav} aria-label="Main Navigation">
        <div className={`container ${styles.navContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logoLink} aria-label="BCTA Homepage">
            <Image
              src="/images/logo.png"
              alt="BCTA - Building & Construction Training Australia"
              width={160}
              height={50}
              priority
              className={styles.logoImage}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className={styles.desktopNavList}>
            {NAV_LINKS.map((link) => (
              <li key={link.label} className={styles.navItem}>
                {link.children ? (
                  <>
                    <button className={styles.navLink} aria-haspopup="true">
                      {link.label}
                      <ChevronDown size={14} aria-hidden="true" />
                    </button>
                    <ul className={styles.dropdown} role="menu">
                      {link.children.map((child) => (
                        <li key={child.label} className={styles.dropdownItem} role="none">
                          {child.external ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              role="menuitem"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link href={child.href} role="menuitem">
                              {child.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : link.href.startsWith('http') ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={styles.navLink}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className={styles.navActions}>
            <a
              href="https://bcta.edu.au/south-australia/#enquire"
              className={styles.applyBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Online
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className={styles.mobileMenuToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <ul className={styles.mobileNavList}>
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              {link.children ? (
                <div>
                  <span className={styles.mobileNavLink}>{link.label}</span>
                  <ul className={styles.mobileSubMenu}>
                    {link.children.map((child) => (
                      <li key={child.label}>
                        <a
                          href={child.href}
                          onClick={() => setMobileMenuOpen(false)}
                          {...(child.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                  {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className={styles.mobileDrawerActions}>
          <a
            href="https://bcta.edu.au/south-australia/#enquire"
            className={styles.mobileApplyBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Online
          </a>
          <a
            href={SITE_CONFIG.lmsUrl}
            className={styles.mobileStudentBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            Student Portal Login
          </a>
        </div>
      </div>
    </header>
  );
}
