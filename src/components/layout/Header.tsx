'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, ExternalLink } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  currentState?: 'sa' | 'wa' | 'vic';
}

export default function Header({ currentState = 'sa' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [licensingOpen, setLicensingOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const stateMenuRef = useRef<HTMLDivElement>(null);

  const isWA = currentState === 'wa';
  const homeHref = isWA ? '/western-australia' : '/south-australia';

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (stateMenuRef.current && !stateMenuRef.current.contains(e.target as Node)) {
        setStateOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  return (
    <header className={styles.header} role="banner">
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href={homeHref} className={styles.logoLink} aria-label="BCTA Homepage">
          <Image
            src="/images/logo.png"
            alt="BCTA - Building & Construction Training Australia"
            width={160}
            height={50}
            priority
            className={styles.logoImage}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary Navigation">
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href={homeHref} className={styles.navLink}>
                Home
              </Link>
            </li>

            {/* Courses Dropdown */}
            <li
              className={styles.navItem}
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button
                className={styles.navLink}
                aria-haspopup="true"
                aria-expanded={coursesOpen}
                onClick={() => setCoursesOpen(!coursesOpen)}
              >
                <span>Courses</span>
                <ChevronDown size={14} className={styles.navChevron} aria-hidden="true" />
              </button>
              <AnimatePresence>
                {coursesOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.dropdown}
                    role="menu"
                  >
                    {isWA ? (
                      /* Western Australia Courses Dropdown */
                      <>
                        <li className={styles.dropdownItem} role="none">
                          <Link href="/courses/diploma-of-building-and-construction-western-australia" role="menuitem">
                            Diploma of Building and Construction (Building)
                          </Link>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <a
                            href="https://bcta.edu.au/courses/certificate-iv-in-building-construction-building-western-australia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                          >
                            Certificate IV in Building &amp; Construction (Building)
                          </a>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <a
                            href="https://bcta.edu.au/courses/sit40721-certificate-iv-in-patisserie-western-australia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                          >
                            Certificate IV in Patisserie
                          </a>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <a
                            href="https://bcta.edu.au/courses/certificate-iii-in-civil-construction-plant-operations-western-australia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                          >
                            Certificate III in Civil Construction Plant Operations
                          </a>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <a
                            href="https://bcta.edu.au/courses/certificate-iii-in-carpentry-western-australia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                          >
                            Certificate III in Carpentry
                          </a>
                        </li>
                      </>
                    ) : (
                      /* South Australia Courses Dropdown */
                      <>
                        <li className={styles.dropdownItem} role="none">
                          <Link href="/courses/diploma-of-building-and-construction-south-australia" role="menuitem">
                            Diploma of Building and Construction (Building)
                          </Link>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <Link href="/courses/certificate-iv-in-building-construction-building-south-australia" role="menuitem">
                            Certificate IV in Building and Construction (Building)
                          </Link>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <Link href="/courses/sit40721-certificate-iv-in-patisserie-south-australia" role="menuitem">
                            SIT40721 and Certificate IV in Patisserie
                          </Link>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <Link href="/courses/certificate-iii-in-civil-construction-plant-operations-south-australia" role="menuitem">
                            Certificate III in Civil Construction Plant Operations
                          </Link>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <Link href="/courses/certificate-iii-in-carpentry-south-australia" role="menuitem">
                            Certificate III in Carpentry
                          </Link>
                        </li>
                      </>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Enrol Link */}
            <li className={styles.navItem}>
              <Link
                href={isWA ? '/enrol-western-australia' : '/enrol-south-australia'}
                className={styles.navLink}
              >
                Enrol
              </Link>
            </li>

            {isWA ? (
              /* Western Australia Specific Main Nav Items */
              <>
                <li className={styles.navItem}>
                  <a
                    href="https://bcta.edu.au/about-us-western-australia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    About Us
                  </a>
                </li>
                <li className={styles.navItem}>
                  <Link href="/contact-us-western-australia" className={styles.navLink}>
                    Contact Us
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <a
                    href="https://bcta.edu.au/reviews-western-australia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    Reviews
                  </a>
                </li>
              </>
            ) : (
              /* South Australia Specific Main Nav Items */
              <>
                {/* Licensing Dropdown */}
                <li
                  className={styles.navItem}
                  onMouseEnter={() => setLicensingOpen(true)}
                  onMouseLeave={() => setLicensingOpen(false)}
                >
                  <button
                    className={styles.navLink}
                    aria-haspopup="true"
                    aria-expanded={licensingOpen}
                    onClick={() => setLicensingOpen(!licensingOpen)}
                  >
                    <span>Licensing</span>
                    <ChevronDown size={14} className={styles.navChevron} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {licensingOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.dropdown}
                        role="menu"
                      >
                        <li className={styles.dropdownItem} role="none">
                          <a
                            href="https://bcta.edu.au/how-to-become-a-licensed-builder-in-south-australia/"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                          >
                            How to become a licensed builder in South Australia
                          </a>
                        </li>
                        <li className={styles.dropdownItem} role="none">
                          <a
                            href="https://bcta.edu.au/sa-building-work-contractor-licence-the-complete-guide/"
                            target="_blank"
                            rel="noopener noreferrer"
                            role="menuitem"
                          >
                            SA Building Work Contractor Licence: the Complete Guide
                          </a>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                <li className={styles.navItem}>
                  <a
                    href="https://bcta.edu.au/student-support/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    Student Support
                  </a>
                </li>

                <li className={styles.navItem}>
                  <Link href="/contact-us-south-australia" className={styles.navLink}>
                    Contact Us
                  </Link>
                </li>

                <li className={styles.navItem}>
                  <Link
                    href="/government-funding-for-your-building-construction-course"
                    className={styles.navLink}
                  >
                    Funding
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Action Buttons: Apply Online (WA only), Student Login & State Selector */}
        <div className={styles.actionsGroup}>
          {isWA && (
            <Link
              href="/enrol-western-australia#enrol-form"
              className={styles.applyOnlineBtn}
            >
              Apply online
            </Link>
          )}

          <a
            href="https://lms.bcta.vic.edu.au/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.studentLoginBtn}
          >
            STUDENT LOGIN
          </a>

          <div className={styles.stateDropdownWrapper} ref={stateMenuRef}>
            <button
              type="button"
              className={styles.stateBtn}
              onClick={(e) => {
                e.stopPropagation();
                setStateOpen(!stateOpen);
              }}
              aria-haspopup="true"
              aria-expanded={stateOpen}
            >
              <span>{isWA ? 'Western Australia' : currentState === 'vic' ? 'Victoria' : 'South Australia'}</span>
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            <AnimatePresence>
              {stateOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.stateDropdown}
                  role="menu"
                >
                  <li className={`${styles.stateItem} ${currentState === 'vic' ? styles.stateItemActive : ''}`} role="none">
                    <a href="https://www.bcta.vic.edu.au/home" target="_blank" rel="noopener noreferrer" role="menuitem">
                      <span>Victoria</span>
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </li>
                  <li className={`${styles.stateItem} ${!isWA && currentState !== 'vic' ? styles.stateItemActive : ''}`} role="none">
                    <Link href="/south-australia" role="menuitem" onClick={() => setStateOpen(false)}>
                      <span>South Australia</span>
                    </Link>
                  </li>
                  <li className={`${styles.stateItem} ${isWA ? styles.stateItemActive : ''}`} role="none">
                    <Link href="/western-australia" role="menuitem" onClick={() => setStateOpen(false)}>
                      <span>Western Australia</span>
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className={styles.mobileMenuToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation (Motion Animated) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={styles.mobileDrawer}
          >
            <ul className={styles.mobileNavList}>
              <li className={styles.mobileNavItem}>
                <Link href={homeHref} className={styles.mobileNavLink} onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
              </li>
              <li className={styles.mobileNavItem}>
                <button
                  className={styles.mobileNavLink}
                  onClick={() => setCoursesOpen(!coursesOpen)}
                >
                  <span>Courses</span>
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {coursesOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className={styles.mobileSubList}
                    >
                      {isWA ? (
                        <>
                          <li>
                            <Link href="/courses/diploma-of-building-and-construction-western-australia" onClick={() => setMobileOpen(false)}>
                              Diploma of Building and Construction (Building)
                            </Link>
                          </li>
                          <li>
                            <a href="https://bcta.edu.au/courses/certificate-iv-in-building-construction-building-western-australia/" target="_blank" rel="noopener noreferrer">
                              Certificate IV in Building &amp; Construction (Building)
                            </a>
                          </li>
                          <li>
                            <a href="https://bcta.edu.au/courses/sit40721-certificate-iv-in-patisserie-western-australia/" target="_blank" rel="noopener noreferrer">
                              Certificate IV in Patisserie
                            </a>
                          </li>
                          <li>
                            <a href="https://bcta.edu.au/courses/certificate-iii-in-civil-construction-plant-operations-western-australia/" target="_blank" rel="noopener noreferrer">
                              Certificate III in Civil Construction Plant Operations
                            </a>
                          </li>
                          <li>
                            <a href="https://bcta.edu.au/courses/certificate-iii-in-carpentry-western-australia/" target="_blank" rel="noopener noreferrer">
                              Certificate III in Carpentry
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link href="/courses/diploma-of-building-and-construction-south-australia" onClick={() => setMobileOpen(false)}>
                              Diploma of Building and Construction (Building)
                            </Link>
                          </li>
                          <li>
                            <Link href="/courses/certificate-iv-in-building-construction-building-south-australia" onClick={() => setMobileOpen(false)}>
                              Certificate IV in Building and Construction (Building)
                            </Link>
                          </li>
                          <li>
                            <Link href="/courses/sit40721-certificate-iv-in-patisserie-south-australia" onClick={() => setMobileOpen(false)}>
                              SIT40721 and Certificate IV in Patisserie
                            </Link>
                          </li>
                          <li>
                            <Link href="/courses/certificate-iii-in-civil-construction-plant-operations-south-australia" onClick={() => setMobileOpen(false)}>
                              Certificate III in Civil Construction Plant Operations
                            </Link>
                          </li>
                          <li>
                            <Link href="/courses/certificate-iii-in-carpentry-south-australia" onClick={() => setMobileOpen(false)}>
                              Certificate III in Carpentry
                            </Link>
                          </li>
                        </>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li className={styles.mobileNavItem}>
                <Link
                  href={isWA ? '/enrol-western-australia' : '/enrol-south-australia'}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileOpen(false)}
                >
                  Enrol
                </Link>
              </li>

              {isWA ? (
                <>
                  <li className={styles.mobileNavItem}>
                    <a href="https://bcta.edu.au/about-us-western-australia/" target="_blank" rel="noopener noreferrer" className={styles.mobileNavLink}>
                      About Us
                    </a>
                  </li>
                  <li className={styles.mobileNavItem}>
                    <Link
                      href="/contact-us-western-australia"
                      className={styles.mobileNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className={styles.mobileNavItem}>
                    <a href="https://bcta.edu.au/reviews-western-australia/" target="_blank" rel="noopener noreferrer" className={styles.mobileNavLink}>
                      Reviews
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className={styles.mobileNavItem}>
                    <button
                      className={styles.mobileNavLink}
                      onClick={() => setLicensingOpen(!licensingOpen)}
                    >
                      <span>Licensing</span>
                      <ChevronDown size={16} />
                    </button>
                    <AnimatePresence>
                      {licensingOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className={styles.mobileSubList}
                        >
                          <li>
                            <a href="https://bcta.edu.au/how-to-become-a-licensed-builder-in-south-australia/" target="_blank" rel="noopener noreferrer">
                              How to become a licensed builder in South Australia
                            </a>
                          </li>
                          <li>
                            <a href="https://bcta.edu.au/sa-building-work-contractor-licence-the-complete-guide/" target="_blank" rel="noopener noreferrer">
                              SA Building Work Contractor Licence: the Complete Guide
                            </a>
                          </li>
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                  <li className={styles.mobileNavItem}>
                    <a href="https://bcta.edu.au/student-support/" target="_blank" rel="noopener noreferrer" className={styles.mobileNavLink}>
                      Student Support
                    </a>
                  </li>
                  <li className={styles.mobileNavItem}>
                    <Link
                      href="/contact-us-south-australia"
                      className={styles.mobileNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li className={styles.mobileNavItem}>
                    <Link
                      href="/government-funding-for-your-building-construction-course"
                      className={styles.mobileNavLink}
                      onClick={() => setMobileOpen(false)}
                    >
                      Funding
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Mobile Action Buttons */}
            <div className={styles.mobileActions}>
              {isWA && (
                <Link
                  href="/enrol-western-australia#enrol-form"
                  className={styles.applyOnlineBtn}
                  style={{ width: '100%', textAlign: 'center' }}
                  onClick={() => setMobileOpen(false)}
                >
                  APPLY ONLINE
                </Link>
              )}
              <a
                href="https://lms.bcta.vic.edu.au/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.studentLoginBtn}
                style={{ width: '100%', textAlign: 'center' }}
              >
                STUDENT LOGIN
              </a>
              <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                <Link
                  href="/south-australia"
                  className={styles.stateBtn}
                  style={{ flex: 1, justifyContent: 'center', background: !isWA ? '#163058' : '#334155' }}
                  onClick={() => setMobileOpen(false)}
                >
                  South Australia
                </Link>
                <Link
                  href="/western-australia"
                  className={styles.stateBtn}
                  style={{ flex: 1, justifyContent: 'center', background: isWA ? '#163058' : '#334155' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Western Australia
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
