import { cn } from "@/utils/cn";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isDecimalInput?: boolean;
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, isDecimalInput = false, ...props }, ref) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const keyValue = event.key;
      if (
        (!/\d|\./.test(keyValue) &&
          !event.ctrlKey && // For Ctrl+A, Ctrl+V in Windows/Linux
          !event.metaKey && // For Cmd+A, Cmd+V in Mac
          keyValue !== "Backspace" &&
          keyValue !== "Delete" &&
          keyValue !== "ArrowLeft" &&
          keyValue !== "ArrowRight") ||
        (keyValue === "." &&
          (event.target as HTMLInputElement).value.includes("."))
      )
        event.preventDefault();
    };
    return (
      <>
        <input
          type={type}
          className={cn(
            "main-bg-default ring-offset-background placeholder:main-text-muted flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          onKeyDown={isDecimalInput ? handleKeyPress : undefined}
          ref={ref}
          {...props}
        />
        {error && <p className="main-text-danger text-sm font-normal mt-[2px]">{error}</p>}
      </>
    );
  },
);
Input.displayName = "Input";

export { Input };
