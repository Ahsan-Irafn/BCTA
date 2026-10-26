import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { COURSES_DATA } from '@/lib/content';
import { SITE_CONFIG } from '@/lib/constants';
import { constructMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import EnquiryForm from '@/components/common/EnquiryForm';
import {
  Award,
  Clock,
  ShieldCheck,
  CheckCircle,
  BookOpen,
  MapPin,
  ChevronRight,
  Phone,
  HelpCircle,
  Check,
} from 'lucide-react';
import styles from './course-detail.module.css';

interface CourseDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SLUG_REDIRECTS: Record<string, string> = {
  'diploma-of-building-and-construction': '/courses/diploma-of-building-and-construction-south-australia',
  'certificate-iv-in-building-construction': '/courses/certificate-iv-in-building-construction-building-south-australia',
  'certificate-iv-in-building-and-construction': '/courses/certificate-iv-in-building-construction-building-south-australia',
  'certificate-iii-in-carpentry': '/courses/certificate-iii-in-carpentry-south-australia',
  'sit40721-certificate-iv-in-patisserie': '/courses/sit40721-certificate-iv-in-patisserie-south-australia',
  'certificate-iii-in-civil-construction-plant-operations': '/courses/certificate-iii-in-civil-construction-plant-operations-south-australia',
  'civil-construction': '/courses/certificate-iii-in-civil-construction-plant-operations-south-australia',
};

export async function generateStaticParams() {
  return COURSES_DATA.filter(
    (course) => course.slug !== 'diploma-of-building-and-construction'
  ).map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (SLUG_REDIRECTS[slug]) {
    return constructMetadata({
      title: 'Course Redirection',
      description: 'Redirecting to authentic course qualification page.',
      canonical: SLUG_REDIRECTS[slug],
    });
  }
  const course = COURSES_DATA.find((c) => c.slug === slug);

  if (!course) {
    return constructMetadata({
      title: 'Course Not Found',
      description: 'The requested course qualification could not be found.',
    });
  }

  return constructMetadata({
    title: `${course.code} ${course.title}`,
    description: course.description,
    canonical: `/courses/${course.slug}`,
  });
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;
  if (SLUG_REDIRECTS[slug]) {
    redirect(SLUG_REDIRECTS[slug]);
  }
  const course = COURSES_DATA.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Course Hero Banner */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.badgeGroup}>
              <span className={styles.codeBadge}>{course.code}</span>
              <span className={styles.rtoBadge}>RTO # {SITE_CONFIG.rtoCode}</span>
            </div>

            <h1 className={styles.heroTitle}>{course.title}</h1>
            <p className={styles.heroLead}>{course.description}</p>

            <div className={styles.highlightsGrid}>
              <div className={styles.highlightCard}>
                <div className={styles.highlightLabel}>
                  <Clock size={14} aria-hidden="true" />
                  <span>Duration</span>
                </div>
                <div className={styles.highlightValue}>{course.duration}</div>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.highlightLabel}>
                  <Award size={14} aria-hidden="true" />
                  <span>Delivery Mode</span>
                </div>
                <div className={styles.highlightValue}>{course.deliveryMode}</div>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.highlightLabel}>
                  <MapPin size={14} aria-hidden="true" />
                  <span>Accredited States</span>
                </div>
                <div className={styles.highlightValue}>
                  {course.regions.map((r) => r.toUpperCase()).join(' · ')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Courses', href: '/courses' },
          { label: course.code },
        ]}
      />

      {/* Main Content Layout */}
      <div className="container">
        <div className={styles.mainLayout}>
          {/* Left Column: Course Details */}
          <div className={styles.contentColumn}>
            {/* 1. Overview */}
            <article className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>
                <BookOpen size={22} aria-hidden="true" />
                <span>Qualification Overview</span>
              </h2>
              <div className={styles.prose}>
                <p>{course.overview || course.description}</p>
              </div>

              {course.licensingOutcome && (
                <div className={styles.licensingBox}>
                  <ShieldCheck size={22} aria-hidden="true" />
                  <div className={styles.licensingText}>
                    <strong>Licensing & Registration Outcome:</strong> {course.licensingOutcome}
                  </div>
                </div>
              )}
            </article>

            {/* 2. Units of Competency */}
            {course.units && course.units.length > 0 && (
              <article className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>
                  <Award size={22} aria-hidden="true" />
                  <span>Course Structure & Units of Competency</span>
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', margin: 0 }}>
                  This qualification comprises nationally accredited core and elective competencies tailored for trade industry excellence:
                </p>
                <div className={styles.unitsList}>
                  {course.units.map((unit) => (
                    <div key={unit.code} className={styles.unitItem}>
                      <span className={styles.unitCode}>{unit.code}</span>
                      <div className={styles.unitContent}>
                        <div className={styles.unitTitle}>{unit.title}</div>
                        <span className={styles.unitBadge}>{unit.type} Competency</span>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* 3. Entry Requirements */}
            {course.entryRequirements && course.entryRequirements.length > 0 && (
              <article className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>
                  <CheckCircle size={22} aria-hidden="true" />
                  <span>Entry Requirements & Prerequisites</span>
                </h2>
                <ul className={styles.checkList}>
                  {course.entryRequirements.map((req, i) => (
                    <li key={i} className={styles.checkItem}>
                      <Check size={18} aria-hidden="true" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )}

            {/* 4. Funding & Subsidies */}
            {course.fundingOptions && course.fundingOptions.length > 0 && (
              <article className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>
                  <Award size={22} aria-hidden="true" />
                  <span>Government Funding & State Subsidies</span>
                </h2>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem', margin: 0 }}>
                  BCTA is approved to deliver funded vocational training in key jurisdictions. Eligibility criteria apply:
                </p>
                <div className={styles.fundingCards}>
                  {course.fundingOptions.map((opt, i) => (
                    <div key={i} className={styles.fundingCard}>
                      <div className={styles.fundingState}>{opt.state}</div>
                      <div className={styles.fundingScheme}>{opt.scheme}</div>
                      <p className={styles.fundingNote}>{opt.note}</p>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {/* 5. FAQs */}
            {course.faqs && course.faqs.length > 0 && (
              <article className={styles.sectionCard}>
                <h2 className={styles.sectionTitle}>
                  <HelpCircle size={22} aria-hidden="true" />
                  <span>Frequently Asked Questions</span>
                </h2>
                <div>
                  {course.faqs.map((faq, i) => (
                    <div key={i} className={styles.faqItem}>
                      <h3 className={styles.faqQuestion}>{faq.question}</h3>
                      <p className={styles.faqAnswer}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </div>

          {/* Right Column: Sticky Sidebar with Enquiry Form & Quick Facts */}
          <aside className={styles.sidebarColumn}>
            {/* Quick Facts Card */}
            <div className={styles.quickFactsCard}>
              <h3 className={styles.quickFactsTitle}>Course Snapshot</h3>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>National Code</span>
                <span className={styles.factValue}>{course.code}</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>RTO Registration</span>
                <span className={styles.factValue}>ASQA # {SITE_CONFIG.rtoCode}</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>Study Mode</span>
                <span className={styles.factValue}>{course.deliveryMode}</span>
              </div>
              <div className={styles.factRow}>
                <span className={styles.factLabel}>Typical Duration</span>
                <span className={styles.factValue}>{course.duration}</span>
              </div>
            </div>

            {/* Direct Phone Assistance */}
            <div className={styles.directContactCard}>
              <h3 className={styles.directContactTitle}>Need Immediate Guidance?</h3>
              <p className={styles.directContactText}>
                Speak directly with a course advisor about upcoming cohorts and subsidy checks.
              </p>
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className={styles.contactBtn}>
                <Phone size={16} aria-hidden="true" />
                <span>Call {SITE_CONFIG.phone}</span>
              </a>
            </div>

            {/* In-page Course Enquiry Form */}
            <EnquiryForm
              initialCourse={course.code}
              title={`Enquire About ${course.code}`}
              subtitle="Fill in your details below and a BCTA education consultant will contact you within 1 business day."
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
