import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { MotionProvider } from "@/components/motion"
import { Topography } from "@/components/topography"
import { hero, profile } from "@/lib/content"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const description = `${profile.role} in ${profile.location}. ${hero.intro}`

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bibesh-timalsina.me"),
  title: `${profile.name} · ${profile.role}`,
  description,
  openGraph: {
    title: profile.name,
    description,
    url: "/",
    siteName: profile.name,
    images: [{ url: "/headshot.jpg", width: 960, height: 1200 }],
    type: "website",
  },
  twitter: { card: "summary", title: profile.name, description },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Reveal animations start hidden; without JS, show everything. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <MotionProvider>
          <Topography />
          {children}
        </MotionProvider>
      </body>
    </html>
  )
}
