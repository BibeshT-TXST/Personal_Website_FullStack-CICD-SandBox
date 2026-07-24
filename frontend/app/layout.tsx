import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-merriwether",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Bibesh Timalsina - Interactive Experience",
  description: "I build systems from first principles.",
};

import CustomCursor from "@/components/CustomCursor";
import InteractiveDots from "@/components/InteractiveDots";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark scroll-smooth ${merriweather.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-warm-umber selection:text-sandstone">
        <div className="film-grain"></div>
        <CustomCursor />
        <InteractiveDots />
        {children}
      </body>
    </html>
  );
}
