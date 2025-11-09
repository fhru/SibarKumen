import { getBarangMasuk } from '@/lib/data/transaksi';
import { getCategories } from '@/lib/data/kategori';
import { getSatuan } from '@/lib/data/satuan';
import { getBarang } from '@/lib/data/barang';
import { BarangMasukTable } from '@/components/transaksi/barang-masuk/table';
import { convertDecimalsToNumbers } from '@/lib/utils';

export default async function BarangMasuk() {
  const barangMasuk = await getBarangMasuk();
  const kategori = await getCategories();
  const barang = await getBarang();
  const satuan = await getSatuan();
  const  initialBarangMasuk = convertDecimalsToNumbers(barangMasuk);

  return (
    <div className="p-4">
      <div className="">
        <BarangMasukTable
          initialBarangMasuk={initialBarangMasuk}
          categories={kategori}
          barangList={barang}
          satuanList={satuan}
        />
      </div>
    </div>
  );
}
