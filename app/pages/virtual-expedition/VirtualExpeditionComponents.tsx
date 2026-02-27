"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Compass, UserPlus, Trophy, Timer, Globe, Medal, CheckCircle2, ChevronRight, Hash, Clock, Eye, EyeOff, Map as MapIcon, Target, Flag } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const howToPlay = [
    "The event will be hosted exclusively on unmaad.co.in.",
    "Questions will be presented in image format: enter answers in lowercase, no spaces/special characters, and no titles for personalities.",
    "Participants can move to the next question only after answering the current one correctly.",
    "The first to complete all 40 questions wins, and the second is the runner-up."
];

const unmaadGuidelines = [
    "Participants must provide accurate and complete information during registration.",
    "Each participant can register only once.",
    "The organizer's decision on scoring and winners is final and binding.",
    "Prize distribution details will be communicated to the winners later on.",
    "Unmaad is not responsible for any technical issues (connectivity, server, platform).",
    "Unmaad reserves the right to modify event rules, format, or any other aspect as needed.",
    "Unmaad reserves the right to disqualify anyone for misconduct or rule violation.",
    "Unmaad is not liable for any loss, injury, or damages during the event.",
    "Participating implies agreement to abide by these terms and conditions."
];

const TypingText = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, 150);
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setDisplayedText("");
                setIndex(0);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [index, text]);

    return (
        <span className="text-amber-800 font-black border-r-2 border-amber-800 animate-pulse px-1">
            {displayedText}
        </span>
    );
};


