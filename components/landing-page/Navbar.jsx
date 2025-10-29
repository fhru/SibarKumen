import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="w-full px-24 py-6 flex items-center justify-between">
      {/* Logo Section */}
      <div className="font-bold text-2xl flex items-center">
        <Image
          src="/images/sibarkumenlogo.png"
          alt="SibarKumen Logo"
          width={500}
          height={500}
          className="max-h-16 max-w-16"
        />
        <div className="text-2xl font-bold">SibarKumen</div>
      </div>
      {/* Nav Items Section */}
      <div className="flex items-center gap-6">
        <Link href={'#'}>Kontak</Link>
        <Link href={'#'}>Inventaris</Link>
        <Link href={'#'}>Laporan</Link>
        <Link href={'/login'}>
          <Button size={'lg'}>Login</Button>
        </Link>
      </div>
    </div>
  );
}
