import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex h-14 shrink-0 transition duration-300 items-center justify-center whitespace-nowrap border-2 border-transparent px-6 text-base font-bold transition-colors outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "bg-lime text-ink hover:bg-ink hover:text-white focus-visible:border-ink focus-visible:ring-4 focus-visible:ring-lime/50 active:bg-active-purple active:text-white disabled:bg-transparent disabled:text-muted-foreground",
        secondary:
          "border-lime bg-transparent text-ink hover:bg-lime hover:text-ink focus-visible:ring-4 focus-visible:ring-lime/50 active:bg-lime active:text-ink disabled:border-muted-foreground/40 disabled:text-muted-foreground",
        black:
          "bg-ink text-lime hover:bg-lime hover:text-ink focus-visible:border-lime focus-visible:ring-4 focus-visible:ring-lime/50 active:bg-lime active:text-ink disabled:bg-transparent disabled:text-muted-foreground",
        "green-outline":
          "border-ink bg-lime text-ink hover:bg-ink hover:text-lime focus-visible:border-lime focus-visible:ring-4 focus-visible:ring-ink/30 active:bg-ink active:text-lime disabled:border-transparent disabled:bg-transparent disabled:text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

function Button({
  className,
  variant = "primary",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
