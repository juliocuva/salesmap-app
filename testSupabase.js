import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://seijbbufqyhjbsryhlep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlaWpiYnVmcXloamJzcnlobGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwMTI0ODMsImV4cCI6MjEwMDU4ODQ4M30.jfQfYn2KH5YxefCp3TUi1etIq5wzn4kxl_45dfa6qXc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  const { data, error } = await supabase
    .from('leads')
    .insert([
      { 
        local_id: 'test_123',
        local_name: 'Test Local',
        name: 'Agente Bot',
        contact: '000000',
        business_idea: 'Test Idea',
        created_at: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Error insertando:', error);
  } else {
    console.log('Insertado exitosamente:', data);
  }
}

testInsert();
