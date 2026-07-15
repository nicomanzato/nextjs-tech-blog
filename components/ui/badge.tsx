import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex w-fit items-center rounded-full bg-background-brand px-3 py-1 text-sm font-semibold text-text-icons-primary",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
