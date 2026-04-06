import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'CareerBridge｜AI 青年求職／實習媒合助理',
  description: 'CareerBridge 是 AI 驅動的青年職涯媒合平台，協助台北青年找到適合的實習與工作機會、補齊技能差距、接上台北既有職涯資源。',
  keywords: ['求職', '實習', '青年', '台北', 'AI', '職涯', '媒合', 'CareerBridge'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>
        <Navbar />
        <main style={{ paddingTop: 'calc(var(--navbar-height) + 32px)', minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
