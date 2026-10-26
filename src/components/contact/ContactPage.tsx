'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MotionTabs, { TabOption } from '@/components/ui/MotionTabs';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Headphones,
  Compass,
  ArrowRight,
  Award,
} from 'lucide-react';
import styles from './ContactPage.module.css';

interface ContactPageProps {
  stateKey?: 'sa' | 'wa';
}

const CAMPUSES = {
  sa: {
    stateLabel: 'South Australia',
    city: 'Adelaide CBD Campus',
    address: 'Level 30, 91 King William Street, Adelaide SA 5000',
    phone: '1300 11 2282',
    email: 'enquiries@bcta.vic.edu.au',
    hours: 'Monday – Friday: 09:30 AM – 05:30 PM ACDT',
    mapEmbed:
      'https://maps.google.com/maps?q=Level%2030,%2091%20King%20William%20Street%20Adelaide%20SA%205000&t=&z=15&ie=UTF8&iwloc=&output=embed',
    zohoAction: 'https://crm.zoho.com/crm/WebToLeadForm',
    xnQsjsdp: 'b2847d50c577d26ded82cf486a23a2527b72c35faa7aa5e8fa7d062d881d8db1',
    xmIwtLD:
      '34cbece4052de19a2a9b6b08b42f05b85792428f50d7e9b0f081c244e0c3f21bdf745ea94b41463f16c8733e236a0e75',
    leadSource: 'South Aus form',
    transit: 'Near Adelaide Railway Station & King William St Tram Stops.',
  },
  wa: {
    stateLabel: 'Western Australia',
    city: 'Leederville Campus (Perth)',
    address: 'Unit 1, 220 Carr Pl, Leederville WA 6007, Australia',
    phone: '1300 228 228',
    email: 'info@bcta.edu.au',
    hours: 'Monday – Friday: 09:30 AM – 05:30 PM AWST',
    mapEmbed:
      'https://maps.google.com/maps?q=Unit%201,%20220%20Carr%20Pl,%20Leederville%20WA%206007&t=&z=15&ie=UTF8&iwloc=&output=embed',
    zohoAction: 'https://crm.zoho.com/crm/WebToLeadForm',
    xnQsjsdp: 'd1d677536ccaa9d8b947b30000e7b963a07a686b7ca23ab8f5fde022af52f144',
    xmIwtLD:
      '9e55873a116d39be39ef15800be1db3994b7453ffe7a46daf7bc1fd79b7fe21e1cb3188b7f1788608692d6518a1fc1a5',
    leadSource: 'Western Aus Form',
    transit: 'Walking distance from Leederville Train Station with dedicated student parking.',
  },
};

const CAMPUS_TABS: TabOption<'sa' | 'wa'>[] = [
  { id: 'sa', label: 'Adelaide CBD Campus (SA)', badge: 'Skills SA' },
  { id: 'wa', label: 'Leederville Campus (WA)', badge: 'Apprenticeships' },
];

