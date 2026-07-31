import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

/**
 * Persistent entry point into VITA, homepage-only. Links to the real
 * assessment/chat flow — intentionally not a decorative widget that
 * implies live support which doesn't exist.
 */
const ChatWithVitaButton = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-5 z-40"
        >
            <Link
                to="/ai-health-assessment"
                className="group flex items-center gap-2 bg-primary text-primary-foreground rounded-full pl-4 pr-5 py-3.5 hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: 'var(--shadow-lg)' }}
                aria-label="Chat with VITA"
            >
                <MessageCircle size={18} />
                <span className="text-xs font-bold hidden sm:inline">Chat with VITA</span>
            </Link>
        </motion.div>
    );
};

export default ChatWithVitaButton;
