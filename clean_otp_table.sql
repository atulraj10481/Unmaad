-- You can safely drop the OTP verifications table because we have removed phone-based OTPs entirely.
DROP TABLE IF EXISTS public.otp_verifications;
