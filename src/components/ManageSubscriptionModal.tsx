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
  onUpgraded?: () => void;
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

const planPricesNum: Record<Plan, number> = {
  free: 0,
  list: 9,
  edge: 19,
  concierge: 199,
};

type Step = "info" | "reason" | "confirm" | "cancelled" | "upgrade" | "upgradeConfirm" | "upgraded";

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
  onUpgraded,
}: ManageSubscriptionModalProps) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<Step>("info");
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [confirmText, setConfirmText] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<Plan | null>(null);
  const [upgradePreview, setUpgradePreview] = useState<{
    priceDifference: number;
    newPrice: number;
    hasSubscription: boolean;
  } | null>(null);
  const [upgrading, setUpgrading] = useState(false);

  // Get available upgrade plans
  const availableUpgrades = (["list", "edge", "concierge"] as Plan[]).filter(
    (plan) => planPricesNum[plan] > planPricesNum[userPlan]
  );

  useEffect(() => {
    if (isOpen) {
      fetchSubscription();
      setStep("info");
      setSelectedReason("");
      setConfirmText("");
      setError(null);
      setSelectedUpgradePlan(null);
      setUpgradePreview(null);
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

  const handleSelectUpgradePlan = async (plan: Plan) => {
    setSelectedUpgradePlan(plan);
    setError(null);
    try {
      const res = await fetch("/api/subscription", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPlan: plan, preview: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to preview");
      }
      setUpgradePreview({
        priceDifference: data.priceDifference,
        newPrice: data.newPrice,
        hasSubscription: data.hasSubscription,
      });
      setStep("upgradeConfirm");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate upgrade price. Please try again.");
    }
  };

  const handleUpgrade = async () => {
    if (!selectedUpgradePlan) return;
    setUpgrading(true);
    setError(null);
    try {
      const res = await fetch("/api/subscription", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPlan: selectedUpgradePlan }),
      });
      if (!res.ok) throw new Error("Failed to upgrade");
      setStep("upgraded");
      onUpgraded?.();
    } catch {
      setError("Failed to upgrade subscription. Please try again or contact support.");
    } finally {
      setUpgrading(false);
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
              {step === "cancelled" || step === "upgraded" ? "Done" : step === "upgrade" || step === "upgradeConfirm" ? "Upgrade plan" : "Manage subscription"}
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

              {/* Upgrade Button */}
              {availableUpgrades.length > 0 && userPlan !== "free" && (
                <button
                  onClick={() => setStep("upgrade")}
                  className="w-full px-4 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
                >
                  Upgrade plan
                </button>
              )}

              {/* Cancel Link */}
              {userPlan !== "free" && (
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
                You'll keep access until your current billing period ends. Type <span className="font-medium text-neutral-900">CANCEL</span> to confirm.
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
          ) : step === "upgrade" ? (
            <div className="space-y-5">
              <p className="text-neutral-500">
                Choose a plan to upgrade. You'll only pay the prorated difference for the remaining time in your billing cycle.
              </p>

              <div className="space-y-3">
                {availableUpgrades.map((plan) => (
                  <button
                    key={plan}
                    onClick={() => handleSelectUpgradePlan(plan)}
                    className="w-full text-left px-4 py-4 rounded-xl border border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-white transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-900">{planNames[plan]}</p>
                        <p className="text-sm text-neutral-500">
                          {plan === "edge" && "Outreach playbooks + unlimited job board"}
                          {plan === "concierge" && "We do everything for you"}
                        </p>
                      </div>
                      <p className="font-serif text-xl text-neutral-900">{planPrices[plan]}<span className="text-sm text-neutral-400 font-sans">/mo</span></p>
                    </div>
                  </button>
                ))}
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-dashed border-rose-200 rounded-xl text-rose-600 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={() => setStep("info")}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Back
              </button>
            </div>
          ) : step === "upgradeConfirm" ? (
            <div className="space-y-5">
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-500">Upgrading to</p>
                  <p className="font-medium text-neutral-900">{selectedUpgradePlan && planNames[selectedUpgradePlan]}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-neutral-500">New monthly rate</p>
                  <p className="text-neutral-900">${upgradePreview?.newPrice}/mo</p>
                </div>
                <div className="border-t border-dashed border-neutral-200 pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Due now</p>
                      <p className="text-xs text-neutral-500">Price difference charged immediately</p>
                    </div>
                    <p className="font-serif text-2xl text-neutral-900">${upgradePreview?.priceDifference}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-neutral-500">
                You'll be charged the price difference immediately. Your next billing will be at the new rate.
              </p>

              {error && (
                <div className="p-4 bg-rose-50 border border-dashed border-rose-200 rounded-xl text-rose-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep("upgrade");
                    setSelectedUpgradePlan(null);
                    setUpgradePreview(null);
                  }}
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl text-sm text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleUpgrade}
                  disabled={upgrading}
                  className="flex-1 px-4 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {upgrading ? "Processing..." : `Pay $${upgradePreview?.priceDifference}`}
                </button>
              </div>
            </div>
          ) : step === "upgraded" ? (
            <div className="space-y-5">
              <div className="flex items-center justify-center py-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-neutral-500 text-center">
                You've been upgraded to <span className="font-medium text-neutral-900">{selectedUpgradePlan && planNames[selectedUpgradePlan]}</span>. Refresh the page to access your new features.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-3 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                Refresh page
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
