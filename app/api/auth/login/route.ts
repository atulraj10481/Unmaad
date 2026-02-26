import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
    try {
        const { identifier, password } = await request.json(); // identifier can be phone or email

        if (!identifier || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        const adminClient = createAdminClient();
        let email = identifier;

        // If identifier looks like a 10 digit phone number, find the associated email
        if (/^\d{10}$/.test(identifier)) {
            const { data: profile } = await adminClient
                .from('profiles')
                .select('id')
                .eq('phone', identifier)
                .single();

            if (!profile) {
                return NextResponse.json({ error: 'No account found with this phone number' }, { status: 400 });
            }

            const { data: userData } = await adminClient.auth.admin.getUserById(profile.id);
            if (userData?.user?.email) {
                email = userData.user.email;
            } else {
                return NextResponse.json({ error: 'Account configuration error. Contact support.' }, { status: 500 });
            }
        }

        const supabase = await createClient();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
