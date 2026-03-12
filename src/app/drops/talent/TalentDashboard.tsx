"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface TalentProfile {
  id: string;
  created_at: string;
  email: string;
  name: string;
  phone: string | null;
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  twitter_url: string | null;
  current_title: string | null;
  current_company: string | null;
  years_experience: string | null;
  skills: string[];
  resume_url: string | null;
  resume_text: string | null;
  photo_url: string | null;
  ai_summary: string | null;
  ai_tags: string[];
  looking_for: string[];
  preferred_company_size: string[];
  remote_preference: string;
  salary_range: string | null;
  preferred_locations: string | null;
  work_authorization: string | null;
  notice_period: string | null;
  why_looking: string | null;
  ideal_role: string | null;
  additional_context: string | null;
  status: string;
  quality_score: number | null;
  admin_notes: string | null;
  user_id: string | null;
  last_active_at: string | null;
  source: string | null;
  last_contacted_at: string | null;
}

interface Props {
  profiles: TalentProfile[];
  adminEmail: string;
}

interface MatchResult {
  profile: TalentProfile;
  score: number;
  fit_summary: string;
  strengths: string[];
  considerations: string[];
  would_they_want_it: string;
}

type SortField = "created_at" | "name" | "last_active_at" | "quality_score";
type SortOrder = "asc" | "desc";
type ViewMode = "table" | "cards";

const ITEMS_PER_PAGE = 50;

// Matching the exact options from get-discovered form
const ROLE_OPTIONS = [
  "Software Engineer",
  "Senior Software Engineer",
  "Staff / Principal Engineer",
  "Engineering Manager",
  "Founding Engineer",
  "Technical Co-founder",
  "DevOps / SRE / Platform",
  "Data Scientist / ML Engineer",
  "Mobile Engineer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "Product Manager",
  "Senior Product Manager",
  "Head of Product",
  "Product Designer",
  "UX Designer",
  "UI Designer",
  "Design Lead",
  "Brand Designer",
  "Operations Manager",
  "Chief of Staff",
  "Business Operations",
  "Growth Manager",
  "Marketing Manager",
  "Content Marketing",
  "Performance Marketing",
  "Sales",
  "Account Executive",
  "Customer Success",
  "Business Development",
  "Finance / Accounting",
  "Legal / Compliance",
  "HR / People Ops",
  "Recruiter",
];

const WORK_AUTH_OPTIONS = [
  { value: "authorized", label: "authorized to work" },
  { value: "need_visa", label: "needs visa sponsorship" },
  { value: "have_visa", label: "has valid work visa" },
];

const NOTICE_OPTIONS = [
  { value: "immediate", label: "immediately available" },
  { value: "2_weeks", label: "2 weeks notice" },
  { value: "1_month", label: "1 month notice" },
  { value: "2_months", label: "2+ months notice" },
  { value: "exploring", label: "just exploring" },
];

const REMOTE_OPTIONS = [
  { value: "remote_only", label: "remote only" },
  { value: "hybrid", label: "hybrid" },
  { value: "onsite", label: "on-site" },
  { value: "flexible", label: "flexible" },
];

