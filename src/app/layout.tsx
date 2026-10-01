import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: {
    default: "CodeMachan — The Digital Playground for Students & Creators",
    template: "%s | CodeMachan",
  },
  description:
    "I build the thing you currently have open in 47 browser tabs. Fast, sleek websites, web apps, student capstones, and MVPs.",
  keywords: [
    "CodeMachan",
    "student developer",
    "student projects",
    "final year project help",
    "Next.js web developer",
    "full-stack developer",
    "affordable web apps",
    "Supabase developer",
    "MVP prototyping",
  ],
  authors: [{ name: "Aravint (CodeMachan)" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://codemachan.vercel.app",
    title: "CodeMachan — The Digital Playground for Students & Creators",
    description:
      "Websites, apps, student projects, SaaS ideas — I build the thing you currently have open in 47 browser tabs.",
    siteName: "CodeMachan",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeMachan — The Digital Playground",
    description:
      "Websites, apps, student projects, SaaS ideas — I build the thing you currently have open in 47 browser tabs.",
    creator: "@codemachan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="relative text-[#f8fafc] min-h-screen selection:bg-violet-500/30 selection:text-white">
        <AuthProvider>
          <VideoBackground />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
