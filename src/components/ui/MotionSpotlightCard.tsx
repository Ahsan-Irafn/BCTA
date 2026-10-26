'use client';

import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import styles from './MotionSpotlightCard.module.css';

interface MotionSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

/**
 * 21st.dev Component: Spotlight Border Card
 * Source: https://21st.dev/@dillionverma/components/bento-grid
 * Tracks cursor position and illuminates the card surface with subtle ambient highlight.
 */
export default function MotionSpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 182, 5, 0.12)',
}: MotionSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`${styles.cardWrapper} ${className}`}
    >
      <div
        className={styles.spotlightOverlay}
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
        aria-hidden="true"
      />
      <div className={styles.cardContent}>{children}</div>
    </motion.div>
  );
}
