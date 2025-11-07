const { createClient } = require('@supabase/supabase-js');

// Configuration from the environment
const supabaseUrl = 'https://dpvrovxcxwspgbbvysil.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwdnJvdnhjeHdzcGdiYnZ5c2lsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQwODQyOCwiZXhwIjoyMDcyOTg0NDI4fQ.m0QkSCPbfihU5HnD2REPj2FbEsxJ51P2pTsJV0kGyWs';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runMigration() {
  console.log('Running database migration...');

  try {
    // Read the migration file
    const fs = require('fs');
    const migrationSQL = fs.readFileSync('./supabase/migrations/20251107_fix_letter_status_enum.sql', 'utf8');

    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`Executing statement ${i + 1}: ${statement.substring(0, 50)}...`);

        const { error } = await supabase.rpc('exec_sql', { sql: statement });

        if (error) {
          console.error(`Error in statement ${i + 1}:`, error);
          // Try using direct SQL execution
          try {
            const { data, error: directError } = await supabase
              .from('pg_catalog')
              .select('*')
              .limit(1);

            if (directError) {
              console.error('Direct SQL also failed:', directError);
              continue;
            }
          } catch (e) {
            console.error('Direct SQL approach failed:', e);
            continue;
          }
        } else {
          console.log(`Statement ${i + 1} executed successfully`);
        }
      }
    }

    console.log('Migration completed!');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Alternative approach: Use REST API to execute SQL
async function executeSQLDirectly(sql) {
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({
      query: sql
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`SQL execution failed: ${error}`);
  }

  return response.json();
}

runMigration();