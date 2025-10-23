
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_PRIVATE_KEY || "";
export const supabase = createClient(supabaseUrl, supabaseKey);


