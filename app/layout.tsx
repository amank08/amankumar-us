import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://amankumar.us";

export const metadata: Metadata = {
  title: {
    default: "Aman Kumar",
    template: "%s | Aman Kumar",
  },
  description:
    "Personal website, blog, and portfolio of Aman Kumar — software engineer writing about tech, ideas, and building things.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Aman Kumar",
    description:
      "Personal website, blog, and portfolio of Aman Kumar — software engineer writing about tech, ideas, and building things.",
    url: siteUrl,
    siteName: "Aman Kumar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Aman Kumar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aman Kumar",
    description:
      "Personal website, blog, and portfolio of Aman Kumar.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <Header />
          <main className="min-h-[calc(100vh-8rem)]">{children}</main>
          <Footer />
          <Suspense>
            <ToastProvider />
          </Suspense>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
