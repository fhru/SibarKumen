'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { BarangMasukForm } from '@/components/transaksi/barang-masuk/barang-masuk-form';
import { DataTable } from '@/components/ui/data-table';
import { makeColumns } from './columns';

export function BarangMasukTable({
  initialBarangMasuk,
  categories, // Data kategori dari server
  barangList, // Data barang dari server
  satuanList, // Data satuan dari server
}) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBarangMasuk, setSelectedBarangMasuk] = useState(null);
  const [barangMasukToDelete, setBarangMasukToDelete] = useState(null);

  const handleEditBarangMasuk = (barangMasuk) => {
    setSelectedBarangMasuk(barangMasuk);
    setIsDialogOpen(true);
  };

  const handleDeleteBarangMasuk = (barangMasuk) => {
    setBarangMasukToDelete(barangMasuk);
  };

  const confirmDeleteBarangMasuk = async () => {
    if (barangMasukToDelete) {
      try {
        const response = await fetch(
          `/api/transaksi/barang-masuk/${barangMasukToDelete.id_barang_masuk}`,
          {
            method: 'DELETE',
          }
        );

        const result = await response.json();

        if (response.ok) {
          console.log('Berhasil: Data barang masuk berhasil dihapus');
          router.refresh();
        } else {
          console.error(
            'Gagal: ' + (result.error || 'Gagal menghapus barang masuk')
          );
        }
      } catch (error) {
        console.error('Error: Terjadi kesalahan saat menghapus barang masuk');
      } finally {
        setBarangMasukToDelete(null);
      }
    }
  };

  const handleSubmitBarangMasuk = async (formData) => {
  try {
    console.log('📦 FORM DATA DITERIMA:', formData);
    console.log('🔍 ITEMS:', formData?.items);
    console.log('🔍 DETAILS:', formData?.details);
    
    // Gunakan items jika ada, jika tidak gunakan details
    const items = formData.items || formData.details;
    
    console.log('✅ ITEMS YANG AKAN DIPROSES:', items);
    
    if (!items || !Array.isArray(items)) {
      throw new Error('Data items/details tidak valid - harus berupa array');
    }

    if (items.length === 0) {
      throw new Error('Minimal harus ada satu item barang');
    }

    const isEditMode = !!selectedBarangMasuk;
    const url = isEditMode
      ? `/api/transaksi/barang-masuk/${selectedBarangMasuk.id_barang_masuk}`
      : '/api/transaksi/barang-masuk';

    const method = isEditMode ? 'PUT' : 'POST';

    // Kirim ke backend sebagai details (sesuai dengan transaksi.js)
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tanggal_masuk: formData.tanggal_masuk,
        keterangan: formData.keterangan || '',
        details: items,  // Kirim sebagai details
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log(`Berhasil: Barang masuk berhasil ${isEditMode ? 'diperbarui' : 'ditambahkan'}`);
      setIsDialogOpen(false);
      setSelectedBarangMasuk(null);
      router.refresh();
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Gagal: ' + error.message);
    alert('Gagal: ' + error.message);
  }
};

  const handleDialogOpenChange = (isOpen) => {
    setIsDialogOpen(isOpen);
    if (!isOpen) {
      setSelectedBarangMasuk(null);
    }
  };

  const columns = makeColumns({
    handleEdit: handleEditBarangMasuk,
    handleDelete: handleDeleteBarangMasuk,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Barang Masuk</h1>
          <p className="text-muted-foreground">
            Kelola data barang masuk dan stok inventory
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button size="lg">Tambah Barang Masuk</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedBarangMasuk
                  ? 'Edit Barang Masuk'
                  : 'Tambah Barang Masuk Baru'}
              </DialogTitle>
            </DialogHeader>
            <BarangMasukForm
              barangMasuk={selectedBarangMasuk}
              onSubmit={handleSubmitBarangMasuk}
              categories={categories} // Pass categories ke form
              barangList={barangList} // Pass barangList ke form
              satuanList={satuanList} // Pass satuanList ke form
            />
          </DialogContent>
        </Dialog>
      </div>

      <AlertDialog
        open={!!barangMasukToDelete}
        onOpenChange={() => setBarangMasukToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Barang Masuk?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data barang masuk akan
              dihapus permanen dan stok barang akan dikurangi sesuai dengan
              jumlah yang tercatat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteBarangMasuk}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable
        columns={columns}
        data={initialBarangMasuk}
        searchKey="users.nama_lengkap"
        placeholder="Cari berdasarkan nama user..."
      />
    </div>
  );
}