const ScrollHandle = ({ isBottom = false }: { isBottom?: boolean }) => (
    <div className={`absolute left-0 right-0 h-12 z-50 flex items-center justify-center ${isBottom ? 'bottom-[-12px]' : 'top-[-12px]'}`}>
        <div className="relative w-[106%] flex items-center">
            {/* Main Wooden Bar */}
            <div className="flex-grow h-8 bg-gradient-to-b from-[#3d2b1f] via-[#5d4037] to-[#3d2b1f] rounded-full shadow-2xl relative border-y border-white/5 mx-2">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 mix-blend-overlay" />
                <div className="absolute top-1/3 inset-x-8 h-[1px] bg-white/10" />
                <div className="absolute bottom-1/3 inset-x-8 h-[1px] bg-black/10" />
            </div>

            {/* End Caps (Gold) */}
            <div className="absolute left-[-12px] w-10 h-16 bg-gradient-to-b from-amber-700 via-amber-400 to-amber-700 rounded-xl shadow-xl flex items-center justify-center border-2 border-amber-900/40">
                <div className="w-6 h-6 rounded-full bg-amber-900/20 blur-sm" />
                <div className="absolute inset-1.5 border border-white/10 rounded-lg" />
            </div>
            <div className="absolute right-[-12px] w-10 h-16 bg-gradient-to-b from-amber-700 via-amber-400 to-amber-700 rounded-xl shadow-xl flex items-center justify-center border-2 border-amber-900/40">
                <div className="w-6 h-6 rounded-full bg-amber-900/20 blur-sm" />
                <div className="absolute inset-1.5 border border-white/10 rounded-lg" />
            </div>

            {/* Red Thread & Keychain (Top/Left Only) */}
            {!isBottom && (
                <div className="absolute left-[2px] top-8 flex flex-col items-center">
                    {/* Hanging Thread */}
                    <div className="w-[2px] h-10 bg-red-600 shadow-[0_4px_10px_rgba(0,0,0,0.5)] relative">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-800" />
                    </div>
                    {/* Keychain Logo */}
                    <motion.div
                        animate={{ rotate: [0, 8, -8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-11 h-11 bg-amber-400 rounded-full border-2 border-amber-700 shadow-2xl flex items-center justify-center p-2 -mt-2 relative group bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600"
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-red-600" />
                        <Image src="/unmaad-assets/unmaadv-logo.svg" alt="UnmaadV" width={24} height={24} className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                    </motion.div>
                </div>
            )}
        </div>
    </div>
);

export const RulesSection = () => {
    return (
        <div className="w-full max-w-4xl mx-auto relative px-4 md:px-10 lg:px-12">
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: "auto" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="mx-2 md:mx-4 lg:mx-6 relative overflow-hidden bg-[#dcc6a0] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-x-4 border-[#3d2b1f]/20"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 98%, 97% 96%, 94% 99%, 90% 97%, 85% 100%, 80% 96%, 75% 99%, 70% 97%, 65% 100%, 60% 96%, 55% 99%, 50% 97%, 45% 100%, 40% 96%, 35% 99%, 30% 97%, 25% 100%, 20% 96%, 15% 99%, 10% 97%, 5% 100%, 2% 96%, 0% 98%)",
                    backgroundImage: `
                        repeating-linear-gradient(rgba(180, 0, 0, 0.08) 0px, rgba(180, 0, 0, 0.08) 1px, transparent 1px, transparent 28px),
                        radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 100%)
                    `,
                    backgroundSize: "100% 28px, 100% 100%"
                }}
            >
                {/* Scroll Content */}
                <div className="pt-12 p-4 md:p-10 lg:p-12 pb-24">
                    {/* Aging Overlays */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/p6.png')" }} />
                    <div className="absolute inset-0 shadow-[inner_0_0_80px_rgba(80,50,20,0.2)] pointer-events-none" />

                    <div className="relative z-10 space-y-10">
                        <div>
                            <h3 className="text-xl md:text-2xl text-[#1b110b] font-samarkan mb-6 text-center tracking-wider underline decoration-amber-900/20">
                                How to Play
                            </h3>
                            <div className="space-y-3">
                                {howToPlay.map((item, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <span className="text-[#1b110b]/80 font-samarkan text-lg shrink-0 mt-0.5">{i + 1}.</span>
                                        <p className="text-[#2a1b0f] font-bold font-century-gothic text-[10px] sm:text-[11px] leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Example Section */}
                            <div className="mt-8 p-4 bg-white/30 rounded-xl border-2 border-amber-900/10 max-w-md mx-auto">
                                <p className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 mb-3 text-center">Example Stage:</p>
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden border-2 border-amber-900/20 shadow-lg mb-4">
                                    <Image
                                        src="/unmaad-assets/Example.png"
                                        alt="Example Question"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex items-center justify-center gap-2 font-century-gothic font-black text-sm text-[#1b110b]">
                                    <span className="uppercase tracking-tighter">Answer:</span>
                                    <TypingText text="alexeinavalny" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl text-[#1b110b] font-samarkan mb-6 text-center tracking-wider underline decoration-amber-900/20">
                                Guidelines of Unmaad
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 md:gap-y-3 px-2 text-left">
                                {unmaadGuidelines.map((item, i) => (
                                    <div key={i} className="flex gap-2.5 items-start">
                                        <span className="text-[#1b110b]/80 font-black text-[10px] shrink-0 mt-0.5">{i + 1}.</span>
                                        <p className="text-[#2a1b0f] font-bold font-century-gothic text-[10px] leading-relaxed italic">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Aesthetic "Ink" Stamp */}
                    <div className="absolute bottom-10 right-10 opacity-15 pointer-events-none -rotate-12">
                        <Compass className="w-20 h-20 text-[#1b110b]" />
                    </div>
                </div>
            </motion.div>

            {/* Scroll Handle (Top Only) */}
            <ScrollHandle />
        </div>
    );
};

export const AuthSection = ({ onAuth }: { onAuth: (data: { name: string, email: string, phone: string, otp: string }) => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name && email && phone) {
            setIsSubmitting(true);
            try {
                await fetch("https://nocodeform.io/f/699fee5095ec224ea5a291a5", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    body: JSON.stringify({ name, email, phone })
                });
                setIsRegistered(true);
            } catch (error) {
                console.error("Error submitting form", error);
            }
            setIsSubmitting(false);
        }
    };

    if (isRegistered) {
        return (
            <div className="w-full max-w-sm mx-auto p-5 sm:p-6 md:p-10 bg-[#2D3B2F]/80 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] border-2 border-amber-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl md:text-3xl text-white font-samarkan mb-3 text-center">Thank You!</h3>
                <p className="text-amber-200/60 text-center font-century-gothic text-sm leading-relaxed mb-6 px-4">
                    Your registration for the Virtual Expedition was successful.
                </p>
                <div className="p-4 bg-black/20 rounded-xl border border-white/5 w-full text-center">
                    <p className="text-amber-500 font-bold text-[11px] uppercase tracking-widest mb-1">Reminder</p>
                    <p className="text-white/60 text-[10px] uppercase tracking-wider">
                        Expedition goes live at 1:30 PM
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm mx-auto p-5 sm:p-6 md:p-10 bg-[#2D3B2F]/80 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] border-2 border-amber-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

            <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
                    <UserPlus className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-3xl md:text-4xl text-white font-samarkan mb-2 text-center">Join the Quest</h3>
                <p className="text-amber-200/30 text-center font-century-gothic text-xs tracking-widest uppercase">register and play</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/5 text-sm"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Email ID</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/5 text-sm"
                        placeholder="explorer@unmaad.com"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Phone Number</label>
                    <div className="relative flex items-center">
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/5 text-sm"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center pt-6 gap-3">
                    <div className="relative group">
                        {/* Physical Shadow */}
                        <div className="absolute w-full h-full top-1 left-1 bg-black/50 rounded-none" />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative z-10 inline-flex items-center justify-center px-8 py-3 font-bold text-white bg-amber-600 rounded-none text-[10px] tracking-[0.3em] uppercase transition-transform active:translate-x-1 active:translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0"
                        >
                            <span className="relative z-20">
                                {isSubmitting ? "Submitting..." : "Start Expedition"}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity rounded-none" />
                        </button>
                    </div>
                    <p className="text-amber-200/60 text-[10px] font-bold tracking-[0.1em] text-center mt-2">
                        Expedition goes live at 1:30 PM.<br />
                        <span className="text-amber-500 uppercase">Don't miss to be the winner.</span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export const GameSection = () => {
    const [currentQ, setCurrentQ] = useState(1);
    const [answer, setAnswer] = useState("");
    const [timer, setTimer] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (isGameOver) return;
        const interval = setInterval(() => {
            setTimer((prev: number) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isGameOver]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
        setAnswer(val);
    };

    const nextQuestion = () => {
        if (answer) {
            setScore((prev: number) => prev + 10);
            if (currentQ < 40) {
                setCurrentQ((prev: number) => prev + 1);
                setAnswer("");
            } else {
                setIsGameOver(true);
            }
        }
    };

    if (isGameOver) {
        return (
            <div className="px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-4xl mx-auto p-6 md:p-12 bg-[#d8d0c2] rounded-[2rem] md:rounded-[3rem] border-8 border-[#8c603e]/40 shadow-2xl relative overflow-hidden text-center"
                >
                    {/* Mandala Patterns */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale" />
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale rotate-180" />

                    <div className="relative z-10 space-y-6 md:space-y-10">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-century-gothic font-black text-[#8c603e] mb-2 md:mb-4 uppercase tracking-[0.1em]">Quest Successfully Completed!</h2>
                            <p className="text-[#8c603e]/60 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-[10px] md:text-sm">You have weathered the storm and found the truth.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-4 md:py-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-4 md:p-6 bg-white/20 rounded-2xl border-2 border-[#8c603e]/10 backdrop-blur-sm"
                            >
                                <Target className="w-6 h-6 md:w-8 md:h-8 text-[#8c603e] mx-auto mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-[#8c603e]">{score}</div>
                                <div className="text-[9px] md:text-[10px] text-[#8c603e]/40 uppercase tracking-widest font-black">Final Score</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="p-4 md:p-6 bg-white/20 rounded-2xl border-2 border-[#8c603e]/10 backdrop-blur-sm"
                            >
                                <MapIcon className="w-6 h-6 md:w-8 md:h-8 text-[#8c603e] mx-auto mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-[#8c603e]">{currentQ} / 40</div>
                                <div className="text-[9px] md:text-[10px] text-[#8c603e]/40 uppercase tracking-widest font-black">Accuracy</div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                                className="p-4 md:p-6 bg-white/20 rounded-2xl border-2 border-[#8c603e]/10 backdrop-blur-sm"
                            >
                                <Timer className="w-6 h-6 md:w-8 md:h-8 text-[#8c603e] mx-auto mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-[#8c603e]">{formatTime(timer)}</div>
                                <div className="text-[9px] md:text-[10px] text-[#8c603e]/40 uppercase tracking-widest font-black">Time Taken</div>
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto my-8 flex flex-col lg:flex-row gap-4 md:gap-8 items-start px-4">
            {/* Parchment Sidebar */}
            <div className="w-full lg:w-[200px] shrink-0 space-y-4">
                <div className="bg-[#d8d0c2] p-2 sm:p-4 md:p-6 rounded-xl sm:rounded-[2rem] border-4 border-[#8c603e]/40 shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-row lg:flex-col flex-nowrap lg:flex-nowrap items-center lg:items-start justify-between lg:justify-start gap-x-2 sm:gap-x-8 gap-y-1 sm:gap-y-6 md:gap-x-12 lg:gap-0 lg:space-y-8 relative overflow-hidden">
                    {/* Mandala Patterns */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale" />
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale rotate-180" />

                    <div className="relative z-10 shrink-0">
                        <div className="flex items-center gap-1 mb-1 lg:mb-4">
                            <MapIcon className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#8c603e]" />
                            <span className="text-[#8c603e]/60 text-[7px] lg:text-[8px] font-bold uppercase tracking-[0.4em] block">Stage</span>
                        </div>
                        <div className="text-lg sm:text-2xl md:text-3xl font-bold text-[#8c603e] tracking-tighter flex items-baseline">
                            {currentQ}<span className="text-[#8c603e]/20 text-xs sm:text-lg ml-0.5">/40</span>
                        </div>
                        <div className="hidden lg:block w-full h-[6px] bg-[#8c603e]/10 mt-6 relative rounded-full overflow-hidden border border-[#8c603e]/20">
                            <motion.div
                                className="h-full bg-[#8c603e]"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentQ / 40) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className="relative z-10 shrink-0">
                        <div className="flex items-center gap-1 mb-1 lg:mb-4">
                            <Timer className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#8c603e]/60" />
                            <span className="text-[#8c603e]/60 text-[7px] lg:text-[8px] font-bold uppercase tracking-[0.4em] block">Time</span>
                        </div>
                        <div className="text-base sm:text-lg md:text-xl font-mono text-[#8c603e] tabular-nums">
                            {formatTime(timer)}
                        </div>
                    </div>

                    <div className="relative z-10 shrink-0">
                        <div className="flex items-center gap-1 mb-1 lg:mb-4">
                            <Target className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#8c603e]/60" />
                            <span className="text-[#8c603e]/60 text-[7px] lg:text-[8px] font-bold uppercase tracking-[0.4em] block">Score</span>
                        </div>
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-[#8c603e] tabular-nums tracking-widest">
                            {score}
                        </div>
                    </div>
                </div>
            </div>

            {/* Parchment Main Content Area */}
            <div className="flex-grow flex flex-col space-y-4 md:space-y-6 w-full">
                <div className="md:bg-[#d8d0c2] md:rounded-[2.5rem] md:border-4 md:border-[#8c603e]/40 md:shadow-[0_40px_80px_rgba(0,0,0,0.25)] relative overflow-hidden md:p-8 p-0">
                    {/* Visible Mandala Strips - Hidden on mobile naked layout */}
                    <div className="hidden md:block absolute top-0 left-0 right-0 h-2 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale" />
                    <div className="hidden md:block absolute bottom-0 left-0 right-0 h-2 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale rotate-180" />

                    <div className="relative aspect-[4/3] lg:aspect-[16/9] w-full rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c603e]/20">
                        <Image
                            src={`/unmaad-assets/competition-bazaar/comps/virtualexpedition1.jpg`}
                            alt="Quest Subject"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="bg-[#d8d0c2] rounded-xl sm:rounded-[2.5rem] border-4 border-[#8c603e]/40 p-2 sm:p-5 md:p-8 flex flex-col md:flex-row items-center gap-2 sm:gap-6 justify-between shadow-xl relative overflow-hidden">
                    {/* Subtle Mandala Background */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-center grayscale" />

                    <div className="flex-grow w-full max-w-sm relative z-10">
                        <input
                            type="text"
                            value={answer}
                            onChange={handleAnswerChange}
                            placeholder="enter your guess..."
                            className="w-full bg-transparent border-b-2 border-[#8c603e]/30 py-1.5 sm:py-2 text-sm sm:text-base outline-none transition-all text-[#8c603e] placeholder:text-[#8c603e]/30 tracking-[0.2em] font-bold lowercase"
                        />
                    </div>

                    <div className="relative group shrink-0">
                        {/* Static Shadow */}
                        <div className="absolute w-full h-full top-1 left-1 bg-black/50 rounded-none" />

                        <button
                            onClick={nextQuestion}
                            className="relative z-10 px-8 py-2.5 bg-[#8c603e] text-[#d8d0c2] font-bold text-xs tracking-[0.2em] uppercase rounded-none transition-transform active:translate-x-1 active:translate-y-1"
                        >
                            Submit
                        </button>
                    </div>

                    <div className="hidden lg:block text-[9px] text-[#8c603e]/40 font-bold uppercase tracking-[0.2em] italic pr-4 relative z-10">
                        Lowercase • Alphanumeric • Solid
                    </div>
                </div>
            </div>
        </div>
    );
};

const LEADERBOARD_DATA = [
    { rank: 1, name: "Akanksha Rohit", college: "IIM Bangalore", stage: 40, timestamp: "26 Feb, 02:39:57.96 pm" },
    { rank: 2, name: "Cheshta singh", college: "IIM Bangalore", stage: 40, timestamp: "26 Feb, 02:40:02.74 pm" },
    { rank: 3, name: "saksham sharma", college: "IIMB", stage: 40, timestamp: "26 Feb, 02:40:17.09 pm" },
    { rank: 4, name: "Udvas B", college: "--", stage: 40, timestamp: "26 Feb, 02:43:02.87 pm" },
    { rank: 5, name: "Shashank", college: "IIM Bangalore", stage: 40, timestamp: "26 Feb, 02:48:26.87 pm" },
    { rank: 6, name: "Bhavik Dhodi", college: "IIM Bangalore", stage: 40, timestamp: "26 Feb, 02:51:12.82 pm" },
    { rank: 7, name: "Sarthak Bindal", college: "--", stage: 40, timestamp: "26 Feb, 02:55:48.20 pm" },
    { rank: 8, name: "Prateek Agarwal", college: "IIMB", stage: 40, timestamp: "26 Feb, 02:56:01.51 pm" },
    { rank: 9, name: "Riya", college: "--", stage: 40, timestamp: "26 Feb, 02:56:03.87 pm" },
    { rank: 10, name: "Mahesh Mannam", college: "welingkar", stage: 40, timestamp: "26 Feb, 02:56:18.27 pm" },
    { rank: 11, name: "Palak Shab", college: "IIM Bangalore", stage: 40, timestamp: "26 Feb, 02:57:08.78 pm" },
    { rank: 12, name: "Sagar Y", college: "--", stage: 40, timestamp: "26 Feb, 03:00:37.00 pm" },
    { rank: 13, name: "Ayush Kumar Shaw", college: "IIM Banglaore", stage: 40, timestamp: "26 Feb, 03:00:51.53 pm" },
    { rank: 14, name: "gd", college: "--", stage: 40, timestamp: "26 Feb, 03:02:59.07 pm" },
    { rank: 15, name: "Aditya Bhardwaj", college: "IIM Bangalore", stage: 40, timestamp: "26 Feb, 03:17:53.37 pm" }
];

export const LeaderboardSection = () => {
    const data = LEADERBOARD_DATA;

    return (
        <div className="w-full max-w-5xl mx-auto my-16 px-4 leaderboard-section">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl text-white font-samarkan tracking-wider">leaderboard</h3>
                    <p className="text-amber-200/20 text-[10px] uppercase tracking-[0.5em] mt-3 font-century-gothic font-bold">The Vanguard of Unmaad</p>
                </div>
            </div>

            <div className="bg-[#1a241c]/80 backdrop-blur-3xl rounded-none border-2 border-amber-500/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-amber-500/[0.03] border-b border-amber-500/10">
                                <th className="py-3 pl-4 pr-1 md:py-6 md:px-8 text-left text-amber-200/20 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black w-24">Sr.</th>
                                <th className="py-3 px-1 md:py-6 md:px-8 text-left text-amber-200/20 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black">Explorer</th>
                                <th className="py-3 px-1 md:py-6 md:px-8 text-left text-amber-200/20 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black hidden lg:table-cell">College</th>
                                <th className="py-3 px-1 md:py-6 md:px-8 text-center text-amber-200/20 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black">Quest Progress</th>
                                <th className="py-3 px-1 md:py-6 md:px-8 text-center text-amber-200/20 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black">Completion Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {data.map((player, i) => (
                                <tr key={i} className={`hover:bg-amber-500/[0.02] transition-colors group ${i === 0 ? 'bg-amber-500/[0.01]' : ''}`}>
                                    <td className="py-3 pl-4 pr-1 md:py-6 md:px-8">
                                        <div className="flex items-center gap-1.5 md:gap-4">
                                            {i === 0 && <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />}
                                            {i === 1 && <Medal className="w-4 h-4 md:w-5 md:h-5 text-gray-400 opacity-80" />}
                                            <span className={`font-samarkan text-base md:text-xl ${i === 0 ? 'text-amber-500' : 'text-white/20'}`}>
                                                {i + 1 < 10 ? `0${i + 1}` : i + 1}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-1 md:py-6 md:px-8">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-white/90 group-hover:text-amber-400 transition-colors uppercase tracking-[0.1em] text-[10px] md:text-sm font-century-gothic">
                                                {player.name}
                                            </span>
                                            <span className="text-[8px] sm:text-[9px] text-amber-500/30 uppercase tracking-[0.2em] mt-1 font-bold italic lg:hidden">{player.college}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-1 md:py-6 md:px-8 hidden lg:table-cell">
                                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{player.college}</span>
                                    </td>
                                    <td className="py-3 px-1 md:py-6 md:px-8 text-center">
                                        <div className="inline-flex items-center justify-center px-1.5 py-1 md:px-3 md:py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 group-hover:border-amber-500/30 transition-all">
                                            <span className="text-[10px] sm:text-sm md:text-lg font-black text-amber-500/90 tabular-nums font-century-gothic">{player.stage}/40</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-1 md:py-6 md:px-8 text-center">
                                        <div className="flex items-center justify-center text-white/40 font-bold font-century-gothic text-xs tracking-widest tabular-nums">
                                            {player.timestamp}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Footer Info */}
                <div className="p-6 bg-black/20 border-t border-white/5 flex justify-center">
                    <p className="text-[9px] text-white/10 uppercase tracking-[0.4em] font-bold">Season of Quest 2026</p>
                </div>
            </div>
        </div>
    );
};
