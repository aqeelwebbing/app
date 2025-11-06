import { requireAuth, getUserProfile } from "@/lib/auth";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProfileSettingsClient } from "./client";

export default async function SubscriberProfilePage() {
  await requireAuth();
  const profile = await getUserProfile();

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Profile not found</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader
        userName={profile?.full_name}
        userEmail={profile?.email}
        userRole="user"
      />
      <main className="mx-auto max-w-4xl p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-slate-600 mt-2">Manage your account information</p>
        </div>

        <ProfileSettingsClient profile={profile} />
      </main>
    </>
  );
}