export function TalentDashboard({ profiles, adminEmail }: Props) {
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [selectedProfile, setSelectedProfile] = useState<TalentProfile | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [remoteFilter, setRemoteFilter] = useState<string>("all");
  const [authFilter, setAuthFilter] = useState<string>("all");
  const [noticePeriodFilter, setNoticePeriodFilter] = useState<string>("all");
  const [lookingForFilter, setLookingForFilter] = useState<string>("all");
  const [hasResumeFilter, setHasResumeFilter] = useState<boolean | null>(null);
  const [hasLinkedInFilter, setHasLinkedInFilter] = useState<boolean | null>(null);
  const [hasStoryFilter, setHasStoryFilter] = useState<boolean | null>(null);
  const [qualityFilter, setQualityFilter] = useState<string>("all");
  const [activityFilter, setActivityFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sort state
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Match state
  const [roleTitle, setRoleTitle] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [matchResults, setMatchResults] = useState<MatchResult[] | null>(null);
  const [matching, setMatching] = useState(false);
  const [extractedFilters, setExtractedFilters] = useState<{
    role_types: string[];
    required_skills: string[];
    remote_preference: string | null;
    requires_us_auth: boolean;
    location: string | null;
    min_years_experience: number | null;
    salary_range: { min: number | null; max: number | null };
  } | null>(null);
  const [matchStats, setMatchStats] = useState<{
    total: number;
    afterFilters: number;
    filteredCount: number;
    filterReasons: Record<string, number>;
    sentToAi: number;
  } | null>(null);

  // Profile state (for updates from modal)
  const [profilesState, setProfilesState] = useState(profiles);
  const profilesToFilter = profilesState;

  const handleProfileUpdate = useCallback((updated: TalentProfile) => {
    setProfilesState(prev => prev.map(p => p.id === updated.id ? updated : p));
  }, []);

  // Filter and sort profiles
  const filteredProfiles = useMemo(() => {
    const now = Date.now();
    let result = profilesToFilter.filter(p => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const searchableText = [
          p.name,
          p.email,
          p.current_title,
          p.current_company,
          p.location,
          ...(p.skills || []),
          ...(p.ai_tags || []),
          ...(p.looking_for || []),
        ].filter(Boolean).join(" ").toLowerCase();

        if (!searchableText.includes(q)) return false;
      }

      // Status filter
      if (statusFilter !== "all" && p.status !== statusFilter) return false;

      // Remote filter
      if (remoteFilter !== "all" && p.remote_preference !== remoteFilter) return false;

      // Work auth filter
      if (authFilter !== "all" && p.work_authorization !== authFilter) return false;

      // Notice period filter
      if (noticePeriodFilter !== "all" && p.notice_period !== noticePeriodFilter) return false;

      // Looking for filter
      if (lookingForFilter !== "all" && !p.looking_for?.includes(lookingForFilter)) return false;

      // Resume filter
      if (hasResumeFilter !== null) {
        const hasResume = !!p.resume_url || !!p.resume_text;
        if (hasResumeFilter !== hasResume) return false;
      }

      // LinkedIn filter
      if (hasLinkedInFilter !== null) {
        const hasLinkedIn = !!p.linkedin_url;
        if (hasLinkedInFilter !== hasLinkedIn) return false;
      }

      // Story filter (has why_looking or ideal_role or additional_context)
      if (hasStoryFilter !== null) {
        const hasStory = !!(p.why_looking || p.ideal_role || p.additional_context);
        if (hasStoryFilter !== hasStory) return false;
      }

      // Quality score filter
      if (qualityFilter !== "all") {
        const score = p.quality_score ?? 0;
        if (qualityFilter === "high" && score < 8) return false;
        if (qualityFilter === "medium" && (score < 5 || score >= 8)) return false;
        if (qualityFilter === "low" && score >= 5) return false;
        if (qualityFilter === "unrated" && p.quality_score !== null) return false;
      }

      // Activity filter
      if (activityFilter !== "all") {
        const hoursDiff = p.last_active_at ? (now - new Date(p.last_active_at).getTime()) / (1000 * 60 * 60) : Infinity;
        if (activityFilter === "today" && hoursDiff >= 24) return false;
        if (activityFilter === "week" && hoursDiff >= 168) return false;
        if (activityFilter === "month" && hoursDiff >= 720) return false;
        if (activityFilter === "inactive" && hoursDiff < 720) return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      let aVal: string | number | null = null;
      let bVal: string | number | null = null;

      switch (sortField) {
        case "name":
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case "created_at":
          aVal = a.created_at;
          bVal = b.created_at;
          break;
        case "last_active_at":
          aVal = a.last_active_at || a.created_at;
          bVal = b.last_active_at || b.created_at;
          break;
        case "quality_score":
          aVal = a.quality_score ?? -1;
          bVal = b.quality_score ?? -1;
          break;
      }

      if (aVal === null || bVal === null) return 0;
      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [profilesToFilter, searchQuery, statusFilter, remoteFilter, authFilter, noticePeriodFilter, lookingForFilter, hasResumeFilter, hasLinkedInFilter, hasStoryFilter, qualityFilter, activityFilter, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE);
  const paginatedProfiles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProfiles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProfiles, currentPage]);

  // Reset page when filters change
  const handleFilterChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const activeThisWeek = profilesToFilter.filter(p => {
      if (!p.last_active_at) return false;
      const diff = (now.getTime() - new Date(p.last_active_at).getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 7;
    }).length;

    const withResume = profilesToFilter.filter(p => p.resume_url || p.resume_text).length;
    const activeStatus = profilesToFilter.filter(p => p.status === "active").length;

    return { total: profilesToFilter.length, activeThisWeek, withResume, activeStatus };
  }, [profilesToFilter]);

  // Sort handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  // Match handler - AI extracts filters, applies them, then does deep matching
  const handleMatch = async () => {
    if (!roleDescription.trim()) return;

    setMatchResults(null);
    setExtractedFilters(null);
    setMatchStats(null);
    setMatching(true);

    try {
      const response = await fetch("/api/talent/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_title: roleTitle,
          role_description: roleDescription,
        }),
      });
      if (!response.ok) throw new Error("Match failed");
      const data = await response.json();

      // Set AI-extracted filters from response
      setExtractedFilters(data.extracted_filters);
      setMatchResults(data.matches);
      setMatchStats({
        total: data.total_candidates,
        afterFilters: data.after_filters,
        filteredCount: data.filtered_count,
        filterReasons: data.filter_reasons,
        sentToAi: data.sent_to_ai,
      });
    } catch (error) {
      console.error("Match error:", error);
    } finally {
      setMatching(false);
    }
  };

  // Clear match results
  const handleClearMatch = () => {
    setRoleTitle("");
    setRoleDescription("");
    setMatchResults(null);
    setExtractedFilters(null);
    setMatchStats(null);
  };

  // Helpers
  const getLastSeen = (lastActiveAt: string | null) => {
    if (!lastActiveAt) return "never";
    return formatDistanceToNow(new Date(lastActiveAt), { addSuffix: true });
  };

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "—";
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className={`ml-1 ${sortField === field ? "text-neutral-900" : "text-neutral-300"}`}>
      {sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
    </span>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-2xl font-serif text-neutral-900">talent pool</h1>
                <p className="text-sm text-neutral-500">
                  {filteredProfiles.length} of {profiles.length} profiles
                </p>
              </div>

              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-4 pl-6 border-l border-neutral-200">
                <div className="text-center">
                  <p className="text-lg font-medium text-neutral-900">{stats.activeStatus}</p>
                  <p className="text-xs text-neutral-500">active</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-green-600">{stats.activeThisWeek}</p>
                  <p className="text-xs text-neutral-500">this week</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-neutral-900">{stats.withResume}</p>
                  <p className="text-xs text-neutral-500">w/ resume</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    viewMode === "table" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  table
                </button>
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    viewMode === "cards" ? "bg-white shadow-sm text-neutral-900" : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  cards
                </button>
              </div>

              <Link
                href="/drops"
                className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm hover:bg-neutral-200"
              >
                back
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Match to Role Card */}
      <div className="max-w-[1600px] mx-auto px-6 pt-6">
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
          <div className="p-5 space-y-4">
            {/* Role Title */}
            <div>
              <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">role title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                placeholder="e.g., Senior Frontend Engineer"
                className="w-full max-w-md px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">job description</label>
              <textarea
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                placeholder="Paste the full job description or describe what you're looking for..."
                rows={4}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleMatch}
                disabled={matching || !roleDescription.trim()}
                className="px-5 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {matching ? "finding matches..." : "find matches"}
              </button>
              {(extractedFilters || matchResults) && (
                <button
                  onClick={handleClearMatch}
                  className="px-4 py-2 text-neutral-500 hover:text-neutral-700 text-sm transition-colors"
                >
                  clear
                </button>
              )}
            </div>
          </div>

          {/* Extracted Filters - Hard Filters Step */}
          {extractedFilters && (
            <div className="px-5 py-4 bg-neutral-50 border-t border-neutral-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">step 1: ai-extracted filters</span>
                {matchStats && (
                  <span className="text-xs text-neutral-400">
                    {matchStats.total} candidates → {matchStats.filteredCount > 0 && <span className="text-red-500">-{matchStats.filteredCount} filtered</span>} → {matchStats.afterFilters} passed → {matchStats.sentToAi} sent to AI
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {extractedFilters.role_types?.length > 0 && extractedFilters.role_types.map((role, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {role}
                  </span>
                ))}
                {extractedFilters.remote_preference && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {extractedFilters.remote_preference.replace(/_/g, " ")}
                  </span>
                )}
                {extractedFilters.requires_us_auth && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                    US work auth required
                  </span>
                )}
                {extractedFilters.location && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {extractedFilters.location}
                  </span>
                )}
                {extractedFilters.min_years_experience && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                    {extractedFilters.min_years_experience}+ years
                  </span>
                )}
                {(extractedFilters.salary_range?.min || extractedFilters.salary_range?.max) && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                    ${extractedFilters.salary_range.min ? `${(extractedFilters.salary_range.min / 1000).toFixed(0)}k` : "?"} - ${extractedFilters.salary_range.max ? `${(extractedFilters.salary_range.max / 1000).toFixed(0)}k` : "?"}
                  </span>
                )}
                {extractedFilters.required_skills?.length > 0 && extractedFilters.required_skills.map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-neutral-200 text-neutral-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {(!extractedFilters.role_types?.length && !extractedFilters.remote_preference && !extractedFilters.requires_us_auth && !extractedFilters.required_skills?.length) && (
                  <span className="text-xs text-neutral-400 italic">no hard filters extracted - all candidates passed to AI matching</span>
                )}
              </div>
              {/* Show filter reasons if any candidates were filtered */}
              {matchStats && matchStats.filteredCount > 0 && matchStats.filterReasons && Object.keys(matchStats.filterReasons).length > 0 && (
                <div className="mt-2 text-xs text-neutral-400">
                  filtered out: {Object.entries(matchStats.filterReasons).map(([reason, count]) => (
                    <span key={reason} className="mr-2">{count} {reason.replace(/_/g, " ")}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Match Results */}
          {matchResults && matchResults.length > 0 && (
            <div className="p-5 bg-rose-50 border-t border-rose-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-rose-600 uppercase tracking-wide">step 2: ai matching</span>
                <span className="text-sm font-medium text-rose-800">
                  {matchResults.length} matches for &quot;{roleTitle || "this role"}&quot;
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {matchResults.slice(0, 9).map((match) => (
                  <button
                    key={match.profile.id}
                    onClick={() => setSelectedProfile(match.profile)}
                    className="bg-white p-4 rounded-xl border border-rose-200 text-left hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        match.score >= 90 ? "bg-rose-500 text-white" :
                        match.score >= 80 ? "bg-rose-400 text-white" :
                        match.score >= 70 ? "bg-rose-300 text-rose-900" :
                        "bg-neutral-200 text-neutral-600"
                      }`}>
                        {match.score}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-900 truncate">{match.profile.name}</p>
                        <p className="text-sm text-neutral-500 truncate">
                          {match.profile.current_title || "no title"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mt-3 line-clamp-2">{match.fit_summary}</p>
                    {match.strengths?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {match.strengths.slice(0, 2).map((s, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-rose-100 text-rose-700 rounded">
                            {s.length > 25 ? s.slice(0, 25) + "..." : s}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {matchResults.length > 9 && (
                <p className="text-sm text-rose-600 mt-4 text-center">
                  + {matchResults.length - 9} more matches
                </p>
              )}
            </div>
          )}

          {matchResults && matchResults.length === 0 && (
            <div className="p-5 bg-neutral-50 border-t border-neutral-200 text-center">
              <p className="text-neutral-500">no strong matches found for this role</p>
              {matchStats && (
                <p className="text-xs text-neutral-400 mt-1">
                  {matchStats.afterFilters} candidates passed filters, but none scored 60+ with AI matching
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange();
              }}
              placeholder="search by name, email, skills, title, company, location..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); handleFilterChange(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 border rounded-xl text-sm flex items-center gap-2 transition-all ${
              showFilters || statusFilter !== "all" || remoteFilter !== "all" || authFilter !== "all" || hasResumeFilter !== null || noticePeriodFilter !== "all" || lookingForFilter !== "all" || hasLinkedInFilter !== null || hasStoryFilter !== null || qualityFilter !== "all" || activityFilter !== "all"
                ? "bg-rose-500 text-white border-rose-500"
                : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-5 bg-white border border-neutral-200 rounded-xl">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {/* Status */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); handleFilterChange(); }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">all</option>
                  <option value="active">active</option>
                  <option value="paused">paused</option>
                  <option value="placed">placed</option>
                  <option value="archived">archived</option>
                </select>
              </div>

              {/* Activity */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">last active</label>
                <select
                  value={activityFilter}
                  onChange={(e) => { setActivityFilter(e.target.value); handleFilterChange(); }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any time</option>
                  <option value="today">today</option>
                  <option value="week">this week</option>
                  <option value="month">this month</option>
                  <option value="inactive">inactive (30d+)</option>
                </select>
              </div>

              {/* Quality Score */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">quality score</label>
                <select
                  value={qualityFilter}
                  onChange={(e) => { setQualityFilter(e.target.value); handleFilterChange(); }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any</option>
                  <option value="high">high (8-10)</option>
                  <option value="medium">medium (5-7)</option>
                  <option value="low">low (1-4)</option>
                  <option value="unrated">unrated</option>
                </select>
              </div>

              {/* Remote Preference */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">remote pref</label>
                <select
                  value={remoteFilter}
                  onChange={(e) => { setRemoteFilter(e.target.value); handleFilterChange(); }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any</option>
                  {REMOTE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Work Authorization */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">work auth (us)</label>
                <select
                  value={authFilter}
                  onChange={(e) => { setAuthFilter(e.target.value); handleFilterChange(); }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any</option>
                  {WORK_AUTH_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">availability</label>
                <select
                  value={noticePeriodFilter}
                  onChange={(e) => { setNoticePeriodFilter(e.target.value); handleFilterChange(); }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any</option>
                  {NOTICE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Looking For */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">role type</label>
                <select
                  value={lookingForFilter}
                  onChange={(e) => { setLookingForFilter(e.target.value); handleFilterChange(); }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any role</option>
                  {ROLE_OPTIONS.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>

              {/* Has Resume */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">resume</label>
                <select
                  value={hasResumeFilter === null ? "all" : hasResumeFilter ? "yes" : "no"}
                  onChange={(e) => {
                    const v = e.target.value;
                    setHasResumeFilter(v === "all" ? null : v === "yes");
                    handleFilterChange();
                  }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any</option>
                  <option value="yes">has resume</option>
                  <option value="no">no resume</option>
                </select>
              </div>

              {/* Has LinkedIn */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">linkedin</label>
                <select
                  value={hasLinkedInFilter === null ? "all" : hasLinkedInFilter ? "yes" : "no"}
                  onChange={(e) => {
                    const v = e.target.value;
                    setHasLinkedInFilter(v === "all" ? null : v === "yes");
                    handleFilterChange();
                  }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any</option>
                  <option value="yes">has linkedin</option>
                  <option value="no">no linkedin</option>
                </select>
              </div>

              {/* Has Story (filled out context fields) */}
              <div>
                <label className="block text-xs text-neutral-500 uppercase tracking-wide mb-1.5">profile depth</label>
                <select
                  value={hasStoryFilter === null ? "all" : hasStoryFilter ? "yes" : "no"}
                  onChange={(e) => {
                    const v = e.target.value;
                    setHasStoryFilter(v === "all" ? null : v === "yes");
                    handleFilterChange();
                  }}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="all">any</option>
                  <option value="yes">has story filled</option>
                  <option value="no">basic info only</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between items-center">
              <button
                onClick={() => {
                  setStatusFilter("all");
                  setRemoteFilter("all");
                  setAuthFilter("all");
                  setNoticePeriodFilter("all");
                  setLookingForFilter("all");
                  setHasResumeFilter(null);
                  setHasLinkedInFilter(null);
                  setHasStoryFilter(null);
                  setQualityFilter("all");
                  setActivityFilter("all");
                  handleFilterChange();
                }}
                className="text-sm text-rose-500 hover:text-rose-600 font-medium"
              >
                clear all filters
              </button>
              <p className="text-sm text-neutral-500">
                showing <span className="font-medium text-neutral-900">{filteredProfiles.length}</span> of {profiles.length} profiles
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 pb-8">
        {viewMode === "table" ? (
          /* Table View */
          <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-200">
                    <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      <button onClick={() => handleSort("name")} className="flex items-center hover:text-neutral-900">
                        candidate <SortIcon field="name" />
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      role / company
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      skills
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      location
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      <button onClick={() => handleSort("last_active_at")} className="flex items-center hover:text-neutral-900">
                        activity <SortIcon field="last_active_at" />
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      <button onClick={() => handleSort("quality_score")} className="flex items-center hover:text-neutral-900">
                        score <SortIcon field="quality_score" />
                      </button>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                      links
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {paginatedProfiles.map((profile) => {
                    return (
                      <tr
                        key={profile.id}
                        onClick={() => setSelectedProfile(profile)}
                        className="hover:bg-neutral-50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-neutral-100 flex-shrink-0 overflow-hidden">
                              {profile.photo_url ? (
                                <img src={profile.photo_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm font-medium text-neutral-400">
                                  {profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-neutral-900 truncate">{profile.name}</p>
                              <p className="text-xs text-neutral-500 truncate">{profile.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-neutral-900 truncate max-w-[200px]">
                            {profile.current_title || <span className="text-neutral-400">—</span>}
                          </p>
                          {profile.current_company && (
                            <p className="text-xs text-neutral-500 truncate">{profile.current_company}</p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {profile.skills?.slice(0, 3).map((skill, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                            {(profile.skills?.length || 0) > 3 && (
                              <span className="text-xs text-neutral-400">+{profile.skills.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-neutral-600 truncate max-w-[150px]">
                            {profile.location || <span className="text-neutral-400">—</span>}
                          </p>
                          {profile.remote_preference && (
                            <p className="text-xs text-neutral-400">{profile.remote_preference.replace(/_/g, " ")}</p>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-neutral-600">
                            {getLastSeen(profile.last_active_at)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {profile.quality_score !== null ? (
                            <span className={`inline-flex px-2 py-0.5 text-xs rounded-full font-medium ${
                              profile.quality_score >= 8 ? "bg-green-100 text-green-700" :
                              profile.quality_score >= 6 ? "bg-yellow-100 text-yellow-700" :
                              "bg-neutral-100 text-neutral-600"
                            }`}>
                              {profile.quality_score}/10
                            </span>
                          ) : (
                            <span className="text-xs text-neutral-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {profile.linkedin_url && (
                              <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                              </a>
                            )}
                            {profile.github_url && (
                              <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-neutral-700 hover:text-neutral-900"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                            {profile.resume_url && (
                              <a
                                href={profile.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-rose-600 hover:text-rose-700"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between bg-neutral-50">
                <p className="text-sm text-neutral-500">
                  showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredProfiles.length)} of {filteredProfiles.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    prev
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let page: number;
                      if (totalPages <= 5) {
                        page = i + 1;
                      } else if (currentPage <= 3) {
                        page = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        page = totalPages - 4 + i;
                      } else {
                        page = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 text-sm rounded-lg ${
                            currentPage === page
                              ? "bg-neutral-900 text-white"
                              : "hover:bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    next
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Cards View */
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedProfiles.map((profile) => {
                return (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile)}
                    className="bg-white p-4 rounded-xl border border-neutral-200 text-left hover:border-neutral-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-neutral-100 flex-shrink-0 overflow-hidden">
                        {profile.photo_url ? (
                          <img src={profile.photo_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-sm font-medium text-neutral-400">
                            {profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium text-neutral-900 truncate">{profile.name}</p>
                          <span className="flex-shrink-0 text-xs text-neutral-500">
                            {getLastSeen(profile.last_active_at)}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-500 truncate">
                          {profile.current_title || "no title"}
                        </p>
                      </div>
                    </div>

                    {profile.ai_summary && (
                      <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                        {profile.ai_summary}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1 mb-3">
                      {profile.skills?.slice(0, 4).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                      {(profile.skills?.length || 0) > 4 && (
                        <span className="text-xs text-neutral-400">+{profile.skills.length - 4}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-3 border-t border-neutral-100">
                      <span>{profile.location || "—"}</span>
                      <span>{formatDate(profile.last_active_at || profile.created_at)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pagination for Cards */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  previous
                </button>
                <span className="text-sm text-neutral-500 px-4">
                  page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  next
                </button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-16 bg-white border border-neutral-200 rounded-xl">
            <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-900 mb-1">no profiles found</h3>
            <p className="text-neutral-500">try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}

// Separate modal component with admin editing
function ProfileModal({
  profile: initialProfile,
  onClose,
  onUpdate,
}: {
  profile: TalentProfile;
  onClose: () => void;
  onUpdate: (updated: TalentProfile) => void;
}) {
  const [profile, setProfile] = useState(initialProfile);
  const [editingAdmin, setEditingAdmin] = useState(false);
  const [saving, setSaving] = useState(false);
  const [adminForm, setAdminForm] = useState({
    status: profile.status,
    quality_score: profile.quality_score?.toString() || "",
    admin_notes: profile.admin_notes || "",
  });

  const handleSaveAdmin = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/talent/profile/${profile.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: adminForm.status,
          quality_score: adminForm.quality_score ? parseInt(adminForm.quality_score) : null,
          admin_notes: adminForm.admin_notes || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      const data = await response.json();
      setProfile(data.profile);
      onUpdate(data.profile);
      setEditingAdmin(false);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleMarkContacted = async () => {
    try {
      const response = await fetch(`/api/talent/profile/${profile.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          last_contacted_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to update");

      const data = await response.json();
      setProfile(data.profile);
      onUpdate(data.profile);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const getLastSeen = (lastActiveAt: string | null) => {
    if (!lastActiveAt) return "never";
    return formatDistanceToNow(new Date(lastActiveAt), { addSuffix: true });
  };

  // Format resume text into readable sections
  const formatResumeText = (text: string) => {
    if (!text) return null;
    const sectionHeaders = [
      "experience", "work experience", "professional experience", "employment",
      "education", "academic", "qualifications", "skills", "technical skills",
      "projects", "certifications", "summary", "objective", "profile", "about"
    ];
    const lines = text.split(/\n/).map(line => line.trim()).filter(Boolean);
    const sections: { title: string; content: string[] }[] = [];
    let currentSection: { title: string; content: string[] } = { title: "overview", content: [] };

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      const isHeader = sectionHeaders.some(header =>
        lowerLine === header || lowerLine.startsWith(header + ":") ||
        (lowerLine.length < 30 && lowerLine.includes(header))
      );
      if (isHeader && currentSection.content.length > 0) {
        sections.push(currentSection);
        currentSection = { title: line.replace(/[:\-–—]/g, "").trim().toLowerCase(), content: [] };
      } else if (line.length > 0) {
        currentSection.content.push(line);
      }
    }
    if (currentSection.content.length > 0) sections.push(currentSection);

    if (sections.length === 0) {
      return <div className="space-y-2">{lines.slice(0, 50).map((line, i) => <p key={i}>{line}</p>)}</div>;
    }

    return (
      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i}>
            <h4 className="font-medium text-neutral-900 capitalize mb-2 pb-1 border-b border-neutral-100">
              {section.title}
            </h4>
            <div className="space-y-1.5">
              {section.content.map((line, j) => (
                <p key={j} className={/^[•\-\*\d\.]\s/.test(line) ? "pl-4" : ""}>
                  {line.replace(/^[•\-\*\d\.]\s*/, "")}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-start justify-between sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-20 h-20 rounded-full bg-neutral-100 flex-shrink-0 overflow-hidden">
              {profile.photo_url ? (
                <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-medium text-neutral-400">
                  {profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-serif text-neutral-900">{profile.name}</h2>
                <span className="text-sm text-neutral-500">last seen {getLastSeen(profile.last_active_at)}</span>
              </div>
              <p className="text-neutral-600">
                {profile.current_title || <span className="text-neutral-400 italic">no title</span>}
                {profile.current_company && <span className="text-neutral-400"> at </span>}
                {profile.current_company}
              </p>
              <p className="text-sm text-neutral-400 mt-1">
                {profile.location || <span className="italic">location not set</span>} · {profile.years_experience || <span className="italic">experience not specified</span>}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg ml-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm hover:bg-neutral-800">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              email
            </a>
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                linkedin
              </a>
            )}
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg text-sm hover:bg-neutral-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                github
              </a>
            )}
            {profile.twitter_url && (
              <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm hover:bg-neutral-800">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                twitter/x
              </a>
            )}
            {profile.portfolio_url && (
              <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm hover:bg-neutral-200">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                portfolio
              </a>
            )}
            {profile.resume_url && (
              <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-sm hover:bg-rose-100">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                download resume
              </a>
            )}
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-xl">
            <div>
              <p className="text-xs text-neutral-400 mb-1">email</p>
              <p className="text-sm text-neutral-900 flex items-center gap-2">
                {profile.email}
                <button onClick={() => navigator.clipboard.writeText(profile.email)} className="text-blue-600 hover:text-blue-700">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </button>
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">phone</p>
              <p className="text-sm text-neutral-900">{profile.phone || <span className="text-neutral-400 italic">nil</span>}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">source</p>
              <p className="text-sm text-neutral-900">{profile.source || <span className="text-neutral-400 italic">organic</span>}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 mb-1">joined</p>
              <p className="text-sm text-neutral-900">{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* AI Summary */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">ai summary</h3>
            {profile.ai_summary ? (
              <p className="text-neutral-700 leading-relaxed bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                {profile.ai_summary}
              </p>
            ) : (
              <p className="text-neutral-400 italic p-4 bg-neutral-50 rounded-xl">nil - no ai summary generated</p>
            )}
          </div>

          {/* Their Story */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-medium text-rose-800 uppercase tracking-wide">their story</h3>
            <div>
              <p className="text-xs text-rose-600 mb-1">why they&apos;re looking</p>
              <p className="text-neutral-800">{profile.why_looking || <span className="text-neutral-400 italic">nil</span>}</p>
            </div>
            <div>
              <p className="text-xs text-rose-600 mb-1">their ideal role</p>
              <p className="text-neutral-800">{profile.ideal_role || <span className="text-neutral-400 italic">nil</span>}</p>
            </div>
            <div>
              <p className="text-xs text-rose-600 mb-1">what they want you to know</p>
              <p className="text-neutral-800 whitespace-pre-wrap">{profile.additional_context || <span className="text-neutral-400 italic">nil</span>}</p>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">skills</h3>
            {profile.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm">{skill}</span>
                ))}
              </div>
            ) : (
              <p className="text-neutral-400 italic">nil</p>
            )}
          </div>

          {/* AI Tags */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">ai tags</h3>
            {profile.ai_tags?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profile.ai_tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm">{tag}</span>
                ))}
              </div>
            ) : (
              <p className="text-neutral-400 italic">nil</p>
            )}
          </div>

          {/* Preferences & Logistics */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">preferences & logistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 bg-neutral-50 rounded-lg">
                <p className="text-xs text-neutral-400 mb-1">looking for</p>
                <p className="text-sm text-neutral-700">{profile.looking_for?.length > 0 ? profile.looking_for.join(", ") : <span className="text-neutral-400 italic">nil</span>}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <p className="text-xs text-neutral-400 mb-1">remote preference</p>
                <p className="text-sm text-neutral-700">{profile.remote_preference ? profile.remote_preference.replace(/_/g, " ") : <span className="text-neutral-400 italic">nil</span>}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <p className="text-xs text-neutral-400 mb-1">salary expectation</p>
                <p className="text-sm text-neutral-700">{profile.salary_range || <span className="text-neutral-400 italic">nil</span>}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <p className="text-xs text-neutral-400 mb-1">preferred locations</p>
                <p className="text-sm text-neutral-700">{profile.preferred_locations || <span className="text-neutral-400 italic">nil</span>}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <p className="text-xs text-neutral-400 mb-1">work authorization</p>
                <p className="text-sm text-neutral-700">{profile.work_authorization ? profile.work_authorization.replace(/_/g, " ") : <span className="text-neutral-400 italic">nil</span>}</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-lg">
                <p className="text-xs text-neutral-400 mb-1">notice period</p>
                <p className="text-sm text-neutral-700">{profile.notice_period ? profile.notice_period.replace(/_/g, " ") : <span className="text-neutral-400 italic">nil</span>}</p>
              </div>
            </div>
          </div>

          {/* Admin Section - Editable */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide">admin controls</h3>
              {!editingAdmin ? (
                <button
                  onClick={() => setEditingAdmin(true)}
                  className="text-xs text-rose-500 hover:text-rose-600 font-medium"
                >
                  edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingAdmin(false);
                      setAdminForm({
                        status: profile.status,
                        quality_score: profile.quality_score?.toString() || "",
                        admin_notes: profile.admin_notes || "",
                      });
                    }}
                    className="text-xs text-neutral-500 hover:text-neutral-700"
                  >
                    cancel
                  </button>
                  <button
                    onClick={handleSaveAdmin}
                    disabled={saving}
                    className="text-xs text-rose-500 hover:text-rose-600 font-medium disabled:opacity-50"
                  >
                    {saving ? "saving..." : "save"}
                  </button>
                </div>
              )}
            </div>

            {editingAdmin ? (
              <div className="space-y-4 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">status</label>
                    <select
                      value={adminForm.status}
                      onChange={(e) => setAdminForm(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="active">active</option>
                      <option value="paused">paused</option>
                      <option value="placed">placed</option>
                      <option value="archived">archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">quality score (1-10)</label>
                    <select
                      value={adminForm.quality_score}
                      onChange={(e) => setAdminForm(prev => ({ ...prev, quality_score: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="">not rated</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 mb-1">admin notes</label>
                  <textarea
                    value={adminForm.admin_notes}
                    onChange={(e) => setAdminForm(prev => ({ ...prev, admin_notes: e.target.value }))}
                    rows={3}
                    placeholder="add private notes about this candidate..."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-400 mb-1">status</p>
                    <span className={`inline-flex px-2 py-0.5 text-xs rounded-full font-medium ${
                      profile.status === "active" ? "bg-green-100 text-green-700" :
                      profile.status === "placed" ? "bg-blue-100 text-blue-700" :
                      profile.status === "paused" ? "bg-yellow-100 text-yellow-700" :
                      "bg-neutral-100 text-neutral-600"
                    }`}>
                      {profile.status}
                    </span>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-400 mb-1">quality score</p>
                    {profile.quality_score !== null ? (
                      <span className={`inline-flex px-2 py-0.5 text-xs rounded-full font-medium ${
                        profile.quality_score >= 8 ? "bg-green-100 text-green-700" :
                        profile.quality_score >= 5 ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {profile.quality_score}/10
                      </span>
                    ) : (
                      <span className="text-sm text-neutral-400 italic">not rated</span>
                    )}
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-400 mb-1">last active</p>
                    <p className="text-sm text-neutral-700">{profile.last_active_at ? new Date(profile.last_active_at).toLocaleDateString() : <span className="text-neutral-400 italic">never</span>}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-400 mb-1">last contacted</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-neutral-700">{profile.last_contacted_at ? new Date(profile.last_contacted_at).toLocaleDateString() : <span className="text-neutral-400 italic">never</span>}</p>
                      <button
                        onClick={handleMarkContacted}
                        className="text-xs text-rose-500 hover:text-rose-600"
                        title="Mark as contacted now"
                      >
                        mark now
                      </button>
                    </div>
                  </div>
                </div>
                {profile.admin_notes && (
                  <div className="mt-3 p-3 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-400 mb-1">admin notes</p>
                    <p className="text-sm text-neutral-700 whitespace-pre-wrap">{profile.admin_notes}</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Resume Content */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">resume content</h3>
            {profile.resume_text ? (
              <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                <div className="p-4 space-y-4 text-sm text-neutral-700 max-h-[500px] overflow-y-auto">
                  {formatResumeText(profile.resume_text)}
                </div>
              </div>
            ) : (
              <p className="text-neutral-400 italic p-4 bg-neutral-50 rounded-xl">nil - no resume uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
