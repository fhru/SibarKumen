import Image from 'next/image';

export default function BentoFourth() {
  return (
    <div className="col-span-2 p-6 rounded-3xl bg-[#FFE9D6]">
      {' '}
      <div className="flex">
        <div className="flex justify-end flex-col gap-3">
          <h1 className="text-4xl font-bold">Riwayat & Rekap Data Barang</h1>
          <p className="text-black/50">
            Simpan seluruh aktivitas barang untuk kebutuhan pelacakan dan laporan bulanan.
          </p>
        </div>
        <div className="">
          <Image
            src={'/images/bento-2.png'}
            alt="Bento Image"
            width={500}
            height={500}
            className="max-w-72"
          />
        </div>
      </div>
    </div>
  );
}
