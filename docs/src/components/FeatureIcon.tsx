import React from 'react';

export type FeatureIconName =
  | 'chat'
  | 'call'
  | 'todo'
  | 'theater'
  | 'image'
  | 'memory'
  | 'focus'
  | 'agent'
  | 'theme';

const paths: Record<FeatureIconName, React.ReactNode> = {
  chat: (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H8l-4.5 3v-3.7A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8 10.5h8M8 14h5" />
    </>
  ),
  call: (
    <>
      <rect x="3" y="5" width="13" height="14" rx="3" />
      <path d="M16 10h2.5A2.5 2.5 0 0 1 21 12.5v2A2.5 2.5 0 0 1 18.5 17H16" />
      <path d="M7 9h5M7 12h3" />
    </>
  ),
  todo: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.5 2.6 2.6L16.5 9" />
    </>
  ),
  theater: (
    <>
      <path d="M4 8.5c0-1.4 1.2-2.5 2.6-2.5h3.2c1.4 0 2.6 1.1 2.6 2.5v4.8c0 2.9-2.1 5.2-4.7 5.2S4 16.2 4 13.3v-4.8Z" />
      <path d="M12 12c0-1.4 1.2-2.5 2.6-2.5h3.2c1.4 0 2.6 1.1 2.6 2.5v4.8c0 2.9-2.1 5.2-4.7 5.2" />
      <path d="M6.8 11.2h.01M9.4 11.2h.01" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="3" />
      <circle cx="8.5" cy="9.5" r="1.6" />
      <path d="m5 17 4.8-4.6L14 17M12.5 14.5 16 11l3 3.2" />
    </>
  ),
  memory: (
    <>
      <path d="M12 4.5c1 2 2.1 3.1 4 4.2-1.9 1.1-3 2.2-4 4.2-1-2-2.1-3.1-4-4.2 1.9-1.1 3-2.2 4-4.2Z" />
      <path d="M6 13c.7 1.4 1.5 2.2 2.8 3-1.3.8-2.1 1.6-2.8 3-.7-1.4-1.5-2.2-2.8-3 1.3-.8 2.1-1.6 2.8-3Z" />
      <path d="M17.5 13c.6 1.2 1.3 1.9 2.4 2.6-1.1.7-1.8 1.4-2.4 2.6-.6-1.2-1.3-1.9-2.4-2.6 1.1-.7 1.8-1.4 2.4-2.6Z" />
    </>
  ),
  focus: (
    <>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9v4.2l2.6 1.6M9 3.5h6" />
    </>
  ),
  agent: (
    <>
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 3.5v3.5M8.5 12h.01M15.5 12h.01M8.5 19v2M15.5 19v2" />
    </>
  ),
  theme: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 1-8.5 8.5c0-1 .8-1.6 1.8-1.6h1.6c1 0 1.7-.7 1.7-1.7V7.1c0-2 1.4-3.6 3.4-3.6Z" />
      <circle cx="8" cy="9.5" r=".9" />
      <circle cx="11.5" cy="7.6" r=".9" />
      <circle cx="15.2" cy="9.2" r=".9" />
    </>
  ),
};

export default function FeatureIcon({
  name,
  size = 22,
}: {
  name: FeatureIconName;
  size?: number;
}): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
