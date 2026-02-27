"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import { Bai_Jamjuree } from 'next/font/google';
import { Timer, ArrowRight, Trophy } from "lucide-react";
import { RulesSection, LeaderboardSection } from "./VirtualExpeditionComponents";

const baiJamjuree = Bai_Jamjuree({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const QuestOverSection = () => {
    return (
        <div className="w-full max-w-sm mx-auto p-8 sm:p-10 bg-[#2D3B2F]/80 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] border-2 border-[#D4A847]/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4A847]/50 to-transparent" />

            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-[#D4A847]/10 rounded-full flex items-center justify-center mb-4 border border-[#D4A847]/20 shadow-inner">
                    <Trophy className="w-8 h-8 text-[#D4A847]" />
                </div>
                <h3 className="text-3xl md:text-4xl text-white font-samarkan mb-2 text-center drop-shadow-md">Quest Completed</h3>
                <p className="text-[#D4A847]/70 text-center font-century-gothic text-[10px] tracking-widest uppercase font-bold">Expedition Concluded</p>
            </div>

            <div className="text-center px-4">
                <p className="text-white/80 font-century-gothic text-sm leading-relaxed mb-6">
                    Thank you for participating!
                </p>
                <div className="p-4 bg-black/30 rounded-2xl border border-[#D4A847]/20">
                    <p className="text-[#D4A847] font-bold text-xs uppercase tracking-widest mb-1 font-century-gothic">Status</p>
                    <p className="text-white font-century-gothic text-lg font-bold">Winners will be announced soon!</p>
                </div>
            </div>
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
                    <div className="flex flex-col items-center justify-center mb-20 relative px-4 text-center">
                        {/* Quest Completed Section - Top */}
                        <div className="relative z-20 w-full lg:max-w-md shrink-0">
                            <QuestOverSection />
                        </div>
                    </div>

                    {/* Leaderboard Section - Middle */}
                    <div className="mt-12 leaderboard-section">
                        <LeaderboardSection />
                    </div>

                    {/* Rules Section - Bottom */}
                    <div className="mt-20">
                        <RulesSection />
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
