import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { conditionPrograms } from '@/constants/conditionPrograms';

const shortLabels: Record<string, string> = {
    diabetes: 'Diabetes',
    hypertension: 'Hypertension',
    cardiac: 'Cardiac',
    respiratory: 'Respiratory',
    mental: 'Mental Health',
    weight: 'Weight',
};

/**
 * Persistent bottom quick-nav for jumping straight to a program.
 * Homepage-only (mounted/unmounted with this page, not global chrome).
 */
const ProgramQuickNav = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 200;
            setVisible(window.scrollY > 700 && !nearBottom);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    aria-label="Jump to a program"
                    className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-1 bg-white/95 backdrop-blur-md border border-border rounded-full px-2 py-2 overflow-x-auto no-scrollbar"
                    style={{ boxShadow: 'var(--shadow-lg)', maxWidth: 'min(calc(100vw - 180px), 760px)' }}
                >
                    {conditionPrograms.map((program) => (
                        <Link
                            key={program.id}
                            to={`/disease-prevention-programs/${program.id}`}
                            className="px-3.5 py-2 rounded-full text-xs font-semibold text-foreground/75 hover:text-brand-700 hover:bg-primary/6 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
                        >
                            {shortLabels[program.id] ?? program.title}
                        </Link>
                    ))}
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default ProgramQuickNav;
