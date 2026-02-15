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
  title: "The Anti Job Board | Jobs that don't exist on the internet yet",
  description:
    "We find startups that just raised millions, call their founders, and tell you who's hiring before anyone else knows. Zero ghost jobs. Ever.",
  keywords: [
    "jobs",
    "startup jobs",
    "tech jobs",
    "hidden jobs",
    "job board",
    "career",
    "hiring",
  ],
  openGraph: {
    title: "The Anti Job Board",
    description: "Jobs that don't exist on the internet yet.",
    type: "website",
    url: "https://theantijobboard.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Anti Job Board",
    description: "Jobs that don't exist on the internet yet.",
  },
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
