import { getBarang, getBarangStats } from '@/lib/data/barang';
import { getCategories } from '@/lib/data/kategori';
import { getSatuan } from '@/lib/data/satuan';
import { BarangTable } from '@/components/barang/table';

export default async function BarangPage() {
  const barang = await getBarang();
  const stats = await getBarangStats();
  const kategori = await getCategories();
  const satuan = await getSatuan();

  return (
    <div className="p-4">
      <BarangTable initialBarang={barang} stats={stats} kategori={kategori} satuan={satuan} />
    </div>
  );
}