export default function ContactPage({ stateKey = 'sa' }: ContactPageProps) {
  const [selectedCampus, setSelectedCampus] = useState<'sa' | 'wa'>(stateKey);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: 'Certificate IV in Building and Construction',
    message: '',
    consent: true,
  });

  const activeInfo = CAMPUSES[selectedCampus];
  const isSA = selectedCampus === 'sa';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    setSubmitted(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <Header currentState={selectedCampus} />

      {/* =========================================================================
         1. HERO SECTION (Authoritative Australian Institution Navy)
         ========================================================================= */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href={isSA ? '/south-australia' : '/western-australia'} className={styles.breadcrumbLink}>
              Home
            </Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            <span className={styles.breadcrumbActive}>
              Contact Us ({isSA ? 'South Australia' : 'Western Australia'})
            </span>
          </nav>

          {/* 21st.dev Animated Spring Tabs Campus Switcher */}
          <div style={{ margin: '1.75rem 0 2.25rem' }}>
            <MotionTabs
              tabs={CAMPUS_TABS}
              activeTab={selectedCampus}
              onChange={(tab) => setSelectedCampus(tab)}
              layoutId="contactCampusTab"
            />
          </div>

          <div className={styles.heroGrid}>
            {/* Left Column: Text & Badges */}
            <div className={styles.heroTextCol}>
              <div className={styles.badgeGroup}>
                <span className={styles.rtoBadge}>
                  <ShieldCheck size={14} color="#ffb605" />
                  RTO Provider #45145 / 22597
                </span>
                <span className={styles.stateBadge}>
                  <Award size={14} />
                  {isSA ? 'South Australia Office' : 'Western Australia Office'}
                </span>
              </div>

              <h1 className={styles.heroTitle}>
                Speak with a BCTA <br />
                <span className={styles.heroTitleAccent}>Course &amp; Licensing Advisor</span>
              </h1>

              <p className={styles.heroLead}>
                Get direct, practical guidance on builder licensing requirements, Skills SA government subsidised fees, and flexible course delivery options in Adelaide and Perth.
              </p>

              <div className={styles.heroActions}>
                <a href="#contact-form" className={styles.primaryCta}>
                  <span>Enquire Online</span>
                  <ArrowRight size={16} />
                </a>
                <a href={`tel:${activeInfo.phone.replace(/\s+/g, '')}`} className={styles.phoneCta}>
                  <Phone size={15} color="#ffb605" />
                  <span>Call {activeInfo.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Structured Campus Blueprint Card (Animated with Motion) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCampus}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={styles.heroDirectoryCard}
              >
                <div className={styles.directoryCardHeader}>
                  <div className={styles.directoryLabel}>State Campus Headquarters</div>
                  <h3 className={styles.directoryTitle}>{activeInfo.city}</h3>
                </div>

                <ul className={styles.directoryRows}>
                  <li className={styles.directoryRow}>
                    <MapPin size={18} className={styles.directoryIcon} />
                    <span>{activeInfo.address}</span>
                  </li>
                  <li className={styles.directoryRow}>
                    <Phone size={18} className={styles.directoryIcon} />
                    <span>{activeInfo.phone} (Toll-Free National Line)</span>
                  </li>
                  <li className={styles.directoryRow}>
                    <Clock size={18} className={styles.directoryIcon} />
                    <span>{activeInfo.hours}</span>
                  </li>
                  <li className={styles.directoryRow}>
                    <Mail size={18} className={styles.directoryIcon} />
                    <span>{activeInfo.email}</span>
                  </li>
                </ul>

                <p className={styles.directoryFootnote}>
                  In-person consultations are available by appointment at our central {isSA ? 'Adelaide CBD' : 'Perth Leederville'} learning facility. {activeInfo.transit}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. DIRECT CHANNELS SECTION
         ========================================================================= */}
      <section className={styles.channelsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <Headphones size={14} /> Direct Advisory Channels
            </div>
            <h2 className={styles.sectionTitle}>How Would You Like to Connect?</h2>
            <p className={styles.sectionSubtext}>
              Our course advisors provide prompt, professional support during standard campus operating hours.
            </p>
          </div>

          <div className={styles.channelsGrid}>
            {/* Phone Channel */}
            <div className={styles.channelCard}>
              <div className={styles.channelIconBox}>
                <Phone size={24} />
              </div>
              <h3 className={styles.channelCardTitle}>Telephone Advisory</h3>
              <p className={styles.channelCardDesc}>
                Speak immediately with an admissions advisor regarding entry criteria, CBS contractor licences, and class timetables.
              </p>
              <a href={`tel:${activeInfo.phone.replace(/\s+/g, '')}`} className={styles.channelActionLink}>
                <span>Call {activeInfo.phone}</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Email Channel */}
            <div className={styles.channelCard}>
              <div className={styles.channelIconBox}>
                <Mail size={24} />
              </div>
              <h3 className={styles.channelCardTitle}>Email Support</h3>
              <p className={styles.channelCardDesc}>
                Send us your questions, RPL documentation, or funding inquiries. All written queries receive responses within 24 business hours.
              </p>
              <a href={`mailto:${activeInfo.email}`} className={styles.channelActionLink}>
                <span>{activeInfo.email}</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* In-Person Campus */}
            <div className={styles.channelCard}>
              <div className={styles.channelIconBox}>
                <Building2 size={24} />
              </div>
              <h3 className={styles.channelCardTitle}>Campus Consultation</h3>
              <p className={styles.channelCardDesc}>
                Visit our modern classrooms and meet our building trainers at our Adelaide CBD or Perth Leederville locations.
              </p>
              <a href="#campus-maps" className={styles.channelActionLink}>
                <span>View Campus Details</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. CAMPUS LOCATIONS & MAPS SECTION
         ========================================================================= */}
      <section className={styles.campusSection} id="campus-maps">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <Compass size={14} /> State Campuses
            </div>
            <h2 className={styles.sectionTitle}>BCTA Training Centres &amp; Offices</h2>
            <p className={styles.sectionSubtext}>
              Centrally situated facilities with modern technical classrooms and public transport connections.
            </p>
          </div>

          {/* Campus Toggle Tabs */}
          <div className={styles.campusToggleGrid}>
            <button
              type="button"
              className={`${styles.campusTabBtn} ${selectedCampus === 'sa' ? styles.campusTabBtnActive : ''}`}
              onClick={() => setSelectedCampus('sa')}
            >
              <Building2 size={15} />
              <span>South Australia (Adelaide CBD)</span>
            </button>
            <button
              type="button"
              className={`${styles.campusTabBtn} ${selectedCampus === 'wa' ? styles.campusTabBtnActive : ''}`}
              onClick={() => setSelectedCampus('wa')}
            >
              <Building2 size={15} />
              <span>Western Australia (Leederville)</span>
            </button>
          </div>

          {/* Campus Details & Map Embed */}
          <div className={styles.campusDisplayGrid}>
            {/* Campus Info Card */}
            <div className={styles.campusInfoCard}>
              <div>
                <span className={styles.campusBadge}>
                  {selectedCampus === 'sa' ? 'SA Head Office & Campus' : 'WA Regional Centre'}
                </span>
                <h3 className={styles.campusCityTitle}>{activeInfo.city}</h3>
                <p className={styles.campusAddressText}>{activeInfo.address}</p>

                <ul className={styles.campusDetailsList}>
                  <li className={styles.campusDetailRow}>
                    <Clock size={16} className={styles.campusDetailIcon} />
                    <span>{activeInfo.hours}</span>
                  </li>
                  <li className={styles.campusDetailRow}>
                    <Phone size={16} className={styles.campusDetailIcon} />
                    <span>{activeInfo.phone}</span>
                  </li>
                  <li className={styles.campusDetailRow}>
                    <Mail size={16} className={styles.campusDetailIcon} />
                    <span>{activeInfo.email}</span>
                  </li>
                  <li className={styles.campusDetailRow}>
                    <MapPin size={16} className={styles.campusDetailIcon} />
                    <span>{activeInfo.transit}</span>
                  </li>
                </ul>
              </div>

              <a
                href={
                  selectedCampus === 'sa'
                    ? 'https://maps.google.com/?q=Level+30+91+King+William+Street+Adelaide+SA+5000'
                    : 'https://maps.google.com/?q=Unit+1+220+Carr+Pl+Leederville+WA+6007+Australia'
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.campusActionBtn}
              >
                <span>Get Google Maps Directions</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* Map Frame */}
            <div className={styles.campusMapFrame}>
              <iframe
                title={`${activeInfo.city} Map`}
                src={activeInfo.mapEmbed}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. CONTACT FORM SECTION (Zoho WebToLead Integration)
         ========================================================================= */}
      <section className={styles.contactFormSection} id="contact-form">
        <div className={styles.container}>
          <div className={styles.formLayoutGrid}>
            {/* Left Info Column */}
            <div className={styles.formInfoCol}>
              <div className={styles.sectionEyebrow}>
                <Send size={14} /> Admissions Consultation
              </div>
              <h2 className={styles.formInfoTitle}>
                Send an Enquiry to Our Admissions Team
              </h2>
              <p className={styles.formInfoDesc}>
                Whether you have questions about Skills SA funding subsidies, Upfront Assessment of Need (UAN) requirements, or course schedules, our team is ready to assist.
              </p>

              <div className={styles.highlightList}>
                <div className={styles.highlightItem}>
                  <div className={styles.highlightIconBox}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div className={styles.highlightContent}>
                    <h4>Nationally Recognised Training</h4>
                    <p>Australian Qualifications Framework (AQF) accredited trade qualifications.</p>
                  </div>
                </div>

                <div className={styles.highlightItem}>
                  <div className={styles.highlightIconBox}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div className={styles.highlightContent}>
                    <h4>Government Subsidies Verified</h4>
                    <p>We assess your eligibility for Skills SA subsidised fees ($446 Cert IV / $1,065 Diploma).</p>
                  </div>
                </div>

                <div className={styles.highlightItem}>
                  <div className={styles.highlightIconBox}>
                    <CheckCircle2 size={18} />
                  </div>
                  <div className={styles.highlightContent}>
                    <h4>Licensing Alignment Support</h4>
                    <p>Our courses include the 6 mandatory business units required by Consumer and Business Services (CBS) SA.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h3 className={styles.formCardTitle}>Enquire Online</h3>
                <p className={styles.formCardSub}>
                  Complete the form below and an advisor will contact you within one business day.
                </p>
              </div>

              {submitted ? (
                <div className={styles.successNotice}>
                  <CheckCircle2 size={36} color="#059669" style={{ margin: '0 auto 0.75rem' }} />
                  <strong>Thank You for Contacting BCTA!</strong>
                  <p>
                    Your enquiry has been received. Our {activeInfo.stateLabel} admissions team will review your details and contact you shortly.
                  </p>
                </div>
              ) : (
                <form
                  action={activeInfo.zohoAction}
                  method="POST"
                  onSubmit={handleSubmit}
                  className={styles.formGrid}
                >
                  {/* Zoho WebToLead Hidden Parameters */}
                  <input type="hidden" name="xnQsjsdp" value={activeInfo.xnQsjsdp} />
                  <input type="hidden" name="xmIwtLD" value={activeInfo.xmIwtLD} />
                  <input type="hidden" name="actionType" value="TGVhZHM=" />
                  <input type="hidden" name="returnURL" value="https://bcta.edu.au/thank-you" />
                  <input type="hidden" name="Lead Source" value={activeInfo.leadSource} />

                  {/* Name Row */}
                  <div className={styles.formRowTwoCol}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="First_Name" className={styles.fieldLabel}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="First_Name"
                        name="First Name"
                        required
                        className={styles.fieldInput}
                        placeholder="e.g. John"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="Last_Name" className={styles.fieldLabel}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="Last_Name"
                        name="Last Name"
                        required
                        className={styles.fieldInput}
                        placeholder="e.g. Smith"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Contact Row */}
                  <div className={styles.formRowTwoCol}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="Email" className={styles.fieldLabel}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="Email"
                        name="Email"
                        required
                        className={styles.fieldInput}
                        placeholder="e.g. john.smith@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="Mobile" className={styles.fieldLabel}>
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="Mobile"
                        name="Mobile"
                        required
                        className={styles.fieldInput}
                        placeholder="e.g. 0400 000 000"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Course Dropdown */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="Course_Interested" className={styles.fieldLabel}>
                      Course of Interest *
                    </label>
                    <select
                      id="Course_Interested"
                      name="Description"
                      className={styles.fieldSelect}
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="CPC40120 Certificate IV in Building and Construction">
                        CPC40120 Certificate IV in Building &amp; Construction (Building)
                      </option>
                      <option value="CPC50220 Diploma of Building and Construction (Building)">
                        CPC50220 Diploma of Building &amp; Construction (Building)
                      </option>
                      <option value="RII30820 Certificate III in Civil Construction Plant Operations">
                        RII30820 Certificate III in Civil Construction Plant Operations
                      </option>
                      <option value="CPC30220 Certificate III in Carpentry">
                        CPC30220 Certificate III in Carpentry
                      </option>
                      <option value="SIT40721 Certificate IV in Patisserie">
                        SIT40721 Certificate IV in Patisserie
                      </option>
                      <option value="Government Funding & Eligibility Enquiry">
                        Government Funding &amp; Eligibility Enquiry
                      </option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="Message" className={styles.fieldLabel}>
                      Your Questions or Notes (Optional)
                    </label>
                    <textarea
                      id="Message"
                      name="LEADCF2"
                      className={styles.fieldTextarea}
                      placeholder="Tell us about your trade background, current licensing goals, or questions..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className={styles.consentRow}>
                    <input
                      type="checkbox"
                      id="consent-check"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                      className={styles.consentCheckbox}
                    />
                    <label htmlFor="consent-check" className={styles.consentText}>
                      I consent to BCTA collecting my details in accordance with the{' '}
                      <Link href="/privacy-policy" style={{ color: '#163058', textDecoration: 'underline' }}>
                        Privacy Policy
                      </Link>{' '}
                      to provide information on courses and funding.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className={styles.submitBtn}>
                    <span>Submit Enquiry</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. INTERACTIVE CAMPUS MAP & DIRECTIONS (With Motion Animation)
         ========================================================================= */}
      <section className={styles.channelsSection} style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }} aria-label="Campus Location Map">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionEyebrow}>
              <Compass size={14} /> Getting to Campus
            </div>
            <h2 className={styles.sectionTitle}>Visit Our {activeInfo.city}</h2>
            <p className={styles.sectionSubtext}>
              {activeInfo.address} · {activeInfo.transit}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCampus}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(13, 30, 56, 0.08)',
                border: '1px solid #e2e8f0',
                height: '420px',
                width: '100%',
                background: '#ffffff',
              }}
            >
              <iframe
                src={activeInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${activeInfo.city} Google Map Location`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer currentState={selectedCampus} />
    </div>
  );
}
