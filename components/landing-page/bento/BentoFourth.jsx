import Image from 'next/image';

export default function BentoFourth() {
  return (
    <div className="md:col-span-2 p-4 md:p-6 rounded-3xl bg-[#FFE9D6]">
      <div className="flex flex-col-reverse md:flex-row md:items-center">
        <div className="flex justify-end flex-col gap-2 md:gap-3">
          <h1 className="text-2xl md:text-4xl font-bold">Riwayat & Rekap Data Barang</h1>
          <p className="text-black/50 text-sm md:text-base">
            Simpan seluruh aktivitas barang untuk kebutuhan pelacakan dan laporan bulanan.
          </p>
        </div>
        <div className="w-full flex justify-center md:justify-end">
          <Image
            src={'/images/bento-2.png'}
            alt="Bento Image"
            width={500}
            height={500}
            className="max-w-48 md:max-w-72"
          />
        </div>
      </div>
    </div>
  );
}
