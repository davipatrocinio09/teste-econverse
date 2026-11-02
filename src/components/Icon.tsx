import type { CSSProperties } from "react";

const paths = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="9" r="3" />
      <path d="M5 18c2-6 12-6 14 0" />
    </>
  ),
  cart: (
    <>
      <path d="M2 3h3l3 12h11l3-9H6M8 18h11" />
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
    </>
  ),
  box: (
    <>
      <path d="m3 7 9-5 9 5v12l-9 4-9-4V7Zm0 0 9 5 9-5M12 12v11M7 4l10 5" />
    </>
  ),
  truck: (
    <>
      <path d="M2 5h12v12H2V5Zm12 5h4l4 4v3h-8" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6l-9-4Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  card: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M5 15h4" />
    </>
  ),
  crown: <path d="m2 5 5 4 5-6 5 6 5-4-3 14H5L2 5Zm3 17h14" />,
  technology: (
    <>
      <path d="M14 16H2V3h17v7M6 20h6M9 16v4" />
      <rect x="14" y="10" width="8" height="12" rx="1" />
      <path d="M17 19h2" />
    </>
  ),
  market: (
    <>
      <path d="M3 10v11h18V10M2 5h20l-2 5H4L2 5ZM4 2h16M9 21v-7h6v7M5 10v3M19 10v3" />
    </>
  ),
  bottle: (
    <>
      <path d="M7 2h5v5l3 4v11H4V11l3-4V2Zm-3 12h11M7 18h5M18 13h4v9h-4zM7 5h5" />
    </>
  ),
  tools: (
    <>
      <path d="m3 3 18 18M2 6l4-4 4 4-4 4-4-4Zm19-4a6 6 0 0 0-7 7L3 20l2 2L16 11a6 6 0 0 0 6-7l-4 4-2-2 5-4Z" />
    </>
  ),
  health: (
    <>
      <path d="M12 11 6 5a3.5 3.5 0 0 1 6-3 3.5 3.5 0 0 1 6 3l-6 6ZM2 16l4-3 5 2h5a2 2 0 0 1 0 4h-5M2 16v6l5-2 10 1 6-6" />
    </>
  ),
  fitness: (
    <>
      <circle cx="14" cy="4" r="2" />
      <path d="m6 11 5-4 6 4h5M11 7l-2 8-6 7M9 15h7l3 7M2 8v14h20M2 17h4" />
    </>
  ),
  fashion: (
    <>
      <path d="m8 2-6 4 3 6 3-2v12h8V10l3 2 3-6-6-4c0 5-8 5-8 0Z" />
    </>
  ),
  left: <path d="m15 4-8 8 8 8" />,
  right: <path d="m9 4 8 8-8 8" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 24,
  style,
}: {
  name: IconName;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
