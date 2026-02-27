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
                profiles:user_id ( full_name, college )
            `)
            .order('questions_answered', { ascending: false })
            .order('completed_at', { ascending: true, nullsFirst: false })
            .range(0, 30); // Get top 30 to allow filtering

        if (error) {
            console.error("Leaderboard fetch error:", error);
            throw error;
        }

        const excludedNames = ["rakshana ezhilarasi", "varsha veliyath"];

        // Format and filter
        const formatted = leaderData
            .map((session: any) => ({
                name: session.profiles?.full_name || 'Anonymous',
                college: session.profiles?.college || '--',
                stage: session.questions_answered,
                completed_at: session.completed_at
            }))
            .filter(p => !excludedNames.includes(p.name.toLowerCase().trim())) // Exclude team members
            .slice(0, 15) // Top 15 after exclusion
            .map((p, index) => {
                const rank = index + 1; // New rank 1, 2, ...
                return {
                    rank: rank,
                    name: p.name,
                    college: p.college,
                    stage: p.stage,
                    status: '',
                    timestamp: p.completed_at ? (() => {
                        const date = new Date(p.completed_at);
                        const day = date.getDate().toString().padStart(2, '0');
                        const month = date.toLocaleString('en-IN', { month: 'short' });
                        const hours = (date.getHours() % 12 || 12).toString().padStart(2, '0');
                        const minutes = date.getMinutes().toString().padStart(2, '0');
                        const ms = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
                        const ampm = date.getHours() >= 12 ? 'pm' : 'am';
                        return `${day} ${month}, ${hours}:${minutes}:${ms} ${ampm}`;
                    })() : '--'
                }
            });

        return NextResponse.json({ leaderboard: formatted });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
