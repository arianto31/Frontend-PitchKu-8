import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: cn(
    "bg-press text-paper",
    "hover:bg-press-deep",
    "shadow-[2px_2px_0_0_transparent] hover:shadow-[2px_2px_0_0_var(--color-gold)]",
    "transition-[background-color,box-shadow] duration-150",
  ),
  outline: cn(
    "border border-ink/20 text-ink bg-transparent",
    "hover:border-ink hover:bg-ink/[0.03]",
    "transition-colors duration-150",
  ),
  ghost: cn("text-ink-soft hover:text-ink", "transition-colors duration-150"),
};

const sizeClasses: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)]",
          "font-medium tracking-[-0.01em] cursor-pointer",
          "disabled:opacity-40 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
