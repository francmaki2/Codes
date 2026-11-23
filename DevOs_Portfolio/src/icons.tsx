import { useId, type ReactNode } from "react";

export type AppId =
  | "projects"
  | "certifications"
  | "about"
  | "stack"
  | "resume"
  | "contact"
  | "terminal"
  | "github";

const paths: Record<string, ReactNode> = {
  code: (
    <>
      <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l3 3h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m16 16 4 4" />
    </>
  ),
  wifi: (
    <>
      <path d="M2 8.5a15 15 0 0 1 20 0M5 12a10.5 10.5 0 0 1 14 0m-11 3.4a6 6 0 0 1 8 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  offline: (
    <path d="m3 3 18 18M3 9a15 15 0 0 1 3-2m4-1a15 15 0 0 1 11 3M6 13a10 10 0 0 1 4-2m-1 5a5 5 0 0 1 5-.5m-2 4h.01" />
  ),
  battery: (
    <>
      <rect x="2" y="6" width="17" height="12" rx="2.5" />
      <path d="M22 10v4" />
      <rect x="5" y="9" width="11" height="6" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </>
  ),
  moon: <path d="M20.7 15.3A9 9 0 0 1 8.7 3.3a9 9 0 1 0 12 12Z" />,
  mouse: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="6" />
      <path d="M12 6v3" />
    </>
  ),
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  back: <path d="M20 12H5m6 6-6-6 6-6" />,
  external: <path d="M13 5h6v6m0-6-8 8m6 1v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h4" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  minus: <path d="M5 12h14" />,
  expand: <path d="M14 5h5v5m0-5-6 6m-3 8H5v-5m0 5 6-6" />,
  restore: <path d="M13 11h6m-6 0V5m0 6 6-6m-8 8H5m6 0v6m0-6-6 6" />,
  grid: (
    <>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1.5" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1.5" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1.5" />
      <rect x="14.5" y="14.5" width="6" height="6" rx="1.5" />
    </>
  ),
  star: <path d="m12 3 2.8 5.6 6.2.9-4.5 4.4 1.1 6.1-5.6-2.9L6.4 20l1.1-6.1L3 9.5l6.2-.9Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.1m-.1 9h.1" />
    </>
  ),
  print: (
    <>
      <path d="M7 8V3h10v5M7 17H4a1 1 0 0 1-1-1v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1h-3m0-4H7v8h10Z" />
      <path d="M17 11h1" />
    </>
  ),
  download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M15 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  branch: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M6 7v10m12-10c0 5-3 6-12 6" />
    </>
  ),
  book: <path d="M12 6C9 4 6 4 3 5v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1Zm0 0v14" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5m0-8h.01" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M10 13h.01M14 13h.01M18 13h.01M9 16h6" />
    </>
  ),
  chevron: <path d="m9 5 7 7-7 7" />,
  enter: <path d="M20 5v7a3 3 0 0 1-3 3H4m5-5-5 5 5 5" />,
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2.3a9.7 9.7 0 0 0-3.1 18.9c.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.2-3.3-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .8 1.5 2.3 1.1 2.8.8.1-.6.4-1.1.6-1.3-2.1-.2-4.4-1-4.4-4.8 0-1.1.4-1.9 1-2.6-.1-.2-.5-1.2.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.8-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.5 1 2.6 0 3.8-2.3 4.6-4.5 4.8.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.7 9.7 0 0 0 12 2.3Z"
    />
  ),
};

