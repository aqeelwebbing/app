"use client";

import { useRouter } from "next/navigation";
import { ProfileSettingsForm } from "@/components/profile/ProfileSettingsForm";
import type { Profile } from "@/lib/types/database";

interface EmployeeProfileClientProps {
  profile: Profile;
  couponCode: string | null;
  couponUsageCount: number;
  discountPercent: number;
  totalEarnings: number;
}

export function EmployeeProfileClient({
  profile,
  couponCode,
  couponUsageCount,
  discountPercent,
  totalEarnings,
}: EmployeeProfileClientProps) {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <ProfileSettingsForm profile={profile} onUpdate={handleUpdate} />

      {/* Employee Stats */}
      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Employee Statistics</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-600">Coupon Code</p>
            <p className="text-lg font-medium font-mono">
              {couponCode || "No active coupon"}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Discount Percentage</p>
            <p className="text-lg font-medium">{discountPercent}%</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Total Referrals</p>
            <p className="text-lg font-medium">{couponUsageCount}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Total Earnings</p>
            <p className="text-lg font-medium">
              ${totalEarnings.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Commission Info */}
      <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Employee Benefits
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>
            <strong>Commission Rate:</strong> You earn 5% on each paid subscription using your coupon
          </li>
          <li>
            <strong>Discount:</strong> Your referrals get {discountPercent}% off their subscription
          </li>
          <li>
            <strong>Tracking:</strong> All your referrals and earnings are tracked automatically
          </li>
        </ul>
      </div>
    </div>
  );
}
