import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.25, 1, 0.5, 1] as const;

// If IntersectionObserver isn't available, never hide content — render it shown
// so a missing/blocked observer can't leave a section permanently invisible.
const SUPPORTS_IO = typeof window !== 'undefined' && 'IntersectionObserver' in window;
const INITIAL = SUPPORTS_IO ? 'hidden' : 'show';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset = (dir: Direction, d = 28) => {
  switch (dir) {
    case 'up': return { y: d };
    case 'down': return { y: -d };
    case 'left': return { x: d };
    case 'right': return { x: -d };
    default: return {};
  }
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  amount?: number;
  id?: string;
}

/** Fade + slide a block into view once it scrolls into the viewport. */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  amount = 0.2,
  id,
}: RevealProps) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset(direction) },
    show: { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE, delay } },
  };
  return (
    <motion.div
      id={id}
      className={className}
      variants={variants}
      initial={INITIAL}
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its <RevealItem> children as the group enters view. */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial={INITIAL}
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = 'up',
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset(direction, 24) },
    show: { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
