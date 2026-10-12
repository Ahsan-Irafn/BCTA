'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import styles from './ReviewsSection.module.css';

export interface StudentStory {
  id: string;
  indexNumber: string;
  title: string;
  videoId: string;
  description: string;
  excerpt: string;
  tag: string;
}

export const STUDENT_STORIES: StudentStory[] = [
  {
    id: 'story-1',
    indexNumber: '01',
    title: 'From Architecture to the Construction Site',
    videoId: 'sNOioJLNO0k',
    excerpt: 'Connecting architectural design knowledge with real-world building site experience and hands-on structural delivery.',
    description: 'With a background in architecture, this BCTA Building and Construction student is gaining valuable practical insights by connecting design knowledge with real-world construction experience. Explore BCTA’s Certificate IV and Diploma of Building and Construction (Building) and take the next step towards your construction career.',
    tag: 'Architecture to Site',
  },
  {
    id: 'story-2',
    indexNumber: '02',
    title: 'BCTA students gain valuable industry exposure',
    videoId: 'puaI2MjCeN4',
    excerpt: 'Applying learning in real construction environments, mastering site processes, and building industry confidence.',
    description: 'BCTA students gain valuable industry exposure by applying their learning in real construction environments. From understanding site processes to developing practical skills, every experience helps build confidence for a future in the construction industry.',
    tag: 'Site Exposure',
  },
  {
    id: 'story-3',
    indexNumber: '03',
    title: 'BCTA student gaining real experience',
    videoId: 'G3s1b-Kw0io',
    excerpt: 'On-site learning in action, building practical skills, and growing confidence straight from the construction site.',
    description: 'On-site learning in action, building practical skills, and growing confidence straight from the construction site. Real training. Real site exposure. Real career pathway. Ready to start your journey? Join BCTA today.',
    tag: 'Practical Training',
  },
  {
    id: 'story-4',
    indexNumber: '04',
    title: "It's Never Too Late to Learn",
    videoId: 'KpdFkJEB4yk',
    excerpt: 'Returning to study after 40 years, finding motivation through BCTA trainer encouragement and dedicated support.',
    description: 'Returning to study after 40 years can feel overwhelming, but this inspiring BCTA student proved that it’s never too late to learn something new. He shares how he was initially on the edge of giving up, but the encouragement and support from the BCTA team helped him stay motivated and continue his journey. Now, he’s excited to pursue more education in the future.',
    tag: 'Mature Age Learner',
  },
  {
    id: 'story-5',
    indexNumber: '05',
    title: 'Great Learning Experience at BCTA',
    videoId: 'LyoRRAOcC1Y',
    excerpt: 'Hands-on support from knowledgeable licensed practitioners creating a smooth and enjoyable Diploma pathway.',
    description: 'Our student talks about his positive experience studying a Diploma course with BCTA. He shares how the trainers were highly knowledgeable, experienced, and always willing to help. The hands-on support and industry-focused teaching approach helped create a smooth and enjoyable learning experience.',
    tag: 'Diploma Experience',
  },
  {
    id: 'story-6',
    indexNumber: '06',
    title: 'BCTA Opened New Opportunities',
    videoId: 'zjVVJc-OZCA',
    excerpt: 'Valuable real-world exposure through active site visits that expanded career pathways beyond the classroom.',
    description: 'In this testimonial, our student talks about how his learning experience with BCTA was enjoyable, informative, and helped open many new doors for his future career. He especially enjoyed the site visits, which gave him valuable real-world exposure and practical understanding of the construction industry beyond the classroom.',
    tag: 'New Horizons',
  },
  {
    id: 'story-7',
    indexNumber: '07',
    title: 'Informative, Fun & Supportive',
    videoId: 'cHUNWfwXCkY',
    excerpt: 'Trainers creating an engaging, supportive, and motivating environment for students stepping into construction.',
    description: 'In this testimonial, our student talks about her positive experience studying with BCTA and how the course was both informative and enjoyable. She shares how the trainers played an important role in making the learning experience supportive, engaging, and fun. Their helpful guidance helped create a comfortable and motivating environment throughout her studies.',
    tag: 'Student Support',
  },
  {
    id: 'story-8',
    indexNumber: '08',
    title: 'From Certificate IV to Diploma',
    videoId: 'xzpk_0x_lVA',
    excerpt: 'Progressing from Certificate IV directly into the Diploma because of trusted mentors and positive site outcomes.',
    description: 'In this testimonial, our student reflects on his experience studying Certificate IV in Building and Construction with BCTA and why he decided to return for his Diploma. He shares how the trainers and staff made him feel comfortable and supported throughout. Because of the positive experience and supportive learning environment, choosing BCTA again for his Diploma was an easy decision.',
    tag: 'Course Pathway',
  },
  {
    id: 'story-9',
    indexNumber: '09',
    title: "You're Not Alone – Student Insight",
    videoId: '93ZTO8tfICM',
    excerpt: 'Graduate perspective on navigating trade study challenges and succeeding with community and mentor backing.',
    description: 'Hear directly from a BCTA graduate as he shares his learning experience, challenges, and success story. Whether you’re starting with the Certificate or moving into the Diploma, BCTA gives you the skills, support, and real-world training to build your future in the construction industry.',
    tag: 'Graduate Insight',
  },
  {
    id: 'story-10',
    indexNumber: '10',
    title: 'From Architect to Site Smart',
    videoId: 'N80dhdR5lNE',
    excerpt: 'Bridging technical architectural theory with practical site processes, safety rules, and builder responsibilities.',
    description: 'Our BCTA Diploma graduate shares how coming from an architectural background gave her theory, but the course helped her understand how real construction actually works. She explains how the Diploma opened her mind to practical site processes, safety rules, real-world responsibilities, and thinking beyond the drawings. Her experience shows how the program builds practical skills, problem-solving ability, and confidence for the construction industry.',
    tag: 'Site Intelligence',
  },
  {
    id: 'story-11',
    indexNumber: '11',
    title: 'BCTA Support Changed My Journey',
    videoId: 'zXG5wtHWgpw',
    excerpt: 'Taking the first step into building and construction with personal guidance and community encouragement.',
    description: 'In this short testimonial, our BCTA graduate encourages future students to take the first step into Building & Construction. He shares that you won’t be alone in your journey. BCTA supports you with guidance, training, and a strong learning community. A simple reminder that your ideas matter, your goals are achievable, and the right support can make all the difference.',
    tag: 'Community Mentorship',
  },
  {
    id: 'story-12',
    indexNumber: '12',
    title: 'BCTA – Where Confidence Builds',
    videoId: 'q4BiX62RRC4',
    excerpt: 'Building career confidence through hands-on practical learning, attentive trainers, and constant guidance.',
    description: 'Our Diploma student shares how fantastic his experience at BCTA has been. He talked about the amazing team and supportive trainer who were always available to help throughout the course. With constant guidance, a positive learning environment, and hands-on support, he confidently recommends BCTA to anyone looking to build a future in construction.',
    tag: 'Confidence in Trade',
  },
];

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [posterTilt, setPosterTilt] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  const thumbTrackRef = useRef<HTMLDivElement>(null);
  const activePosterRef = useRef<HTMLDivElement>(null);

  // Check reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Background scroll lock when modals are open
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isVideoModalOpen || isTextModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoModalOpen, isTextModalOpen]);

  // Keyboard Escape listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoModalOpen(false);
        setIsTextModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalStories = STUDENT_STORIES.length;
  const currentStory = STUDENT_STORIES[activeIndex];

  // Upcoming two stories for background 3D depth layers
  const nextStory1 = STUDENT_STORIES[(activeIndex + 1) % totalStories];
  const nextStory2 = STUDENT_STORIES[(activeIndex + 2) % totalStories];

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalStories - 1));
  }, [totalStories]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev < totalStories - 1 ? prev + 1 : 0));
  }, [totalStories]);

  // Scroll active thumbnail smoothly into view
  useEffect(() => {
    if (!thumbTrackRef.current) return;
    const track = thumbTrackRef.current;
    const activeBtn = track.children[activeIndex] as HTMLElement;
    if (activeBtn) {
      const leftPos = activeBtn.offsetLeft - track.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      track.scrollTo({ left: Math.max(0, leftPos), behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, [activeIndex, reduceMotion]);

  // Desktop hover tilt on main poster
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || typeof window === 'undefined' || window.innerWidth < 1024) return;
    const rect = activePosterRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPosterTilt({
      x: y * -8, // max ±4 deg
      y: x * 8,
    });
  };

  const handlePointerLeave = () => {
    setPosterTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="testimonials"
      className={styles.gallerySection}
      aria-label="What Our Students Say About Us"
    >
      <div id="bcta-video-testimonials" style={{ display: 'none' }} aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <GraduationCap size={15} aria-hidden="true" />
            <span>Verified Student Experiences</span>
          </div>

          <h2 className={styles.sectionTitle}>
            What Our Students Say <span className={styles.titleAccent}>About Us</span>
          </h2>

          <p className={styles.sectionLead}>
            Real stories from apprentices, career changers, and trade professionals building their
            futures and earning licensed builder qualifications with BCTA.
          </p>
        </div>

        {/* Cinematic Showcase: 3D Poster Stack on Left, Story Copy on Right */}
        <div className={styles.showcaseGrid}>
          {/* Left: 3D Offset Poster Stack */}
          <div className={styles.posterStackContainer}>
            {/* Background Layer 2 (Offset back by 60px) */}
            <div className={styles.bgLayer2} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${nextStory2.videoId}/hqdefault.jpg`}
                alt=""
                className={styles.layerThumbImg}
                loading="lazy"
              />
            </div>

            {/* Background Layer 1 (Offset back by 30px) */}
            <div className={styles.bgLayer1} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${nextStory1.videoId}/hqdefault.jpg`}
                alt=""
                className={styles.layerThumbImg}
                loading="lazy"
              />
            </div>

            {/* Main Interactive Poster Card */}
            <div
              ref={activePosterRef}
              className={styles.mainPosterCard}
              style={{
                transform:
                  reduceMotion || typeof window === 'undefined' || window.innerWidth < 1024
                    ? undefined
                    : `rotateX(${posterTilt.x}deg) rotateY(${posterTilt.y}deg)`,
              }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={() => setIsVideoModalOpen(true)}
              tabIndex={0}
              role="button"
              aria-label={`Watch video story: ${currentStory.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsVideoModalOpen(true);
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${currentStory.videoId}/hqdefault.jpg`}
                alt={`Video poster for ${currentStory.title}`}
                className={styles.posterImg}
                loading="eager"
              />
              <div className={styles.posterGradientOverlay} />

              <span className={styles.posterTopBadge}>{currentStory.tag}</span>

              <button
                type="button"
                className={styles.posterPlayButton}
                aria-label={`Play video: ${currentStory.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoModalOpen(true);
                }}
              >
                <Play size={26} fill="currentColor" aria-hidden="true" />
              </button>

              <div className={styles.posterBottomCaption}>
                <div className={styles.posterBottomTag}>Story {currentStory.indexNumber}</div>
                <h3 className={styles.posterBottomTitle}>{currentStory.title}</h3>
              </div>
            </div>
          </div>

          {/* Right: Selected Story Details, Excerpt & Actions */}
          <div className={styles.storyDetailsCol}>
            <div className={styles.metaNavRow}>
              <div className={styles.storyCounter}>
                <span className={styles.counterActive}>{currentStory.indexNumber}</span>
                <span className={styles.counterTotal}>/ {totalStories < 10 ? `0${totalStories}` : totalStories}</span>
              </div>

              <div className={styles.arrowNavGroup}>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={handlePrev}
                  aria-label="Previous student story"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className={styles.arrowBtn}
                  onClick={handleNext}
                  aria-label="Next student story"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            <h3 className={styles.activeStoryTitle}>{currentStory.title}</h3>

            <p className={styles.activeStoryExcerpt}>{currentStory.excerpt}</p>

            <div className={styles.actionButtonsRow}>
              <button
                type="button"
                className={styles.watchStoryBtn}
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play size={16} fill="currentColor" aria-hidden="true" />
                <span>Watch story</span>
              </button>

              <button
                type="button"
                className={styles.readStoryBtn}
                onClick={() => setIsTextModalOpen(true)}
              >
                <BookOpen size={16} aria-hidden="true" />
                <span>Read full story</span>
              </button>
            </div>
          </div>
        </div>

        {/* Below: Horizontally Scrollable 12-Story Thumbnail Strip */}
        <div className={styles.thumbStripWrapper}>
          <div className={styles.thumbStripLabelRow}>
            <span className={styles.thumbStripLabel}>All Student Stories (12)</span>
            <span className={styles.thumbStripHint}>Click or scroll to preview</span>
          </div>

          <div
            ref={thumbTrackRef}
            className={styles.thumbScrollTrack}
            role="tablist"
            aria-label="Student stories thumbnails"
          >
            {STUDENT_STORIES.map((story, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={story.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Select story ${story.indexNumber}: ${story.title}`}
                  className={`${styles.thumbItemBtn} ${
                    isSelected ? styles.thumbItemBtnActive : ''
                  }`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <div className={styles.thumbImageContainer}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${story.videoId}/hqdefault.jpg`}
                      alt=""
                      className={styles.thumbCardImg}
                      loading="lazy"
                    />
                    <div className={styles.thumbPlayOverlay}>
                      <Play size={11} fill="currentColor" aria-hidden="true" />
                    </div>
                  </div>
                  <h4 className={styles.thumbItemTitle}>{story.title}</h4>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================
         MODAL 1: Accessible Video Player Dialog
         ======================================================== */}
      {isVideoModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsVideoModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Video: ${currentStory.title}`}
        >
          <div
            className={styles.videoModalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeaderBar}>
              <h3 className={styles.modalHeaderTitle}>{currentStory.title}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setIsVideoModalOpen(false)}
                aria-label="Close video player"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className={styles.videoIframeWrapper}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentStory.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={`BCTA Student Testimonial - ${currentStory.title}`}
                className={styles.videoIframe}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
         MODAL 2: Accessible Full Story Description Dialog
         ======================================================== */}
      {isTextModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsTextModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Full story: ${currentStory.title}`}
        >
          <div
            className={styles.textModalBox}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.textModalBody}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className={styles.textModalBadge}>
                  <Sparkles size={12} aria-hidden="true" />
                  <span>Student Editorial Summary</span>
                </span>
                <button
                  type="button"
                  className={styles.modalCloseBtn}
                  onClick={() => setIsTextModalOpen(false)}
                  aria-label="Close full story dialog"
                  style={{ background: '#f1f5f9', color: '#163058' }}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <h3 className={styles.textModalTitle}>{currentStory.title}</h3>

              <p className={styles.textModalParagraph}>{currentStory.description}</p>

              <div className={styles.textModalActions}>
                <a
                  href={`https://www.youtube.com/watch?v=${currentStory.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readStoryBtn}
                  style={{ fontSize: '0.85rem' }}
                >
                  <span>Open in YouTube</span>
                  <ExternalLink size={14} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  className={styles.watchStoryBtn}
                  onClick={() => {
                    setIsTextModalOpen(false);
                    setIsVideoModalOpen(true);
                  }}
                  style={{ padding: '0.65rem 1.25rem' }}
                >
                  <Play size={14} fill="currentColor" aria-hidden="true" />
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
