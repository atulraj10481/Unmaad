import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
    try {
        const adminClient = createAdminClient();

        // Fetch all game sessions joined with profiles for created_at
        const { data: sessions, error } = await adminClient
            .from('game_sessions')
            .select(`
                questions_answered, 
                completed_at, 
                profiles:user_id ( created_at )
            `);

        if (error) {
            console.error("Stats fetch error:", error);
            throw error;
        }

        const totalParticipants = sessions.length;
        const totalCompletions = sessions.filter((s: any) => s.questions_answered >= 40).length;
        const totalQuestsSolved = sessions.reduce((acc: number, s: any) => acc + (s.questions_answered || 0), 0);

        // Calculate average completion time in minutes for those who completed
        const completedSessions = sessions.filter((s: any) =>
            s.questions_answered >= 40 &&
            s.completed_at &&
            s.profiles?.created_at
        );

        let avgCompletionTime = 0;
        if (completedSessions.length > 0) {
            const totalMs = completedSessions.reduce((acc: number, s: any) => {
                const start = new Date(s.profiles.created_at).getTime();
                const end = new Date(s.completed_at).getTime();
                return acc + (end - start);
            }, 0);
            avgCompletionTime = Math.round((totalMs / completedSessions.length) / 60000);
        }

        return NextResponse.json({
            stats: {
                totalParticipants,
                totalCompletions,
                avgCompletionTime,
                totalQuestsSolved
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
