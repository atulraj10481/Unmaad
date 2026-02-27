import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
    try {
        const adminClient = createAdminClient();

        // Fetch all game sessions joined with user profiles
        // Ordering: 
        // 1. Completed sessions (questions_answered >= 40) first, ordered by completed_at ASC
        // 2. In-progress sessions ordered by questions_answered DESC

        const { data: participants, error } = await adminClient
            .from('game_sessions')
            .select(`
                questions_answered,
                completed_at,
                status,
                last_activity,
                profiles:user_id (
                    id,
                    full_name,
                    email,
                    phone,
                    college
                )
            `)
            .order('questions_answered', { ascending: false })
            .order('completed_at', { ascending: true, nullsFirst: false });

        if (error) {
            console.error("Participants fetch error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const formatted = participants.map((p: any) => ({
            name: p.profiles?.full_name || 'Anonymous',
            email: p.profiles?.email || '--',
            phone: p.profiles?.phone || '--',
            college: p.profiles?.college || '--',
            stage: p.questions_answered,
            status: p.status.toUpperCase(),
            completedAt: p.completed_at ? (() => {
                const date = new Date(p.completed_at);
                const day = date.getDate().toString().padStart(2, '0');
                const month = date.toLocaleString('en-IN', { month: 'short' });
                const hours = (date.getHours() % 12 || 12).toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                const ms = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
                const ampm = date.getHours() >= 12 ? 'pm' : 'am';
                return `${day} ${month}, ${hours}:${minutes}:${ms} ${ampm}`;
            })() : (p.status === 'completed' ? 'Just now' : '--'),
            rawCompletedAt: p.completed_at
        }));

        return NextResponse.json({ participants: formatted });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
