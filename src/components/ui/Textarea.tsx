import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "compact";
}

export const Textarea: React.FC<TextareaProps> = ({
  className = "",
  variant = "default",
  ...props
}) => {
  const baseClasses =
    "bg-card text-[13px] font-normal rounded-md text-start shadow-[0_0_0_0.5px_var(--color-separator),inset_0_0.5px_1px_rgba(0,0,0,0.06)] border-0 transition-shadow duration-150 focus:outline-none focus:ring-[3px] focus:ring-accent/40 resize-y";

  const variantClasses = {
    default: "px-2 py-1.5 min-h-[100px]",
    compact: "px-2 py-1 min-h-[80px]",
  };

  return (
    <textarea
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
};
