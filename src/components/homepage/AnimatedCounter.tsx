import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * Counts up from 0 to `value` once it scrolls into view.
 * Intended for stable, derivable figures (e.g. program count, week duration) —
 * not marketing KPIs, which this codebase deliberately keeps hidden until finalized.
 */
const AnimatedCounter = ({ value, suffix = '', prefix = '', className = '' }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
