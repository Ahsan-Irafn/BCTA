'use client';

import React from 'react';
import { motion } from 'motion/react';
import styles from './MotionTabs.module.css';

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface MotionTabsProps<T extends string = string> {
  tabs: TabOption<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  layoutId?: string;
  className?: string;
}

/**
 * 21st.dev Component: Animated Spring Tabs
 * Source: https://21st.dev/@ibelick/components/animated-tabs
 * Uses Motion's shared layout animation (layoutId) for fluid sliding pill indicator.
 */
export default function MotionTabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  layoutId = 'motionTabPill',
  className = '',
}: MotionTabsProps<T>) {
  return (
    <div className={`${styles.tabsContainer} ${className}`} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className={styles.activeIndicator}
                transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
              />
            )}
            <span className={styles.tabContent}>
              {tab.icon && <span className={styles.tabIcon}>{tab.icon}</span>}
              <span className={styles.tabLabel}>{tab.label}</span>
              {tab.badge && <span className={styles.tabBadge}>{tab.badge}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
