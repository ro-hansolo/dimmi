import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "compact";
}

export const Input: React.FC<InputProps> = ({
  className = "",
  variant = "default",
  disabled,
  ...props
}) => {
  const baseClasses =
    "bg-card text-[13px] font-normal rounded-md text-start shadow-[0_0_0_0.5px_var(--color-separator),inset_0_0.5px_1px_rgba(0,0,0,0.06)] border-0 transition-shadow duration-150";

  const interactiveClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "focus:outline-none focus:ring-[3px] focus:ring-accent/40";

  const variantClasses = {
    default: "px-2 h-7",
    compact: "px-1.5 h-[22px]",
  } as const;

  return (
    <input
      className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
};
