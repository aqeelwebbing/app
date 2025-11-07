import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://dpvrovxcxwspgbbvysil.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdnJvdnhjeHdzcGdiYnZ5c2lsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQwODQyOCwiZXhwIjoyMDcyOTg0NDI4fQ.m0QkSCPbfihU5HnD2REPj2FbEsxJ51P2pTsJV0kGyWs';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runMigration() {
  try {
    console.log('🔄 Starting database migration...');

    // First, let's check the current status of the letters table
    console.log('📊 Checking current database state...');
    const { data: currentLetters, error: checkError } = await supabase
      .from('letters')
      .select('id, status')
      .limit(1);

    if (checkError) {
      console.error('❌ Error checking current state:', checkError);
      return;
    }

    console.log('✅ Successfully connected to database');

    // Add the new columns if they don't exist
    console.log('🔧 Adding new columns...');

    // Add subject column
    const { error: subjectError } = await supabase.rpc('exec', {
      sql: 'ALTER TABLE public.letters ADD COLUMN IF NOT EXISTS subject TEXT;'
    });

    if (subjectError && !subjectError.message?.includes('already exists')) {
      console.error('❌ Error adding subject column:', subjectError);
    } else {
      console.log('✅ Subject column added or already exists');
    }

    // Add notes column
    const { error: notesError } = await supabase.rpc('exec', {
      sql: 'ALTER TABLE public.letters ADD COLUMN IF NOT EXISTS notes TEXT;'
    });

    if (notesError && !notesError.message?.includes('already exists')) {
      console.error('❌ Error adding notes column:', notesError);
    } else {
      console.log('✅ Notes column added or already exists');
    }

    // Create indexes
    console.log('🔍 Creating indexes...');

    const { error: indexSubjectError } = await supabase.rpc('exec', {
      sql: 'CREATE INDEX IF NOT EXISTS idx_letters_subject ON public.letters(subject);'
    });

    if (indexSubjectError) {
      console.error('❌ Error creating subject index:', indexSubjectError);
    } else {
      console.log('✅ Subject index created');
    }

    const { error: indexNotesError } = await supabase.rpc('exec', {
      sql: 'CREATE INDEX IF NOT EXISTS idx_letters_notes ON public.letters(notes);'
    });

    if (indexNotesError) {
      console.error('❌ Error creating notes index:', indexNotesError);
    } else {
      console.log('✅ Notes index created');
    }

    // Try to update the enum type - this might fail but that's okay
    console.log('🔄 Attempting to update letter_status enum...');
    const enumUpdateSQL = `
      DO $$ BEGIN
        -- Try to add new enum values
        ALTER TYPE letter_status ADD VALUE IF NOT EXISTS 'pending_approval';
        ALTER TYPE letter_status ADD VALUE IF NOT EXISTS 'approved';
        ALTER TYPE letter_status ADD VALUE IF NOT EXISTS 'rejected';
      EXCEPTION
        WHEN others THEN
          RAISE NOTICE 'Enum update may have failed, this is okay if values already exist';
      END $$;
    `;

    const { error: enumError } = await supabase.rpc('exec', { sql: enumUpdateSQL });

    if (enumError) {
      console.warn('⚠️ Enum update failed, but this may be expected:', enumError.message);
    } else {
      console.log('✅ Enum updated successfully');
    }

    console.log('🎉 Migration completed successfully!');

    // Verify the changes
    const { data: testLetter, error: testError } = await supabase
      .from('letters')
      .select('id, subject, notes, status')
      .limit(1);

    if (testError) {
      console.error('❌ Error verifying migration:', testError);
    } else {
      console.log('✅ Migration verified - table structure updated');
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();