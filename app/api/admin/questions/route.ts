import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
    try {
        const supabase = await createClient();

        // Check if user is admin
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const adminClient = createAdminClient();
        const { data: profile } = await adminClient.from('profiles').select('is_admin').eq('id', user.id).single();
        if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        // Fetch all questions
        const { data: questions, error } = await adminClient
            .from('questions')
            .select('*')
            .order('serial_no', { ascending: true });

        if (error) throw error;

        return NextResponse.json({ questions });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const adminClient = createAdminClient();
        const { data: profile } = await adminClient.from('profiles').select('is_admin').eq('id', user.id).single();
        if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        const body = await request.json();
        const { serial_no, image_url, answer, is_active } = body;

        // Normalise answer: lowercase, no spaces, no special characters
        const normalisedAnswer = answer.toLowerCase().replace(/[^a-z0-9]/g, '');

        const { data, error } = await adminClient
            .from('questions')
            .upsert({
                serial_no,
                image_url,
                correct_answer: normalisedAnswer,
                is_active: is_active ?? true
            }, { onConflict: 'serial_no' })
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, question: data?.[0] });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const adminClient = createAdminClient();
        const { data: profile } = await adminClient.from('profiles').select('is_admin').eq('id', user.id).single();
        if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        const { id, is_active } = await request.json();

        const { error } = await adminClient
            .from('questions')
            .update({ is_active })
            .eq('id', id);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const adminClient = createAdminClient();
        const { data: profile } = await adminClient.from('profiles').select('is_admin').eq('id', user.id).single();
        if (!profile?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

        const { error } = await adminClient
            .from('questions')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
