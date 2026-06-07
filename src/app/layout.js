import './globals.css';

export const metadata = {
  title: 'Study Timeline — Rust & AI Agents',
  description: 'Your day-by-day agenda to learn Rust and build AI agents with Rig + local LLMs',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/rust-icon.svg',
    apple: '/icons/rust-icon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Study Timeline',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/rust-icon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#6c63ff" />
      </head>
      <body>{children}</body>
    </html>
  );
}
