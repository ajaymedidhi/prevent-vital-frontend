import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogPopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup after a slight delay
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('hasSeenHeartBlogPopup');
            if (!hasSeenPopup) {
                setIsVisible(true);
            }
        }, 1500); // 1.5 seconds delay

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenHeartBlogPopup', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0f172a]/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] max-w-2xl w-full overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-500 delay-150">
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-black/10 hover:bg-black/20 md:bg-gray-100 md:hover:bg-gray-200 text-gray-800 rounded-full p-2.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#1a365d]"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                
                {/* Image Section */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100">
                    <img 
                        src="/images/heart_health_featured.jpg" 
                        alt="Heart Health" 
                        className="w-full h-full object-cover"
                    />
                </div>
                
                {/* Content Section */}
                <div className="w-full p-6 md:p-8 flex flex-col justify-center bg-white relative">
                    <div className="text-center">
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 inline-block">World Heart Day 2026</span>
                        
                        <h2 className="text-[#1a365d] text-2xl md:text-3xl font-extrabold leading-tight mb-4">
                            Why Prevention Starts Before the Problem
                        </h2>
                        
                        <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
                            Feeling healthy is important. Knowing your health is even better. Discover the <strong>6 everyday habits</strong> that can protect your heart and change your future.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link 
                            to="/blog/heart-health-prevention-world-heart-day"
                            onClick={handleClose}
                            className="bg-[#1a365d] hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-[0_8px_20px_-6px_rgba(26,54,93,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(26,54,93,0.6)] hover:-translate-y-1 w-full sm:w-auto text-center text-lg flex items-center justify-center gap-2"
                        >
                            Read the Article
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                        <button 
                            onClick={handleClose}
                            className="bg-transparent hover:bg-gray-50 text-gray-500 hover:text-gray-700 font-semibold py-3 px-8 rounded-xl transition-colors w-full sm:w-auto"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPopup;
