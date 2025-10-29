import BentoFirst from '@/components/landing-page/bento/BentoFirst';
import BentoSecond from '@/components/landing-page/bento/BentoSecond';
import BentoThird from '@/components/landing-page/bento/BentoThird';
import BentoFourth from '@/components/landing-page/bento/BentoFourth';

export default function About() {
  return (
    <div className="w-full px-24 py-16 flex flex-col">
      {/* Teks Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-8">Tentang Aplikasi</h1>
        <h2 className="text-black/50 text-xl">
          SibarKumen adalah sistem digital untuk mencatat, memantau, dan melaporkan inventaris
          gudang kelurahan secara efisien dan transparan.
        </h2>
      </div>

      {/* Bento Section */}
      <div className="w-full">
        <div className="grid grid-cols-3 gap-6">
          <BentoFirst />
          <BentoSecond />
          <BentoThird />
          <BentoFourth />
        </div>
      </div>
    </div>
  );
}
