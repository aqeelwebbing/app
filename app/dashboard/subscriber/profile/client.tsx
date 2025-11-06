"use client";

import { useRouter } from "next/navigation";
import { ProfileSettingsForm } from "@/components/profile/ProfileSettingsForm";
import type { Profile } from "@/lib/types/database";

interface ProfileSettingsClientProps {
  profile: Profile;
}

export function ProfileSettingsClient({ profile }: ProfileSettingsClientProps) {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <ProfileSettingsForm profile={profile} onUpdate={handleUpdate} />

      {/* Account Information */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-600">Subscription Status</p>
            <p className="text-lg font-medium capitalize">
              {profile.subscription_status || "No Active Subscription"}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Subscription Tier</p>
            <p className="text-lg font-medium capitalize">
              {profile.subscription_tier || "None"}
            </p>
          </div>
          {profile.subscription_expires_at && (
            <div>
              <p className="text-sm text-slate-600">Subscription Expires</p>
              <p className="text-lg font-medium">
                {new Date(profile.subscription_expires_at).toLocaleDateString()}
              </p>
            </div>
          )}
          <div>
            <p className="text-sm text-slate-600">Referrals</p>
            <p className="text-lg font-medium">{profile.referrals || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
