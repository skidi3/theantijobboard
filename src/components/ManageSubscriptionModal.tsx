"use client";

import { useState, useEffect } from "react";

type Plan = "free" | "list" | "edge" | "concierge";

interface Subscription {
  id: string;
  status: string;
  amount: number;
  currency: string;
  currentPeriodEnd: string;
  productId: string;
}

interface ManageSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPlan: Plan;
  onCancelled: () => void;
}

const planNames: Record<Plan, string> = {
  free: "Free",
  list: "The List",
  edge: "The Edge",
  concierge: "Concierge",
};

const planPrices: Record<Plan, string> = {
  free: "$0",
  list: "$9",
  edge: "$19",
  concierge: "$199",
};

type Step = "info" | "reason" | "confirm" | "cancelled";

const cancelReasons = [
  "Too expensive",
  "Not using it enough",
  "Found a job",
  "Content not relevant",
  "Other",
];

export function ManageSubscriptionModal({
  isOpen,
  onClose,
  userPlan,
  onCancelled,
}: ManageSubscriptionModalProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>("info");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [confirmText, setConfirmText] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchSubscription();
      setStep("info");
      setSelectedReason("");
      setConfirmText("");
      setError(null);
    }
  }, [isOpen]);

  const fetchSubscription = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscription");
      const data = await res.json();
      setSubscription(data.subscription);
    } catch {
      setError("Failed to load subscription details");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setCancelling(true);
    setError(null);
    try {
      const res = await fetch("/api/subscription", { method: "DELETE" });
      if (!res.ok) {
        throw new Error("Failed to cancel");
      }
      setStep("cancelled");
      onCancelled();
    } catch {
      setError("Failed to cancel subscription. Please try again or contact support.");
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl w-full max-w-md overflow-hidden border border-neutral-200">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-dashed border-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-neutral-900">
              {step === "cancelled" ? "Done" : "Manage subscription"}
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-neutral-200 border-t-neutral-900 rounded-full animate-spin" />
            </div>
          ) : step === "info" ? (
            <div className="space-y-4">
              {/* Current Plan */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Current plan</p>
                    <p className="font-medium text-neutral-900">{planNames[userPlan]}</p>
                  </div>
                  <p className="font-serif text-2xl text-neutral-900">{planPrices[userPlan]}<span className="text-sm text-neutral-400 font-sans">/mo</span></p>
                </div>
              </div>

              {/* Next Billing */}
              {subscription?.currentPeriodEnd && (
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4">
                  <p className="text-sm text-neutral-500 mb-1">Next billing</p>
                  <p className="font-medium text-neutral-900">{formatDate(subscription.currentPeriodEnd)}</p>
                </div>
              )}

              {/* Cancel Link */}
              {userPlan !== "free" && subscription && (
                <div className="pt-4 border-t border-dashed border-neutral-200">
                  <button
                    onClick={() => setStep("reason")}
                    className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    Cancel subscription
                  </button>
                </div>
              )}

              {userPlan === "free" && (
                <p className="text-sm text-neutral-500">
                  You're on the free plan.
                </p>
              )}
            </div>
          ) : step === "reason" ? (
            <div className="space-y-5">
              <p className="text-neutral-500">
                Before you go, let us know why.
              </p>

              <div className="space-y-2">
                {cancelReasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-colors text-sm ${
                      selectedReason === reason
                        ? "border-rose-300 bg-rose-50 text-neutral-900"
                        : "border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep("info")}
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  disabled={!selectedReason}
                  className="flex-1 px-4 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          ) : step === "confirm" ? (
            <div className="space-y-5">
              <p className="text-neutral-500">
                You'll lose access to premium drops immediately. Type <span className="font-medium text-neutral-900">CANCEL</span> to confirm.
              </p>

              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                placeholder="Type CANCEL"
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
              />

              {error && (
                <div className="p-4 bg-rose-50 border border-dashed border-rose-200 rounded-xl text-rose-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep("info");
                    setSelectedReason("");
                    setConfirmText("");
                  }}
                  className="flex-1 px-4 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  Keep my plan
                </button>
                <button
                  onClick={handleCancel}
                  disabled={confirmText !== "CANCEL" || cancelling}
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-600 hover:bg-neutral-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {cancelling ? "Cancelling..." : "Cancel"}
                </button>
              </div>
            </div>
          ) : step === "cancelled" ? (
            <div className="space-y-5">
              <p className="text-neutral-500">
                Your subscription has been cancelled. You can resubscribe anytime.
              </p>
              <button
                onClick={onClose}
                className="w-full px-4 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
