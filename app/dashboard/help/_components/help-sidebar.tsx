"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { docSections } from "@/lib/docs"
import { useDocContext } from "./doc-context"
import { ChevronRight, Search, FileText } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export function HelpSidebar() {
  const pathname = usePathname()
  const { language } = useDocContext()
  const [openSections, setOpenSections] = useState<string[]>(
    docSections.map(s => s.id) // Default all open
  )

  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  const [searchQuery, setSearchQuery] = useState("")

  // Filter sections based on search
  const filteredSections = docSections.map(section => {
    // If search is empty, return everything
    if (!searchQuery) return section

    const matchesSection = section.title[language].toLowerCase().includes(searchQuery.toLowerCase())
    const matchingArticles = section.articles.filter(article => 
      article.title[language].toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (matchesSection || matchingArticles.length > 0) {
      return {
        ...section,
        // If searching, show only matching articles (unless section matches, then show all?)
        // Let's simpler: if section matches, show all. If not, show only matching articles.
        articles: matchesSection ? section.articles : matchingArticles
      }
    }
    return null
  }).filter(Boolean) as typeof docSections

  // Auto-expand when searching
  if (searchQuery && openSections.length !== docSections.length) {
    setOpenSections(docSections.map(s => s.id))
  }

  return (
    <div className="w-64 border-r bg-muted/10 flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search docs..." 
            className="pl-8 h-9" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredSections.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-8">
            No results found
          </div>
        )}

        {filteredSections.map((section) => (
          <Collapsible
            key={section.id}
            open={openSections.includes(section.id) || !!searchQuery}
            onOpenChange={() => toggleSection(section.id)}
          >
            <CollapsibleTrigger className="flex items-center w-full group">
              <ChevronRight className={cn(
                "h-4 w-4 mr-2 text-muted-foreground transition-transform",
                openSections.includes(section.id) && "rotate-90"
              )} />
              <span className="font-medium text-sm flex items-center gap-2">
                <span>{section.icon}</span>
                {section.title[language]}
              </span>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="pt-1 pb-2">
              <div className="ml-6 space-y-1 border-l pl-3 mt-2">
                {section.articles.map((article) => {
                  const href = `/dashboard/help/${section.slug}/${article.slug}`
                  const isActive = pathname === href
                  
                  return (
                    <Link
                      key={article.id}
                      href={href}
                      className={cn(
                        "block text-sm py-1 px-2 rounded-md transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <span className="line-clamp-1">
                        {article.title[language]}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
      
      <div className="p-4 border-t bg-muted/20">
        <p className="text-xs text-muted-foreground text-center">
          Autex AI Help Center v1.0
        </p>
      </div>
    </div>
  )
}
