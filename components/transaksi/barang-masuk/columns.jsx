// components/barang-masuk/columns.js
import { Button } from '@/components/ui/button';

export const makeColumns = ({ handleEdit, handleDelete }) => [
  {
    accessorKey: 'id_barang_masuk',
    header: 'ID Masuk',
  },
  {
    accessorKey: 'tanggal_masuk',
    header: 'Tanggal Masuk',
    cell: ({ row }) => {
      const tanggalMasuk = row.getValue('tanggal_masuk');
      return new Date(tanggalMasuk).toLocaleDateString('id-ID');
    },
  },
  {
    accessorKey: 'users.nama_lengkap',
    header: 'User',
  },
  {
    id: 'detail_barang',
    header: 'Detail Barang',
    cell: ({ row }) => {
      const items = row.original.detail_barang_masuk;

      const ItemsList = () => (
        <div className="space-y-1 max-w-xs">
          {items?.map((item, index) => (
            <div key={index} className="text-sm border-b pb-1 last:border-b-0">
              <div className="font-medium">
                {item.barang.kode_barang} - {item.barang.nama_barang}
              </div>
              <div className="text-gray-600">
                Jumlah: {item.jumlah} {item.barang.satuan?.singkatan || 'pcs'}
                {item.harga &&
                  ` | Harga: Rp ${parseFloat(item.harga).toLocaleString(
                    'id-ID'
                  )}`}
              </div>
            </div>
          ))}
        </div>
      );

      return <ItemsList />;
    },
  },
  {
    id: 'total_jumlah',
    header: 'Total Qty',
    cell: ({ row }) => {
      const items = row.original.detail_barang_masuk;
      const total =
        items?.reduce((sum, item) => sum + (item.jumlah || 0), 0) || 0;
      return total.toLocaleString('id-ID');
    },
  },
  {
    id: 'total_harga',
    header: 'Price',
    cell: ({ row }) => {
      const items = row.original.detail_barang_masuk;
      const total =
        items?.reduce((sum, item) => {
          const harga = parseFloat(item.harga) || 0;
          const jumlah = item.jumlah || 0;
          return sum + harga * jumlah;
        }, 0) || 0;

      return total > 0 ? `Rp ${total.toLocaleString('id-ID')}` : '-';
    },
  },
  {
    accessorKey: 'keterangan',
    header: 'Keterangan',
    cell: ({ row }) => row.getValue('keterangan') || '-',
  },
  {
    id: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      const createdAt = row.original.created_at;
      return createdAt ? new Date(createdAt).toLocaleDateString('id-ID') : '-';
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const ActionButtons = () => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(row.original)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(row.original)}>
            Hapus
          </Button>
        </div>
      );

      return <ActionButtons />;
    },
  },
];
