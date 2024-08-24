"use client"

import { useEffect, useState } from 'react';
import { LuArrowUpFromLine } from 'react-icons/lu';

function ScrollToTop() {
    const [showScroll, setShowScroll] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 400) {
            setShowScroll(true);
        } else {
            setShowScroll(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed right-10 bottom-20 z-[999999999]">
            {showScroll && (
                <button
                    onClick={scrollToTop}
                    className="flex items-center justify-center w-10 h-10 text-xl text-white bg-[#797979] rounded-full shadow"
                >
                    <LuArrowUpFromLine />
                </button>
            )}
        </div>
    );
}

export default ScrollToTop;
