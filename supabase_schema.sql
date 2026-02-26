-- =========================================================================
-- Unmaad 2026 Virtual Expedition Schema
-- Run this in your Supabase SQL Editor
-- =========================================================================

-- 1. Create Tables
CREATE TABLE public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  phone text unique,
  email text,
  full_name text,
  college text,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE public.game_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  current_question_no int default 1 not null,
  questions_answered int default 0 not null,
  total_time_taken interval default '0 seconds'::interval,
  status text default 'active' check (status in ('active', 'paused', 'completed')),
  last_activity timestamp with time zone default timezone('utc'::text, now()),
  completed_at timestamp with time zone
);

CREATE TABLE public.questions (
  serial_no int primary key,
  image_url text not null,
  correct_answer text not null,
  is_active boolean default true,
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

CREATE TABLE public.answers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question_no int references public.questions(serial_no) not null,
  submitted_answer text not null,
  is_correct boolean not null,
  time_taken interval,
  submitted_at timestamp with time zone default timezone('utc'::text, now())
);

CREATE TABLE public.otp_verifications (
  id uuid default gen_random_uuid() primary key,
  phone text not null,
  session_id text not null,
  verified boolean default false,
  attempts int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own; Admin can do all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Game Sessions: Read/Update own
CREATE POLICY "Users can view own session" ON public.game_sessions FOR SELECT USING (auth.uid() = user_id);

-- Questions: Anyone can read active questions (the path is secured anyway), only admin writes
CREATE POLICY "Anyone can read active questions" ON public.questions FOR SELECT USING (is_active = true);

-- Answers: Users can view their own answers
CREATE POLICY "Users can view own answers" ON public.answers FOR SELECT USING (auth.uid() = user_id);

-- 3. Storage Buckets (if Storage schema exists)
insert into storage.buckets (id, name, public) values ('question-images', 'question-images', false);

-- Storage RLS: Admin all, public nothing
create policy "Admin Read/Write questions" on storage.objects for all using ( bucket_id = 'question-images' and (select is_admin from public.profiles where id = auth.uid()) );

-- 4. Auth Triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $function$
BEGIN
  INSERT INTO public.profiles (id, phone, email, full_name, college)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'phone',
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'college'
  );
  
  INSERT INTO public.game_sessions (user_id) VALUES (new.id);
  
  RETURN new;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Game RPCs (Security Definer to bypass RLS for strict state transitions)

CREATE OR REPLACE FUNCTION public.submit_answer(p_question_no int, p_answer_text text)
RETURNS boolean AS $function$
DECLARE
  v_correct_answer text;
  v_is_correct boolean;
  v_session public.game_sessions;
BEGIN
  -- Strict validation
  SELECT current_question_no, status INTO v_session FROM public.game_sessions WHERE user_id = auth.uid();
  IF NOT FOUND OR v_session.status != 'active' OR v_session.current_question_no != p_question_no THEN
    RAISE EXCEPTION 'Invalid session state or question number.';
  END IF;

  -- Get correct answer
  SELECT correct_answer INTO v_correct_answer FROM public.questions WHERE serial_no = p_question_no AND is_active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Question not found or inactive.';
  END IF;

  v_is_correct := (lower(trim(p_answer_text)) = lower(trim(v_correct_answer)));

  -- Log answer
  INSERT INTO public.answers (user_id, question_no, submitted_answer, is_correct)
  VALUES (auth.uid(), p_question_no, p_answer_text, v_is_correct);

  -- Update session on correct
  IF v_is_correct THEN
    UPDATE public.game_sessions 
    SET 
      questions_answered = questions_answered + 1,
      current_question_no = current_question_no + 1,
      last_activity = now(),
      status = CASE WHEN questions_answered + 1 >= 40 THEN 'completed' ELSE 'active' END,
      completed_at = CASE WHEN questions_answered + 1 >= 40 THEN now() ELSE NULL END
    WHERE user_id = auth.uid();
  END IF;

  RETURN v_is_correct;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.pause_session(p_time_elapsed interval)
RETURNS void AS $function$
BEGIN
  UPDATE public.game_sessions 
  SET 
    status = 'paused',
    total_time_taken = total_time_taken + p_time_elapsed,
    last_activity = now()
  WHERE user_id = auth.uid() AND status = 'active';
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION public.start_or_resume_session()
RETURNS public.game_sessions AS $function$
DECLARE
  v_session public.game_sessions;
BEGIN
  UPDATE public.game_sessions 
  SET status = 'active', last_activity = now()
  WHERE user_id = auth.uid() AND status = 'paused'
  RETURNING * INTO v_session;

  IF NOT FOUND THEN
      SELECT * INTO v_session FROM public.game_sessions WHERE user_id = auth.uid();
  END IF;
  
  RETURN v_session;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;
