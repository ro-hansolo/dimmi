import React from "react";

interface SettingContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
  layout?: "horizontal" | "stacked";
  disabled?: boolean;
  tooltipPosition?: "top" | "bottom";
}

/**
 * Dimmi: a System Settings-style row. The description is always shown inline
 * as secondary text under the label (as in macOS System Settings), so
 * `descriptionMode` and `tooltipPosition` are accepted for API compatibility
 * but no longer change the layout.
 */
export const SettingContainer: React.FC<SettingContainerProps> = ({
  title,
  description,
  children,
  grouped = false,
  layout = "horizontal",
  disabled = false,
}) => {
  const surface = grouped ? "" : "mac-card";
  const textOpacity = disabled ? "opacity-50" : "";

  const label = (
    <>
      <h3 className={`text-[13px] leading-4 font-normal ${textOpacity}`}>
        {title}
      </h3>
      {description && (
        <p
          className={`text-[11px] leading-[14px] text-secondary mt-0.5 ${textOpacity}`}
        >
          {description}
        </p>
      )}
    </>
  );

  if (layout === "stacked") {
    return (
      <div className={`px-[10px] py-[11px] ${surface}`}>
        <div className="mb-2">{label}</div>
        <div className="w-full">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between gap-5 min-h-[38px] px-[10px] py-[9px] ${surface}`}
    >
      <div className="min-w-0 flex-1">{label}</div>
      <div className="relative flex-none flex items-center">{children}</div>
    </div>
  );
};
