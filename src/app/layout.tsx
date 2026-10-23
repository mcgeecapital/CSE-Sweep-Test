import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carolina Sweep Environmental — Sun City Street Sweep Proposal",
  description:
    "Street sweeping proposal for Sun City Hilton Head south of Highway 278, with work map and zone pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${syne.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
