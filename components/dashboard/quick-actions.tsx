import { SmartCard } from "@/components/ui/premium/smart-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Plus, BarChart3, Bot, MessageSquare } from "lucide-react"
import Link from "next/link"

interface QuickActionsProps {
  botActive?: boolean
}

export function QuickActions({ botActive }: QuickActionsProps) {
  return (
    <SmartCard className="h-full">
      <CardHeader className="pb-4 border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
            <Zap className="h-5 w-5" />
          </div>
          <CardTitle className="text-lg font-serif tracking-wide">Quick Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        <Button asChild className="w-full justify-start gap-3 h-11 bg-zinc-900 text-white hover:bg-zinc-800 shadow-md dark:bg-white dark:text-zinc-950 dark:hover:bg-white/90 dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02] transition-all duration-300">
          <Link href="/dashboard/products?action=new">
            <div className="p-1 rounded-full bg-white/20 dark:bg-zinc-950/10">
              <Plus className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold tracking-wide">Add New Product</span>
          </Link>
        </Button>
        <div className="grid grid-cols-1 gap-2">
          <Button asChild variant="outline" className="w-full justify-start gap-3 h-10 border-border/50 bg-muted/20 hover:bg-muted/40 hover:text-primary transition-all">
            <Link href="/dashboard/analytics">
              <BarChart3 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              View Analytics
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start gap-3 h-10 border-border/50 bg-muted/20 hover:bg-muted/40 hover:text-primary transition-all">
            <Link href="/dashboard/ai-setup" className="flex items-center justify-between w-full pr-1">
              <div className="flex items-center gap-3">
                <Bot className={`h-4 w-4 transition-colors ${botActive ? 'text-green-500' : 'text-muted-foreground group-hover:text-primary'}`} />
                AI Settings
              </div>
              {botActive !== undefined && (
                <span className={`flex h-2 w-2 rounded-full ${botActive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-400/50'}`} />
              )}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start gap-3 h-10 border-border/50 bg-muted/20 hover:bg-muted/40 hover:text-primary transition-all">
            <Link href="/dashboard/conversations">
              <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              View All Chats
            </Link>
          </Button>
        </div>
      </CardContent>
    </SmartCard>
  )
}
