import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full resize-none border-[1.5px] border-line bg-transparent px-3.5 py-3",
        "text-[15px] leading-relaxed text-ink placeholder:text-ink-faint",
        "outline-none transition-colors focus:border-press",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
