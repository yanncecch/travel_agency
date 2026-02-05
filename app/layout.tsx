import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chatbot/ChatWidget';

export const metadata: Metadata = {
  title: 'TimeTravel Agency',
  description: 'Agence fictive de voyage temporel de luxe'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="font-[var(--font-body)] antialiased">
        <Header />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
