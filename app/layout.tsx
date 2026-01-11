import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Fraunces } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { validateEnv } from "@/lib/env"
import "./globals.css"

// Validate environment variables at startup
validateEnv();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  // Optional: Adjust axes for that "Soft" feel if needed, but defaults are usually good.
})

export const metadata: Metadata = {
  title: "Autex - Social Commerce Automation",
  description: "Automate your Facebook Page sales with AI-powered Messenger commerce",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#1a1f36",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
