"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Profile } from "@/lib/types/database";

interface ProfileSettingsFormProps {
  profile: Profile;
  onUpdate?: () => void;
}

export function ProfileSettingsForm({ profile, onUpdate }: ProfileSettingsFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [fullName, setFullName] = useState(profile.full_name || "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", profile.id);

      if (updateError) {
        throw updateError;
      }

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      
      if (onUpdate) {
        onUpdate();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFullName(profile.full_name || "");
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
          />
          <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          ) : (
            <input
              type="text"
              value={profile.full_name || "Not set"}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-700"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Member Since
          </label>
          <input
            type="text"
            value={new Date(profile.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            disabled
            className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-700"
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
