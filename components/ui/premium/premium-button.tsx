import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const buttonVariants = cva(
  "group/btn relative w-full h-11 overflow-hidden rounded-lg transition-all duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer",
  {
    variants: {
      variant: {
        solid: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-md hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-white/90 dark:shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] dark:hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.4)]",
        outline: "border border-zinc-200 bg-transparent hover:bg-zinc-50 text-zinc-900 dark:border-white/20 dark:text-white dark:hover:bg-white/10",
        ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-900 dark:text-white",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
)

export interface PremiumButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const PremiumButton = React.forwardRef<HTMLButtonElement, PremiumButtonProps>(
  ({ className, children, loading, variant, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={loading || disabled}
        className={cn(buttonVariants({ variant, className }))}
        {...props}
      >
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-currentColor" />
          ) : (
            children
          )}
        </div>
      </Button>
    )
  }
)
PremiumButton.displayName = "PremiumButton"

export { PremiumButton, buttonVariants }
