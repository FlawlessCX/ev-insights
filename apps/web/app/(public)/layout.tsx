export const metadata = { title: 'EV Insights', description: 'UK EV data & guidance' };
import './globals.css';
export default function RootLayout({ children }) {
  return (<html lang="en"><body className="min-h-screen bg-white text-gray-900">{children}</body></html>);
}
