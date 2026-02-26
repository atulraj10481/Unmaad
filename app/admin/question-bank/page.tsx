'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Question {
    id?: string;
    serial_no: number;
    image_url: string;
    answer?: string;
    correct_answer?: string;
    is_active: boolean;
    created_at?: string;
}

export default function QuestionBankPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchQuestions = async () => {
        try {
            const res = await fetch('/api/admin/questions');
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setQuestions(data.questions);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const toggleActive = async (id: string | undefined, serialNo: number, currentState: boolean) => {
        try {
            // Use serial_no if id is undefined, but update the API route might be needed. For now assuming API works with id if it exists.
            const payloadId = id || serialNo.toString();
            const res = await fetch('/api/admin/questions', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: payloadId, is_active: !currentState })
            });
            if (!res.ok) throw new Error('Failed to update status');
            setQuestions(q => q.map(item => item.serial_no === serialNo ? { ...item, is_active: !currentState } : item));
        } catch (err: any) {
            alert(err.message);
        }
    };

    const deleteQuestion = async (id: string | undefined, serialNo: number) => {
        if (!confirm(`Are you sure you want to permanently delete Question ${serialNo}? This cannot be undone.`)) return;

        try {
            const payloadId = id || serialNo.toString();
            const res = await fetch(`/api/admin/questions?id=${payloadId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete question');
            setQuestions(q => q.filter(item => item.serial_no !== serialNo));
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white p-8">
            <div className="max-w-5xl mx-auto">
                <Link href="/admin" className="text-[#E05C8A] mb-6 inline-block hover:underline">
                    &larr; Back to Dashboard
                </Link>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                        <h1 className="text-2xl font-bold text-[#D4A847]">Question Bank</h1>
                        <Link href="/admin/create-question" className="bg-[#E05C8A] text-white px-4 py-2 rounded font-semibold text-sm hover:bg-[#E05C8A]/80">
                            + New Question
                        </Link>
                    </div>

                    {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 text-sm">{error}</div>}

                    {loading ? (
                        <p className="text-white/50 text-center py-8">Loading questions...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-white/60">
                                        <th className="p-3">No.</th>
                                        <th className="p-3">Image Path</th>
                                        <th className="p-3">Normalized Answer</th>
                                        <th className="p-3 text-center">Active</th>
                                        <th className="p-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.length === 0 ? (
                                        <tr><td colSpan={5} className="p-6 text-center text-white/50">No questions found.</td></tr>
                                    ) : (
                                        questions.map((q) => (
                                            <tr key={q.serial_no} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-3 font-semibold text-[#D4A847]">Q{q.serial_no}</td>
                                                <td className="p-3 text-white/70 truncate max-w-[200px]">{q.image_url}</td>
                                                <td className="p-3 font-mono text-[#E05C8A]">{q.correct_answer || q.answer}</td>
                                                <td className="p-3 text-center">
                                                    <button
                                                        onClick={() => toggleActive(q.id, q.serial_no, q.is_active)}
                                                        className={`px-3 py-1 rounded text-xs font-semibold ${q.is_active ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}
                                                    >
                                                        {q.is_active ? 'ACTIVE' : 'HIDDEN'}
                                                    </button>
                                                </td>
                                                <td className="p-3 text-right">
                                                    <button onClick={() => deleteQuestion(q.id, q.serial_no)} className="text-red-400 hover:text-red-300 text-xs ml-4">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
