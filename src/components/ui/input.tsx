import { forwardRef, type InputHTMLAttributes, type LabelHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("mb-1.5 block text-[13px] font-medium text-ink-soft", className)}
      {...props}
    />
  ),
);
Label.displayName = "Label";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => (
    <div>
      <input
        ref={ref}
        className={cn(
          "w-full border-0 border-b-[1.5px] border-line bg-transparent px-0 py-2.5",
          "text-[15px] text-ink placeholder:text-ink-faint",
          "outline-none transition-colors focus:border-press",
          error && "border-error",
          className,
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-[13px] text-error">{error}</p>}
    </div>
  ),
);
Input.displayName = "Input";
