'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Phone, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import styles from './RegisterNowSection.module.css';

interface RegisterNowSectionProps {
  id?: string;
  initialCourse?: string;
  leadSource?: string;
  stateName?: string;
  stateAddress?: string;
}

export default function RegisterNowSection({
  id = 'enq1',
  initialCourse,
  leadSource = 'South Aus form',
}: RegisterNowSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form field states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [course, setCourse] = useState(initialCourse || '-None-');
  const [nationality, setNationality] = useState('-None-');
  const [referral, setReferral] = useState('-None-');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Inline validation errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 1. Entrance animation observer with fallback safety
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.location.hash === '#enq1')
    ) {
      setIsVisible(true);
      return;
    }

    // Safety fallback: ensure section content is never left hidden
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '60px' }
    );

    observer.observe(section);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // 2. Load Zoho SalesIQ and analytics scripts safely once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize $zoho namespace
    const win = window as any;
    win.$zoho = win.$zoho || {};
    win.$zoho.salesiq = win.$zoho.salesiq || {
      widgetcode:
        'siq60c557bb49a2b3b2ca3377ac4281939fb380cb9a0436332406f826c0acb4b40783a794b096447e8368b578bffeee4ff0',
      values: {},
      ready: function () {},
    };

    // Inject SalesIQ widget script if not already added
    if (!document.getElementById('zsiqscript')) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.id = 'zsiqscript';
      s.defer = true;
      s.src = 'https://salesiq.zoho.com/widget';
      document.body.appendChild(s);
    }

    // Check for smarturl parameter on load
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('service') === 'smarturl' && formRef.current) {
        if (!formRef.current.querySelector('input[name="service"]')) {
          const smartInput = document.createElement('input');
          smartInput.type = 'hidden';
          smartInput.name = 'service';
          smartInput.value = 'smarturl';
          formRef.current.appendChild(smartInput);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // 3. Validation helper methods
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First Name cannot be empty.';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last Name cannot be empty.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email cannot be empty.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number cannot be empty.';
    } else if (!/^[0-9+() -]{8,20}$/.test(mobile.trim())) {
      newErrors.mobile = 'Enter a valid contact number.';
    }

    if (!course || course === '-None-') {
      newErrors.course = 'Please select a course.';
    }

    if (!referral || referral === '-None-') {
      newErrors.referral = 'Please tell us how you heard about us.';
    }

    if (!consent) {
      newErrors.consent = 'You must consent to proceed.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 4. Form Submit Handler with Zoho analytics sync
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // If bot filled honeypot, silent drop
    if (honeypot) {
      e.preventDefault();
      return;
    }

    if (!validateForm()) {
      e.preventDefault();
      // Focus first error field for accessibility
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const idMap: { [key: string]: string } = {
          firstName: 'First_Name',
          lastName: 'Last_Name',
          email: 'Email',
          mobile: 'Mobile',
          course: 'LEADCF8',
          referral: 'LEADCF24',
          consent: 'privacyTool5571336000116229005',
        };
        const el = document.getElementById(idMap[firstErrorKey] || '');
        if (el) el.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Sync with Zoho SalesIQ if available
    try {
      const win = window as any;
      const ldtUvid = document.getElementById('LDTuvid') as HTMLInputElement;
      if (win.$zoho?.salesiq?.visitor) {
        if (ldtUvid && typeof win.$zoho.salesiq.visitor.uniqueid === 'function') {
          ldtUvid.value = win.$zoho.salesiq.visitor.uniqueid();
        }
        if (typeof win.$zoho.salesiq.visitor.name === 'function') {
          win.$zoho.salesiq.visitor.name(`${firstName.trim()} ${lastName.trim()}`);
        }
        if (typeof win.$zoho.salesiq.visitor.email === 'function') {
          win.$zoho.salesiq.visitor.email(email.trim());
        }
      }
    } catch {
      // Non-blocking telemetry
    }
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={styles.section}
      aria-label="Registration and Consultation Form"
    >
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Direct Call-Us & Overview matching source site */}
          <div className={`${styles.leftCol} ${isVisible ? styles.leftVisible : ''}`}>
            <h2 className={styles.heroHeading}>
              <span>Register now</span>
              <span className={styles.heroArrow} aria-hidden="true">
                <ArrowRight size={32} />
              </span>
            </h2>

            <p className={styles.heroSubtitle}>
              Please fill in to get detailed information about the course. One of our course
              representatives will be in contact or call us.
            </p>

            <h3 className={styles.callUsTitle}>Call Us</h3>

            <div className={styles.contactRows}>
              <div className={styles.contactRow}>
                <span className={styles.contactRowLeft}>Mon - Friday</span>
                <div className={styles.contactRowRight}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <Clock size={16} />
                  </div>
                  <span>09.30 AM - 05.30 PM</span>
                </div>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactRowLeft}>Phone</span>
                <div className={styles.contactRowRight}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <Phone size={16} />
                  </div>
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className={styles.contactRow}>
                <span className={styles.contactRowLeft}>Email</span>
                <div className={styles.contactRowRight}>
                  <div className={styles.contactIconCircle} aria-hidden="true">
                    <Mail size={16} />
                  </div>
                  <a href={`mailto:${SITE_CONFIG.email}`} className={styles.contactLink}>
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Zoho WebToLeadForm */}
          <div className={`${styles.rightCol} ${isVisible ? styles.rightVisible : ''}`}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Register Now</h3>
              </div>

              {/* Native Zoho Form */}
              <form
                ref={formRef}
                id="webform5571336000116229005"
                action="https://crm.zoho.com/crm/WebToLeadForm"
                name="WebToLeads5571336000116229005"
                method="POST"
                acceptCharset="UTF-8"
                onSubmit={handleSubmit}
                className={styles.form}
                noValidate
              >
                {/* Zoho Hidden Integration Fields */}
                <input
                  type="hidden"
                  name="xnQsjsdp"
                  value="b2847d50c577d26ded82cf486a23a2527b72c35faa7aa5e8fa7d062d881d8db1"
                />
                <input type="hidden" name="zc_gad" id="zc_gad" value="" />
                <input
                  type="hidden"
                  name="xmIwtLD"
                  value="34cbece4052de19a2a9b6b08b42f05b85792428f50d7e9b0f081c244e0c3f21bdf745ea94b41463f16c8733e236a0e75"
                />
                <input type="hidden" name="actionType" value="TGVhZHM=" />
                <input type="hidden" name="returnURL" value="null" />
                <input type="hidden" id="ldeskuid" name="ldeskuid" value="" />
                <input type="hidden" id="LDTuvid" name="LDTuvid" value="" />
                <input type="hidden" name="Lead Source" value={leadSource} />

                {/* Honeypot field (hidden from real users) */}
                <input
                  type="text"
                  name="aG9uZXlwb3Q"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Row 1: First Name & Last Name (2 columns on desktop) */}
                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="First_Name" className={styles.label}>
                      <span>First Name</span> <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      id="First_Name"
                      name="First Name"
                      maxLength={40}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: '' }));
                      }}
                      placeholder="First Name *"
                      autoComplete="given-name"
                      aria-required="true"
                      aria-invalid={!!errors.firstName}
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    />
                    {errors.firstName && (
                      <span className={styles.errorText} role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="Last_Name" className={styles.label}>
                      <span>Last Name</span> <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      id="Last_Name"
                      name="Last Name"
                      maxLength={80}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: '' }));
                      }}
                      placeholder="Last Name *"
                      autoComplete="family-name"
                      aria-required="true"
                      aria-invalid={!!errors.lastName}
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    />
                    {errors.lastName && (
                      <span className={styles.errorText} role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Mobile (2 columns on desktop) */}
                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="Email" className={styles.label}>
                      <span>Email</span> <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="email"
                      id="Email"
                      name="Email"
                      maxLength={100}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="Email *"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    />
                    {errors.email && (
                      <span className={styles.errorText} role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="Mobile" className={styles.label}>
                      <span>Mobile</span> <span className={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="tel"
                      id="Mobile"
                      name="Mobile"
                      maxLength={30}
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                        if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                      }}
                      placeholder="Mobile *"
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={!!errors.mobile}
                      className={`${styles.input} ${errors.mobile ? styles.inputError : ''}`}
                    />
                    {errors.mobile && (
                      <span className={styles.errorText} role="alert">
                        <AlertCircle size={12} aria-hidden="true" />
                        {errors.mobile}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 3: Select Course */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="LEADCF8" className={styles.label}>
                    <span>Course</span> <span className={styles.requiredStar}>*</span>
                  </label>
                  <select
                    id="LEADCF8"
                    name="LEADCF8"
                    value={course}
                    onChange={(e) => {
                      setCourse(e.target.value);
                      if (errors.course) setErrors((prev) => ({ ...prev, course: '' }));
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.course}
                    className={`${styles.select} ${errors.course ? styles.selectError : ''}`}
                  >
                    <option value="-None-">Select Course</option>
                    <option value="CPC40120 Certificate IV in Building &amp; Construction (Building)">
                      CPC40120 Certificate IV in Building &amp; Construction (Building)
                    </option>
                    <option value="CPC50220 Diploma of Building &amp; Construction (Building)">
                      CPC50220 Diploma of Building &amp; Construction (Building)
                    </option>
                    <option value="CPC30220​ Certificate III in Carpentry (Apprenticeship)">
                      CPC30220​ Certificate III in Carpentry (Apprenticeship)
                    </option>
                    <option value="SIT40716 Certificate IV in Patisserie">
                      SIT40716 Certificate IV in Patisserie
                    </option>
                  </select>
                  {errors.course && (
                    <span className={styles.errorText} role="alert">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.course}
                    </span>
                  )}
                </div>

                {/* Row 4: Select Nationality */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="LEADCF29" className={styles.label}>
                    <span>Nationality</span> <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
                  </label>
                  <select
                    id="LEADCF29"
                    name="LEADCF29"
                    value={nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    className={styles.select}
                  >
                    <option value="-None-">Select Nationality</option>
                    <option value="Australian / New Zeland National">
                      Australian / New Zealand National
                    </option>
                    <option value="Permanent Residents of Australia">
                      Permanent Residents of Australia
                    </option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                {/* Row 5: How did you hear about us */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="LEADCF24" className={styles.label}>
                    <span>How did you hear about us</span> <span className={styles.requiredStar}>*</span>
                  </label>
                  <select
                    id="LEADCF24"
                    name="LEADCF24"
                    value={referral}
                    onChange={(e) => {
                      setReferral(e.target.value);
                      if (errors.referral) setErrors((prev) => ({ ...prev, referral: '' }));
                    }}
                    aria-required="true"
                    aria-invalid={!!errors.referral}
                    className={`${styles.select} ${errors.referral ? styles.selectError : ''}`}
                  >
                    <option value="-None-">How did you hear about us</option>
                    <option value="Google">Google</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Sales Person">Sales Person</option>
                  </select>
                  {errors.referral && (
                    <span className={styles.errorText} role="alert">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.referral}
                    </span>
                  )}
                </div>

                {/* Row 6: Consent Checkbox */}
                <div className={styles.fieldGroup}>
                  <label
                    htmlFor="privacyTool5571336000116229005"
                    className={styles.consentRow}
                  >
                    <input
                      type="checkbox"
                      id="privacyTool5571336000116229005"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
                      }}
                      aria-required="true"
                      aria-invalid={!!errors.consent}
                      className={styles.checkbox}
                    />
                    <span className={styles.consentText}>
                      I consent to having store my submitted information so they can respond to my
                      inquiry.
                    </span>
                  </label>
                  {errors.consent && (
                    <span className={styles.errorText} role="alert">
                      <AlertCircle size={12} aria-hidden="true" />
                      {errors.consent}
                    </span>
                  )}
                </div>

                {/* Row 7: Submit Button */}
                <button
                  type="submit"
                  id="formsubmit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
