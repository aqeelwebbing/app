import { requireAdmin, getUserProfile } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AdminProfileClient } from "./client";

export default async function AdminProfilePage() {
  await requireAdmin();
  const profile = await getUserProfile();
  const supabase = await getServerSupabase();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Profile not found</p>
      </div>
    );
  }

  // Fetch system statistics for admin overview
  const [usersResult, subscriptionsResult, lettersResult] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("subscriptions")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
    supabase.from("letters").select("id", { count: "exact", head: true }),
  ]);

  return (
    <>
      <DashboardHeader
        userName={profile?.full_name}
        userEmail={profile?.email}
        userRole="admin"
      />
      <main className="mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Profile Settings</h1>
          <p className="text-slate-600 mt-2">Manage your administrator account</p>
        </div>

        <AdminProfileClient
          profile={profile}
          totalUsers={usersResult.count || 0}
          activeSubscriptions={subscriptionsResult.count || 0}
          totalLetters={lettersResult.count || 0}
        />
      </main>
    </>
  );
}
