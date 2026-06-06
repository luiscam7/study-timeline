import './globals.css';

export const metadata = {
  title: 'Study Timeline — Rust & AI Agents',
  description: 'Your day-by-day agenda to learn Rust and build AI agents with Rig + local LLMs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
