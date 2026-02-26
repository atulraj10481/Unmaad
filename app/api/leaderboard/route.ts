import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
    try {
        const adminClient = createAdminClient();

        // Warrior = highest questions_answered
        const { data: leaderData, error } = await adminClient
            .from('game_sessions')
            .select(`
        questions_answered,
        completed_at,
        users:user_id ( id, raw_user_meta_data )
      `)
            .order('questions_answered', { ascending: false })
            .order('completed_at', { ascending: true, nullsFirst: false }) // those who finished first rank higher
            .limit(50); // Get top 50

        if (error) {
            console.error("Leaderboard fetch error:", error);
            throw error;
        }

        // Format for client
        const formatted = leaderData.map((session: any, index: number) => {
            let status = 'IN PROGRESS';
            if (session.questions_answered >= 40) status = 'COMPLETED';

            return {
                rank: index + 1,
                name: session.users?.raw_user_meta_data?.full_name || 'Anonymous',
                stage: session.questions_answered,
                status: status,
                timestamp: session.completed_at ? new Date(session.completed_at).toLocaleTimeString() : '--'
            }
        });

        return NextResponse.json({ leaderboard: formatted });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
