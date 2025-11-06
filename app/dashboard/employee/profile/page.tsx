import { requireEmployee, getUserProfile } from "@/lib/auth";
import { getServerSupabase } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EmployeeProfileClient } from "./client";

export default async function EmployeeProfilePage() {
  await requireEmployee();
  const profile = await getUserProfile();
  const supabase = await getServerSupabase();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Profile not found</p>
      </div>
    );
  }

  // Fetch employee-specific data
  const { data: couponData } = await supabase
    .from("employee_coupons")
    .select("code, usage_count, discount_percent, is_active")
    .eq("employee_id", profile.id)
    .eq("is_active", true)
    .single();

  const { data: commissionsData } = await supabase
    .from("commissions")
    .select("commission_amount")
    .eq("employee_id", profile.id);

  const totalEarnings = commissionsData?.reduce(
    (sum, c) => sum + Number(c.commission_amount),
    0
  ) || 0;

  return (
    <>
      <DashboardHeader
        userName={profile?.full_name}
        userEmail={profile?.email}
        userRole="employee"
      />
      <main className="mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-slate-600 mt-2">Manage your employee account</p>
        </div>

        <EmployeeProfileClient
          profile={profile}
          couponCode={couponData?.code || null}
          couponUsageCount={couponData?.usage_count || 0}
          discountPercent={couponData?.discount_percent || 0}
          totalEarnings={totalEarnings}
        />
      </main>
    </>
  );
}
