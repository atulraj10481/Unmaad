-- Fix for "invalid input syntax for type uuid" error
-- We explicitly define the columns including ID to prevent positional issues, and ensure auth.uid() returns uuid.
CREATE OR REPLACE FUNCTION public.submit_answer(p_question_no int, p_answer_text text)
RETURNS boolean AS $function$
DECLARE
  v_correct_answer text;
  v_is_correct boolean;
  v_session public.game_sessions;
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();

  -- Strict validation
  SELECT * INTO v_session FROM public.game_sessions WHERE user_id = v_user_id;
  IF NOT FOUND OR v_session.status != 'active' OR v_session.current_question_no != p_question_no THEN
    RAISE EXCEPTION 'Invalid session state or question number.';
  END IF;

  -- Get correct answer
  SELECT correct_answer INTO v_correct_answer FROM public.questions WHERE serial_no = p_question_no AND is_active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Question not found or inactive.';
  END IF;

  v_is_correct := (lower(trim(p_answer_text)) = lower(trim(v_correct_answer)));

  -- Log answer - EXPLICT CASTING
  INSERT INTO public.answers (id, user_id, question_no, submitted_answer, is_correct)
  VALUES (gen_random_uuid(), v_user_id, p_question_no, p_answer_text, v_is_correct);

  -- Update session on correct
  IF v_is_correct THEN
    UPDATE public.game_sessions 
    SET 
      questions_answered = questions_answered + 1,
      current_question_no = current_question_no + 1,
      last_activity = now(),
      status = CASE WHEN questions_answered + 1 >= 40 THEN 'completed' ELSE 'active' END,
      completed_at = CASE WHEN questions_answered + 1 >= 40 THEN now() ELSE NULL END
    WHERE user_id = v_user_id;
  END IF;

  RETURN v_is_correct;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;
