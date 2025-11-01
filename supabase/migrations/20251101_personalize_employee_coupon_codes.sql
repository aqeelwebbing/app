-- Update handle_new_user to generate personalized coupon codes based on employee name
-- Format: First 3-6 letters of name + 2-3 random numbers (e.g., MINA-42, JOHN-DOE-123)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role user_role;
  v_coupon_code TEXT;
  v_full_name TEXT;
  v_name_part TEXT;
  v_random_suffix TEXT;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name',''))
  ON CONFLICT (id) DO NOTHING;

  -- Insert role from metadata, default to 'user' if not provided
  v_role := COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'user'::user_role);

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, v_role)
  ON CONFLICT (user_id) DO NOTHING;

  -- If employee, auto-generate personalized coupon code
  IF v_role = 'employee' THEN
    -- Get the full name from metadata
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');

    -- If no full name, use email prefix
    IF v_full_name = '' THEN
      v_full_name := SPLIT_PART(NEW.email, '@', 1);
    END IF;

    -- Clean and format the name part
    -- Remove spaces, special characters, and convert to uppercase
    v_name_part := UPPER(REGEXP_REPLACE(v_full_name, '[^a-zA-Z]', '', 'g'));

    -- If name has multiple parts, take first 3 chars of each part (max 2 parts)
    -- Otherwise take first 4-6 characters
    IF LENGTH(v_name_part) > 6 THEN
      -- For longer names, take first 6 characters or combine first/last name parts
      v_name_part := SUBSTRING(v_name_part FROM 1 FOR 6);
    ELSIF LENGTH(v_name_part) < 3 THEN
      -- If name is too short, pad with email prefix
      v_name_part := v_name_part || SUBSTRING(UPPER(REGEXP_REPLACE(NEW.email, '[^a-zA-Z]', '', 'g')) FROM 1 FOR 3);
      v_name_part := SUBSTRING(v_name_part FROM 1 FOR 6);
    END IF;

    -- Generate 2-3 digit random number suffix
    v_random_suffix := LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');

    -- Create coupon code: NAME-123
    v_coupon_code := v_name_part || '-' || v_random_suffix;

    -- Ensure uniqueness by checking existing codes
    -- If collision, regenerate with different random number
    WHILE EXISTS (SELECT 1 FROM public.employee_coupons WHERE code = v_coupon_code) LOOP
      v_random_suffix := LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');
      v_coupon_code := v_name_part || '-' || v_random_suffix;
    END LOOP;

    INSERT INTO public.employee_coupons (employee_id, code, discount_percent, is_active)
    VALUES (NEW.id, v_coupon_code, 20, TRUE);
  END IF;

  RETURN NEW;
END $$;

COMMENT ON FUNCTION public.handle_new_user IS 'Automatically creates profile, assigns role, and generates personalized coupon code for employees based on their name';

-- Update existing employee coupons to use personalized format
-- This updates the current "EMP-00B36AF2" style codes to name-based codes
DO $$
DECLARE
  emp_record RECORD;
  v_full_name TEXT;
  v_name_part TEXT;
  v_random_suffix TEXT;
  v_new_code TEXT;
BEGIN
  FOR emp_record IN
    SELECT ec.id, ec.employee_id, ec.code, p.full_name, p.email
    FROM employee_coupons ec
    JOIN profiles p ON p.id = ec.employee_id
    WHERE ec.code LIKE 'EMP-%'
  LOOP
    -- Get full name or use email prefix
    v_full_name := COALESCE(emp_record.full_name, SPLIT_PART(emp_record.email, '@', 1));

    -- Clean and format the name
    v_name_part := UPPER(REGEXP_REPLACE(v_full_name, '[^a-zA-Z]', '', 'g'));

    -- Format the name part (4-6 characters)
    IF LENGTH(v_name_part) > 6 THEN
      v_name_part := SUBSTRING(v_name_part FROM 1 FOR 6);
    ELSIF LENGTH(v_name_part) < 3 THEN
      v_name_part := v_name_part || SUBSTRING(UPPER(REGEXP_REPLACE(emp_record.email, '[^a-zA-Z]', '', 'g')) FROM 1 FOR 3);
      v_name_part := SUBSTRING(v_name_part FROM 1 FOR 6);
    END IF;

    -- Generate random suffix
    v_random_suffix := LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');
    v_new_code := v_name_part || '-' || v_random_suffix;

    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM employee_coupons WHERE code = v_new_code AND id != emp_record.id) LOOP
      v_random_suffix := LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');
      v_new_code := v_name_part || '-' || v_random_suffix;
    END LOOP;

    -- Update the coupon code
    UPDATE employee_coupons
    SET code = v_new_code
    WHERE id = emp_record.id;

    RAISE NOTICE 'Updated coupon % to %', emp_record.code, v_new_code;
  END LOOP;
END $$;
