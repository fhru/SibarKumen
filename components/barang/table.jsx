'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
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
import { BarangForm } from '@/components/barang/form';
import { columns as makeColumns } from '@/components/barang/columns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { SummaryCards } from "@/components/barang/summary-cards"

export function BarangTable({ initialBarang, stats, kategori, satuan }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [deleteBarang, setDeleteBarang] = useState(null);

  const handleEdit = (barang) => {
    setSelectedBarang(barang);
    setOpen(true);
  };

  const handleDelete = (barang) => {
    setDeleteBarang(barang);
  };

  const confirmDelete = async () => {
    if (deleteBarang) {
      const res = await fetch(`/api/barang/${deleteBarang.id_barang}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Barang deleted successfully');
        router.refresh();
      } else {
        toast.error('Failed to delete barang');
      }
      setDeleteBarang(null);
    }
  };

  const handleSubmit = async (values) => {
    const url = selectedBarang ? `/api/barang/${selectedBarang.id_barang}` : '/api/barang';
    const method = selectedBarang ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      toast.success(`Barang ${selectedBarang ? 'updated' : 'created'} successfully`);
      setOpen(false);
      setSelectedBarang(null);
      router.refresh();
    } else {
      toast.error(`Failed to ${selectedBarang ? 'update' : 'create'} barang`);
    }
  };

  const columns = makeColumns({ handleEdit, handleDelete });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Barang</h1>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedBarang(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button>Tambah Barang</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedBarang ? "Edit Barang" : "Tambah Barang"}</DialogTitle>
            </DialogHeader>
            <BarangForm barang={selectedBarang} kategori={kategori} satuan={satuan} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <SummaryCards stats={stats} />

      <AlertDialog open={!!deleteBarang} onOpenChange={() => setDeleteBarang(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable columns={columns} data={initialBarang} className="bg-white p-4 rounded-md shadow" />
    </div>
  )
}
