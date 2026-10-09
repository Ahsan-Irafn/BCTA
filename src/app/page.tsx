import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import StateSelector from '@/components/home/StateSelector';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import AboutSection from '@/components/home/AboutSection';
import WhyChooseBcta from '@/components/home/WhyChooseBcta';
import CampusExperience from '@/components/home/CampusExperience';
import ReviewsSection from '@/components/home/ReviewsSection';
import ArticleHighlights from '@/components/home/ArticleHighlights';
import CtaBanner from '@/components/home/CtaBanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <StateSelector />
      <FeaturedCourses />
      <AboutSection />
      <WhyChooseBcta />
      <CampusExperience />
      <ReviewsSection />
      <ArticleHighlights />
      <CtaBanner />
    </>
  );
}
