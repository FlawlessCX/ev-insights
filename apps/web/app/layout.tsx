// apps/web/app/layout.tsx
export const metadata = { title: 'EV Insights', description: 'UK EV data & guidance' };

import './styles/globals.css'; // adjust path if needed (../styles)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">{children}</body>
    </html>
  );
}
