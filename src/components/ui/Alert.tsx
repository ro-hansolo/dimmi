import React from "react";
import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";

type AlertVariant = "error" | "warning" | "info" | "success";

interface AlertProps {
  variant?: AlertVariant;
  /** When true, removes rounded corners for use inside containers */
  contained?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: string; text: string }
> = {
  error: {
    container: "bg-error/10",
    icon: "text-error",
    text: "text-text",
  },
  warning: {
    container: "bg-warning/10",
    icon: "text-warning",
    text: "text-text",
  },
  info: {
    container: "bg-accent/10",
    icon: "text-accent",
    text: "text-text",
  },
  success: {
    container: "bg-success/10",
    icon: "text-success",
    text: "text-text",
  },
};

const variantIcons: Record<AlertVariant, React.ElementType> = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

export const Alert: React.FC<AlertProps> = ({
  variant = "error",
  contained = false,
  children,
  className = "",
}) => {
  const styles = variantStyles[variant];
  const Icon = variantIcons[variant];

  return (
    <div
      className={`flex items-start gap-2.5 px-3 py-2.5 ${styles.container} ${contained ? "" : "rounded-[10px]"} ${className}`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${styles.icon}`} />
      <p className={`text-[13px] leading-4 ${styles.text}`}>{children}</p>
    </div>
  );
};
