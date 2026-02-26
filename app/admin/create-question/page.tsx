'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function CreateQuestionPage() {
    const router = useRouter();
    const [serialNo, setSerialNo] = useState<number | ''>('');
    const [answer, setAnswer] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!serialNo || !answer || !file) {
            setError('Please fill all fields and select an image.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // 1. Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `question_${serialNo.toString().padStart(2, '0')}.${fileExt}`;
            const filePath = `${fileName}`; // In 'question-images' bucket

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('question-images')
                .upload(filePath, file, { upsert: true });

            if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

            // 2. We store the path or filename in the DB.
            // The signed URL will be generated when user requests a question.
            const imageUrl = uploadData.path;

            // 3. Save to database via API
            const res = await fetch('/api/admin/questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serial_no: Number(serialNo),
                    image_url: imageUrl,
                    answer: answer
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setSuccess(`Question ${serialNo} saved successfully!`);
            // Reset form
            setSerialNo('');
            setAnswer('');
            setFile(null);
            (document.getElementById('file-upload') as HTMLInputElement).value = '';

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white p-8">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => router.push('/admin')} className="text-[#E05C8A] mb-6 hover:underline">
                    &larr; Back to Dashboard
                </button>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl">
                    <h1 className="text-2xl font-bold text-[#D4A847] mb-6">Create / Update Question</h1>

                    {error && <div className="bg-red-500/20 text-red-200 p-3 rounded-lg mb-4 text-sm">{error}</div>}
                    {success && <div className="bg-green-500/20 text-green-200 p-3 rounded-lg mb-4 text-sm">{success}</div>}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div>
                            <label className="block text-sm mb-2 text-white/80">Question Number (1-40)</label>
                            <input
                                type="number"
                                min="1"
                                max="40"
                                value={serialNo}
                                onChange={e => setSerialNo(e.target.value ? Number(e.target.value) : '')}
                                className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#E05C8A]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-white/80">Question Image (Collage)</label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/jpeg, image/png, image/webp"
                                onChange={e => setFile(e.target.files?.[0] || null)}
                                className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#E05C8A] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#E05C8A] file:text-white hover:file:bg-[#E05C8A]/80 cursor-pointer"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-white/80">Correct Answer</label>
                            <input
                                type="text"
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                placeholder="e.g. Alex Ei Navalny!"
                                className="w-full bg-black/30 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#E05C8A]"
                                required
                            />
                            <p className="text-xs text-white/50 mt-2">
                                System will autoconvert this to a normalized lowercase string without spaces/special chars (e.g., &quot;alexeinavalny&quot;) before saving.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-[#2B4EAA] hover:bg-[#2B4EAA]/80 border border-[#E05C8A] text-white font-bold py-3 rounded-lg transition-all"
                        >
                            {loading ? 'Saving Question...' : 'Save Question'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
