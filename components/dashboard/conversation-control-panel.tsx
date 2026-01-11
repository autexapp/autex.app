'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bot, User, RefreshCw, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type ControlMode = 'bot' | 'manual' | 'hybrid'

interface Conversation {
  id: string
  control_mode?: ControlMode | null
  last_manual_reply_at?: string | null
  last_manual_reply_by?: string | null
  bot_pause_until?: string | null
}

interface ConversationControlPanelProps {
  conversation: Conversation
  onModeChange?: (mode: ControlMode) => void
}

const HYBRID_PAUSE_MINUTES = 30

export function ConversationControlPanel({ 
  conversation, 
  onModeChange 
}: ConversationControlPanelProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  
  const controlMode = (conversation.control_mode || 'bot') as ControlMode
  const lastManualReplyAt = conversation.last_manual_reply_at

  // Calculate countdown for hybrid mode
  const calculateCountdown = useCallback(() => {
    if (controlMode !== 'hybrid' || !lastManualReplyAt) {
      return null
    }
    
    const lastReplyTime = new Date(lastManualReplyAt).getTime()
    const resumeTime = lastReplyTime + (HYBRID_PAUSE_MINUTES * 60 * 1000)
    const now = Date.now()
    const remainingMs = resumeTime - now
    
    if (remainingMs <= 0) {
      return null
    }
    
    return Math.ceil(remainingMs / (60 * 1000)) // Minutes remaining
  }, [controlMode, lastManualReplyAt])

  // Update countdown every minute
  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(calculateCountdown())
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [calculateCountdown])

  const handleModeChange = async (newMode: string) => {
    if (newMode === controlMode) return
    
    setIsUpdating(true)
    
    try {
      const response = await fetch(`/api/conversations/${conversation.id}/control-mode`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ control_mode: newMode }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update control mode')
      }

      const data = await response.json()
      onModeChange?.(data.control_mode)
      
      const modeLabels: Record<string, string> = {
        bot: 'Bot Active',
        manual: 'Manual Control',
        hybrid: 'Hybrid Mode',
      }
      toast.success(`Switched to ${modeLabels[newMode]}`)
    } catch (error: any) {
      console.error('Error updating control mode:', error)
      toast.error(error.message || 'Failed to update mode')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleResumeBot = async () => {
    setIsUpdating(true)
    
    try {
      const response = await fetch(`/api/conversations/${conversation.id}/control-mode`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          control_mode: 'bot',
          clear_pause: true,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to resume bot')
      }

      onModeChange?.('bot')
      toast.success('Bot resumed')
    } catch (error: any) {
      console.error('Error resuming bot:', error)
      toast.error(error.message || 'Failed to resume bot')
    } finally {
      setIsUpdating(false)
    }
  }

  const getModeConfig = (mode: ControlMode) => {
    switch (mode) {
      case 'bot':
        return {
          icon: Bot,
          label: 'Bot Active',
          variant: 'default' as const,
          className: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30',
        }
      case 'manual':
        return {
          icon: User,
          label: 'Manual Control',
          variant: 'secondary' as const,
          className: 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-500/30',
        }
      case 'hybrid':
        return {
          icon: RefreshCw,
          label: countdown ? `Hybrid (${countdown}m)` : 'Hybrid',
          variant: 'outline' as const,
          className: 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30',
        }
      default:
        return {
          icon: Bot,
          label: 'Bot Active',
          variant: 'default' as const,
          className: 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30',
        }
    }
  }

  const config = getModeConfig(controlMode)
  const Icon = config.icon

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-zinc-200/50 dark:bg-zinc-900/50 backdrop-blur-md border-b border-white/5 shadow-sm transition-colors duration-300">
      {/* Current Mode Badge */}
      <Badge 
        variant={config.variant}
        className={cn('flex items-center gap-1.5 border-none shadow-none', config.className)}
      >
        <Icon className="h-3.5 w-3.5" />
        <span>{config.label}</span>
      </Badge>

      {/* Mode Switcher */}
      <Select
        value={controlMode}
        onValueChange={handleModeChange}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-[140px] h-8 text-xs bg-white/80 dark:bg-black/20 border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 focus:ring-0 focus:border-zinc-400 dark:focus:border-white/20 shadow-sm dark:shadow-none">
          {isUpdating ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Updating...</span>
            </div>
          ) : (
            <SelectValue placeholder="Select mode" />
          )}
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/10">
          <SelectItem value="bot" className="focus:bg-zinc-100 dark:focus:bg-white/10 text-zinc-700 dark:text-zinc-300 focus:text-zinc-900 dark:focus:text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-green-500" />
              <span>Bot Mode</span>
            </div>
          </SelectItem>
          <SelectItem value="manual" className="focus:bg-zinc-100 dark:focus:bg-white/10 text-zinc-700 dark:text-zinc-300 focus:text-zinc-900 dark:focus:text-white">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-orange-500" />
              <span>Manual Mode</span>
            </div>
          </SelectItem>
          <SelectItem value="hybrid" className="focus:bg-zinc-100 dark:focus:bg-white/10 text-zinc-700 dark:text-zinc-300 focus:text-zinc-900 dark:focus:text-white">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-blue-500" />
              <span>Hybrid Mode</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Resume Bot Button (only in hybrid mode with countdown) */}
      {controlMode === 'hybrid' && countdown && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResumeBot}
          disabled={isUpdating}
          className="h-8 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-500/10"
        >
          {isUpdating ? (
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
          ) : (
            <Bot className="h-3 w-3 mr-1" />
          )}
          Resume Bot Now
        </Button>
      )}

      {/* Help Text */}
      <span className="text-xs text-zinc-500 dark:text-zinc-500 hidden md:inline ml-auto italic">
        {controlMode === 'bot' && 'AI handles all responses'}
        {controlMode === 'manual' && 'You handle all responses'}
        {controlMode === 'hybrid' && countdown && `Bot resumes in ${countdown}m`}
        {controlMode === 'hybrid' && !countdown && 'AI + You can respond'}
      </span>
    </div>
  )
}
