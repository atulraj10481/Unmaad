import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
    try {
        const adminClient = createAdminClient();

        const placeholderData = [
            { rank: 1, name: "-", college: "-", stage: "-", status: "", timestamp: "-" },
            { rank: 2, name: "-", college: "-", stage: "-", status: "", timestamp: "-" },
            { rank: 3, name: "-", college: "-", stage: "-", status: "", timestamp: "-" }
        ];

        return NextResponse.json({ leaderboard: placeholderData });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
