import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { n, text } = await request.json();

        if (typeof n !== 'number' || !text) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        // The function signature: submit_answer(p_question_no INTEGER, p_answer_text TEXT)
        // Returns boolean or JSON with { correct: boolean, completed: boolean, next_question: INTEGER }

        const { data, error } = await supabase.rpc('submit_answer', {
            p_question_no: n,
            p_answer_text: text
        });

        if (error) {
            console.error('Submit answer RPC error:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
