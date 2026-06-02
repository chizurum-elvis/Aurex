import type { Metadata } from "next";
import React from "react";
import { IBM_Plex_Serif, Inter } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import Navbar from "@/components/Navbar";

// const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const ibmPlexSerif = IBM_Plex_Serif({
    variable: "--font-ibm-plex-serif",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
    display: 'swap',
});
export const metadata: Metadata = {
  title: "Aurex",
  description: "A real time commodity price aggregation system that collect commodity price from different sources and displays it in one view ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider ui={ui}>
        <html lang="en">
        <body className={`${ibmPlexSerif.variable} ${inter.variable} relative font-sans h-full w-full`}
        >
        <Navbar />
        {children}
        </body>
        </html>
      </ClerkProvider>
  );
}
