"use client";

import { useState } from "react";
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
  current_title: string | null;
  current_company: string | null;
  years_experience: string | null;
  skills: string[];
  resume_url: string | null;
  resume_text: string | null;
  ai_summary: string | null;
  ai_tags: string[];
  looking_for: string[];
  preferred_company_size: string[];
  remote_preference: string;
  salary_range: string | null;
  status: string;
  quality_score: number | null;
  admin_notes: string | null;
  user_id: string | null;
  last_active_at: string | null;
}

interface Props {
  profiles: TalentProfile[];
  adminEmail: string;
}

export function TalentDashboard({ profiles, adminEmail }: Props) {
  const [selectedProfile, setSelectedProfile] = useState<TalentProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [matchMode, setMatchMode] = useState(false);
  const [roleDescription, setRoleDescription] = useState("");
  const [matchResults, setMatchResults] = useState<Array<{
    profile: TalentProfile;
    score: number;
    reasons: string[];
  }> | null>(null);
  const [matching, setMatching] = useState(false);

  // Filter profiles by search
  const filteredProfiles = profiles.filter(p => {
    if (searchQuery === "") return true;
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.current_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ai_tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const handleMatch = async () => {
    if (!roleDescription.trim()) return;

    setMatching(true);
    try {
      const response = await fetch("/api/talent/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role_description: roleDescription,
          required_skills: [],
        }),
      });

      if (!response.ok) throw new Error("Match failed");

      const data = await response.json();
      setMatchResults(data.matches);
    } catch (error) {
      console.error("Match error:", error);
    } finally {
      setMatching(false);
    }
  };

  const getLastActiveText = (lastActiveAt: string | null, createdAt: string) => {
    const date = lastActiveAt || createdAt;
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "unknown";
    }
  };

  const getActivityBadge = (lastActiveAt: string | null) => {
    if (!lastActiveAt) return { text: "new", color: "bg-blue-100 text-blue-700" };

    const now = new Date();
    const lastActive = new Date(lastActiveAt);
    const hoursDiff = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

    if (hoursDiff < 24) return { text: "active today", color: "bg-green-100 text-green-700" };
    if (hoursDiff < 72) return { text: "active recently", color: "bg-emerald-100 text-emerald-700" };
    if (hoursDiff < 168) return { text: "this week", color: "bg-yellow-100 text-yellow-700" };
    if (hoursDiff < 720) return { text: "this month", color: "bg-orange-100 text-orange-700" };
    return { text: "inactive", color: "bg-neutral-100 text-neutral-500" };
  };

  // Format resume text into readable sections
  const formatResumeText = (text: string) => {
    if (!text) return null;

    // Common section headers to detect
    const sectionHeaders = [
      "experience", "work experience", "professional experience", "employment",
      "education", "academic", "qualifications",
      "skills", "technical skills", "technologies", "tools",
      "projects", "personal projects", "side projects",
      "certifications", "certificates", "awards",
      "summary", "objective", "profile", "about"
    ];

    // Split by common delimiters and clean up
    const lines = text.split(/\n/).map(line => line.trim()).filter(Boolean);

    const sections: { title: string; content: string[] }[] = [];
    let currentSection: { title: string; content: string[] } = { title: "overview", content: [] };

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      const isHeader = sectionHeaders.some(header =>
        lowerLine === header ||
        lowerLine.startsWith(header + ":") ||
        lowerLine.startsWith(header + " ") ||
        (lowerLine.length < 30 && lowerLine.includes(header))
      );

      if (isHeader && currentSection.content.length > 0) {
        sections.push(currentSection);
        currentSection = { title: line.replace(/[:\-–—]/g, "").trim().toLowerCase(), content: [] };
      } else if (line.length > 0) {
        currentSection.content.push(line);
      }
    }

    if (currentSection.content.length > 0) {
      sections.push(currentSection);
    }

    // If no sections detected, just show as paragraphs
    if (sections.length === 0) {
      return (
        <div className="space-y-2">
          {lines.slice(0, 50).map((line, i) => (
            <p key={i} className={line.length < 50 && !line.includes(" ") ? "font-medium text-neutral-900" : ""}>
              {line}
            </p>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {sections.map((section, i) => (
          <div key={i}>
            <h4 className="font-medium text-neutral-900 capitalize mb-2 pb-1 border-b border-neutral-100">
              {section.title}
            </h4>
            <div className="space-y-1.5">
              {section.content.map((line, j) => {
                // Detect bullet points or list items
                const isBullet = /^[•\-\*\d\.]\s/.test(line);
                // Detect dates or job titles (usually shorter lines with specific patterns)
                const isMetaLine = /\d{4}/.test(line) && line.length < 80;

                return (
                  <p
                    key={j}
                    className={`
                      ${isBullet ? "pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-neutral-400" : ""}
                      ${isMetaLine ? "text-neutral-500 text-xs" : ""}
                    `.trim()}
                  >
                    {isBullet ? line.replace(/^[•\-\*\d\.]\s*/, "") : line}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif text-neutral-900">talent pool</h1>
              <p className="text-sm text-neutral-500 mt-1">
                {profiles.length} candidates
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMatchMode(!matchMode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  matchMode
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {matchMode ? "exit match mode" : "match to role"}
              </button>
              <Link
                href="/drops"
                className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm hover:bg-neutral-200"
              >
                back to drops
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Match Mode Panel */}
      {matchMode && (
        <div className="bg-neutral-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h2 className="text-lg font-medium mb-3">find candidates for a role</h2>
            <textarea
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="paste job description or describe the role... e.g., 'senior react engineer for fintech startup, 5+ years experience, typescript required'"
              className="w-full h-32 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={handleMatch}
                disabled={matching || !roleDescription.trim()}
                className="px-6 py-2 bg-white text-neutral-900 rounded-lg font-medium hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {matching ? "matching..." : "find matches"}
              </button>
              {matchResults && (
                <span className="text-neutral-400">
                  found {matchResults.length} matches
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Match Results */}
      {matchResults && matchMode && (
        <div className="bg-white border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">top matches</h3>
            <div className="space-y-4">
              {matchResults.map((match, i) => (
                <div
                  key={match.profile.id}
                  className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-medium">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-neutral-900">{match.profile.name}</span>
                      <span className="text-sm text-neutral-500">{match.profile.current_title}</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        {match.score}% match
                      </span>
                    </div>
                    <ul className="mt-2 text-sm text-neutral-600 space-y-1">
                      {match.reasons.map((reason, j) => (
                        <li key={j}>• {reason}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex gap-2">
                      {match.profile.linkedin_url && (
                        <a
                          href={match.profile.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          linkedin
                        </a>
                      )}
                      {match.profile.resume_url && (
                        <a
                          href={match.profile.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline"
                        >
                          resume
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedProfile(match.profile)}
                        className="text-xs text-neutral-600 hover:underline"
                      >
                        view full profile
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="search by name, email, skills, title..."
            className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        {/* Profiles Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProfiles.length === 0 ? (
            <div className="col-span-full py-12 text-center text-neutral-500">
              no profiles found
            </div>
          ) : (
            filteredProfiles.map((profile) => {
              const activityBadge = getActivityBadge(profile.last_active_at);
              return (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile)}
                  className="bg-white p-5 rounded-xl border border-neutral-200 text-left hover:border-neutral-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-medium text-neutral-900">{profile.name}</h3>
                      <p className="text-sm text-neutral-500">{profile.current_title || "no title"}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${activityBadge.color}`}>
                      {activityBadge.text}
                    </span>
                  </div>

                  {profile.ai_summary && (
                    <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                      {profile.ai_summary}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {profile.skills?.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {profile.skills?.length > 4 && (
                      <span className="text-xs text-neutral-400">+{profile.skills.length - 4}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{profile.location || "location not set"}</span>
                    <span>active {getLastActiveText(profile.last_active_at, profile.created_at)}</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Profile Detail Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
            {/* Header */}
            <div className="p-6 border-b border-neutral-100 flex items-start justify-between sticky top-0 bg-white rounded-t-2xl z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-serif text-neutral-900">{selectedProfile.name}</h2>
                  {(() => {
                    const badge = getActivityBadge(selectedProfile.last_active_at);
                    return (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${badge.color}`}>
                        {badge.text}
                      </span>
                    );
                  })()}
                </div>
                <p className="text-neutral-600">
                  {selectedProfile.current_title || "no title"}
                  {selectedProfile.current_company && <span className="text-neutral-400"> at </span>}
                  {selectedProfile.current_company}
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  {selectedProfile.location || "location not set"} · {selectedProfile.years_experience || "experience not specified"}
                </p>
              </div>
              <button
                onClick={() => setSelectedProfile(null)}
                className="p-2 hover:bg-neutral-100 rounded-lg ml-4"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                {selectedProfile.email && (
                  <a
                    href={`mailto:${selectedProfile.email}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm hover:bg-neutral-800"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    email
                  </a>
                )}
                {selectedProfile.linkedin_url && (
                  <a
                    href={selectedProfile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    linkedin
                  </a>
                )}
                {selectedProfile.github_url && (
                  <a
                    href={selectedProfile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg text-sm hover:bg-neutral-700"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    github
                  </a>
                )}
                {selectedProfile.portfolio_url && (
                  <a
                    href={selectedProfile.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm hover:bg-neutral-200"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    portfolio
                  </a>
                )}
                {selectedProfile.resume_url && (
                  <a
                    href={selectedProfile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-sm hover:bg-rose-100"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    download resume
                  </a>
                )}
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-xl">
                <div>
                  <p className="text-xs text-neutral-400 mb-1">email</p>
                  <p className="text-sm text-neutral-900 flex items-center gap-2">
                    {selectedProfile.email}
                    <button
                      onClick={() => navigator.clipboard.writeText(selectedProfile.email)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </p>
                </div>
                {selectedProfile.phone && (
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">phone</p>
                    <p className="text-sm text-neutral-900">{selectedProfile.phone}</p>
                  </div>
                )}
              </div>

              {/* AI Summary */}
              {selectedProfile.ai_summary && (
                <div>
                  <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">ai summary</h3>
                  <p className="text-neutral-700 leading-relaxed bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-100">
                    {selectedProfile.ai_summary}
                  </p>
                </div>
              )}

              {/* Skills */}
              {selectedProfile.skills?.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Tags */}
              {selectedProfile.ai_tags?.length > 0 && (
                <div>
                  <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">ai tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfile.ai_tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences */}
              <div>
                <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">preferences</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-400 mb-1">looking for</p>
                    <p className="text-sm text-neutral-700">{selectedProfile.looking_for?.join(", ") || "not specified"}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 rounded-lg">
                    <p className="text-xs text-neutral-400 mb-1">remote preference</p>
                    <p className="text-sm text-neutral-700">{selectedProfile.remote_preference || "flexible"}</p>
                  </div>
                  {selectedProfile.salary_range && (
                    <div className="p-3 bg-neutral-50 rounded-lg">
                      <p className="text-xs text-neutral-400 mb-1">salary expectation</p>
                      <p className="text-sm text-neutral-700">{selectedProfile.salary_range}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Resume Content */}
              {selectedProfile.resume_text && (
                <div>
                  <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">resume content</h3>
                  <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                    <div className="p-4 space-y-4 text-sm text-neutral-700 max-h-[500px] overflow-y-auto">
                      {formatResumeText(selectedProfile.resume_text)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
