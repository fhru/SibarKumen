import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative px-24 pt-[200px] pb-[150px] flex flex-col items-center justify-center gap-6 ">
      {/* Section Teks */}
      <div className="flex items-center justify-center gap-3 flex-col text-center">
        <h1 className="text-7xl font-bold leading-[90px]">
          Sistem Inventaris Barang <br /> Kelurahan{' '}
          <span className="text-primary">Ujung Menteng</span>
        </h1>
        <h2 className="text-2xl text-black/50">
          Kelola aset dan stok barang kelurahan dengan cepat, rapi, dan transparan.
        </h2>
      </div>

      {/* Section Button */}
      <div className="flex gap-3">
        <Link href={'#'}>
          <Button size={'lg'}>Mulai Sekarang</Button>
        </Link>
        <Link href={'#'}>
          <Button size={'lg'} variant={'outline'}>
            Panduan
          </Button>
        </Link>
      </div>

      {/* Mesh */}
      {/* <div className="fixed inset-0 -z-10 bg-[radial-gradient(at_20%_30%,#ffafbd,transparent_60%),radial-gradient(at_80%_20%,#ffc3a0,transparent_60%),radial-gradient(at_50%_80%,#a1c4fd,transparent_60%),radial-gradient(at_90%_70%,#c2e9fb,transparent_60%)]" /> */}
    </div>
  );
}
