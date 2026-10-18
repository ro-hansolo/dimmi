import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-soft"
    | "secondary"
    | "warning"
    | "danger"
    | "danger-ghost"
    | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  // Dimmi: macOS push buttons. Accent-filled for primary actions, a raised
  // chip for everything else.
  const baseClasses =
    "font-normal rounded-[7px] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-default inline-flex items-center justify-center gap-1.5";

  const variantClasses = {
    primary: "text-white bg-accent hover:brightness-110 active:brightness-95",
    "primary-soft":
      "text-accent bg-accent/12 hover:bg-accent/20 active:bg-accent/25",
    secondary: "mac-button active:brightness-90",
    // Secondary's neutral resting look, with the semantic --color-warning
    // token (theme.css) on hover — for buttons on warning surfaces like
    // SecureInputWarning
    warning:
      "mac-button hover:text-warning hover:bg-warning/10 active:brightness-90",
    danger: "text-white bg-error hover:brightness-110 active:brightness-95",
    "danger-ghost": "text-error hover:bg-error/10 active:bg-error/20",
    ghost: "text-current hover:bg-fill/60 active:bg-fill",
  };

  const sizeClasses = {
    sm: "h-[22px] px-[10px] text-[12px]",
    md: "h-[24px] px-[12px] text-[13px]",
    lg: "h-7 px-4 text-[13px]",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
