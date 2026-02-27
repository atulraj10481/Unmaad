'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface GameStats {
    totalParticipants: number;
    gameOpen: boolean;
    winnerName: string | null;
    runnerName: string | null;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<GameStats | null>(null);
    const [loading, setLoading] = useState(true);

    // In a real implementation this would fetch from a specific admin dashboard API.
    // For now, we'll set up placeholders or fetch client-side if we create the API later.

    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-[#E05C8A] mb-8">Virtual Expedition Admin</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Link href="/admin/create-question" className="bg-[#2B4EAA] hover:bg-[#2B4EAA]/80 p-6 rounded-xl border border-white/10 transition-colors block text-center">
                        <h2 className="text-xl font-semibold mb-2">Create Question</h2>
                        <p className="text-sm text-white/70">Upload a new question image and set the answer</p>
                    </Link>

                    <Link href="/admin/question-bank" className="bg-[#2B4EAA] hover:bg-[#2B4EAA]/80 p-6 rounded-xl border border-white/10 transition-colors block text-center">
                        <h2 className="text-xl font-semibold mb-2">Question Bank</h2>
                        <p className="text-sm text-white/70">View, edit, or remove game questions</p>
                    </Link>

                    <Link href="/admin/participants" className="bg-emerald-600 hover:bg-emerald-600/80 p-6 rounded-xl border border-white/10 transition-colors block text-center">
                        <h2 className="text-xl font-semibold mb-2">View Explorers</h2>
                        <p className="text-sm text-white/70">Manage and track all quest participants</p>
                    </Link>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h2 className="text-xl font-semibold mb-2 text-[#D4A847]">Game Status</h2>
                        <div className="flex items-center justify-between text-sm mt-4">
                            <span>Status:</span>
                            <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs uppercase">Concluded</span>
                        </div>
                    </div>
                </div>

                {/* We can add quick stats here later by fetching from game_sessions and game_config */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h2 className="text-lg font-semibold border-b border-white/10 pb-4 mb-4">Quick Stats Placeholder</h2>
                    <p className="text-white/60 text-sm">Real-time stats will appear here (e.g., participants, current winner state array based on game_config table).</p>
                </div>

            </div>
        </div>
    );
}
