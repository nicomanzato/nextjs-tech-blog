import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type TextFieldProps = React.ComponentProps<typeof Input> & {
  label?: string;
  error?: string;
};

const TextField = ({ label, error, id, className, ...props }: TextFieldProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <Input
          id={inputId}
          placeholder=" "
          aria-invalid={!!error}
          className={cn("peer", label && "pt-4", className)}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-muted-foreground transition-all peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-not-placeholder-shown:top-2.5 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-xs"
          >
            {label}
          </label>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export { TextField };
