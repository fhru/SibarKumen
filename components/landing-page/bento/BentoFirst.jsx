import Image from 'next/image';

export default function BentoFirst() {
  return (
    <div className="col-span-2 bg-[#A8E6E6] p-6 rounded-3xl">
      <div className="flex">
        <div className="flex justify-end flex-col gap-3">
          <h1 className="text-4xl font-bold">
            Pencatatan Barang <br /> Otomatis
          </h1>
          <p className="text-black/50">
            Tambah, ubah, dan hapus data barang gudang dengan cepat dan terorganisir.
          </p>
        </div>
        <div className="">
          <Image
            src={'/images/bento-1.png'}
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
