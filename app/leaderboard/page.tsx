'use client';

import React, { useState, useEffect } from "react";
import { Trophy, Medal, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

interface LeaderboardEntry {
    rank: number;
    name: string;
    stage: number;
    status: string;
    timestamp: string;
}

export default function LeaderboardPage() {
    const [isVisible, setIsVisible] = useState(true);
    const [showContent, setShowContent] = useState(true);
    const [data, setData] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch('/api/leaderboard');
                const json = await res.json();
                if (res.ok) setData(json.leaderboard || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
        // Optional: Realtime subscription or polling can be added here
        const interval = setInterval(fetchLeaderboard, 60000); // 1 minute poll
        return () => clearInterval(interval);
    }, []);

    if (!showContent) return (
        <div className="min-h-screen bg-[#1A1A2E] w-full flex justify-center items-center">
            <button
                onClick={() => setShowContent(true)}
                className="group flex flex-col items-center gap-3 transition-all duration-500"
            >
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all">
                    <Eye className="w-5 h-5 text-amber-500" />
                </div>
                <span className="text-[10px] font-bold text-amber-200/40 uppercase tracking-[0.4em] group-hover:text-amber-500">Reveal Leaderboard</span>
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#1A1A2E] w-full pt-20 px-4 relative">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: 'url(/unmaad-assets/events-street/mandala-strip.svg)' }} />
            <div className="max-w-5xl mx-auto relative z-10">
                <Link href="/pages/virtual-expedition" className="text-amber-500 hover:text-amber-400 text-xs font-bold uppercase tracking-widest mb-8 inline-block">&larr; Back Home</Link>

                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl md:text-5xl lg:text-6xl text-white font-samarkan tracking-wider">leaderboard</h3>
                        <p className="text-amber-200/40 text-[10px] uppercase tracking-[0.5em] mt-3 font-century-gothic font-bold">The Vanguard of Unmaad • Live Rankings</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsVisible(!isVisible)} className="text-[10px] font-bold text-amber-200/50 uppercase tracking-[0.3em] hover:text-amber-500 transition-colors py-2 px-4 rounded-lg border border-white/5 bg-white/5">
                            {isVisible ? "COLLAPSE" : "EXPAND"}
                        </button>
                        <button onClick={() => setShowContent(false)} className="group flex items-center gap-2 text-[10px] font-bold text-rose-500/40 uppercase tracking-[0.3em] hover:text-rose-500 transition-all">
                            <EyeOff className="w-4 h-4" />
                            <span>Hide</span>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isVisible && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="bg-[#1a241c]/80 backdrop-blur-3xl rounded-none border-2 border-amber-500/20 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-amber-500/[0.05] border-b border-amber-500/20">
                                            <th className="py-3 pl-4 pr-1 md:py-6 md:px-8 text-left text-amber-200/40 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black">Rank</th>
                                            <th className="py-3 px-1 md:py-6 md:px-8 text-left text-amber-200/40 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black">Explorer</th>
                                            <th className="py-3 px-1 md:py-6 md:px-8 text-center text-amber-200/40 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black">Stage</th>
                                            <th className="py-3 px-1 md:py-6 md:px-8 text-center text-amber-200/40 uppercase text-[9px] sm:text-[10px] tracking-[0.4em] font-black">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.05]">
                                        {loading ? (
                                            <tr><td colSpan={4} className="py-12 text-center text-amber-200/30 font-bold uppercase tracking-widest text-xs">Loading Rankings...</td></tr>
                                        ) : data.length === 0 ? (
                                            <tr><td colSpan={4} className="py-12 text-center text-amber-200/30 font-bold uppercase tracking-widest text-xs">No entries yet. Be the first!</td></tr>
                                        ) : data.map((player, i) => (
                                            <tr key={i} className={`hover:bg-amber-500/[0.05] transition-colors group ${player.rank <= 3 ? 'bg-amber-500/[0.02]' : ''}`}>
                                                <td className="py-3 pl-4 pr-1 md:py-6 md:px-8">
                                                    <div className="flex items-center gap-1.5 md:gap-4">
                                                        {player.rank === 1 && <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />}
                                                        {player.rank === 2 && <Medal className="w-4 h-4 md:w-5 md:h-5 text-gray-400 opacity-80" />}
                                                        {player.rank === 3 && <Medal className="w-4 h-4 md:w-5 md:h-5 text-amber-700 opacity-80" />}
                                                        <span className={`font-samarkan text-base md:text-xl ${player.rank <= 3 ? 'text-amber-500' : 'text-white/40'}`}>
                                                            {player.rank < 10 ? `0${player.rank}` : player.rank}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-1 md:py-6 md:px-8">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-white/90 group-hover:text-amber-400 transition-colors uppercase tracking-[0.1em] text-[10px] md:text-sm font-century-gothic">
                                                            {player.name}
                                                        </span>
                                                        <span className={`text-[8px] sm:text-[9px] uppercase tracking-[0.2em] mt-1 font-bold italic hidden sm:block ${player.status === 'COMPLETED' ? 'text-green-500' : 'text-amber-500/50'}`}>{player.status}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-1 md:py-6 md:px-8 text-center">
                                                    <div className="inline-flex items-center justify-center px-1.5 py-1 md:px-3 md:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 group-hover:border-amber-500/40 transition-all">
                                                        <span className="text-[10px] sm:text-sm md:text-lg font-black text-amber-500 tabular-nums font-century-gothic">{player.stage}/40</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-1 md:py-6 md:px-8 text-center">
                                                    <div className="flex items-center justify-center text-white/50 font-bold font-century-gothic text-xs tracking-widest tabular-nums">
                                                        {player.timestamp}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-6 bg-black/40 border-t border-white/10 flex justify-center">
                                <p className="text-[9px] text-white/20 uppercase tracking-[0.4em] font-bold">Live Updates • Season of Quest 2026</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
