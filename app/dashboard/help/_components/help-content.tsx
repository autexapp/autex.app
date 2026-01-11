"use client"

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
      <div className="mb-10 border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
          {article.title[language]}
        </h1>
        {article.summary && (
          <p className="text-xl text-muted-foreground leading-relaxed">
            {article.summary[language]}
          </p>
        )}
      </div>

      <article className="prose prose-slate dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
        prose-p:text-foreground/90 prose-p:leading-7
        prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        prose-strong:font-bold prose-strong:text-foreground
        prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-semibold prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 prose-pre:text-zinc-50 prose-pre:rounded-xl prose-pre:shadow-sm
        prose-li:text-foreground/90
        prose-img:rounded-xl prose-img:border prose-img:shadow-sm">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({node, ...props}) => (
              <div className="overflow-x-auto my-8 rounded-lg border bg-card/50 shadow-sm">
                <table className="w-full text-left" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => (
              <thead className="bg-muted/50 border-b" {...props} />
            ),
            th: ({node, ...props}) => (
              <th className="px-6 py-4 font-semibold text-foreground" {...props} />
            ),
            td: ({node, ...props}) => (
              <td className="px-6 py-4 border-t border-border/50 text-foreground/90" {...props} />
            ),
            blockquote: ({node, ...props}) => (
              <blockquote className="not-italic border-l-4 border-primary bg-primary/5 rounded-r-lg px-6 py-4 my-6 text-foreground/90 shadow-sm" {...props} />
            ),
            input: ({node, ...props}) => {
              if (props.type === 'checkbox') {
                 return <input type="checkbox" className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary" {...props} />
              }
              return <input {...props} />
            },
            li: ({node, ...props}) => {
              // Check if this list item has a checkbox (task list)
              const hasCheckbox = props.className?.includes('task-list-item');
              return (
                <li className={cn(hasCheckbox && "list-none pl-0 flex items-start")} {...props} />
              )
            }
          }}
        >
          {article.content[language]}
        </ReactMarkdown>
      </article>
    </div>
  )
}
