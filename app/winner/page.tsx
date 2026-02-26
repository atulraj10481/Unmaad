'use client';

import React from "react";
import Image from "next/image";
import Link from 'next/link';

export default function WinnerPage() {
    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: 'url(/unmaad-assets/pattern.svg)' }} />

            <img src="/unmaad-assets/hero-page/evileye.svg" alt="" className="absolute top-10 left-10 w-24 md:w-32 opacity-20 pointer-events-none z-10" />
            <img src="/unmaad-assets/hero-page/pink4.svg" alt="" className="absolute bottom-10 right-10 w-24 md:w-32 opacity-30 pointer-events-none z-10" />

            <div className="z-20 w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-16 rounded-[3rem] shadow-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E05C8A] to-transparent" />

                <h1 className="text-4xl md:text-6xl font-black text-[#D4A847] mb-4 tracking-wider uppercase font-samarkan">Victory!</h1>
                <p className="text-sm md:text-base text-white/80 uppercase tracking-[0.3em] font-bold mb-10">You have completed the Unmaad Expedition.</p>

                <div className="bg-[#2B4EAA]/30 border border-[#2B4EAA]/50 rounded-2xl p-6 md:p-8 inline-block shadow-inner mb-10">
                    <p className="text-lg md:text-xl font-century-gothic italic text-white/90">
                        &quot;The truth has been sought, and the quest resolved.&quot;
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <Link href="/leaderboard" className="bg-[#E05C8A] hover:bg-[#E05C8A]/80 text-white font-bold text-xs uppercase tracking-widest py-4 px-10 rounded-full shadow-[0_0_15px_rgba(224,92,138,0.5)] transition-all">
                        View the Vanguard Roll
                    </Link>
                    <Link href="/pages/virtual-expedition" className="bg-transparent hover:bg-white/10 border-2 border-[#D4A847] text-[#D4A847] font-bold text-xs uppercase tracking-widest py-4 px-10 rounded-full transition-all">
                        Return to Origin
                    </Link>
                </div>
            </div>
        </div>
    );
}
