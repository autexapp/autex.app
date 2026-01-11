"use client"

import ReactMarkdown from 'react-markdown'
import { DocArticle } from '@/lib/docs/types'
import { useDocContext } from './doc-context'
import { cn } from '@/lib/utils'

interface HelpContentProps {
  article: DocArticle
}

export function HelpContent({ article }: HelpContentProps) {
  const { language } = useDocContext()

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {article.title[language]}
        </h1>
        {article.summary && (
          <p className="text-xl text-muted-foreground">
            {article.summary[language]}
          </p>
        )}
      </div>

      <article className={cn(
        "prose prose-slate dark:prose-invert max-w-none",
        "prose-headings:font-semibold prose-headings:tracking-tight",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-pre:bg-muted prose-pre:text-foreground",
        "prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none",
        "prose-img:rounded-lg prose-img:border"
      )}>
        <ReactMarkdown>
          {article.content[language]}
        </ReactMarkdown>
      </article>
    </div>
  )
}
