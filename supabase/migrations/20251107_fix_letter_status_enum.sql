-- Fix letter status enum conversion and add subject/notes fields

-- Add new status values to the existing enum by recreating it
-- First, add a temporary column to store current values
ALTER TABLE public.letters ADD COLUMN IF NOT EXISTS status_temp TEXT;

-- Copy current status values to temp column
UPDATE public.letters SET status_temp = status::TEXT;

-- Drop the old enum type
DROP TYPE IF EXISTS letter_status CASCADE;

-- Create the new enum with all status values including approval workflow
CREATE TYPE letter_status AS ENUM ('draft', 'generating', 'pending_approval', 'approved', 'rejected', 'completed', 'failed');

-- Update the status column to use the new type
ALTER TABLE public.letters
ALTER COLUMN status TYPE TEXT,
ALTER COLUMN status SET DEFAULT 'draft';

-- Convert status values and set the new type
UPDATE public.letters SET status =
  CASE
    WHEN status_temp IN ('draft', 'generating', 'completed', 'failed') THEN status_temp::TEXT::letter_status
    WHEN status_temp IN ('pending_approval', 'approved', 'rejected') THEN status_temp::TEXT::letter_status
    ELSE 'draft'::letter_status
  END;

-- Now alter the column type
ALTER TABLE public.letters ALTER COLUMN status TYPE letter_status USING status::TEXT::letter_status;

-- Add new columns if they don't exist
ALTER TABLE public.letters
ADD COLUMN IF NOT EXISTS subject TEXT,
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Drop the temporary column
ALTER TABLE public.letters DROP COLUMN IF EXISTS status_temp;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_letters_subject ON public.letters(subject);
CREATE INDEX IF NOT EXISTS idx_letters_notes ON public.letters(notes);

-- Update comment for documentation
COMMENT ON COLUMN public.letters.subject IS 'Subject category of the letter (tenant_dispute, debt_collection, etc.)';
COMMENT ON COLUMN public.letters.notes IS 'Admin notes for rejected letters or approval comments';
COMMENT ON TYPE public.letter_status IS 'Letter status including approval workflow';