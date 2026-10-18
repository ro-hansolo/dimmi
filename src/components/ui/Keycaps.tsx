import React from "react";
import type { OSType } from "../../lib/utils/keyboard";

/**
 * Dimmi: display-only helper that renders an already formatted shortcut
 * string (the output of `formatKeyCombination`, e.g. "Left Option + Space")
 * as one keycap per key. On macOS, modifier names become their glyphs.
 * Does not parse or change bindings; it only re-presents the label.
 */

const MAC_GLYPHS: Record<string, string> = {
  command: "⌘",
  cmd: "⌘",
  meta: "⌘",
  super: "⌘",
  option: "⌥",
  alt: "⌥",
  control: "⌃",
  ctrl: "⌃",
  shift: "⇧",
};

const SIDE_PREFIX: Record<string, string> = { left: "L", right: "R" };

const displayKey = (key: string, osType: OSType): string => {
  const lower = key.toLowerCase();
  if (lower === "escape" || lower === "esc") return "esc";
  if (osType !== "macos") return key;

  const [first, ...rest] = lower.split(" ");
  if (SIDE_PREFIX[first] && rest.length === 1 && MAC_GLYPHS[rest[0]]) {
    return `${SIDE_PREFIX[first]}${MAC_GLYPHS[rest[0]]}`;
  }
  return MAC_GLYPHS[lower] ?? key;
};

interface KeycapsProps {
  label: string;
  osType: OSType;
  className?: string;
}

export const Keycaps: React.FC<KeycapsProps> = ({
  label,
  osType,
  className = "",
}) => {
  const keys = label
    .split(" + ")
    .map((k) => k.trim())
    .filter(Boolean);

  return (
    <>
      {keys.map((key, i) => (
        <kbd
          key={`${key}-${i}`}
          className={`mac-keycap font-sans ${className}`}
          title={key}
        >
          {displayKey(key, osType)}
        </kbd>
      ))}
    </>
  );
};
