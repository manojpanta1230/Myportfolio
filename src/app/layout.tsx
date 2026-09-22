import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manoj Panta | Creative Developer & Full-Stack Engineer",
  description: "Portfolio of Manoj Panta, a full-stack developer focusing on digital experiences, web applications, and interactive design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased dark`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col selection:bg-accent selection:text-black transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
