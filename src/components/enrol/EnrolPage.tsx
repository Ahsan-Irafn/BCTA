'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Award, 
  FileText, 
  Users, 
  Check, 
  ChevronRight,
  Clock,
  Sparkles
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './EnrolPage.module.css';

interface EnrolPageProps {
  stateKey: 'sa' | 'wa';
}

export default function EnrolPage({ stateKey }: EnrolPageProps) {
  const isWA = stateKey === 'wa';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    nationality: '',
    hearAbout: '',
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Authentic State Configuration
  const stateTitle = isWA ? 'Western Australia' : 'South Australia';
  const stateCode = isWA ? 'WA' : 'SA';
  const homeHref = isWA ? '/western-australia' : '/south-australia';

  const zohoConfig = isWA
    ? {
        formId: 'webform5571336000116260001',
        xnQsjsdp: 'd1d677536ccaa9d8b947b30000e7b963a07a686b7ca23ab8f5fde022af52f144',
        xmIwtLD: '9e55873a116d39be39ef15800be1db3994b7453ffe7a46daf7bc1fd79b7fe21e1cb3188b7f1788608692d6518a1fc1a5',
        leadSource: 'Western Aus Form',
        officeAddress: 'Unit 1, 220 Carr Pl, Leederville WA 6007, Australia',
        phone: '1300 228 228',
        email: 'info@bcta.edu.au',
      }
    : {
        formId: 'webform5571336000116229005',
        xnQsjsdp: 'b2847d50c577d26ded82cf486a23a2527b72c35faa7aa5e8fa7d062d881d8db1',
        xmIwtLD: '34cbece4052de19a2a9b6b08b42f05b85792428f50d7e9b0f081c244e0c3f21bdf745ea94b41463f16c8733e236a0e75',
        leadSource: 'South Aus form',
        officeAddress: 'Level 30, 91 King William Street Adelaide SA 5000',
        phone: '1300 228 228',
        email: 'info@bcta.edu.au',
      };

  // Authentic Courses
  const courseOptions = isWA
    ? [
        { value: 'CPC50220 Diploma of Building & Construction (Building)', label: 'CPC50220 Diploma of Building & Construction (Building)' },
        { value: 'CPC40120 Certificate IV in Building & Construction (Building)', label: 'CPC40120 Certificate IV in Building & Construction (Building)' },
        { value: 'SIT40716 Certificate IV in Patisserie', label: 'SIT40721 Certificate IV in Patisserie' },
        { value: 'Certificate III in Civil Construction Plant Operations', label: 'Certificate III in Civil Construction Plant Operations' },
        { value: 'CPC30220 Certificate III in Carpentry (Apprenticeship)', label: 'CPC30220 Certificate III in Carpentry' },
      ]
    : [
        { value: 'CPC50220 Diploma of Building & Construction (Building)', label: 'CPC50220 Diploma of Building & Construction (Building)' },
        { value: 'CPC40120 Certificate IV in Building & Construction (Building)', label: 'CPC40120 Certificate IV in Building & Construction (Building)' },
        { value: 'SIT40716 Certificate IV in Patisserie', label: 'SIT40721 Certificate IV in Patisserie' },
        { value: 'Certificate III in Civil Construction Plant Operations', label: 'Certificate III in Civil Construction Plant Operations' },
        { value: 'CPC30220 Certificate III in Carpentry (Apprenticeship)', label: 'CPC30220 Certificate III in Carpentry' },
      ];

  // Authentic 6-Step Workflow Pipeline
  const enrolSteps = [
    {
      step: '01',
      title: 'Course & Needs Discovery',
      desc: 'Ensure you pick the right course to meet your career goals, licensing plans, and personal development needs.',
      tag: 'Step 1 • Discovery',
      icon: <GraduationCap size={24} />,
    },
    {
      step: '02',
      title: 'Content & Assessment Overview',
      desc: 'Receive a comprehensive overview of core and elective units, assessment methods, and study timetables.',
      tag: 'Step 2 • Curriculum',
      icon: <BookOpen size={24} />,
    },
    {
      step: '03',
      title: 'Policies & Code of Conduct',
      desc: 'Review BCTA student policies and procedures, academic integrity, and our formal Student Code of Conduct.',
      tag: 'Step 3 • Compliance',
      icon: <ShieldCheck size={24} />,
    },
    {
      step: '04',
      title: 'Prior Training & RPL Assessment',
      desc: 'Evaluate past trade experience, formal qualifications, or first aid credentials for Recognition of Prior Learning.',
      tag: 'Step 4 • Credit',
      icon: <Award size={24} />,
    },
    {
      step: '05',
      title: 'Support & Adjustments (LLND)',
      desc: 'Identify whether you require additional Language, Literacy, Numeracy or Digital study support for your course.',
      tag: 'Step 5 • Student Care',
      icon: <Users size={24} />,
    },
    {
      step: '06',
      title: 'Fees, Funding & Enrolment Form',
      desc: 'Finalise government funding eligibility, payment schedules, refund policies, and complete your registration.',
      tag: 'Step 6 • Completion',
      icon: <FileText size={24} />,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!formData.consent) {
      e.preventDefault();
      setErrorMsg('Please accept the consent checkbox to submit your enquiry.');
      return;
    }
    setErrorMsg('');
    setSubmitting(true);
    // Form will proceed to POST to Zoho WebToLeadForm
  };

  return (
    <div className={styles.pageWrapper}>
      <Header currentState={stateKey} />

      {/* 1. HERO SECTION */}
      <section className={styles.heroSection} aria-label="Enrolment Hero">
        <div className={styles.heroBackgroundPattern} />
        <div className={styles.heroGlowOrb} />

        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href={homeHref} className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <Link href={homeHref} className={styles.breadcrumbLink}>
              {stateTitle}
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive}>Enrol</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroTextCol}>
              <div className={styles.badgeGroup}>
                <span className={styles.rtoBadge}>
                  <ShieldCheck size={14} /> RTO #45145
                </span>
                <span className={styles.stateBadge}>
                  <Sparkles size={14} /> {stateTitle} Admissions
                </span>
              </div>

              <h1 className={styles.heroTitle}>
                Let&apos;s Talk,
                <span className={styles.heroTitleAccent}>Book a Call</span>
              </h1>

              <p className={styles.heroLead}>
                Take the next step in your construction career. Fill out the form and one of our dedicated course advisors will contact you to discuss your study options, funding eligibility, and enrolment process.
              </p>

              <div className={styles.heroActions}>
                <a href="#enrol-form" className={styles.primaryCta}>
                  <span>Enrol Now</span>
                  <ArrowRight size={18} />
                </a>
                <a href={`tel:${zohoConfig.phone.replace(/\s+/g, '')}`} className={styles.phoneCta}>
                  <Phone size={16} />
                  <span>Call {zohoConfig.phone}</span>
                </a>
              </div>
            </div>

            {/* Hero Right Feature Card */}
            <div className={styles.heroCardWrapper}>
              <div className={styles.heroFeatureCard}>
                <div className={styles.cardGlowBorder} />
                <h3 className={styles.featureCardHeading}>
                  <Award size={22} className={styles.featureCardIcon} />
                  <span>Why Choose BCTA {stateCode}?</span>
                </h3>

                <ul className={styles.featureList}>
                  <li className={styles.featureListItem}>
                    <CheckCircle2 size={18} className={styles.checkBullet} />
                    <span><strong>Nationally Recognised Training</strong> — ASQA accredited qualifications respected across Australia.</span>
                  </li>
                  <li className={styles.featureListItem}>
                    <CheckCircle2 size={18} className={styles.checkBullet} />
                    <span><strong>Flexible Study Options</strong> — Evening workshops, face-to-face sessions, and interactive online learning.</span>
                  </li>
                  <li className={styles.featureListItem}>
                    <CheckCircle2 size={18} className={styles.checkBullet} />
                    <span><strong>Industry Expert Trainers</strong> — Learn directly from registered builders and licensed professionals.</span>
                  </li>
                  <li className={styles.featureListItem}>
                    <CheckCircle2 size={18} className={styles.checkBullet} />
                    <span>
                      {isWA ? (
                        <><strong>WA Campus &amp; Support</strong> — Local Leederville facilities with direct student mentoring.</>
                      ) : (
                        <><strong>Government Funding Available</strong> — Subsidised training opportunities available via Skills SA.</>
                      )}
                    </span>
                  </li>
                </ul>

                <div className={styles.officePill}>
                  <MapPin size={18} className={styles.officePin} />
                  <span>{zohoConfig.officeAddress}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW TO ENROL (Interactive Animated Step-by-Step Pipeline) */}
      <section className={styles.enrolProcessSection} aria-label="Admissions Workflow">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>
              <Clock size={14} /> Admissions Workflow
            </span>
            <h2 className={styles.sectionTitle}>How to Enrol at BCTA</h2>
            <p className={styles.sectionSubtext}>
              Our transparent 6-step admissions pathway ensures you are supported from initial enquiry through to your first day in class.
            </p>
          </div>

          <div className={styles.stepsPipelineWrapper}>
            <div className={styles.pipelineBeamTrack}>
              <div className={styles.pipelineBeamLight} />
            </div>

            <div className={styles.stepsGrid}>
              {enrolSteps.map((item, idx) => (
                <div key={idx} className={styles.stepCard}>
                  <div className={styles.stepCardHeader}>
                    <div className={styles.stepIconCircle}>
                      {item.icon}
                    </div>
                    <span className={styles.stepNumber}>{item.step}</span>
                  </div>

                  <h3 className={styles.stepTitle}>{item.title}</h3>
                  <p className={styles.stepDescription}>{item.desc}</p>
                  <span className={styles.stepTag}>{item.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENROL FORM SECTION (Zoho WebToLeadForm Pre-configured for state) */}
      <section className={styles.enrolFormSection} id="enrol-form" aria-label="Enrolment Registration Form">
        <div className={styles.container}>
          <div className={styles.enrolLayoutGrid}>
            {/* Left: Info & Assistance */}
            <div className={styles.enrolInfoCol}>
              <h2 className={styles.enrolInfoTitle}>Ready to Build Your Future?</h2>
              <p className={styles.enrolInfoDesc}>
                Complete the registration form to start your application. A member of our {stateTitle} admissions team will review your details and contact you within one business day.
              </p>

              <div className={styles.benefitItems}>
                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconBox}>
                    <Check size={20} />
                  </div>
                  <div className={styles.benefitContent}>
                    <h4>No Obligation Consultation</h4>
                    <p>Discuss your career goals, timetable flexibility, and course prerequisites free of charge.</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconBox}>
                    <Award size={20} />
                  </div>
                  <div className={styles.benefitContent}>
                    <h4>Skills Assessment &amp; RPL</h4>
                    <p>Have your prior trades experience evaluated towards credit transfer and course shortening.</p>
                  </div>
                </div>

                <div className={styles.benefitItem}>
                  <div className={styles.benefitIconBox}>
                    <ShieldCheck size={20} />
                  </div>
                  <div className={styles.benefitContent}>
                    <h4>Transparent Pricing &amp; Funding</h4>
                    <p>Clear guidance on subsidised fee options, payment plans, and zero hidden costs.</p>
                  </div>
                </div>
              </div>

              {/* Direct Support Card */}
              <div className={styles.supportContactCard}>
                <h4 className={styles.supportTitle}>Need Immediate Assistance?</h4>
                <p className={styles.supportText}>
                  Our admissions team is available Monday to Friday, 8:30am to 5:00pm.
                </p>
                <div className={styles.supportRow}>
                  <a href={`tel:${zohoConfig.phone.replace(/\s+/g, '')}`} className={styles.supportLink}>
                    <Phone size={16} />
                    <span>{zohoConfig.phone}</span>
                  </a>
                  <a href={`mailto:${zohoConfig.email}`} className={styles.supportLink}>
                    <Mail size={16} />
                    <span>{zohoConfig.email}</span>
                  </a>
                  <span className={styles.supportLink}>
                    <MapPin size={16} />
                    <span>{zohoConfig.officeAddress}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Modern Zoho WebToLeadForm */}
            <div className={styles.formContainerCard}>
              <div className={styles.formHeader}>
                <h3 className={styles.formCardTitle}>Enrolment Registration</h3>
                <p className={styles.formCardSub}>
                  Fill out your details below to enquire or begin your enrolment for {stateTitle}.
                </p>
              </div>

              {submitted ? (
                <div className={styles.successNotice}>
                  <strong>Thank You for Registering!</strong>
                  <p>Your details have been submitted. A BCTA representative from our {stateTitle} campus will contact you shortly.</p>
                </div>
              ) : (
                <form
                  id={zohoConfig.formId}
                  action="https://crm.zoho.com/crm/WebToLeadForm"
                  method="POST"
                  onSubmit={handleSubmit}
                  acceptCharset="UTF-8"
                  className={styles.formGrid}
                >
                  {/* Zoho Hidden Authentication & Configuration Fields */}
                  <input type="hidden" name="xnQsjsdp" value={zohoConfig.xnQsjsdp} />
                  <input type="hidden" name="zc_gad" id="zc_gad" value="" />
                  <input type="hidden" name="xmIwtLD" value={zohoConfig.xmIwtLD} />
                  <input type="hidden" name="actionType" value="TGVhZHM=" />
                  <input type="hidden" name="returnURL" value="null" />
                  <input type="hidden" id="ldeskuid" name="ldeskuid" value="" />
                  <input type="hidden" id="LDTuvid" name="LDTuvid" value="" />
                  <input type="hidden" name="aG9uZXlwb3Q" value="" />
                  <input type="hidden" name="Lead Source" id="Lead_Source" value={zohoConfig.leadSource} />

                  {errorMsg && (
                    <div style={{ color: '#dc2626', fontSize: '0.875rem', fontWeight: 600 }}>
                      {errorMsg}
                    </div>
                  )}

                  {/* Row 1: First Name & Last Name */}
                  <div className={styles.formRowTwoCol}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="First_Name" className={styles.fieldLabel}>
                        First Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="First_Name"
                        name="First Name"
                        required
                        maxLength={40}
                        placeholder="e.g. John"
                        className={styles.fieldInput}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="Last_Name" className={styles.fieldLabel}>
                        Last Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="Last_Name"
                        name="Last Name"
                        required
                        maxLength={80}
                        placeholder="e.g. Smith"
                        className={styles.fieldInput}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Mobile */}
                  <div className={styles.formRowTwoCol}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="Email" className={styles.fieldLabel}>
                        Email Address <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="email"
                        id="Email"
                        name="Email"
                        required
                        maxLength={100}
                        placeholder="e.g. john@example.com"
                        className={styles.fieldInput}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="Mobile" className={styles.fieldLabel}>
                        Mobile Number <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        id="Mobile"
                        name="Mobile"
                        required
                        maxLength={30}
                        placeholder="e.g. 0400 123 456"
                        className={styles.fieldInput}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="LEADCF8" className={styles.fieldLabel}>
                      Select Course <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <select
                      id="LEADCF8"
                      name="LEADCF8"
                      required
                      className={styles.fieldSelect}
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    >
                      <option value="">-- Choose Course --</option>
                      {courseOptions.map((opt, i) => (
                        <option key={i} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 3: Nationality & Hear About Us */}
                  <div className={styles.formRowTwoCol}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="LEADCF29" className={styles.fieldLabel}>
                        Residency / Nationality
                      </label>
                      <select
                        id="LEADCF29"
                        name="LEADCF29"
                        className={styles.fieldSelect}
                        value={formData.nationality}
                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                      >
                        <option value="-None-">Select Nationality</option>
                        <option value="Australian / New Zeland National">Australian / New Zealand National</option>
                        <option value="Permanent Residents of Australia">Permanent Resident of Australia</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="LEADCF24" className={styles.fieldLabel}>
                        How Did You Hear About Us? <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <select
                        id="LEADCF24"
                        name="LEADCF24"
                        required
                        className={styles.fieldSelect}
                        value={formData.hearAbout}
                        onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })}
                      >
                        <option value="">Select Option</option>
                        <option value="Google">Google Search</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Sales Person">Sales Person / Representative</option>
                        <option value="Student Referral">Word of Mouth / Friend</option>
                      </select>
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className={styles.consentRow}>
                    <input
                      type="checkbox"
                      id="consentCheck"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className={styles.consentCheckbox}
                    />
                    <label htmlFor="consentCheck" className={styles.consentText}>
                      I consent to BCTA collecting and storing my submitted information to process my course enquiry and respond to my application in accordance with the{' '}
                      <Link href="/privacy-policy" style={{ color: '#163058', textDecoration: 'underline' }}>
                        Privacy Policy
                      </Link>.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={styles.submitBtn}
                    id="formsubmit"
                  >
                    <span>{submitting ? 'Submitting Application...' : 'Submit Enrolment Enquiry'}</span>
                    <ChevronRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer currentState={stateKey} />
    </div>
  );
}
