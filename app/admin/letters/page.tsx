"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { UserRoleRow } from "@/lib/types/database";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Letter } from "@/lib/types/database";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default function AdminLettersPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [letters, setLetters] = useState<Letter[]>([]);

  const loadLetters = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth");
        return;
      }

      // Check if admin
      const { data: roleDataRaw } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      const roleData = roleDataRaw as Pick<UserRoleRow, "role"> | null;

      if (roleData?.role !== "admin") {
        router.push("/dashboard");
        return;
      }

      // Load all letters
      const { data: lettersDataRaw } = await supabase
        .from("letters")
        .select("*")
        .order("created_at", { ascending: false });

      const lettersData = (lettersDataRaw as Letter[] | null) ?? [];

      setLetters(lettersData);
    } catch (error) {
      console.error("Error loading letters:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadLetters();
  }, [loadLetters]);

  const approveLetter = async (letterId: string) => {
    if (!confirm("Are you sure you want to approve this letter for delivery?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("letters")
        .update({
          status: "approved",
          completed_at: new Date().toISOString()
        })
        .eq("id", letterId);

      if (error) throw error;

      alert("Letter approved successfully and marked for delivery");
      await loadLetters();
    } catch (error: any) {
      console.error("Error approving letter:", error);
      alert(error.message || "Failed to approve letter");
    }
  };

  const rejectLetter = async (letterId: string) => {
    const reason = prompt("Please provide a reason for rejection:");
    if (!reason) return;

    try {
      const { error } = await supabase
        .from("letters")
        .update({
          status: "rejected",
          notes: reason
        })
        .eq("id", letterId);

      if (error) throw error;

      alert("Letter rejected successfully");
      await loadLetters();
    } catch (error: any) {
      console.error("Error rejecting letter:", error);
      alert(error.message || "Failed to reject letter");
    }
  };

  const deleteLetter = async (letterId: string) => {
    if (!confirm("Are you sure you want to delete this letter?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("letters")
        .delete()
        .eq("id", letterId);

      if (error) throw error;

      alert("Letter deleted successfully");
      await loadLetters();
    } catch (error: any) {
      console.error("Error deleting letter:", error);
      alert(error.message || "Failed to delete letter");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending_approval: {
        label: "Pending Review",
        class: "bg-yellow-100 text-yellow-800"
      },
      approved: {
        label: "Approved",
        class: "bg-green-100 text-green-800"
      },
      rejected: {
        label: "Rejected",
        class: "bg-red-100 text-red-800"
      },
      generating: {
        label: "Generating",
        class: "bg-blue-100 text-blue-800"
      },
      completed: {
        label: "Completed",
        class: "bg-green-100 text-green-800"
      },
      failed: {
        label: "Failed",
        class: "bg-red-100 text-red-800"
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status,
      class: "bg-gray-100 text-gray-800"
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${config.class}`}
      >
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Letter Review & Approval</h1>
            <p className="text-gray-600 mt-1">Review, approve, and manage client letters before delivery</p>
          </div>
          <Button variant="outline" onClick={() => router.push("/admin")}>
            Back to Dashboard
          </Button>
        </div>

        <Card className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              All Letters ({letters.length})
            </h2>
          </div>

          <div className="space-y-3">
            {letters.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No letters yet</p>
            ) : (
              letters.map((letter) => (
                <div
                  key={letter.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold">{letter.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {letter.recipient_name && `To: ${letter.recipient_name}`}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        User ID: {letter.user_id.substring(0, 8)}...
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Created: {new Date(letter.created_at).toLocaleString()}
                      </p>
                      {letter.completed_at && (
                        <p className="text-xs text-green-600 mt-1">
                          Completed: {new Date(letter.completed_at).toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(letter.status)}

                      {/* Approval Actions */}
                      {letter.status === "pending_approval" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => approveLetter(letter.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectLetter(letter.id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {/* Completed Letters */}
                      {(letter.status === "approved" || letter.status === "completed") && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            window.open(`/api/letters/${letter.id}/pdf`, "_blank")
                          }
                        >
                          Download PDF
                        </Button>
                      )}

                      {/* Delete for all statuses except approved */}
                      {letter.status !== "approved" && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteLetter(letter.id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                  {letter.content && (
                    <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
                      <p className="line-clamp-3">{letter.content}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
