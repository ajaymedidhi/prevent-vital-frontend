import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * Scroll-triggered fade-up wrapper shared across homepage sections.
 * Animates once when the element enters the viewport, then stays put.
 */
const FadeInSection = ({ children, className = '', delay = 0, y = 24 }: FadeInSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeInSection;
