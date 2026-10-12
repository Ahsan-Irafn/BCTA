'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Clock, Phone, Mail, ArrowRight, AlertCircle, ShieldCheck, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import styles from './RegisterNowSection.module.css';

interface RegisterNowSectionProps {
  initialCourse?: string;
  leadSource?: string;
  stateName?: string;
  stateAddress?: string;
}

export default function RegisterNowSection({
  initialCourse,
  leadSource = 'South Aus form',
  stateName,
  stateAddress,
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

  // 1. Entrance animation observer
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '40px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
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

  // 3. Validation and submission handling
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Validate Honeypot first
    if (honeypot) {
      e.preventDefault();
      return;
    }

    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First Name cannot be empty.';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last Name cannot be empty.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email cannot be empty.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number cannot be empty.';
    }

    if (course === '-None-') {
      newErrors.course = 'Please select a course.';
    }

    if (referral === '-None-') {
      newErrors.referral = 'Please select how you heard about us.';
    }

    if (!consent) {
      newErrors.consent = 'Please accept consent to submit your enquiry.';
    }

    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);

      // Focus first invalid field
      const firstErrorField = Object.keys(newErrors)[0];
      const fieldIdMap: { [key: string]: string } = {
        firstName: 'First_Name',
        lastName: 'Last_Name',
        email: 'Email',
        mobile: 'Mobile',
        course: 'LEADCF8',
        referral: 'LEADCF24',
        consent: 'privacyTool5571336000116229005',
      };
      const elementToFocus = document.getElementById(fieldIdMap[firstErrorField]);
      if (elementToFocus) {
        elementToFocus.focus();
      }
      return;
    }

    // Validation succeeded: clear errors and run visitor tracking
    setErrors({});
    setIsSubmitting(true);

    try {
      const win = window as any;
      if (win.$zoho?.salesiq?.visitor) {
        const ldtUvid = document.getElementById('LDTuvid') as HTMLInputElement | null;
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
      // Tracking failures must not block enquiry submission
    }

    // Set document charset UTF-8 before submitting
    try {
      (document as any).charset = 'UTF-8';
    } catch {
      // Ignore
    }

    // Native HTML form POST will continue to https://crm.zoho.com/crm/WebToLeadForm
  };

  return (
    <section
      ref={sectionRef}
      id="register-now"
      className={styles.section}
      aria-label="Register Now and Course Enquiry"
    >
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Intro, Authentic Training Photo & Contact Details */}
          <div className={`${styles.leftCol} ${isVisible ? styles.leftVisible : ''}`}>
            <div className={styles.badge}>
              <span>02 // Enrolment &amp; Advisory</span>
            </div>

            <h2 className={styles.title}>
              Take the next step in your construction career
            </h2>

            <p className={styles.introText}>
              Please fill in your details to receive comprehensive course guides, unit outlines, and
              timetable schedules. One of our specialist course advisors will be in touch, or call us
              directly.
            </p>

            {/* Framed authentic training image with offset decorative layer */}
            <div className={styles.imageFrame}>
              <div className={styles.imageFrameOffset} aria-hidden="true" />
              <div className={styles.imageContainer}>
                <Image
                  src="/images/builders/builder-01.jpg"
                  alt="BCTA building and construction students in practical training"
                  width={640}
                  height={400}
                  className={styles.image}
                />
              </div>
            </div>

            {/* Contact details card */}
            <div className={styles.contactCard}>
              <h3 className={styles.contactTitle}>Admissions &amp; Consultation</h3>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIcon} aria-hidden="true">
                    <Clock size={16} />
                  </div>
                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>Opening Hours</span>
                    <span>Monday – Friday: 09:30 AM – 05:30 PM (ACST / AWST)</span>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon} aria-hidden="true">
                    <Phone size={16} />
                  </div>
                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>Direct Inquiries Phone</span>
                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <div className={styles.contactIcon} aria-hidden="true">
                    <Mail size={16} />
                  </div>
                  <div className={styles.contactContent}>
                    <span className={styles.contactLabel}>Email Admissions</span>
                    <a href={`mailto:${SITE_CONFIG.email}`} className={styles.contactLink}>
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                {stateAddress && (
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon} aria-hidden="true">
                      <MapPin size={16} />
                    </div>
                    <div className={styles.contactContent}>
                      <span className={styles.contactLabel}>{stateName ? `${stateName} Training Facility` : 'Campus Facility'}</span>
                      <span>{stateAddress}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Zoho WebToLeadForm */}
          <div className={`${styles.rightCol} ${isVisible ? styles.rightVisible : ''}`}>
            <div className={styles.formPanel}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Register Now</h3>
                <p className={styles.formSubtitle}>
                  Submit your details below to receive full syllabus information and fast-track your
                  course registration.
                </p>
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

                {/* Row 1: First Name & Last Name */}
                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="First_Name" className={styles.label}>
                      First Name <span className={styles.requiredStar}>*</span>
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
                      placeholder="e.g. John"
                      autoComplete="given-name"
                      aria-required="true"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstNameError' : undefined}
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                    />
                    {errors.firstName && (
                      <span id="firstNameError" className={styles.errorText} role="alert">
                        <AlertCircle size={13} aria-hidden="true" />
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="Last_Name" className={styles.label}>
                      Last Name <span className={styles.requiredStar}>*</span>
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
                      placeholder="e.g. Smith"
                      autoComplete="family-name"
                      aria-required="true"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastNameError' : undefined}
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                    />
                    {errors.lastName && (
                      <span id="lastNameError" className={styles.errorText} role="alert">
                        <AlertCircle size={13} aria-hidden="true" />
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Mobile */}
                <div className={styles.twoColRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="Email" className={styles.label}>
                      Email <span className={styles.requiredStar}>*</span>
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
                      placeholder="e.g. john.smith@example.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'emailError' : undefined}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    />
                    {errors.email && (
                      <span id="emailError" className={styles.errorText} role="alert">
                        <AlertCircle size={13} aria-hidden="true" />
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label htmlFor="Mobile" className={styles.label}>
                      Mobile <span className={styles.requiredStar}>*</span>
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
                      placeholder="e.g. 0400 000 000"
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={!!errors.mobile}
                      aria-describedby={errors.mobile ? 'mobileError' : undefined}
                      className={`${styles.input} ${errors.mobile ? styles.inputError : ''}`}
                    />
                    {errors.mobile && (
                      <span id="mobileError" className={styles.errorText} role="alert">
                        <AlertCircle size={13} aria-hidden="true" />
                        {errors.mobile}
                      </span>
                    )}
                  </div>
                </div>

                {/* Field 3: Course Dropdown */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="LEADCF8" className={styles.label}>
                    Course <span className={styles.requiredStar}>*</span>
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
                    aria-describedby={errors.course ? 'courseError' : undefined}
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
                    <span id="courseError" className={styles.errorText} role="alert">
                      <AlertCircle size={13} aria-hidden="true" />
                      {errors.course}
                    </span>
                  )}
                </div>

                {/* Field 4: Nationality Dropdown (Optional) */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="LEADCF29" className={styles.label}>
                    Nationality <span style={{ color: '#94a3b8', fontWeight: 400 }}>(Optional)</span>
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

                {/* Field 5: How did you hear about us Dropdown */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="LEADCF24" className={styles.label}>
                    How did you hear about us <span className={styles.requiredStar}>*</span>
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
                    aria-describedby={errors.referral ? 'referralError' : undefined}
                    className={`${styles.select} ${errors.referral ? styles.selectError : ''}`}
                  >
                    <option value="-None-">How did you hear about us</option>
                    <option value="Google">Google</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Sales Person">Sales Person</option>
                  </select>
                  {errors.referral && (
                    <span id="referralError" className={styles.errorText} role="alert">
                      <AlertCircle size={13} aria-hidden="true" />
                      {errors.referral}
                    </span>
                  )}
                </div>

                {/* Field 6: Consent Checkbox */}
                <div className={styles.fieldGroup}>
                  <label
                    htmlFor="privacyTool5571336000116229005"
                    className={styles.consentGroup}
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
                      aria-describedby={errors.consent ? 'consentError' : undefined}
                      className={styles.checkbox}
                    />
                    <span className={styles.consentText}>
                      I consent to having store my submitted information so they can respond to my
                      inquiry.
                    </span>
                  </label>
                  {errors.consent && (
                    <span id="consentError" className={styles.errorText} role="alert">
                      <AlertCircle size={13} aria-hidden="true" />
                      {errors.consent}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  id="formsubmit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                  <ArrowRight size={18} className={styles.submitBtnIcon} aria-hidden="true" />
                </button>

                <p className={styles.formDisclaimer}>
                  Your privacy is important to us. Submitted details are processed securely in accordance
                  with Australian Privacy Principles.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
