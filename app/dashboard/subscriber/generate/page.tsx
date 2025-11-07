"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading";

export default function GenerateLetterPage() {
  const router = useRouter();
  const [quota, setQuota] = useState({ remaining: 0, total: 0, canGenerate: false });
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // Form state
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [content, setContent] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  // Common subject options
  const commonSubjects = [
    { value: "tenant_dispute", label: "Tenant/Landlord Dispute" },
    { value: "debt_collection", label: "Debt Collection" },
    { value: "employment_issue", label: "Employment/Labor Issue" },
    { value: "contract_dispute", label: "Contract Dispute" },
    { value: "harassment", label: "Harassment/Cease & Desist" },
    { value: "custom", label: "Custom Subject" }
  ];

  // Get specific placeholder text based on subject
  const getPlaceholderForSubject = (selectedSubject: string) => {
    const placeholders = {
      tenant_dispute: "Describe your tenant/landlord issue. Include property address, lease terms, specific violations, dates of incidents, communication attempts, and desired resolution (e.g., security deposit return, repair request, lease termination).",
      debt_collection: "Detail the debt situation. Include creditor name, amount owed, date of debt, payment history, any payment arrangements made, previous collection attempts, and desired payment terms or settlement offer.",
      employment_issue: "Describe your employment situation. Include company name, your position, dates of employment, specific incidents, company policies violated, witnesses, previous complaints, and desired outcome (e.g., back pay, reinstatement, policy change).",
      contract_dispute: "Explain the contract dispute. Include contract details, parties involved, key terms, what was delivered vs. promised, damages incurred, previous attempts to resolve, and your desired resolution.",
      harassment: "Detail the harassment situation. Include specific incidents, dates, locations, individuals involved, nature of harassment, witnesses, impact on you, previous complaints, and desired actions to stop the behavior.",
      custom: "Describe your situation in detail. Include relevant facts, dates, amounts, parties involved, previous communications, and what action you want the recipient to take. The more detail you provide, the better the letter will be."
    };

    return placeholders[selectedSubject as keyof typeof placeholders] || placeholders.custom;
  };

  useEffect(() => {
    checkQuota();
  }, []);

  const checkQuota = async () => {
    try {
      const response = await fetch("/api/letters/quota");
      if (response.ok) {
        const quotaData = await response.json();
        setQuota(quotaData);
      }
    } catch (error) {
      console.error("Error checking quota:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!quota.canGenerate) {
      toast.error("You have reached your monthly letter limit. Please upgrade your subscription.");
      return;
    }

    // Validate subject selection
    if (!subject) {
      toast.error("Please select a letter subject");
      return;
    }

    if (subject === "custom" && !customSubject.trim()) {
      toast.error("Please enter a custom subject");
      return;
    }

    setGenerating(true);

    // Determine the final title based on subject selection
    const finalTitle = subject === "custom" ? customSubject :
      commonSubjects.find(s => s.value === subject)?.label || title;

    const generatePromise = fetch("/api/letters/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: finalTitle,
        subject,
        content,
        recipient_name: recipientName,
        recipient_address: recipientAddress,
      }),
    }).then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate letter");
      }
      return response.json();
    });

    toast.promise(generatePromise, {
      loading: "Drafting your professional legal letter...",
      success: (data) => {
        setGenerating(false);
        router.push(`/dashboard/subscriber/letters/${data.letterId}`);
        return "Letter draft submitted for attorney review!";
      },
      error: (err) => {
        setGenerating(false);
        return err.message || "An error occurred while drafting the letter";
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-slate-600">Loading quota information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            ← Back
          </Button>
        </div>

        {/* Quota Alert */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Letter Quota</h3>
              <p className="text-sm text-blue-700 mt-1">
                {quota.remaining} of {quota.total} letters remaining this month
              </p>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {quota.remaining}/{quota.total}
            </div>
          </div>
          {!quota.canGenerate && (
            <div className="mt-3 p-3 bg-yellow-100 border border-yellow-300 rounded">
              <p className="text-yellow-800 text-sm font-medium">
                ⚠️ You&apos;ve used all your letters this month. Please upgrade your plan.
              </p>
            </div>
          )}
        </Card>

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-2">Draft Legal Letter</h1>
          <p className="text-gray-600 mb-8">
            Select a subject and provide details below. Our licensed attorneys will draft a professional legal letter for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Letter Subject <span className="text-red-500">*</span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a letter subject...</option>
                {commonSubjects.map((subj) => (
                  <option key={subj.value} value={subj.value}>
                    {subj.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Choose the category that best describes your legal letter needs
              </p>
            </div>

            {subject === "custom" && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Custom Subject <span className="text-red-500">*</span>
                </label>
                <Input
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="e.g., Property Damage Claim, Notice of Intent to Sue"
                  required={subject === "custom"}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Describe your specific legal issue
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                Letter Content <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full min-h-[250px] p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={getPlaceholderForSubject(subject)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Provide as much detail as possible about your situation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Recipient Name
                </label>
                <Input
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Recipient Address
                </label>
                <Input
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="123 Main St, City, State 12345"
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for Best Results</h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Include specific dates, amounts, and names</li>
                <li>Explain what has happened and what you want</li>
                <li>Mention any previous communications or attempts to resolve</li>
                <li>Be clear about deadlines or next steps</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={generating || !quota.canGenerate}
                className="flex-1"
              >
                {generating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Drafting Letter...
                  </>
                ) : (
                  "Draft Letter for Review"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={generating}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
