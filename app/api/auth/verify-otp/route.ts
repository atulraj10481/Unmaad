import { NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/twofactor';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const { sessionId, otp, phone, password, fullName, college, email } = await request.json();

        if (!sessionId || !otp || !phone || !password || !fullName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const adminClient = createAdminClient();

        // 1. Check attempts and expiry in otp_verifications table
        const { data: otpRecords } = await adminClient
            .from('otp_verifications')
            .select('*')
            .like('session_id', `${sessionId}:%`);

        const otpRecord = otpRecords?.[0];

        if (!otpRecord) {
            console.error('Session not found in DB:', sessionId);
            return NextResponse.json({ error: 'Invalid session. Check if your service_role_key is correctly writing to the database.' }, { status: 400 });
        }

        if (otpRecord.attempts >= 5) {
            return NextResponse.json({ error: 'Too many attempts. Request a new OTP.' }, { status: 400 });
        }

        if (otpRecord.expires_at && new Date(otpRecord.expires_at) < new Date()) {
            return NextResponse.json({ error: 'OTP expired. Request a new one.' }, { status: 400 });
        }

        // Increment attempts
        await adminClient
            .from('otp_verifications')
            .update({ attempts: otpRecord.attempts + 1 })
            .eq('id', otpRecord.id);

        // 2. Verify locally (Custom 2factor.in OTPs bypass their auto-verification endpoint)
        const storedOtp = otpRecord.session_id.split(':')[1];

        if (storedOtp !== otp) {
            return NextResponse.json({ error: 'Incorrect OTP provided' }, { status: 400 });
        }

        // Mark as verified
        await adminClient
            .from('otp_verifications')
            .update({ is_verified: true })
            .eq('id', otpRecord.id);

        // 3. Create user in Supabase Auth
        // Use an email if provided, otherwise create a fake one like phone@unmaad.co.in to satisfy Auth
        const finalEmail = email || `${phone}@unmaad.co.in`;

        const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
            email: finalEmail,
            password: password,
            phone: `91${phone}`, // Store international format in Auth optionally
            phone_confirm: true,
            email_confirm: true,
            user_metadata: {
                full_name: fullName,
                phone: phone,
                college: college,
            }
        });

        if (authError || !authData.user) {
            console.error('Auth User Creation Error:', authError);
            return NextResponse.json({ error: `Admin Client failed (Invalid Service Key?): ${authError?.message}` }, { status: 400 });
        }

        // 4. Note: DB Triggers `handle_new_user()` and `create_game_session()` handle profiles and game_sessions creation.

        // 5. Sign the user in (sets cookies via server client)
        const supabaseClient = await createClient();
        const { error: signInError } = await supabaseClient.auth.signInWithPassword({
            email: finalEmail,
            password: password,
        });

        if (signInError) {
            // Should not fail here ideally, but if it does, prompt to login manually
            return NextResponse.json({ success: true, message: 'Account created. Please log in.' }, { status: 200 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Verify OTP Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
