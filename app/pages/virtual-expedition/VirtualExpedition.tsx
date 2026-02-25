"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import { Bai_Jamjuree } from 'next/font/google';
import { RulesSection, AuthSection, GameSection, LeaderboardSection } from "./VirtualExpeditionComponents";

const baiJamjuree = Bai_Jamjuree({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const VirtualExpedition = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const sectionTop = sectionRef.current.offsetTop;
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const relativeScroll = scrollY + windowHeight - sectionTop;

                if (relativeScroll > 0) {
                    setScrollOffset(relativeScroll);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleAuth = (data: { email: string, phone: string }) => {
        console.log("Auth Data:", data);
        setIsAuthenticated(true);
    };

    return (
        <section ref={sectionRef} className="w-full bg-[#001D4A] min-h-screen flex flex-col">
            {/* Section 1: Hero Section (Blue) */}
            <div className="relative w-full h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src="/unmaad-assets/royal-blue.png" alt="Background" fill className="object-cover" priority />
                </div>
                <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
                    <Image src="/unmaad-assets/pattern.svg" alt="Pattern" fill className="object-cover" />
                </div>
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white font-samarkan uppercase">
                        virtual-expedition
                    </h1>
                </div>
            </div>

            {/* Transition Strip 1 */}
            <div className="relative z-30 w-full transform rotate-180">
                <Image src="/unmaad-assets/events-street/mandala-strip.svg" alt="Strip" width={1920} height={100} className="w-full h-auto object-cover" />
            </div>

            {/* Section 2: Content Section (Sophisticated Dark Green) */}
            <div className="relative w-full flex-grow flex flex-col items-center py-16 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#233126]">
                    <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('/unmaad-assets/pattern.svg')", backgroundRepeat: "repeat", backgroundSize: "auto" }} />
                </div>

                {/* Content Area */}
                <div className="relative z-20 w-full max-w-7xl mx-auto">
                    {!isAuthenticated ? (
                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-center mb-20 relative px-4">
                            {/* Rules (Initial side-by-side) */}
                            <div className="relative z-10 w-full flex-grow">
                                <RulesSection />
                            </div>
                            {/* Registration */}
                            <div className="relative z-20 w-full lg:max-w-md shrink-0">
                                <AuthSection onAuth={handleAuth} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-24 items-center mb-20 px-4">
                            <div className="w-full animate-fade-in-up">
                                <GameSection />
                            </div>
                            {/* Persistent Rules (Below Game) */}
                            <div className="w-full max-w-5xl">
                                <RulesSection />
                            </div>
                        </div>
                    )}

                    {/* Leaderboard */}
                    <div className="mt-12">
                        <LeaderboardSection />
                    </div>
                </div>

                {/* Parallax Branch (Right) */}
                <div
                    className="absolute bottom-40 -right-20 w-60 h-60 z-10 transition-transform duration-300 ease-out opacity-40"
                    style={{ transform: `translateY(${-(scrollOffset * 0.15)}px) rotate(${-(15 + scrollOffset * 0.01)}deg)` }}
                >
                    <Image src="/unmaad-assets/events-street/branch2.svg" alt="" fill className="object-contain" />
                </div>
            </div>

            {/* Transition Strip 2 */}
            <div className="relative z-30 w-full">
                <Image src="/unmaad-assets/events-street/mandala-strip.svg" alt="Strip" width={1920} height={100} className="w-full h-auto object-cover block" />
            </div>

            <Footer />
        </section>
    );
};

export default VirtualExpedition;
