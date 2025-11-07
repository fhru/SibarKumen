'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full px-8 md:px-24 py-6 flex items-center justify-between relative z-50">
      {/* Logo Section */}
      <div className="font-bold text-2xl flex items-center">
        <Image
          src="/images/sibarkumenlogo.png"
          alt="SibarKumen Logo"
          width={500}
          height={500}
          className="max-h-8 md:max-h-16 max-w-8 md:max-w-16"
        />
        <div className="text-lg md:text-2xl font-bold">SibarKumen</div>
      </div>

      {/* Nav Items Section */}
      <div className="items-center gap-6 hidden md:flex">
        <Link href={'#'}>Kontak</Link>
        <Link href={'#'}>Inventaris</Link>
        <Link href={'#'}>Laporan</Link>
        <ThemeToggle />
        <Button asChild size={'lg'}>
          <Link href={'/login'}>Login</Link>
        </Button>
      </div>

      {/* Mobile Hamburger */}
      <button
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring z-50"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute left-0 right-0 top-full origin-top overflow-hidden border-t border-border bg-background/90 backdrop-blur transition-all duration-300 z-60 ${
          open
            ? 'max-h-64 opacity-100 pointer-events-auto'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2 px-8 py-4">
          <Link
            href={'#'}
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2 transition-colors hover:bg-accent"
          >
            Kontak
          </Link>
          <Link
            href={'#'}
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2 transition-colors hover:bg-accent"
          >
            Inventaris
          </Link>
          <Link
            href={'#'}
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2 transition-colors hover:bg-accent"
          >
            Laporan
          </Link>
          <Button asChild className="w-full" size={'lg'}>
            <Link href={'/login'} onClick={() => setOpen(false)}>
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
