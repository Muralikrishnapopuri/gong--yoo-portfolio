import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Murali Krishna Popuri — Full Stack Developer",
  description:
    "Portfolio of Murali Krishna Popuri, a Full-Stack Developer with 2 years of professional experience building scalable desktop systems, offline-first applications, and real-time web apps.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Electron",
    "Murali Krishna Popuri",
    "Portfolio",
  ],
  authors: [{ name: "Murali Krishna Popuri" }],
  openGraph: {
    title: "Murali Krishna Popuri — Full Stack Developer",
    description: "Building scalable desktop systems, real-time web apps, and hybrid offline-first ecosystems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
