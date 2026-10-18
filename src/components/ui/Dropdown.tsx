import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  className?: string;
  menuClassName?: string;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onOpen?: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onSelect,
  className = "",
  menuClassName,
  placeholder = "Select an option...",
  disabled = false,
  onOpen,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) onOpen?.();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`mac-popup h-[22px] ps-[9px] pe-[3px] text-[13px] leading-4 rounded-md min-w-[80px] max-w-[260px] w-full text-start grid grid-cols-[1fr_auto] gap-1.5 items-center transition-[filter] duration-150 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-accent/40 ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-default hover:brightness-[0.98] active:brightness-95"
        }`}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span className="truncate">{selectedOption?.label || placeholder}</span>
        <span className="mac-popup-chevron" aria-hidden="true">
          <svg
            width="8"
            height="10"
            viewBox="0 0 8 10"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1.5 3.6L4 1.2l2.5 2.4M1.5 6.4L4 8.8l2.5-2.4" />
          </svg>
        </span>
      </button>
      {isOpen && !disabled && (
        <div
          className={`absolute top-full mt-1 p-[5px] bg-card/95 backdrop-blur-xl rounded-lg shadow-[0_0_0_0.5px_rgba(0,0,0,0.18),0_10px_30px_rgba(0,0,0,0.2)] z-50 max-h-60 overflow-y-auto ${
            menuClassName ?? "left-0 right-0"
          }`}
        >
          {options.length === 0 ? (
            <div className="px-2.5 py-1 text-[13px] text-secondary">
              {t("common.noOptionsFound")}
            </div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`group w-full text-[13px] leading-4 text-start rounded-[5px] hover:bg-accent hover:text-white ${
                  option.description ? "px-2.5 py-1.5" : "px-2.5 py-[3px]"
                } ${
                  selectedValue === option.value ? "bg-accent/15" : ""
                } ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => handleSelect(option.value)}
                disabled={option.disabled}
              >
                <span
                  className={`block whitespace-normal break-words ${
                    option.description || selectedValue === option.value
                      ? "font-semibold"
                      : ""
                  }`}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span className="mt-0.5 block whitespace-normal text-[11px] font-normal leading-[14px] text-secondary group-hover:text-white/80">
                    {option.description}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
