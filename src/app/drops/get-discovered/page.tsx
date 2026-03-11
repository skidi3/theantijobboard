"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { cdn } from "@/lib/cdn";

const ROLE_OPTIONS = [
  // Engineering
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
  // Product
  "Product Manager",
  "Senior Product Manager",
  "Head of Product",
  // Design
  "Product Designer",
  "UX Designer",
  "UI Designer",
  "Design Lead",
  "Brand Designer",
  // Operations & Growth
  "Operations Manager",
  "Chief of Staff",
  "Business Operations",
  "Growth Manager",
  "Marketing Manager",
  "Content Marketing",
  "Performance Marketing",
  // Sales & Success
  "Sales",
  "Account Executive",
  "Customer Success",
  "Business Development",
  // Finance & Legal
  "Finance / Accounting",
  "Legal / Compliance",
  // People
  "HR / People Ops",
  "Recruiter",
];

const WORK_AUTH_OPTIONS = [
  { value: "authorized", label: "Yes, I'm authorized to work" },
  { value: "need_visa", label: "No, I need visa sponsorship" },
  { value: "have_visa", label: "I have a valid work visa" },
];

const NOTICE_OPTIONS = [
  { value: "immediate", label: "Immediately available" },
  { value: "2_weeks", label: "2 weeks notice" },
  { value: "1_month", label: "1 month notice" },
  { value: "2_months", label: "2+ months notice" },
  { value: "exploring", label: "Just exploring, not actively looking" },
];

const REMOTE_OPTIONS = [
  { value: "remote_only", label: "Remote only" },
  { value: "hybrid", label: "Hybrid (1-3 days in office)" },
  { value: "onsite", label: "On-site is fine" },
  { value: "flexible", label: "Flexible / No preference" },
];

