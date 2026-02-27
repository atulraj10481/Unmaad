'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trophy, Clock, Phone, Mail, School, Hash, ArrowLeft } from 'lucide-react';

interface Participant {
    name: string;
    email: string;
    phone: string;
    college: string;
    stage: number;
    status: string;
    completedAt: string;
}

export default function ParticipantsPage() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const res = await fetch('/api/admin/participants');
                const json = await res.json();
                if (res.ok) setParticipants(json.participants || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchParticipants();
    }, []);

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link href="/admin" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-sm font-medium">
                            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                        </Link>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Expedition Explorers</h1>
                        <p className="text-slate-400 mt-2">All participants and their current quest status</p>
                    </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-900/50 border-b border-slate-700/50">
                                    <th className="py-5 px-6 text-left text-xs uppercase tracking-wider font-bold text-slate-400 w-16">Sr.</th>
                                    <th className="py-5 px-6 text-left text-xs uppercase tracking-wider font-bold text-slate-400">Explorer</th>
                                    <th className="py-5 px-6 text-left text-xs uppercase tracking-wider font-bold text-slate-400">Contact Info</th>
                                    <th className="py-5 px-6 text-center text-xs uppercase tracking-wider font-bold text-slate-400">Quest Progress</th>
                                    <th className="py-5 px-6 text-center text-xs uppercase tracking-wider font-bold text-slate-400">Completion Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/30">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-slate-500 font-medium">Loading participants...</td>
                                    </tr>
                                ) : participants.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center text-slate-500 font-medium">No explorers found yet.</td>
                                    </tr>
                                ) : participants.map((p, i) => (
                                    <tr key={i} className={`hover:bg-slate-700/20 transition-colors group ${p.status === 'COMPLETED' ? 'bg-amber-500/5' : ''}`}>
                                        <td className="py-6 px-6 font-samarkan text-lg text-slate-400">
                                            {i + 1 < 10 ? `0${i + 1}` : i + 1}
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-100 group-hover:text-amber-400 transition-colors">{p.name}</span>
                                                    {p.status === 'COMPLETED' && <Trophy className="w-3 h-3 text-amber-500" />}
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                                                    <School className="w-3 h-3" />
                                                    <span>{p.college}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <Mail className="w-3 h-3" />
                                                    <span>{p.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <Phone className="w-3 h-3" />
                                                    <span>{p.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6 text-center">
                                            <div className="inline-flex flex-col items-center">
                                                <div className={`px-4 py-1.5 rounded-full border text-sm font-black flex items-center gap-2 ${p.status === 'COMPLETED' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-slate-700 border-slate-600 text-slate-300'}`}>
                                                    <Hash className="w-3 h-3 opacity-50" />
                                                    {p.stage}/40
                                                </div>
                                                <span className={`text-[10px] uppercase tracking-widest font-bold mt-2 ${p.status === 'COMPLETED' ? 'text-green-500/50' : 'text-slate-500'}`}>{p.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                                                    <Clock className="w-3 h-3 opacity-50" />
                                                    {p.completedAt}
                                                </div>
                                                {p.status === 'COMPLETED' && <span className="text-[10px] text-amber-500/50 font-bold uppercase tracking-tight">Quest Survivor</span>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex justify-center">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] font-bold">Confidential Admin View • Data Sync Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
