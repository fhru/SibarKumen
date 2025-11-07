import { getSatuan, getSatuanStats } from '@/lib/data/satuan';
import { SatuanTable } from '@/components/satuan/table';

export default async function SatuanPage() {
  const satuan = await getSatuan();
  const stats = await getSatuanStats();

  return (
    <div className="p-4">
      <SatuanTable initialSatuan={satuan} stats={stats} />
    </div>
  );
}