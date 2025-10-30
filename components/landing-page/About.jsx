import BentoFirst from '@/components/landing-page/bento/BentoFirst';
import BentoSecond from '@/components/landing-page/bento/BentoSecond';
import BentoThird from '@/components/landing-page/bento/BentoThird';
import BentoFourth from '@/components/landing-page/bento/BentoFourth';

export default function About() {
  return (
    <div className="w-full px-4 sm:px-8 md:px-24 py-12 md:py-16 flex flex-col overflow-hidden">
      <div className="text-center mb-4 md:mb-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">Tentang Aplikasi</h1>
        <h2 className="text-black/50 text-base md:text-xl">
          SibarKumen adalah sistem digital untuk mencatat, memantau, dan melaporkan inventaris
          gudang kelurahan secara efisien dan transparan.
        </h2>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <BentoFirst />
          <div className="flex flex-row gap-4 md:gap-6 md:contents">
            <div className="flex-1 md:contents">
              <BentoSecond />
            </div>
            <div className="flex-1 md:contents">
              <BentoThird />
            </div>
          </div>
          <BentoFourth />
        </div>
      </div>
    </div>
  );
}
