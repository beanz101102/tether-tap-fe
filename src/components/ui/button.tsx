import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { HeroIcon } from "./HeroIcon";
import { Loading } from "../common/Loading";

const buttonVariants = cva(
  "inline-flex items-center relative justify-center whitespace-nowrap rounded-md focus:!outline-none text-sm font-medium  transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "button-default hover:opacity-80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "main-button-outline",
        outlineWarning:
          "hover:!bg-amber-500 dark:hover:!bg-amber-400 border rounded-md !text-amber-500 hover:!text-slate-800 dark:!text-amber-400 dark:hover:!text-slate-800 main-bg-secondary main-border-warning",
        secondary:
          "main-bg-secondary text-secondary-foreground hover:main-bg-secondary/80",
        warning: "main-bg-warning main-text-button hover:opacity-80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "rounded-full hover:main-bg-divider-primary",
        brand: "main-bg-brand hover:bg-blue-600 text-white",
        "divider-primary": "main-bg-divider-primary hover:opacity-80",
        primary: "main-bg-primary hover:opacity-80",
        teritary: "main-bg-teritary hover:opacity-80",
        "zinc-700": "bg-zinc-700 hover:bg-zinc-800 border border-zinc-400",
        danger: "bg-rose-400 hover:bg-rose-500 text-white",
        new_brand: "main-bg-brand hover:opacity-80",
        border_blue:
          "border border-blue-400 text-white bg-blue-500 hover:bg-blue-600",
        neutral_600: "bg-neutral-600/60 hover:bg-neutral-600 text-white",
        outlineBrand:
          "main-border-brand main-text-brand border hover:text-white hover:main-bg-brand",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "w-8 h-8 flex-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  typeLoading?: "default" | "position";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size,
      asChild = false,
      children,
      typeLoading,
      loading,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {typeLoading === "default" ? (
          <div className="mx-auto flex w-fit items-center">
            {loading && (
              <HeroIcon
                className="mr-2 h-4 w-4 animate-spin text-white dark:text-slate-800"
                iconName="ArrowPathIcon"
              />
            )}
            {children}
          </div>
        ) : (
          <>
            {loading && (
              <Loading
                iconClassName="h-5 w-5"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              />
            )}
            {children}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
