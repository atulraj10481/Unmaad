import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: Request, context: { params: Promise<{ n: string }> }) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const params = await context.params;
        const n = parseInt(params.n);
        if (isNaN(n) || n < 1 || n > 40) {
            return NextResponse.json({ error: 'Invalid question number' }, { status: 400 });
        }

        // Standard client enforcing RLS will only be able to see active questions if RLS permits.
        // However, the PRD relies heavily on Postgres functions or an admin client for standard fetching, let's use the standard client since questions are public to authenticated users (PRD 9.3)
        const { data: question, error } = await supabase
            .from('questions')
            .select('title, image_url')
            .eq('serial_no', n)
            .eq('is_active', true)
            .single();

        if (error || !question) {
            return NextResponse.json({ error: 'Question not found or inactive' }, { status: 404 });
        }

        // Generate signed URL
        const adminClient = createAdminClient();
        const { data: signedUrlData, error: signedUrlError } = await adminClient
            .storage
            .from('question-images')
            .createSignedUrl(question.image_url, 300); // 5 minutes

        if (signedUrlError) {
            console.error(signedUrlError);
            return NextResponse.json({ error: 'Failed to generate image URL' }, { status: 500 });
        }

        return NextResponse.json({
            serial_no: n,
            title: question.title,
            image_url: signedUrlData.signedUrl,
            total: 40
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
