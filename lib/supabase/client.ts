"use client";
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/types/database";

let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

// Create the Supabase client for client-side usage with proper environment variable handling
export const getSupabaseClient = () => {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return supabaseClient;
};

// Export a proxy for backward compatibility
export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient<Database>>, {
  get(target, prop) {
    const client = getSupabaseClient();
    return client[prop as keyof typeof client];
  }
});
