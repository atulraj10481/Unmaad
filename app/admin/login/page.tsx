'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, password }),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            router.push('/admin');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold text-[#E05C8A] text-center mb-6">Admin Portal</h1>

                {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 text-sm border border-red-500/30">{error}</div>}

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm mb-1 text-white/70">Phone or Email</label>
                        <input
                            type="text"
                            disabled={loading}
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                            className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:border-[#E05C8A]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1 text-white/70">Password</label>
                        <input
                            type="password"
                            disabled={loading}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white placeholder-white/30 focus:outline-none focus:border-[#E05C8A]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 w-full bg-[#E05C8A] hover:bg-[#E05C8A]/80 text-white font-bold py-3 rounded-lg transition-all"
                    >
                        {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
