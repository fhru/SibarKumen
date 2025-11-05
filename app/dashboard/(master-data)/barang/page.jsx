import { getBarang, getBarangStats } from '@/lib/data/barang';
import { getCategories } from '@/lib/data/kategori';
import { BarangTable } from '@/components/barang/table';

export default async function BarangPage() {
  const barang = await getBarang();
  const stats = await getBarangStats();
  const kategori = await getCategories();

  return (
    <div className="p-4">
      <BarangTable initialBarang={barang} stats={stats} kategori={kategori} />
    </div>
  );
}

