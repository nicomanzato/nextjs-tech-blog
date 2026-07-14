import * as React from "react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type InputWithButtonProps = React.ComponentProps<typeof Input> & {
  buttonText: string
  buttonProps?: React.ComponentProps<typeof Button>
}

function InputWithButton({
  buttonText,
  buttonProps,
  className,
  ...props
}: InputWithButtonProps) {
  return (
    <div className="flex">
      <Input className={cn("flex-1", className)} {...props} />
      <Button
        type="button"
        variant="black"
        {...buttonProps}
        className={cn(
          "h-12 rounded-none border-l-0",
          buttonProps?.className
        )}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export { InputWithButton }
