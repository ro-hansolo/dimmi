import React from "react";

const WORDMARK = "Dimmi";

// Dimmi wordmark: the capsule mark (from the app icon) followed by "Dimmi".
// Name, export and props match the original Handy logo so callers are unchanged.
const HandyTextLogo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 630 200"
      overflow="visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Dimmi"
    >
      <rect x="0" y="40" width="320" height="120" rx="60" fill="#0A0A0B" />
      <rect
        x="0.9"
        y="40.9"
        width="318.2"
        height="118.2"
        rx="59.1"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.1"
        strokeWidth="1.8"
      />
      <circle cx="50.9" cy="100" r="14.5" fill="#FF9F0A" />
      <rect
        x="98.2"
        y="80.9"
        width="21.8"
        height="38.2"
        rx="10.9"
        fill="#fff"
      />
      <rect
        x="132.7"
        y="64.5"
        width="21.8"
        height="70.9"
        rx="10.9"
        fill="#fff"
      />
      <rect
        x="167.3"
        y="53.6"
        width="21.8"
        height="92.7"
        rx="10.9"
        fill="#fff"
      />
      <rect
        x="201.8"
        y="69.1"
        width="21.8"
        height="61.8"
        rx="10.9"
        fill="#fff"
      />
      <rect
        x="236.4"
        y="80.0"
        width="21.8"
        height="40.0"
        rx="10.9"
        fill="#fff"
      />
      <text
        x="340"
        y="134"
        style={{ fill: "var(--color-logo-stroke)" }}
        fontFamily='-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif'
        fontSize="96"
        fontWeight="600"
        letterSpacing="-1"
      >
        {WORDMARK}
      </text>
    </svg>
  );
};

export default HandyTextLogo;
