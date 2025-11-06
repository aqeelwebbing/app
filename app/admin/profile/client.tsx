"use client";

import { useRouter } from "next/navigation";
import { ProfileSettingsForm } from "@/components/profile/ProfileSettingsForm";
import type { Profile } from "@/lib/types/database";

interface AdminProfileClientProps {
  profile: Profile;
  totalUsers: number;
  activeSubscriptions: number;
  totalLetters: number;
}

export function AdminProfileClient({
  profile,
  totalUsers,
  activeSubscriptions,
  totalLetters,
}: AdminProfileClientProps) {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <ProfileSettingsForm profile={profile} onUpdate={handleUpdate} />

      {/* Admin Role Badge */}
      <div className="border rounded-lg p-6 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-red-900">Administrator Access</h2>
            <p className="text-sm text-red-700">You have full system privileges</p>
          </div>
        </div>
        <p className="text-sm text-red-800">
          As an administrator, you have access to all features including user management, 
          subscriptions, letters, and system settings.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">Total Users</p>
            <p className="text-3xl font-bold text-blue-900 mt-1">{totalUsers}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 font-medium">Active Subscriptions</p>
            <p className="text-3xl font-bold text-green-900 mt-1">{activeSubscriptions}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">Total Letters</p>
            <p className="text-3xl font-bold text-purple-900 mt-1">{totalLetters}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
