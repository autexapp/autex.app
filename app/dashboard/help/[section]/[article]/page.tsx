"use client"

import { use } from 'react'
import { getArticleBySlug } from "@/lib/docs"
import { HelpContent } from "../../_components/help-content"
import { LanguageToggle } from "../../_components/language-toggle"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function ArticlePage({ params }: { params: Promise<{ section: string; article: string }> }) {
  const { section: sectionSlug, article: articleSlug } = use(params)
  const result = getArticleBySlug(sectionSlug, articleSlug)

  if (!result) {
    notFound()
  }

  const { section, article } = result

  // Find next/prev articles
  const currentSectionIndex = section.articles.indexOf(article)
  const nextArticle = section.articles[currentSectionIndex + 1]
  const prevArticle = section.articles[currentSectionIndex - 1]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard/help" className="hover:text-foreground">
            Help
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span>{section.title.en}</span>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">{article.title.en}</span>
        </div>
        <LanguageToggle />
      </div>

      <HelpContent article={article} />

      <div className="flex justify-between pt-6 border-t mt-12">
        {prevArticle ? (
          <Link href={`/dashboard/help/${section.slug}/${prevArticle.slug}`}>
            <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
              <ChevronLeft className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Previous</div>
                <div className="font-medium">{prevArticle.title.en}</div>
              </div>
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {nextArticle ? (
          <Link href={`/dashboard/help/${section.slug}/${nextArticle.slug}`}>
            <Button variant="ghost" className="pr-0 hover:bg-transparent hover:text-primary">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Next</div>
                <div className="font-medium">{nextArticle.title.en}</div>
              </div>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
