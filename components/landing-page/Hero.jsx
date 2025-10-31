import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero({ onScrollToPanduan }) {
  return (
    <div className="relative px-8 md:px-24 pt-[100px] md:pt-[200px] pb-[75px] md:pb-[150px] flex flex-col items-center justify-center gap-6 ">
      {/* Section Teks */}
      <div className="flex items-center justify-center gap-3 flex-col text-center">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          Sistem Inventaris Barang <br /> Kelurahan{' '}
          <span className="text-primary">Ujung Menteng</span>
        </h1>
        <h2 className="text-base md:text-2xl text-black/50">
          Kelola aset dan stok barang kelurahan dengan cepat, rapi, dan transparan.
        </h2>
      </div>

      {/* Section Button */}
      <div className="flex gap-3">
        <Link href={'#'}>
          <Button size={'lg'}>Mulai Sekarang</Button>
        </Link>
        <Button size={'lg'} variant={'outline'} onClick={onScrollToPanduan}>
          Panduan
        </Button>
      </div>
    </div>
  );
}
