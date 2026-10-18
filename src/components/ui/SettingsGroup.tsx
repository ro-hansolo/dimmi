import React from "react";

interface SettingsGroupProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className={`space-y-[10px] ${title ? "pt-[8px]" : ""}`}>
      {title && (
        <div className="px-[10px]">
          <h2 className="text-[13px] leading-4 font-semibold text-text">
            {title}
          </h2>
          {description && (
            <p className="text-[11px] leading-[14px] text-secondary mt-0.5">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="mac-card overflow-visible">
        <div className="mac-card-rows">{children}</div>
      </div>
    </div>
  );
};
