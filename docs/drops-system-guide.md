# Drops System Guide

This document provides a comprehensive guide for creating new drops in The Anti Job Board platform.

---

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Plan System](#plan-system)
4. [Drop Types](#drop-types)
5. [Data Structures](#data-structures)
6. [UI Components](#ui-components)
7. [Creating a New Premium Drop](#creating-a-new-premium-drop)
8. [Updating Layout Navigation](#updating-layout-navigation)
9. [Plan-Based Access Control](#plan-based-access-control)
10. [Key Files Reference](#key-files-reference)

---

## Overview

The drops system is a tiered content delivery platform that provides:
- **Premium startup intelligence** (funded companies, founder contacts, outreach playbooks)
- **Live job feeds** from social sources
- **Educational free content** to drive engagement

### Release Schedule
- **Wednesday drops**: 12 startups (available to List, Edge, Concierge)
- **Sunday drops**: 3 startups (available to Edge, Concierge only)

---

## Folder Structure

```
/src/app/drops/
├── layout.tsx                    # Main layout with sidebar navigation & auth
├── page.tsx                      # Drops dashboard/hub page
├── drop-001/                     # Premium drop (Wednesday)
│   └── page.tsx
├── drop-002/                     # Premium drop (Sunday)
│   └── page.tsx
├── jobs/                         # The Disposable Job Board (live feed)
│   └── page.tsx
├── 500-people/                   # Free drop
│   └── page.tsx
├── 72-hour-window/               # Free drop
│   └── page.tsx
├── 50m-no-posts/                 # Free drop
│   └── page.tsx
├── resume-black-hole/            # Free drop
│   └── page.tsx
└── timing-advantage/             # Free drop
    └── page.tsx
```

---

## Plan System

### Plan Tiers

| Plan | Price | Access |
|------|-------|--------|
| `free` | $0 | Free educational drops only |
| `list` | $9/mo | Wednesday drops + limited jobs |
| `edge` | $19/mo | Wed + Sun drops + all jobs + outreach intel |
| `concierge` | $199/mo | Everything + personalized matching |

### Plan Details Object

```typescript
const planDetails: Record<Plan, { name: string; color: string; benefits: string[] }> = {
  free: {
    name: "Free",
    color: "bg-neutral-100 text-neutral-600",
    benefits: ["Weekly newsletter"],
  },
  list: {
    name: "The List",
    color: "bg-rose-100 text-rose-600",
    benefits: ["Wednesday drops", "Hiring signals", "Founder contacts"],
  },
  edge: {
    name: "The Edge",
    color: "bg-gradient-to-r from-rose-400 to-rose-500 text-white",
    benefits: ["Wed + Sun drops", "Hiring signals", "Founder contacts", "Approach notes"],
  },
  concierge: {
    name: "Concierge",
    color: "bg-neutral-900 text-white",
    benefits: ["Personalized matching", "Direct intros", "1-on-1 support"],
  },
};
```

### Content Visibility Rules

| Content | Free | List | Edge | Concierge |
|---------|------|------|------|-----------|
| First startup (full) | Yes | Yes | Yes | Yes |
| Other startups (blurred) | 2-5 visible | All | All | All |
| Founder outreach playbooks | First only | No | Yes | Yes |
| Hiring tweets | 5 | 10 | All | All |
| Job sheet | 10 | 25 | All | All |

---

## Drop Types

### 1. Premium Drops (Paid)

**Wednesday Drops** (12 startups):
- Access: `list`, `edge`, `concierge`
- Contains: Full startup profiles, hiring scores, founder intel
- Outreach playbooks: Edge/Concierge only

**Sunday Drops** (3 startups):
- Access: `edge`, `concierge` only
- Contains: Same as Wednesday but more curated

### 2. Free Drops (Educational)

Available to all users. Used to drive engagement and conversions.
Examples: "500 People", "72-Hour Window", "Resume Black Hole"

---

## Data Structures

### Startup Object (Premium Drops)

```typescript
interface Startup {
  // Basic Info
  name: string;
  tagline: string;
  website: string;
  logo?: string;                  // URL to logo image
  heroImage?: string;             // Optional hero/banner image

  // Funding Details
  round: string;                  // "Seed", "Series A", etc.
  amount: string;                 // "$4.2M", "$15M", etc.
  detail: string;                 // Funding context/details
  investors: string;              // Investor names

  // Hiring Intelligence
  hiringScore: number;            // 1-8 scale
  hiringReason: string;           // Why this score
  roles: string[];                // Open positions
  rolesNote?: string;             // Additional context on roles
  careersUrl?: string;            // Link to careers page

  // Company Context
  whatBuilding: string;           // What the company does
  whyMatters: string;             // Why it's significant

  // Founder Intel (Primary)
  founder: {
    initials: string;             // "JD" for display
    name: string;                 // "John Doe"
    title: string;                // "CEO & Co-founder"
    hook: string;                 // Outreach strategy (Edge only)
    avoid: string;                // What NOT to do (Edge only)
    image?: string;               // Photo URL
    linkedin?: string;            // LinkedIn profile URL
  };

  // Co-founder (Optional)
  cofounder?: {
    initials: string;
    name: string;
    title: string;
    hook: string;
    avoid: string;
    image?: string;
    linkedin?: string;
  };

  // Additional Fields
  signal?: string;                // Custom outreach intel
  featured?: boolean;             // Highlight this startup
  videoId?: string;               // YouTube video ID
  videoUrl?: string;              // Direct video URL
}
```

### Hiring Score Scale

| Score | Label | Color |
|-------|-------|-------|
| 7-8 | Very High | Rose/Red |
| 5-6 | High | Orange |
| 1-4 | Medium | Yellow |

---

## UI Components

### Required Imports

```typescript
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
```

### Core Components to Include

1. **Loading State**
```typescript
if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="flex items-center gap-2 text-neutral-400">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span>Loading...</span>
      </div>
    </div>
  );
}
```

2. **Hiring Meter**
```typescript
function HiringMeter({ score, reason }: { score: number; reason: string }) {
  const label = score >= 7 ? "Very High" : score >= 5 ? "High" : "Medium";
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-5 rounded-sm ${
              i < score ? "bg-rose-500" : "bg-neutral-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-neutral-900">{label}</span>
      <span className="text-sm text-neutral-500">· {reason}</span>
    </div>
  );
}
```

3. **Startup Card** (see full implementation in drop-002/page.tsx)

4. **Focus Overlay** (full-screen startup view)

5. **Command-K Search** (optional, for larger drops)

6. **Scroll-to-Top Button**

---

## Creating a New Premium Drop

### Step 1: Create the folder and page

```bash
mkdir src/app/drops/drop-003
touch src/app/drops/drop-003/page.tsx
```

### Step 2: Use this template

```typescript
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Plan = "free" | "list" | "edge" | "concierge";

interface Startup {
  name: string;
  tagline: string;
  website: string;
  logo?: string;
  round: string;
  amount: string;
  detail: string;
  investors: string;
  hiringScore: number;
  hiringReason: string;
  whatBuilding: string;
  whyMatters: string;
  roles: string[];
  rolesNote?: string;
  founder: {
    initials: string;
    name: string;
    title: string;
    hook: string;
    avoid: string;
    image?: string;
    linkedin?: string;
  };
  cofounder?: {
    initials: string;
    name: string;
    title: string;
    hook: string;
    avoid: string;
    image?: string;
    linkedin?: string;
  };
  signal?: string;
  featured?: boolean;
  careersUrl?: string;
}

// ============================================
// STARTUP DATA - REPLACE WITH NEW DROP DATA
// ============================================
const startups: Startup[] = [
  {
    name: "Company Name",
    tagline: "One-line description",
    website: "https://company.com",
    logo: "/drops/drop-003/company-logo.png",
    round: "Seed",
    amount: "$5M",
    detail: "Funding context",
    investors: "Investor 1, Investor 2",
    hiringScore: 7,
    hiringReason: "Why they're hiring",
    whatBuilding: "What they're building",
    whyMatters: "Why it matters",
    roles: ["Software Engineer", "Product Designer"],
    rolesNote: "Optional notes about roles",
    founder: {
      initials: "JD",
      name: "John Doe",
      title: "CEO & Co-founder",
      hook: "Outreach strategy goes here...",
      avoid: "What NOT to do when reaching out...",
      image: "/drops/drop-003/john-doe.jpg",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    careersUrl: "https://company.com/careers",
  },
  // Add more startups...
];

// ============================================
// DROP METADATA
// ============================================
const DROP_NUMBER = "003";
const DROP_DATE = "Mar 5";
const DROP_TITLE = "Drop Title Here";
const DROP_DESCRIPTION = "Brief description of this drop";

// For Sunday drops (Edge only), set this to true
const IS_SUNDAY_DROP = false;

export default function Drop003Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<Plan>("free");
  const [focusedStartup, setFocusedStartup] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login?redirect=/drops/drop-" + DROP_NUMBER);
        return;
      }

      const { data: userData } = await supabase
        .from("users")
        .select("plan")
        .eq("id", session.user.id)
        .single();

      setPlan((userData?.plan as Plan) || "free");
      setLoading(false);
    };

    getUser();
  }, [router]);

  // Plan-based access check
  const hasAccess = IS_SUNDAY_DROP
    ? plan === "edge" || plan === "concierge"
    : plan === "list" || plan === "edge" || plan === "concierge";

  const canSeeOutreach = plan === "edge" || plan === "concierge";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-50">
        <div className="flex items-center gap-2 text-neutral-400">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Access denied for free users (or List users on Sunday drops)
  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
            {IS_SUNDAY_DROP ? "Edge Access Required" : "Upgrade to Access"}
          </h1>
          <p className="text-neutral-600 mb-6">
            {IS_SUNDAY_DROP
              ? "Sunday drops are exclusive to Edge and Concierge members."
              : "This drop is available to List, Edge, and Concierge members."}
          </p>
          <a
            href="mailto:hello@theantijobboard.com?subject=Upgrade%20Request"
            className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-full font-medium hover:bg-rose-600 transition-colors"
          >
            Contact to Upgrade
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-neutral-50/80 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                <span>Drop {DROP_NUMBER}</span>
                <span>·</span>
                <span>{DROP_DATE}</span>
              </div>
              <h1 className="text-xl font-semibold text-neutral-900">{DROP_TITLE}</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-neutral-500">{startups.length} startups</span>
            </div>
          </div>
        </div>
      </div>

      {/* Startup Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup, index) => (
            <StartupCard
              key={startup.name}
              startup={startup}
              index={index}
              plan={plan}
              canSeeOutreach={canSeeOutreach}
              onFocus={() => setFocusedStartup(index)}
            />
          ))}
        </div>
      </div>

      {/* Focus Overlay */}
      <AnimatePresence>
        {focusedStartup !== null && (
          <FocusOverlay
            startup={startups[focusedStartup]}
            index={focusedStartup}
            plan={plan}
            canSeeOutreach={canSeeOutreach}
            onClose={() => setFocusedStartup(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// STARTUP CARD COMPONENT
// ============================================
function StartupCard({
  startup,
  index,
  plan,
  canSeeOutreach,
  onFocus,
}: {
  startup: Startup;
  index: number;
  plan: Plan;
  canSeeOutreach: boolean;
  onFocus: () => void;
}) {
  const isFirstStartup = index === 0;
  const showContent = plan !== "free" || isFirstStartup;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-2xl border border-neutral-200 overflow-hidden ${
        !showContent ? "opacity-60" : ""
      }`}
    >
      {/* Card Header */}
      <div className="p-5 border-b border-neutral-100">
        <div className="flex items-start gap-3">
          {startup.logo ? (
            <Image
              src={startup.logo}
              alt={startup.name}
              width={48}
              height={48}
              className="rounded-xl"
            />
          ) : (
            <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center text-lg font-semibold text-neutral-600">
              {startup.name[0]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-neutral-900 truncate">{startup.name}</h3>
            <p className="text-sm text-neutral-500 truncate">{startup.tagline}</p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        {showContent ? (
          <>
            {/* Funding */}
            <div className="flex items-center gap-2 text-sm mb-3">
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-medium">
                {startup.round}
              </span>
              <span className="text-neutral-900 font-semibold">{startup.amount}</span>
            </div>

            {/* Hiring Score */}
            <HiringMeter score={startup.hiringScore} reason={startup.hiringReason} />

            {/* Roles */}
            <div className="mt-4">
              <p className="text-xs text-neutral-500 mb-2">Open Roles</p>
              <div className="flex flex-wrap gap-1.5">
                {startup.roles.slice(0, 3).map((role) => (
                  <span
                    key={role}
                    className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs"
                  >
                    {role}
                  </span>
                ))}
                {startup.roles.length > 3 && (
                  <span className="px-2 py-1 text-neutral-500 text-xs">
                    +{startup.roles.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* View Button */}
            <button
              onClick={onFocus}
              className="w-full mt-4 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
              View Details
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-neutral-500 mb-3">Upgrade to view this startup</p>
            <a
              href="mailto:hello@theantijobboard.com?subject=Upgrade%20Request"
              className="inline-flex items-center gap-1 text-rose-500 text-sm font-medium hover:text-rose-600"
            >
              Contact to Upgrade
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// HIRING METER COMPONENT
// ============================================
function HiringMeter({ score, reason }: { score: number; reason: string }) {
  const label = score >= 7 ? "Very High" : score >= 5 ? "High" : "Medium";

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-0.5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-5 rounded-sm ${
              i < score ? "bg-rose-500" : "bg-neutral-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-neutral-900">{label}</span>
    </div>
  );
}

// ============================================
// FOCUS OVERLAY COMPONENT
// ============================================
function FocusOverlay({
  startup,
  index,
  plan,
  canSeeOutreach,
  onClose,
}: {
  startup: Startup;
  index: number;
  plan: Plan;
  canSeeOutreach: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl p-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            {startup.logo ? (
              <Image
                src={startup.logo}
                alt={startup.name}
                width={64}
                height={64}
                className="rounded-2xl"
              />
            ) : (
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center text-2xl font-semibold text-neutral-600">
                {startup.name[0]}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold text-neutral-900">{startup.name}</h2>
              <p className="text-neutral-600">{startup.tagline}</p>
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-rose-500 hover:text-rose-600"
              >
                {startup.website.replace(/https?:\/\//, "")}
              </a>
            </div>
          </div>

          {/* Funding */}
          <div className="bg-emerald-50 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                {startup.round}
              </span>
              <span className="text-xl font-semibold text-emerald-900">{startup.amount}</span>
            </div>
            <p className="text-sm text-emerald-800">{startup.detail}</p>
            <p className="text-sm text-emerald-600 mt-1">Investors: {startup.investors}</p>
          </div>

          {/* What They're Building */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">What they&apos;re building</h3>
            <p className="text-neutral-900">{startup.whatBuilding}</p>
          </div>

          {/* Why It Matters */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">Why it matters</h3>
            <p className="text-neutral-900">{startup.whyMatters}</p>
          </div>

          {/* Hiring Score */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">Hiring likelihood</h3>
            <HiringMeter score={startup.hiringScore} reason={startup.hiringReason} />
          </div>

          {/* Open Roles */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-neutral-500 mb-2">Open roles</h3>
            <div className="flex flex-wrap gap-2">
              {startup.roles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm"
                >
                  {role}
                </span>
              ))}
            </div>
            {startup.rolesNote && (
              <p className="text-sm text-neutral-500 mt-2">{startup.rolesNote}</p>
            )}
          </div>

          {/* Founder Intel */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Founder Intel</h3>

            {/* Founder */}
            <div className="bg-neutral-50 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                {startup.founder.image ? (
                  <Image
                    src={startup.founder.image}
                    alt={startup.founder.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center text-lg font-semibold text-neutral-600">
                    {startup.founder.initials}
                  </div>
                )}
                <div>
                  <p className="font-medium text-neutral-900">{startup.founder.name}</p>
                  <p className="text-sm text-neutral-500">{startup.founder.title}</p>
                </div>
                {startup.founder.linkedin && (
                  <a
                    href={startup.founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto p-2 hover:bg-neutral-200 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>

              {/* Outreach Section (Edge only) */}
              {canSeeOutreach || index === 0 ? (
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-emerald-600 font-medium mb-1">How to approach</p>
                    <p className="text-sm text-neutral-700">{startup.founder.hook}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-red-600 font-medium mb-1">What to avoid</p>
                    <p className="text-sm text-neutral-700">{startup.founder.avoid}</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden">
                  <div className="select-none pointer-events-none" style={{ filter: "blur(6px)" }}>
                    <div className="bg-white rounded-xl p-3 mb-2">
                      <p className="text-xs text-emerald-600 font-medium mb-1">How to approach</p>
                      <p className="text-sm text-neutral-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                      <p className="text-xs text-red-600 font-medium mb-1">What to avoid</p>
                      <p className="text-sm text-neutral-700">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-center shadow-lg">
                      <p className="text-sm font-medium text-neutral-900 mb-1">Edge Plan Feature</p>
                      <a
                        href="mailto:hello@theantijobboard.com?subject=Upgrade%20to%20Edge"
                        className="text-xs text-rose-500 hover:text-rose-600"
                      >
                        Contact to Upgrade
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Co-founder (if exists) */}
            {startup.cofounder && (
              <div className="bg-neutral-50 rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  {startup.cofounder.image ? (
                    <Image
                      src={startup.cofounder.image}
                      alt={startup.cofounder.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center text-lg font-semibold text-neutral-600">
                      {startup.cofounder.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-neutral-900">{startup.cofounder.name}</p>
                    <p className="text-sm text-neutral-500">{startup.cofounder.title}</p>
                  </div>
                  {startup.cofounder.linkedin && (
                    <a
                      href={startup.cofounder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto p-2 hover:bg-neutral-200 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5 text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Outreach Section (Edge only) */}
                {canSeeOutreach || index === 0 ? (
                  <div className="space-y-3">
                    <div className="bg-white rounded-xl p-3">
                      <p className="text-xs text-emerald-600 font-medium mb-1">How to approach</p>
                      <p className="text-sm text-neutral-700">{startup.cofounder.hook}</p>
                    </div>
                    <div className="bg-white rounded-xl p-3">
                      <p className="text-xs text-red-600 font-medium mb-1">What to avoid</p>
                      <p className="text-sm text-neutral-700">{startup.cofounder.avoid}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden">
                    <div className="select-none pointer-events-none" style={{ filter: "blur(6px)" }}>
                      <div className="bg-white rounded-xl p-3 mb-2">
                        <p className="text-xs text-emerald-600 font-medium mb-1">How to approach</p>
                        <p className="text-sm text-neutral-700">Lorem ipsum dolor sit amet consectetur.</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-center shadow-lg">
                        <p className="text-sm font-medium text-neutral-900 mb-1">Edge Plan Feature</p>
                        <a
                          href="mailto:hello@theantijobboard.com?subject=Upgrade%20to%20Edge"
                          className="text-xs text-rose-500 hover:text-rose-600"
                        >
                          Contact to Upgrade
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Careers Link */}
          {startup.careersUrl && (
            <div className="mt-6">
              <a
                href={startup.careersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600 transition-colors"
              >
                View Open Positions
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
```

### Step 3: Add images to public folder

```bash
mkdir -p public/drops/drop-003
# Add logo images: company-logo.png
# Add founder images: founder-name.jpg
```

---

## Updating Layout Navigation

After creating a new drop, update the sidebar navigation in `src/app/drops/layout.tsx`:

### For Wednesday Drops (List access)

```typescript
const fundedDrops = [
  { id: "drop-003", date: "Mar 5", title: "12 Startups · Scorecards · Playbooks", type: "wednesday" },
  { id: "drop-002", date: "Feb 23", title: "3 Startups · Deep Dives", type: "sunday" },
  { id: "drop-001", date: "Feb 18", title: "12 Startups · Scorecards · Playbooks", type: "wednesday" },
];
```

### Access Badge Logic

In the layout, drops show a lock icon for users without access:

```typescript
// Wednesday drops: accessible to list, edge, concierge
// Sunday drops: accessible to edge, concierge only

const isPaid = plan === "list" || plan === "edge" || plan === "concierge";
const hasEdgeAccess = plan === "edge" || plan === "concierge";

// For each drop item
{drop.type === "sunday" && !hasEdgeAccess && <LockIcon />}
{drop.type === "wednesday" && !isPaid && <LockIcon />}
```

---

## Plan-Based Access Control

### Content Visibility Matrix

```typescript
// In each drop page
const isFirstStartup = index === 0;

// Who can see full content
const canSeeContent = plan !== "free" || isFirstStartup;

// Who can see outreach playbooks
const canSeeOutreach = plan === "edge" || plan === "concierge" || isFirstStartup;

// For Sunday drops, List users also can't access
const hasSundayAccess = plan === "edge" || plan === "concierge";
```

### Blurred Content Pattern

For content that's locked:

```typescript
{!canSeeOutreach && (
  <div className="relative rounded-xl overflow-hidden">
    {/* Blurred content */}
    <div className="select-none pointer-events-none" style={{ filter: "blur(6px)" }}>
      {/* Fake/placeholder content */}
    </div>

    {/* Overlay with upgrade CTA */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
        <p className="text-sm font-medium">Edge Plan Feature</p>
        <a href="mailto:hello@theantijobboard.com">Contact to Upgrade</a>
      </div>
    </div>
  </div>
)}
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/app/drops/layout.tsx` | Main layout, sidebar navigation, auth |
| `src/app/drops/page.tsx` | Drops hub/dashboard |
| `src/app/drops/drop-00X/page.tsx` | Individual premium drops |
| `src/app/drops/jobs/page.tsx` | Live job feed |
| `src/app/api/subscription/route.ts` | Subscription management API |
| `src/lib/dodo.ts` | Payment integration |
| `src/components/ManageSubscriptionModal.tsx` | Subscription UI |
| `src/components/DotDistortion.tsx` | Visual effects component |

---

## Checklist for New Drop

- [ ] Create folder: `src/app/drops/drop-00X/`
- [ ] Create page: `src/app/drops/drop-00X/page.tsx`
- [ ] Add startup data to the page
- [ ] Add images to `public/drops/drop-00X/`
- [ ] Update `fundedDrops` array in `src/app/drops/layout.tsx`
- [ ] Set correct `IS_SUNDAY_DROP` flag
- [ ] Test all plan levels (free, list, edge, concierge)
- [ ] Verify blur/lock behavior for each plan
- [ ] Test focus overlay functionality
- [ ] Verify mobile responsiveness

---

## Quick Data Entry Template

Copy this for each startup:

```typescript
{
  name: "",
  tagline: "",
  website: "",
  logo: "/drops/drop-00X/logo.png",
  round: "",
  amount: "",
  detail: "",
  investors: "",
  hiringScore: 7,
  hiringReason: "",
  whatBuilding: "",
  whyMatters: "",
  roles: ["", "", ""],
  rolesNote: "",
  founder: {
    initials: "",
    name: "",
    title: "",
    hook: "",
    avoid: "",
    image: "/drops/drop-00X/founder.jpg",
    linkedin: "",
  },
  careersUrl: "",
},
```
