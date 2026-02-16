import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theantijobboard.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  title: {
    default: "The Anti Job Board | Find Startup Jobs Before They're Posted",
    template: "%s | The Anti Job Board",
  },
  description:
    "Find startup jobs before they hit job boards. We call founders at recently funded startups and get you roles with 10 applicants, not 1000. Stop competing with the masses.",
  keywords: [
    "jobs",
    "job board",
    "job search",
    "find jobs",
    "job listings",
    "job openings",
    "startup jobs",
    "tech jobs",
    "software engineer jobs",
    "developer jobs",
    "engineering jobs",
    "product manager jobs",
    "designer jobs",
    "remote jobs",
    "hidden job market",
    "unlisted jobs",
    "early stage startup jobs",
    "YC startup jobs",
    "Y Combinator jobs",
    "funded startup jobs",
    "Series A jobs",
    "seed stage jobs",
    "career opportunities",
    "job hunting",
    "job search tips",
    "how to find jobs",
    "best job boards",
    "alternative job boards",
    "tech career",
    "startup career",
    "work at startup",
    "join startup",
    "startup hiring",
    "founder jobs",
    "early employee",
    "startup equity",
    "SaaS jobs",
    "fintech jobs",
    "AI jobs",
    "machine learning jobs",
    "data science jobs",
  ],
  authors: [{ name: "The Anti Job Board" }],
  creator: "The Anti Job Board",
  publisher: "The Anti Job Board",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theantijobboard.com",
    siteName: "The Anti Job Board",
    title: "The Anti Job Board | Find Startup Jobs Before They're Posted",
    description:
      "Find startup jobs before they hit job boards. We call founders at recently funded startups and get you roles with 10 applicants, not 1000.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Anti Job Board - Jobs that don't exist on the internet yet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Anti Job Board | Find Startup Jobs Before They're Posted",
    description:
      "Find startup jobs before they hit job boards. We call founders at recently funded startups and get you roles with 10 applicants, not 1000.",
    images: ["/og-image.jpg"],
    creator: "@theantijobboard",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://theantijobboard.com",
  },
  category: "Jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
