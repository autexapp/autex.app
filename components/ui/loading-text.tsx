'use client'

import { useState, useEffect } from 'react'

const loadingMessages = [
  "Just a moment",
  "Getting things ready",
  "Almost there",
  "Loading your data",
  "Preparing everything",
  "Hang tight",
  "Cooking up your dashboard",
  "Fetching the goods",
  "Working on it",
  "Just a sec",
]

export function LoadingText() {
  // Start with first message to avoid hydration mismatch
  const [messageIndex, setMessageIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Change message every 3 seconds
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Use a fixed message until mounted to avoid hydration mismatch
  const displayMessage = mounted ? loadingMessages[messageIndex] : loadingMessages[0]

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <p className="text-lg font-medium text-foreground">
        {displayMessage}
        <span className="inline-flex ml-1">
          <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
        </span>
      </p>
    </div>
  )
}
