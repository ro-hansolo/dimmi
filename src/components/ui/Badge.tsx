import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "success" | "secondary";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  className = "",
}) => {
  const variantClasses = {
    primary: "bg-accent text-white",
    success: "bg-success/15 text-success",
    secondary: "bg-fill text-secondary",
  };

  return (
    <span
      className={`inline-flex items-center px-2 h-[18px] rounded-full text-[11px] font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
