import { getCategories, getCategoryStats } from '@/lib/data/kategori';
import { KategoriTable } from '@/components/kategori/table';

export default async function KategoriPage() {
  const categories = await getCategories();
  const stats = await getCategoryStats();

  return (
    <div className="p-4">
      <KategoriTable initialCategories={categories} stats={stats} />
    </div>
  );
}
