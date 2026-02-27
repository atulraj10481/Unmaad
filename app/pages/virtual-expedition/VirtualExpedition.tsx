"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/Footer";
import { Bai_Jamjuree } from 'next/font/google';
import { Timer, ArrowRight, Trophy, UserPlus, CheckCircle2, Target, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RulesSection, LeaderboardSection } from "./VirtualExpeditionComponents";

const baiJamjuree = Bai_Jamjuree({
    weight: ['400', '700'],
    subsets: ['latin'],
});

const CountUp = ({ end, duration = 2, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
};

const StatsMatrix = () => {
    const statItems = [
        { label: "Total Participants", value: 174, icon: UserPlus, color: "text-blue-400" },
        { label: "Expedition Completed", value: 28, icon: CheckCircle2, color: "text-green-400" },
        { label: "Avg Completion", value: 142, icon: Timer, color: "text-amber-400", suffix: "m" },
        { label: "Quests Solved", value: 2595, icon: Target, color: "text-rose-400" },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full h-full p-2">
            {statItems.map((item, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 p-3 sm:p-4 flex flex-col items-center justify-center text-center group hover:border-[#D4A847]/30 transition-all duration-300">
                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <div className="text-xl sm:text-2xl font-bold text-white font-century-gothic truncate w-full">
                        <CountUp end={item.value} suffix={item.suffix} />
                    </div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-white/30 font-bold mt-1">{item.label}</div>
                </div>
            ))}
        </div>
    );
};

const QuestStatusContent = () => (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="w-16 h-16 bg-[#D4A847]/10 rounded-full flex items-center justify-center mb-4 border border-[#D4A847]/20 shadow-inner">
            <Trophy className="w-8 h-8 text-[#D4A847]" />
        </div>
        <h3 className="text-3xl md:text-3xl lg:text-4xl text-white font-samarkan mb-2 drop-shadow-md">Expedition Completed</h3>
        <p className="text-[#D4A847]/70 font-century-gothic text-[10px] tracking-widest uppercase font-bold mb-6 italic">Expedition Concluded</p>

        <div className="w-full p-4 bg-black/40 rounded-2xl border border-[#D4A847]/10 flex items-center justify-center gap-3">
            <Megaphone className="w-5 h-5 text-[#D4A847] animate-bounce" />
            <div className="text-left">
                <p className="text-[#D4A847] font-bold text-[10px] uppercase tracking-widest mb-1 font-century-gothic">Current Status</p>
                <p className="text-white font-century-gothic text-base font-bold">Winners are announced!</p>
            </div>
        </div>
    </div>
);

const QuestSection = () => {
    const [activeTab, setActiveTab] = useState<'status' | 'stats'>('status');

    return (
        <div className="w-full max-w-sm mx-auto bg-[#2D3B2F]/80 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] border-2 border-[#D4A847]/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col min-h-[420px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4A847]/50 to-transparent" />

            {/* Tabs Navigation */}
            <div className="flex border-b border-white/5 bg-black/20">
                <button
                    onClick={() => setActiveTab('status')}
                    className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${activeTab === 'status' ? 'text-[#D4A847]' : 'text-white/20 hover:text-white/40'}`}
                >
                    Status
                    {activeTab === 'status' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4A847]" />}
                </button>
                <button
                    onClick={() => setActiveTab('stats')}
                    className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${activeTab === 'stats' ? 'text-[#D4A847]' : 'text-white/20 hover:text-white/40'}`}
                >
                    Expedition Matrix
                    {activeTab === 'stats' && <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4A847]" />}
                </button>
            </div>

            <div className="flex-grow p-6 sm:p-8">
                <AnimatePresence mode="wait">
                    {activeTab === 'status' ? (
                        <motion.div
                            key="status"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="h-full"
                        >
                            <QuestStatusContent />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="stats"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="h-full"
                        >
                            <StatsMatrix />
                        </motion.div>
                    )}
                </AnimatePresence>
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
                            <QuestSection />
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