export default function GetDiscoveredPage() {
  const [formData, setFormData] = useState({
    // Contact
    name: "",
    email: "",
    phone: "",

    // Links
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",

    // Location & Work Auth
    current_location: "",
    preferred_locations: "",
    work_authorization: "",

    // Availability
    notice_period: "",

    // Role Preferences
    looking_for: [] as string[],
    other_role: "", // Custom role when "Other" is selected
    remote_preference: "",
    salary_min: "",
    salary_max: "",

    // Context
    why_looking: "",
    ideal_role: "",
    additional_context: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);
  const [existingResumeUrl, setExistingResumeUrl] = useState<string | null>(null);
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [roleSearch, setRoleSearch] = useState("");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Fetch existing profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/talent/profile");
        if (response.ok) {
          const data = await response.json();
          if (data.profile) {
            setIsUpdate(true);
            setExistingResumeUrl(data.profile.resume_url);
            setExistingPhotoUrl(data.profile.photo_url);

            // Parse salary range back to min/max
            let salary_min = "";
            let salary_max = "";
            if (data.profile.salary_range) {
              const parts = data.profile.salary_range.split(" - ");
              salary_min = parts[0] || "";
              salary_max = parts[1] || "";
            }

            setFormData({
              name: data.profile.name || "",
              email: data.profile.email || data.user?.email || "",
              phone: data.profile.phone || "",
              linkedin_url: data.profile.linkedin_url || "",
              github_url: data.profile.github_url || "",
              portfolio_url: data.profile.portfolio_url || "",
              current_location: data.profile.location || "",
              preferred_locations: data.profile.preferred_locations || "",
              work_authorization: data.profile.work_authorization || "",
              notice_period: data.profile.notice_period || "",
              looking_for: data.profile.looking_for || [],
              other_role: "",
              remote_preference: data.profile.remote_preference || "",
              salary_min,
              salary_max,
              why_looking: data.profile.why_looking || "",
              ideal_role: data.profile.ideal_role || "",
              additional_context: data.profile.additional_context || "",
            });
          } else if (data.user) {
            // No profile yet, but pre-fill email from auth
            setFormData((prev) => ({ ...prev, email: data.user.email || "" }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Close role dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter roles based on search
  const filteredRoles = useMemo(() => {
    if (!roleSearch.trim()) return ROLE_OPTIONS;
    const search = roleSearch.toLowerCase();
    return ROLE_OPTIONS.filter(role => role.toLowerCase().includes(search));
  }, [roleSearch]);

  // Check if search doesn't match any role (for "add custom" option)
  const showAddCustom = roleSearch.trim() && filteredRoles.length === 0;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => {
      const current = prev.looking_for;
      if (current.includes(role)) {
        return { ...prev, looking_for: current.filter((r) => r !== role) };
      }
      return { ...prev, looking_for: [...current, role] };
    });
    setRoleSearch("");
  };

  const handleAddCustomRole = () => {
    if (!roleSearch.trim()) return;
    const customRole = roleSearch.trim();
    if (!formData.looking_for.includes(customRole)) {
      setFormData((prev) => ({
        ...prev,
        looking_for: [...prev.looking_for, customRole],
      }));
    }
    setRoleSearch("");
    setRoleDropdownOpen(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setFileError("resume must be a PDF file");
        e.target.value = "";
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setFileError("resume must be less than 10MB");
        e.target.value = "";
        return;
      }
      setFile(selectedFile);
      setFileError("");

      // Parse resume and prefill fields
      setIsParsing(true);
      try {
        const parseFormData = new FormData();
        parseFormData.append("resume", selectedFile);

        const response = await fetch("/api/talent/parse", {
          method: "POST",
          body: parseFormData,
        });

        const data = await response.json();

        if (response.ok && !data.error) {
          // Prefill extracted data
          setFormData((prev) => ({
            ...prev,
            name: data.name || prev.name,
            email: data.email || prev.email,
            phone: data.phone || prev.phone,
            current_location: data.location || prev.current_location,
            linkedin_url: data.linkedin || prev.linkedin_url,
            github_url: data.github || prev.github_url,
            portfolio_url: data.portfolio || prev.portfolio_url,
          }));
        }
      } catch (err) {
        // Silently fail - user can still fill manually
        console.error("Resume parse error:", err);
      } finally {
        setIsParsing(false);
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setPhotoError("must be an image file (jpg, png, webp)");
        e.target.value = "";
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setPhotoError("must be less than 5MB");
        e.target.value = "";
        return;
      }
      setProfilePhoto(selectedFile);
      setPhotoError("");
      // Create preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setProfilePhotoPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return;
    }
    if (!formData.linkedin_url) {
      setError("LinkedIn profile is required");
      return;
    }
    // Only require resume for new profiles
    if (!file && !existingResumeUrl) {
      setError("Please upload your resume");
      return;
    }
    if (formData.looking_for.length === 0) {
      setError("please select at least one role type");
      return;
    }

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "looking_for") {
          formPayload.append(key, JSON.stringify(formData.looking_for));
        } else if (key === "other_role") {
          // Skip - no longer used
        } else if (Array.isArray(value)) {
          formPayload.append(key, JSON.stringify(value));
        } else {
          formPayload.append(key, value);
        }
      });

      // Add file only if new one was selected
      if (file) {
        formPayload.append("resume", file);
      }

      // Add photo if new one was selected
      if (profilePhoto) {
        formPayload.append("photo", profilePhoto);
      }

      const response = await fetch("/api/talent/upload", {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main
        className="min-h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
        style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
      >
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </main>
    );
  }

  if (submitted) {
    return (
      <main
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
          <Link
            href="/drops"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm">Back to drops</span>
          </Link>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-8 md:p-12 text-center">
            <img src={cdn("/logo.webp")} alt="" className="w-16 h-16 mx-auto mb-6" />
            <h1 className="font-serif text-3xl text-neutral-900 mb-4">you're in</h1>
            <p className="text-neutral-600 leading-relaxed max-w-md mx-auto">
              we'll review your profile and reach out when there's a match. no spam, no ghost jobs, just real opportunities from our network.
            </p>
            <Link
              href="/drops"
              className="inline-block mt-8 px-6 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors"
            >
              back to dashboard
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${cdn("/hero-bg.webp")})` }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <Link
          href="/drops"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm">Back to drops</span>
        </Link>

        <div className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-8 md:p-10 mb-8">
          <div className="flex items-center justify-between gap-2.5 mb-6">
            <div className="flex items-center gap-2.5">
              <img src={cdn("/logo.webp")} alt="" className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="font-serif text-base sm:text-lg text-neutral-900">The Anti Job Board</span>
            </div>
            {isUpdate && (
              <span className="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded-full">Editing Profile</span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-neutral-900 mb-2">
            {isUpdate ? "Update your profile" : "Get discovered by startups"}
          </h1>
          <p className="text-sm sm:text-base text-neutral-500">
            {isUpdate
              ? "Keep your profile up to date for the best matches."
              : "Companies from our network hire directly from this pool. Skip the 500-applicant pile."}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur rounded-2xl p-5 sm:p-8 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Resume Upload - First and prominent */}
          <div className="bg-neutral-50 rounded-2xl p-6 border-2 border-dashed border-neutral-200">
            <h2 className="font-serif text-xl text-neutral-900 mb-2">Your Resume *</h2>
            <p className="text-sm text-neutral-500 mb-4">Upload and we'll auto-fill your details.</p>
            <div
              onClick={() => !isParsing && fileInputRef.current?.click()}
              className={`rounded-xl p-6 text-center transition-all ${
                isParsing
                  ? "bg-neutral-800 text-white cursor-wait"
                  : file
                  ? "bg-neutral-900 text-white cursor-pointer"
                  : "bg-white border border-neutral-200 hover:border-neutral-400 cursor-pointer"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {isParsing ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span className="font-medium">Reading your resume...</span>
                </div>
              ) : file ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="ml-2 text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              ) : existingResumeUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-neutral-700">resume uploaded</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <a
                      href={existingResumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 hover:underline"
                    >
                      view resume
                    </a>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-500">click to replace</span>
                  </div>
                </div>
              ) : (
                <>
                  <svg className="w-8 h-8 mx-auto text-neutral-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-neutral-600">
                    <span className="font-medium text-neutral-900">Click to upload</span> PDF
                  </p>
                </>
              )}
            </div>
            {fileError && (
              <p className="mt-2 text-sm text-red-600">{fileError}</p>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-xl text-neutral-900 mb-4">Contact Info</h2>

            {/* Profile Photo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">profile photo <span className="text-neutral-400 font-normal">(optional)</span></label>
              <div className="flex items-center gap-4">
                <div
                  onClick={() => photoInputRef.current?.click()}
                  className="w-24 h-24 rounded-xl border-2 border-dashed border-neutral-200 hover:border-neutral-400 cursor-pointer overflow-hidden flex items-center justify-center bg-neutral-50 transition-colors"
                >
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                  {profilePhotoPreview ? (
                    <img src={profilePhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : existingPhotoUrl ? (
                    <img src={existingPhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <div className="text-sm text-neutral-500">
                  <p>square image works best</p>
                  <p className="text-xs text-neutral-400">max 5MB · jpg, png, webp</p>
                  {photoError && (
                    <p className="text-red-600 mt-1">{photoError}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">full name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">LinkedIn *</label>
                <input
                  type="url"
                  name="linkedin_url"
                  required
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="linkedin.com/in/janesmith"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">GitHub</label>
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="github.com/janesmith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Portfolio / Website</label>
                <input
                  type="url"
                  name="portfolio_url"
                  value={formData.portfolio_url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="janesmith.com"
                />
              </div>
            </div>
          </div>

          {/* Location & Work Authorization */}
          <div>
            <h2 className="font-serif text-xl text-neutral-900 mb-4">Location & Work Authorization</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Where are you based?</label>
                <input
                  type="text"
                  name="current_location"
                  value={formData.current_location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Open to relocate to?</label>
                <input
                  type="text"
                  name="preferred_locations"
                  value={formData.preferred_locations}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="NYC, Austin, or Remote"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Work authorization (US)</label>
              <div className="flex flex-wrap gap-2">
                {WORK_AUTH_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, work_authorization: opt.value }))}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.work_authorization === opt.value
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* What You're Looking For */}
          <div>
            <h2 className="font-serif text-xl text-neutral-900 mb-4">What You're Looking For</h2>

            <div className="mb-5">
              <label className="block text-sm font-medium text-neutral-700 mb-2">role type *</label>

              {/* Selected roles */}
              {formData.looking_for.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.looking_for.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white rounded-full text-sm"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => handleRoleToggle(role)}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Search input with dropdown */}
              <div className="relative" ref={roleDropdownRef}>
                <input
                  type="text"
                  value={roleSearch}
                  onChange={(e) => setRoleSearch(e.target.value)}
                  onFocus={() => setRoleDropdownOpen(true)}
                  placeholder="search roles or type to add custom..."
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                />

                {/* Dropdown */}
                {roleDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                    {filteredRoles.length > 0 ? (
                      filteredRoles.map((role) => {
                        const isSelected = formData.looking_for.includes(role);
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => handleRoleToggle(role)}
                            className={`w-full px-4 py-2.5 text-left text-sm hover:bg-neutral-50 flex items-center justify-between ${
                              isSelected ? "bg-neutral-50" : ""
                            }`}
                          >
                            <span>{role}</span>
                            {isSelected && (
                              <svg className="w-4 h-4 text-neutral-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        );
                      })
                    ) : showAddCustom ? (
                      <button
                        type="button"
                        onClick={handleAddCustomRole}
                        className="w-full px-4 py-3 text-left text-sm hover:bg-neutral-50 flex items-center gap-2 text-neutral-700"
                      >
                        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        add "{roleSearch}" as custom role
                      </button>
                    ) : (
                      <div className="px-4 py-3 text-sm text-neutral-500">no roles found</div>
                    )}
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs text-neutral-500">select multiple roles or type to add a custom one</p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Work preference</label>
              <div className="flex flex-wrap gap-2">
                {REMOTE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, remote_preference: opt.value }))}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.remote_preference === opt.value
                        ? "bg-neutral-900 text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Minimum salary (USD)</label>
                <input
                  type="text"
                  name="salary_min"
                  value={formData.salary_min}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="$150,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Target salary (USD)</label>
                <input
                  type="text"
                  name="salary_max"
                  value={formData.salary_max}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                  placeholder="$180,000"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h2 className="font-serif text-xl text-neutral-900 mb-4">Availability</h2>
            <div className="flex flex-wrap gap-2">
              {NOTICE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, notice_period: opt.value }))}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    formData.notice_period === opt.value
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Context */}
          <div>
            <h2 className="font-serif text-xl text-neutral-900 mb-4">a bit more context</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  what's your ideal next role? <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="ideal_role"
                  value={formData.ideal_role}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
                  placeholder="e.g., early-stage startup, product-focused team, ownership over a feature area..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  why are you looking? <span className="text-neutral-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="why_looking"
                  value={formData.why_looking}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
                  placeholder="e.g., looking for more ownership, want to join a smaller team, relocating..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  tell us everything <span className="text-neutral-400 font-normal">(optional but highly encouraged)</span>
                </label>
                <p className="text-xs text-neutral-500 mb-2">
                  dump everything here. side projects, achievements, hackathon wins, open source contributions, that one thing you built that no one knows about. we read every word (yes, ai helps but humans review too). this is your chance to stand out from the crowd.
                </p>
                <textarea
                  name="additional_context"
                  value={formData.additional_context}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-y"
                  placeholder="e.g., built a saas that got 1k users in a month, contributed to react, won eth denver hackathon, have a newsletter with 5k subs, reverse engineered spotify's algorithm for fun, mass state robotics champion, got my startup to $10k mrr before pivoting..."
                />
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : isUpdate ? (
                "Update profile"
              ) : (
                "Join the talent pool"
              )}
            </button>
            <p className="mt-4 text-center text-sm text-neutral-500">
              We'll only share your info when there's a mutual fit. No spam.
            </p>
          </div>
        </form>
        </div>
      </div>
    </main>
  );
}
