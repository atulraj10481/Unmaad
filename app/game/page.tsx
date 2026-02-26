'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Timer, Map as MapIcon, Target, User, PauseCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function GamePage() {
    const router = useRouter();
    const [currentQ, setCurrentQ] = useState(1);
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [answer, setAnswer] = useState("");
    const [timer, setTimer] = useState(0);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [userName, setUserName] = useState("Explorer");

    const fetchQuestion = async (n: number) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/game/question/${n}`);
            const data = await res.json();
            if (!res.ok) {
                if (res.status === 404 && n > 1) {
                    setIsGameOver(true);
                } else {
                    throw new Error(data.error);
                }
            } else {
                setTitle(data.title || "");
                setImageUrl(data.image_url);
                setCurrentQ(data.serial_no);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchSession = async () => {
        try {
            const meRes = await fetch('/api/auth/me');
            const meData = await meRes.json();
            if (meRes.ok && meData?.user?.full_name) {
                setUserName(meData.user.full_name);
            }

            await fetch('/api/game/pause', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'resume' })
            });
        } catch (e) { }
    };

    const handlePause = async () => {
        try {
            await fetch('/api/game/pause', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'pause', seconds_elapsed: timer })
            });
            router.push('/pages/virtual-expedition');
        } catch (e) { }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/pages/virtual-expedition');
        } catch (e) { }
    };

    useEffect(() => {
        fetchSession().then(() => fetchQuestion(1));
    }, []);

    useEffect(() => {
        if (isGameOver || loading) return;
        const interval = setInterval(() => {
            setTimer((prev: number) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isGameOver, loading]);

    // Handle unload (Beacon for pause)
    useEffect(() => {
        const handleBeforeUnload = () => {
            navigator.sendBeacon('/api/game/pause', JSON.stringify({ action: 'pause', seconds_elapsed: timer }));
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [timer]);


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
        setAnswer(val);
        setError("");
    };

    const nextQuestion = async () => {
        if (!answer || submitting) return;
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch('/api/game/answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ n: currentQ, text: answer })
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            // Assume the DB returns { correct: true, next_question: next_n, completed: boolean }
            // Since we don't have the exact DB implementation, let's just increment locally if it succeeds without throwing error
            // (Assuming the RPC throws if wrong, or returns false)
            if (data === false || data?.correct === false) {
                setError("Incorrect answer. Try again!");
                // Optionally add a shake animation here via manipulating a ref class
            } else {
                setScore((prev) => prev + 10);
                if (currentQ < 40) {
                    setAnswer("");
                    await fetchQuestion(currentQ + 1);
                } else {
                    router.push('/winner');
                }
            }
        } catch (err: any) {
            setError(err.message || "Failed to submit answer");
        } finally {
            setSubmitting(false);
        }
    };

    if (isGameOver) {
        return (
            <div className="min-h-screen bg-[#001D4A] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-4xl mx-auto p-6 md:p-12 bg-[#d8d0c2] rounded-[2rem] md:rounded-[3rem] border-8 border-[#8c603e]/40 shadow-2xl relative overflow-hidden text-center">
                    <div className="absolute top-0 left-0 right-0 h-4 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale" />
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale rotate-180" />
                    <div className="relative z-10 space-y-6 md:space-y-10">
                        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                            <h2 className="text-3xl md:text-5xl font-century-gothic font-black text-[#8c603e] mb-2 md:mb-4 uppercase tracking-[0.1em]">Quest Successfully Completed!</h2>
                            <p className="text-[#8c603e]/60 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-[10px] md:text-sm">You have weathered the storm and found the truth.</p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-4 md:py-8">
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="p-4 md:p-6 bg-white/20 rounded-2xl border-2 border-[#8c603e]/10 backdrop-blur-sm">
                                <Target className="w-6 h-6 md:w-8 md:h-8 text-[#8c603e] mx-auto mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-[#8c603e]">{score}</div>
                                <div className="text-[9px] md:text-[10px] text-[#8c603e]/40 uppercase tracking-widest font-black">Final Score</div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-4 md:p-6 bg-white/20 rounded-2xl border-2 border-[#8c603e]/10 backdrop-blur-sm">
                                <MapIcon className="w-6 h-6 md:w-8 md:h-8 text-[#8c603e] mx-auto mb-2 md:mb-3" />
                                <div className="text-2xl md:text-3xl font-bold text-[#8c603e]">{currentQ} / 40</div>
                                <div className="text-[9px] md:text-[10px] text-[#8c603e]/40 uppercase tracking-widest font-black">Accuracy</div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="p-4 md:p-6 bg-white/20 rounded-2xl border-2 border-[#8c603e]/10 backdrop-blur-sm">
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
        <section className="w-full bg-[#233126] min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0 bg-[#233126]">
                <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('/unmaad-assets/pattern.svg')", backgroundRepeat: "repeat", backgroundSize: "auto" }} />
            </div>

            <div className="z-10 w-full max-w-6xl mx-auto my-8 flex flex-col lg:flex-row gap-4 md:gap-8 items-start px-4">
                {/* Parchment Sidebar */}
                <div className="w-full lg:w-[200px] shrink-0 space-y-4">
                    <div className="bg-[#d8d0c2] p-2 sm:p-4 md:p-6 rounded-xl sm:rounded-[2rem] border-4 border-[#8c603e]/40 shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex flex-row lg:flex-col flex-nowrap lg:flex-nowrap items-center lg:items-start justify-between lg:justify-start gap-x-2 sm:gap-x-8 gap-y-1 sm:gap-y-6 md:gap-x-12 lg:gap-0 lg:space-y-8 relative overflow-hidden">
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
                                <motion.div className="h-full bg-[#8c603e]" initial={{ width: 0 }} animate={{ width: `${(currentQ / 40) * 100}%` }} />
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

                    {/* Controls Panel */}
                    <div className="bg-[#d8d0c2] p-4 sm:p-5 rounded-xl sm:rounded-[2rem] border-4 border-[#8c603e]/40 flex flex-row lg:flex-col justify-between lg:justify-start gap-4 lg:gap-6 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-20 grayscale" />

                        {/* Profile Info */}
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#8c603e]/10 border border-[#8c603e]/20 flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 md:w-5 md:h-5 text-[#8c603e]" />
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-[#8c603e]/60 text-[8px] font-bold uppercase tracking-[0.2em]">Agent</span>
                                <span className="text-[#8c603e] font-bold text-xs sm:text-sm truncate max-w-[100px]">{userName}</span>
                            </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex flex-row lg:flex-col gap-2 md:gap-3 relative z-10">
                            <button onClick={handlePause} className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-[#8c603e]/10 hover:bg-[#8c603e]/20 border border-[#8c603e]/30 rounded-lg text-[#8c603e] transition-all group">
                                <PauseCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block">Pause</span>
                            </button>
                            <button onClick={handleLogout} className="flex items-center justify-center lg:justify-start gap-2 px-3 py-2 bg-red-900/10 hover:bg-red-900/20 border border-red-900/30 rounded-lg text-red-700 transition-all group">
                                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:block">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Parchment Main Content Area */}
                <div className="flex-grow flex flex-col space-y-4 md:space-y-6 w-full">
                    {loading ? (
                        <div className="md:bg-[#d8d0c2] md:rounded-[2.5rem] md:border-4 md:border-[#8c603e]/40 md:shadow-[0_40px_80px_rgba(0,0,0,0.25)] relative overflow-hidden flex items-center justify-center aspect-[4/3] lg:aspect-[16/9]">
                            <span className="text-[#8c603e]/50 font-bold uppercase tracking-[0.2em] animate-pulse">Fetching Next Trial...</span>
                        </div>
                    ) : (
                        <div className="md:bg-[#d8d0c2] md:rounded-[2.5rem] md:border-4 md:border-[#8c603e]/40 md:shadow-[0_40px_80px_rgba(0,0,0,0.25)] relative flex flex-col items-center overflow-hidden md:p-8 p-0">
                            <div className="hidden md:block absolute top-0 left-0 right-0 h-2 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale" />
                            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-2 bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-repeat-x opacity-30 grayscale rotate-180" />

                            {title && (
                                <h2 className="text-xl md:text-3xl font-century-gothic font-black text-[#8c603e] mb-4 text-center tracking-wider">{title}</h2>
                            )}

                            <div className="relative aspect-[4/3] lg:aspect-[16/9] w-full rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-4 border-[#8c603e]/20">
                                {imageUrl ? (
                                    <Image src={imageUrl} alt="Quest Subject" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-[#8c603e]/10 flex items-center justify-center">
                                        <span className="text-[#8c603e]/50 uppercase text-xs tracking-[0.3em]">No Image Found</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="bg-[#d8d0c2] rounded-xl sm:rounded-[2.5rem] border-4 border-[#8c603e]/40 p-2 sm:p-5 md:p-8 flex flex-col md:flex-row items-center gap-2 sm:gap-6 justify-between shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/unmaad-assets/events-street/mandala-strip.svg')] bg-center grayscale" />

                        <div className="flex-grow w-full max-w-sm relative z-10 flex flex-col">
                            <input
                                type="text"
                                value={answer}
                                onChange={handleAnswerChange}
                                onKeyDown={(e) => e.key === 'Enter' && nextQuestion()}
                                placeholder="enter your guess..."
                                className="w-full bg-transparent border-b-2 border-[#8c603e]/30 py-1.5 sm:py-2 text-sm sm:text-base outline-none transition-all text-[#8c603e] placeholder:text-[#8c603e]/30 tracking-[0.2em] font-bold lowercase"
                            />
                            {error && <span className="text-red-500 text-xs mt-1 animate-pulse">{error}</span>}
                        </div>

                        <div className="relative group shrink-0">
                            <div className="absolute w-full h-full top-1 left-1 bg-black/50 rounded-none" />
                            <button
                                onClick={nextQuestion}
                                disabled={submitting || loading || !answer}
                                className="relative z-10 px-8 py-2.5 bg-[#8c603e] text-[#d8d0c2] font-bold text-xs tracking-[0.2em] uppercase rounded-none transition-transform active:translate-x-1 active:translate-y-1 disabled:opacity-50"
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
        </section>
    );
}
