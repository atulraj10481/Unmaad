"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "../../components/Footer";
import { Bai_Jamjuree } from 'next/font/google';
import { Timer } from "lucide-react";
import { RulesSection, LeaderboardSection } from "./VirtualExpeditionComponents";

const baiJamjuree = Bai_Jamjuree({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const ComingSoonSection = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const launchDate = new Date("2026-02-26T12:00:00+05:30").getTime();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance < 0) {
                clearInterval(timer);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-sm mx-auto p-8 sm:p-10 bg-[#2D3B2F]/80 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] border-2 border-[#D4A847]/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4A847]/50 to-transparent" />

            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-[#D4A847]/10 rounded-full flex items-center justify-center mb-4 border border-[#D4A847]/20 shadow-inner">
                    <Timer className="w-8 h-8 text-[#D4A847]" />
                </div>
                <h3 className="text-3xl md:text-4xl text-white font-samarkan mb-2 text-center drop-shadow-md">The Quest Awaits</h3>
                <p className="text-[#D4A847]/70 text-center font-century-gothic text-[10px] tracking-widest uppercase font-bold">Prepare yourself</p>
            </div>

            {/* Timer Rings */}
            <div className="flex gap-3 mb-10 w-full justify-center">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl border border-[#D4A847]/30 bg-black/40 flex items-center justify-center mb-2 shadow-inner">
                        <span className="text-xl font-bold text-[#D4A847] tabular-nums">{timeLeft.days.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#D4A847]/60 font-bold">Days</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl border border-[#D4A847]/30 bg-black/40 flex items-center justify-center mb-2 shadow-inner">
                        <span className="text-xl font-bold text-[#D4A847] tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#D4A847]/60 font-bold">Hrs</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl border border-[#D4A847]/30 bg-black/40 flex items-center justify-center mb-2 shadow-inner">
                        <span className="text-xl font-bold text-[#D4A847] tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#D4A847]/60 font-bold">Mins</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl border border-[#D4A847]/30 bg-black/40 flex items-center justify-center mb-2 shadow-inner">
                        <span className="text-xl font-bold text-[#D4A847] tabular-nums">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#D4A847]/60 font-bold">Secs</span>
                </div>
            </div>

            <button disabled className="relative z-10 px-8 py-4 font-bold text-[#1b110b] bg-[#D4A847] shadow-[0_0_20px_rgba(212,168,71,0.4)] rounded-full text-[10px] tracking-[0.3em] uppercase transition-all">
                Coming Soon
            </button>
        </div>
    );
};

const VirtualExpedition = () => {

    return (
        <section className="w-full bg-[#001D4A] min-h-screen flex flex-col">
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
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-center mb-20 relative px-4">
                        {/* Rules (Initial side-by-side) */}
                        <div className="relative z-10 w-full flex-grow">
                            <RulesSection />
                        </div>
                        {/* Coming Soon Timer */}
                        <div className="relative z-20 w-full lg:max-w-md shrink-0">
                            <ComingSoonSection />
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="mt-12">
                        <LeaderboardSection />
                    </div>
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
