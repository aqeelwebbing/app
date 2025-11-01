import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Migration Runner Script
 *
 * Since Supabase doesn't allow direct SQL execution via the client library for security,
 * this script will guide you through running the migration manually or set up a connection
 * string for direct database access.
 */

async function runMigration(migrationFile: string) {
  console.log('🚀 Supabase Migration Runner\n');
  console.log('═'.repeat(70));

  // Load environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    process.exit(1);
  }

  // Extract project ref from URL
  const projectRef = supabaseUrl.split('//')[1]?.split('.')[0];
  console.log(`📍 Supabase Project: ${projectRef}`);
  console.log(`📄 Migration File: ${migrationFile}\n`);

  try {
    // Read the migration file
    const migrationPath = join(process.cwd(), 'supabase', 'migrations', migrationFile);
    console.log(`📖 Reading migration from:\n   ${migrationPath}\n`);

    const sql = readFileSync(migrationPath, 'utf-8');
    console.log(`✅ Migration loaded successfully (${sql.length} characters)`);
    console.log('═'.repeat(70));

    // Display the SQL for review
    console.log('\n📋 MIGRATION PREVIEW:\n');
    console.log('─'.repeat(70));
    const preview = sql.split('\n').slice(0, 15).join('\n');
    console.log(preview);
    if (sql.split('\n').length > 15) {
      console.log('\n... (truncated, see full file for complete migration)');
    }
    console.log('─'.repeat(70));

    // Instructions for running the migration
    console.log('\n📝 TO APPLY THIS MIGRATION:\n');
    console.log('Option 1: Supabase SQL Editor (Recommended)');
    console.log('─'.repeat(70));
    console.log(`1. Visit: https://supabase.com/dashboard/project/${projectRef}/sql/new`);
    console.log(`2. Copy all contents from: supabase/migrations/${migrationFile}`);
    console.log('3. Paste into the SQL Editor');
    console.log('4. Click "Run" or press Ctrl+Enter\n');

    console.log('Option 2: Copy SQL to Clipboard');
    console.log('─'.repeat(70));
    console.log('The complete SQL is shown below. Copy and paste it into Supabase SQL Editor:\n');
    console.log('```sql');
    console.log(sql);
    console.log('```\n');

    console.log('═'.repeat(70));
    console.log('\n✨ What this migration does:\n');
    console.log('  ✓ Updates handle_new_user() function to generate personalized coupon codes');
    console.log('  ✓ Converts format from "EMP-00B36AF2" to "MINAJ-042" (name-based)');
    console.log('  ✓ Updates all existing employee coupons to new format');
    console.log('  ✓ Ensures uniqueness with 3-digit random numbers\n');

    console.log('📌 After running the migration in Supabase SQL Editor:');
    console.log('  - Your employee coupon codes will be updated immediately');
    console.log('  - New employees will get personalized codes automatically');
    console.log('  - Check your employee dashboard to see the new code format\n');
    console.log('═'.repeat(70));

  } catch (error) {
    console.error('\n❌ Error reading migration file:', error);
    process.exit(1);
  }
}

// Run the migration preview
const migrationFile = process.argv[2] || '20251101_personalize_employee_coupon_codes.sql';
runMigration(migrationFile);
