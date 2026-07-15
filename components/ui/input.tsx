import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-none border-2 border-border-inverse bg-background-surface px-4 text-base text-text-icons-primary outline-none transition-colors placeholder:text-muted-foreground hover:placeholder:text-text-icons-primary/70 focus-visible:ring-4 focus-visible:ring-text-icons-interactive/30 disabled:cursor-not-allowed disabled:border-muted-foreground/30 disabled:bg-muted disabled:text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
