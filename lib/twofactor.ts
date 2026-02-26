export async function sendOTP(phone: string) {
    const apiKey = process.env.TWOFACTOR_API_KEY;
    const templateName = process.env.TWOFACTOR_TEMPLATE_NAME || 'IIMB UNMAAD';

    if (!apiKey) {
        throw new Error('TWOFACTOR_API_KEY is missing');
    }

    // Generate a formal 4-digit OTP locally since the user requested exactly 4 digits
    const fourDigitOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const response = await fetch(`https://2factor.in/API/V1/${apiKey}/SMS/${phone}/${fourDigitOtp}/${encodeURIComponent(templateName)}`);

    if (!response.ok) {
        throw new Error('Failed to send OTP via 2factor.in API');
    }

    const data = await response.json();

    if (data.Status !== 'Success') {
        throw new Error(data.Details || 'Failed to send OTP');
    }

    return { sessionId: data.Details as string, otp: fourDigitOtp };
}

export async function verifyOTP(sessionId: string, otp: string) {
    const apiKey = process.env.TWOFACTOR_API_KEY;

    if (!apiKey) {
        throw new Error('TWOFACTOR_API_KEY is missing');
    }

    const response = await fetch(`https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${otp}`);

    if (!response.ok) {
        throw new Error('Failed to verify OTP via 2factor.in API');
    }

    const data = await response.json();

    if (data.Status !== 'Success') {
        return { success: false, error: data.Details || 'OTP verification failed' };
    }

    return { success: true };
}
