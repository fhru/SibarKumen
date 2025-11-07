import Image from 'next/image';

export default function BentoFirst() {
  return (
    <div className="md:col-span-2 bg-[#A8E6E6] dark:bg-[#0D4747] p-4 md:p-6 rounded-3xl">
      <div className="flex flex-col-reverse md:flex-row md:items-center">
        <div className="flex justify-end flex-col gap-2 md:gap-3">
          <h1 className="text-2xl md:text-4xl font-bold text-foreground">
            Pencatatan Barang <br /> Otomatis
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Tambah, ubah, dan hapus data barang gudang dengan cepat dan terorganisir.
          </p>
        </div>
        <div className="w-full flex justify-center md:justify-end">
          <Image
            src={'/images/bento-1.png'}
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
