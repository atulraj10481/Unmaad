import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { action, seconds_elapsed } = await request.json();

        if (action === 'resume') {
            const { error } = await supabase.rpc('start_or_resume_session');
            if (error) throw error;
            return NextResponse.json({ success: true, status: 'in_progress' });
        }

        if (action === 'pause') {
            const { error } = await supabase.rpc('pause_session', { p_seconds: seconds_elapsed || 0 });
            if (error) throw error;
            return NextResponse.json({ success: true, status: 'paused' });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
