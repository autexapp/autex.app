"use client"

import { Button } from "@/components/ui/button"
import { useDocContext } from "./doc-context"

export function LanguageToggle() {
  const { language, setLanguage } = useDocContext()

  return (
    <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-lg border">
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="text-xs h-7"
      >
        English
      </Button>
      <Button
        variant={language === 'bn' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('bn')}
        className="text-xs h-7"
      >
        বাংলা
      </Button>
    </div>
  )
}
