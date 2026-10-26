'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import styles from './MotionAccordion.module.css';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  category?: string;
}

interface MotionAccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultExpandedIndex?: number;
}

/**
 * 21st.dev Component: Motion Accordion
 * Source: https://21st.dev/@ibelick/components/accordion (Motion Primitives)
 * Adapted to BCTA Brand: Australian Deep Navy (#0D1E38), Safety Gold (#FFB605), smooth spring physics.
 */
export default function MotionAccordion({
  items,
  allowMultiple = false,
  defaultExpandedIndex,
}: MotionAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(() => {
    if (defaultExpandedIndex !== undefined && items[defaultExpandedIndex]) {
      return [items[defaultExpandedIndex].id];
    }
    return [];
  });

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={styles.accordionContainer} role="region" aria-label="Frequently Asked Questions">
      {items.map((item, idx) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`${styles.accordionItem} ${isOpen ? styles.accordionItemActive : ''}`}
          >
            <button
              type="button"
              className={styles.accordionTrigger}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-body-${item.id}`}
              id={`accordion-btn-${item.id}`}
            >
              <span className={styles.questionIndex}>0{idx + 1}</span>
              <span className={styles.questionText}>{item.question}</span>
              <motion.div
                className={styles.chevronWrapper}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown size={18} aria-hidden="true" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-body-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${item.id}`}
                  className={styles.accordionContentWrapper}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.25, delay: 0.05 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.15 },
                    },
                  }}
                >
                  <div className={styles.accordionBody}>
                    {typeof item.answer === 'string' ? (
                      <p className={styles.answerText}>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
