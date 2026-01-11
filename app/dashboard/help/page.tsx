"use client"

import { docSections } from "@/lib/docs"
import { useDocContext } from "./_components/doc-context"
import { LanguageToggle } from "./_components/language-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HelpPage() {
  const { language } = useDocContext()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === 'en' ? 'Help Center' : 'সহায়তা কেন্দ্র'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === 'en' 
              ? 'Documentation and guides for using Autex AI' 
              : 'Autex AI ব্যবহারের জন্য নির্দেশিকা এবং গাইড'}
          </p>
        </div>
        <LanguageToggle />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {docSections.map((section) => (
          <Link 
            key={section.id} 
            href={`/dashboard/help/${section.slug}/${section.articles[0]?.slug}`}
            className="block"
          >
            <Card className="h-full hover:bg-muted/50 transition-colors border-l-4 border-l-primary/0 hover:border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span>{section.icon}</span>
                  {section.title[language]}
                </CardTitle>
                <CardDescription>
                  {section.articles.length} {language === 'en' ? 'articles' : 'টি নিবন্ধ'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {section.articles.slice(0, 3).map(article => (
                    <li key={article.id} className="truncate">
                      {article.title[language]}
                    </li>
                  ))}
                  {section.articles.length > 3 && (
                    <li className="list-none pt-1 text-primary">
                      + {section.articles.length - 3} more...
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
