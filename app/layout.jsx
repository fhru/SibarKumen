import { Geist } from 'next/font/google';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata = {
  title: 'SibarKumen',
  description: 'Sistem Inventaris Barang Kelurahan Ujung Menteng',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
