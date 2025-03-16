import type { Metadata } from "next";
import "./globals.css";
import { fonts } from "./fonts";
import { RootProviders } from "@/providers/root-providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Next.js Admin Panel Boilerplate",
  description: "Created by Juniardy Setiowidayoga",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fonts.outfit.className} antialiased`}
      >
        <Toaster position="top-right" />
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
