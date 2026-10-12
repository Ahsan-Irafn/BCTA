'use client';

import React, { useState } from 'react';
import { COURSES_DATA } from '@/lib/content';
import { REGIONS } from '@/lib/constants';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from './EnquiryForm.module.css';

interface EnquiryFormProps {
  initialCourse?: string;
  initialState?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function EnquiryForm({
  initialCourse,
  initialState,
  title = 'Enquire for Course Information & Enrolment',
  subtitle = 'Get course schedules, funding eligibility, and intake dates sent directly to you.',
  className,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    state: initialState || 'VIC',
    course: initialCourse || COURSES_DATA[0]?.code || '',
    experience: 'Experienced Tradesperson',
    fundingEligible: true,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.formContainer} ${className || ''}`} id="enquire-form">
      {status === 'success' ? (
        <div className={styles.successBox}>
          <CheckCircle2 size={48} color="#16a34a" />
          <h3 className={styles.successTitle}>Thank You! Enquiry Submitted</h3>
          <p className={styles.successText}>
            Our BCTA course advisory team has received your details for{' '}
            <strong>{formData.course}</strong>. We will contact you via email or phone within 1 business day with the course guide and upcoming intake schedules.
          </p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() => {
              setStatus('idle');
              setFormData((prev) => ({ ...prev, message: '' }));
            }}
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formHeader}>
            <span className={styles.formBadge}>Fast Course Advisory</span>
            <h3 className={styles.formTitle}>{title}</h3>
            <p className={styles.formSubtitle}>{subtitle}</p>
          </div>

          {status === 'error' && (
            <div className={`${styles.statusMessage} ${styles.errorBox}`}>
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name" className={styles.label}>
                <span>Full Name <span className={styles.requiredStar}>*</span></span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. John Miller"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>
                <span>Contact Phone <span className={styles.requiredStar}>*</span></span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="e.g. 0400 123 456"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label htmlFor="email" className={styles.label}>
                <span>Email Address <span className={styles.requiredStar}>*</span></span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="e.g. john@example.com.au"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="course" className={styles.label}>
                <span>Course Interested In</span>
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={styles.select}
              >
                {COURSES_DATA.map((c) => (
                  <option key={c.id} value={`${c.code} - ${c.title}`}>
                    {c.code} — {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="state" className={styles.label}>
                <span>Training State / Location</span>
              </label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={styles.select}
              >
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.shortName}>
                    {r.name} ({r.shortName})
                  </option>
                ))}
                <option value="Other">Interstate / Remote Online</option>
              </select>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label htmlFor="experience" className={styles.label}>
                <span>Your Current Industry Background</span>
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="Experienced Tradesperson">Experienced Tradesperson (Carpentry / Building)</option>
                <option value="Subcontractor / Trade Assistant">Subcontractor / Trade Assistant</option>
                <option value="Seeking Builder Registration (DB-U)">Seeking Builder Registration (DB-U / VBA / CBS)</option>
                <option value="School Leaver / Apprentice Candidate">School Leaver / Apprentice Candidate</option>
                <option value="Other Industry Professional">Other Industry Professional</option>
              </select>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label htmlFor="message" className={styles.label}>
                <span>Questions or Comments (Optional)</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Let us know your goals, timetable preferences, or any specific licensing questions..."
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
              />
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <label className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="fundingEligible"
                  checked={formData.fundingEligible}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <span>
                  Check my government subsidy and funding eligibility (Skills First VIC, SA, or WA apprenticeships).
                </span>
              </label>
            </div>

            <div className={`${styles.fieldGroup} ${styles.fullWidth}`}>
              <button
                type="submit"
                disabled={loading || !formData.name || !formData.email || !formData.phone}
                className={styles.submitBtn}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner} />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Free Course Enquiry</span>
                  </>
                )}
              </button>
              <p className={styles.privacyNote}>
                🔒 Your privacy is strictly protected. We never share your details. RTO # 22597.
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