export function Icon({ name, size = 18 }: { name: keyof typeof paths; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const art: Record<AppId, ReactNode> = {
  projects: (
    <>
      <path d="M13 22a4 4 0 0 1 4-4h10l5 5h15a4 4 0 0 1 4 4v17H13Z" fill="#c2e8ff" />
      <path
        d="M13 29a4 4 0 0 1 4-4h30a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H17a4 4 0 0 1-4-4Z"
        fill="#e1f4ff"
      />
      <path
        d="m27 32-4 4.5 4 4.5m10-9 4 4.5-4 4.5m-3-10-4 11"
        fill="none"
        stroke="#2c7ae9"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  certifications: (
    <>
      <path d="m24 36-4 14 8-3 4 5 4-14m4-2 4 14-8-3-4 5-4-14" fill="#ffe3a6" />
      <path
        d="m32 13 4 3 5-.1 2 4.5 4 2.8-1 5 1 5-4 2.8-2 4.5-5-.1-4 3-4-3-5 .1-2-4.5-4-2.8 1-5-1-5 4-2.8 2-4.5 5 .1Z"
        fill="#fff2bf"
      />
      <circle cx="32" cy="28" r="9" fill="#f2b345" />
      <path
        d="m28 28 2.5 2.5L36 25"
        fill="none"
        stroke="#fff6d4"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  about: (
    <>
      <circle
        cx="32"
        cy="32"
        r="18.5"
        fill="#ded0ff"
        fillOpacity=".26"
        stroke="#f0e4ff"
        strokeOpacity=".65"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="27" r="6.6" fill="#f5ebff" />
      <path d="M20.8 41a11.4 11.4 0 0 1 22.4 0 14.6 14.6 0 0 1-22.4 0Z" fill="#f5ebff" />
    </>
  ),
  stack: (
    <>
      <path
        d="m24 23-11 9 11 9m16-18 11 9-11 9m-5-22-6 26"
        fill="none"
        stroke="#e5fff1"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  resume: (
    <>
      <path
        d="M22 14h15l10 10v22a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4V18a4 4 0 0 1 4-4Z"
        fill="#fff4e6"
      />
      <path d="M37 14v7a3 3 0 0 0 3 3h7Z" fill="#ffd2a4" />
      <path
        d="M25 31h14m-14 6h14m-14 6h8"
        fill="none"
        stroke="#e8863d"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </>
  ),
  contact: (
    <>
      <rect x="13" y="20" width="38" height="26" rx="5" fill="#ffebf5" />
      <path
        d="m14.5 22.5 15 11a4.2 4.2 0 0 0 5 0l15-11"
        fill="none"
        stroke="#ed72ac"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="m16 43 10-8m22 8-10-8"
        fill="none"
        stroke="#f9bed7"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </>
  ),
  terminal: (
    <>
      <rect
        x="12"
        y="15"
        width="40"
        height="34"
        rx="6"
        fill="#131a2a"
        stroke="#78839f"
        strokeOpacity=".65"
        strokeWidth="1.4"
      />
      <path d="M13 23h38" stroke="#78839f" strokeOpacity=".38" />
      <circle cx="17.8" cy="19.3" r="1.15" fill="#ff8a89" />
      <circle cx="21.5" cy="19.3" r="1.15" fill="#f5c975" />
      <circle cx="25.2" cy="19.3" r="1.15" fill="#80d5ac" />
      <path
        d="m20 29 6 5-6 5m12 1h9"
        fill="none"
        stroke="#b8f8d0"
        strokeWidth="2.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  github: (
    <g transform="translate(9 9) scale(1.92)" color="#f5f4ff">
      {paths.github}
    </g>
  ),
};

const palette: Record<AppId, [string, string]> = {
  projects: ["#65bbff", "#2561e1"],
  certifications: ["#f7cf6b", "#da9322"],
  about: ["#bb9bff", "#7745dc"],
  stack: ["#59dca3", "#178b63"],
  resume: ["#ffc47a", "#e57633"],
  contact: ["#ff9cc6", "#d94e8b"],
  terminal: ["#525f79", "#252b3d"],
  github: ["#55526e", "#252334"],
};

export function AppIcon({ id, size = 64 }: { id: AppId; size?: number }) {
  const gradient = useId();
  return (
    <svg className="app-icon" aria-hidden="true" width={size} height={size} viewBox="0 0 64 64">
      <defs>
        <linearGradient id={gradient} x1="9" y1="0" x2="55" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette[id][0]} />
          <stop offset="1" stopColor={palette[id][1]} />
        </linearGradient>
      </defs>
      <rect
        x=".5"
        y=".5"
        width="63"
        height="63"
        rx="16"
        fill={`url(#${gradient})`}
        stroke="white"
        strokeOpacity=".25"
      />
      <path
        d="M16 1.2h32a14.8 14.8 0 0 1 14.8 14.8v8C42 32 22 32 1.2 24v-8A14.8 14.8 0 0 1 16 1.2Z"
        fill="white"
        fillOpacity=".07"
      />
      {art[id]}
    </svg>
  );
}
