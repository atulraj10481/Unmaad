import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
    try {
        const { fullName, email, phone, password, college } = await request.json();

        if (!fullName || !email || !phone || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const adminClient = createAdminClient();

        // 1. Check if email or phone already exists
        const { data: existingProfiles } = await adminClient
            .from('profiles')
            .select('email, phone')
            .or(`email.eq.${email},phone.eq.${phone}`);

        if (existingProfiles && existingProfiles.length > 0) {
            const exists = existingProfiles[0];
            if (exists.email === email) {
                return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
            }
            if (exists.phone === phone) {
                return NextResponse.json({ error: 'Phone number already registered' }, { status: 400 });
            }
        }

        const supabase = await createClient();

        // 2. Register user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    college: college || null
                }
            }
        });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, user: data.user });
    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
