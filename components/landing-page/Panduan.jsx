import { LogIn, Box, FileText, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';

const panduanData = [
  {
    icon: <LogIn className="w-8 h-8" />,
    gradient: 'bg-gradient-to-br from-cyan-100 to-blue-200',
    title: 'Login & Autentikasi',
    description:
      'Masuk ke aplikasi menggunakan akun yang telah terdaftar untuk mengakses dashboard utama.',
  },
  {
    icon: <Box className="w-8 h-8 " />,
    gradient: 'bg-gradient-to-br from-green-100 to-emerald-200',
    title: 'Kelola Data Barang',
    description: 'Tambah, ubah, dan hapus data barang gudang dengan cepat dan terorganisir.',
  },
  {
    icon: <FileText className="w-8 h-8 " />,
    gradient: 'bg-gradient-to-br from-purple-100 to-indigo-200',
    title: 'Laporan & Rekapitulasi',
    description: 'Lihat laporan inventaris secara real-time dan unduh rekapitulasi data bulanan.',
  },
  {
    icon: <Warehouse className="w-8 h-8 " />,
    gradient: 'bg-gradient-to-br from-orange-100 to-amber-200',
    title: 'Monitoring Stok',
    description: 'Pantau jumlah stok barang berdasarkan kategori untuk memudahkan pengelolaan.',
  },
];

export default function Panduan({ ref }) {
  return (
    <div
      className="w-full px-4 sm:px-8 md:px-24 py-12 md:py-24 flex flex-col items-center justify-center"
      ref={ref}
    >
      {/* Teks Section */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Panduan Penggunaan Aplikasi</h1>
        <h2 className="text-black/50 text-base md:text-xl">
          Langkah-langkah sederhana untuk mulai menggunakan SibarKumen.
        </h2>
      </div>

      {/* Grid Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {panduanData.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-6"
          >
            {/* Icon section */}
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center ${item.gradient}`}
            >
              {item.icon}
            </div>
            {/* Text section */}
            <div>
              <h3 className="font-bold text-lg mb-2">{`${index + 1}. ${item.title}`}</h3>
              <p className="text-black/50 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="">
        <Button>Lihat Panduan Lengkap</Button>
      </div>
    </div>
  );
}
