-- Fix for "Invalid session state" when users submit answers after their mobile browser grouped them into "paused" state
CREATE OR REPLACE FUNCTION public.submit_answer(p_question_no int, p_answer_text text)
RETURNS boolean AS $function$
DECLARE
  v_correct_answer text;
  v_is_correct boolean;
  v_session public.game_sessions;
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();

  -- Strict validation, but implicitly wake up paused sessions
  SELECT * INTO v_session FROM public.game_sessions WHERE user_id = v_user_id;

  -- If status is active OR paused, we can accept the answer.
  -- But if they have completed it, throw an error.
  IF NOT FOUND OR v_session.status = 'completed' OR v_session.current_question_no != p_question_no THEN
    RAISE EXCEPTION 'Invalid session state or question number.';
  END IF;

  -- Get correct answer
  SELECT correct_answer INTO v_correct_answer FROM public.questions WHERE serial_no = p_question_no AND is_active = true;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Question not found or inactive.';
  END IF;

  v_is_correct := (lower(trim(p_answer_text)) = lower(trim(v_correct_answer)));

  -- Log answer
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
  ELSE
    -- If they got it wrong but their session was paused (e.g., they just came back), wake it up to avoid getting stuck in paused
    IF v_session.status = 'paused' THEN
        UPDATE public.game_sessions
        SET
           status = 'active',
           last_activity = now()
        WHERE user_id = v_user_id;
    END IF;
  END IF;

  RETURN v_is_correct;
END;
$function$ LANGUAGE plpgsql SECURITY DEFINER;
