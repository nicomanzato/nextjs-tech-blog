import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-14 shrink-0 base-transition items-center justify-center whitespace-nowrap border-2 border-transparent px-6 text-base font-bold transition-colors outline-none select-none active:translate-y-px disabled:pointer-events-none disabled:translate-y-0",
  {
    variants: {
      variant: {
        primary:
          "bg-background-brand text-text-icons-primary hover:bg-background-inverse hover:text-text-icons-inverse focus-visible:border-border-inverse focus-visible:ring-4 focus-visible:ring-border-brand/50 active:bg-background-active active:text-text-icons-inverse disabled:bg-transparent disabled:text-muted-foreground",
        secondary:
          "border-border-brand bg-transparent text-text-icons-primary hover:bg-background-brand hover:text-text-icons-primary focus-visible:ring-4 focus-visible:ring-border-brand/50 active:bg-background-brand active:text-text-icons-primary disabled:border-muted-foreground/40 disabled:text-muted-foreground",
        black:
          "bg-background-inverse text-text-icons-brand hover:bg-background-brand hover:text-text-icons-primary focus-visible:border-border-brand focus-visible:ring-4 focus-visible:ring-border-brand/50 active:bg-background-brand active:text-text-icons-primary disabled:bg-transparent disabled:text-muted-foreground",
        "green-outline":
          "border-border-inverse bg-background-brand text-text-icons-primary hover:bg-background-inverse hover:text-text-icons-brand focus-visible:border-border-brand focus-visible:ring-4 focus-visible:ring-border-inverse/30 active:bg-background-inverse active:text-text-icons-brand disabled:border-transparent disabled:bg-transparent disabled:text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

function Button({
  className,
  variant = "primary",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
