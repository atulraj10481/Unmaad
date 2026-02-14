"use client";
import type { Metadata } from "next"; // Ensure this is at the top if using useEffect
import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteMetadata = {
  title: "Unmaad 2026",
  description: "Largest B-School Cultural Fest | 27th Feb-1st Mar '26| IIM Bangalore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined" && "registerProperty" in CSS) {
      try {
        (CSS as any).registerProperty({
          name: "--wipe-angle",
          syntax: "<angle>",
          inherits: false,
          initialValue: "0deg",
        });
      } catch (e) {}
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#3033C8] overflow-x-hidden`}
      >
        <Navbar />
        <div className="relative w-full min-h-screen mt-16 lg:mt-20">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </body>
    </html>
  );
}
