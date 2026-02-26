'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { UserPlus, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AuthPage() {
    const router = useRouter();
    const [tab, setTab] = useState<'register' | 'login'>('register');

    // Register State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [college, setCollege] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");

    // Login State
    const [identifier, setIdentifier] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone,
                    password,
                    fullName: name,
                    college,
                    email
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            router.push('/game');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password: loginPassword }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            router.push('/game');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="w-full bg-[#001D4A] min-h-screen flex items-center justify-center py-16 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <Image src="/unmaad-assets/royal-blue.png" alt="Background" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0 z-10 opacity-50 pointer-events-none">
                <Image src="/unmaad-assets/pattern.svg" alt="Pattern" fill className="object-cover" />
            </div>

            <div className="w-full max-w-sm mx-auto p-5 sm:p-6 md:p-10 bg-[#2D3B2F]/80 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] border-2 border-amber-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden z-20">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20 shadow-inner">
                        <UserPlus className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-3xl md:text-4xl text-white font-samarkan mb-2 text-center drop-shadow-md">Join the Quest</h3>
                    <div className="flex gap-4 mt-2">
                        <button onClick={() => setTab('register')} className={`uppercase tracking-widest text-[10px] font-bold ${tab === 'register' ? 'text-amber-500 border-b border-amber-500 pb-1' : 'text-amber-200/40 hover:text-amber-200'}`}>Register</button>
                        <button onClick={() => setTab('login')} className={`uppercase tracking-widest text-[10px] font-bold ${tab === 'login' ? 'text-amber-500 border-b border-amber-500 pb-1' : 'text-amber-200/40 hover:text-amber-200'}`}>Login</button>
                    </div>
                </div>

                {error && <div className="bg-red-500/20 text-red-200 text-xs text-center p-2 rounded mb-4 border border-red-500/30">{error}</div>}

                {tab === 'register' ? (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Full Name *</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/20 text-sm" placeholder="John Doe" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Email *</label>
                            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/20 text-sm" placeholder="explorer@unmaad.co.in" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">College (Optional)</label>
                            <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/20 text-sm" placeholder="IIM Bangalore" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Password *</label>
                            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/20 text-sm" placeholder="••••••••" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Phone Number *</label>
                            <div className="relative flex items-center">
                                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/20 text-sm" placeholder="9876543210" />
                            </div>
                        </div>
                        <div className="flex justify-center pt-2">
                            <button type="submit" disabled={loading || phone.length < 10} className="relative z-10 px-8 py-3 font-bold text-white bg-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.5)] rounded text-[10px] tracking-[0.3em] uppercase transition-transform active:translate-y-1 disabled:opacity-50 w-full">
                                {loading ? 'Registering...' : 'Register and Play'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Phone or Email</label>
                            <input type="text" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/20 text-sm" placeholder="Enter your registered phone or email" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-amber-200/60 font-bold ml-1 text-[9px] uppercase tracking-[0.2em]">Password</label>
                            <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:border-amber-500/50 outline-none transition-all placeholder:text-white/20 text-sm" placeholder="••••••••" />
                        </div>
                        <div className="flex justify-center pt-4">
                            <button type="submit" disabled={loading} className="relative z-10 px-8 py-3 font-bold text-white bg-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.5)] rounded text-[10px] tracking-[0.3em] uppercase transition-transform active:translate-y-1 disabled:opacity-50 w-full">
                                {loading ? 'Authenticating...' : 'Commence Journey'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
