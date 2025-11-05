"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { KategoriForm } from "@/components/kategori/form";
import { columns as makeColumns } from "@/components/kategori/columns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SummaryCards } from "@/components/kategori/summary-cards";

export function KategoriTable({ initialCategories, stats }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [deleteKategori, setDeleteKategori] = useState(null);

  const handleEdit = (kategori) => {
    setSelectedKategori(kategori);
    setOpen(true);
  };

  const handleDelete = (kategori) => {
    setDeleteKategori(kategori);
  };

  const confirmDelete = async () => {
    if (deleteKategori) {
      const res = await fetch(`/api/kategori/${deleteKategori.id_kategori}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Kategori deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete kategori");
      }
      setDeleteKategori(null);
    }
  };

  const handleSubmit = async (values) => {
    const url = selectedKategori
      ? `/api/kategori/${selectedKategori.id_kategori}`
      : "/api/kategori";
    const method = selectedKategori ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      toast.success(
        `Kategori ${selectedKategori ? "updated" : "created"} successfully`,
      );
      setOpen(false);
      setSelectedKategori(null);
      router.refresh();
    } else {
      toast.error(
        `Failed to ${selectedKategori ? "update" : "create"} kategori`,
      );
    }
  };

  const columns = makeColumns({ handleEdit, handleDelete });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kategori</h1>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setSelectedKategori(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>Tambah Kategori</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedKategori ? "Edit Kategori" : "Tambah Kategori"}
              </DialogTitle>
            </DialogHeader>
            <KategoriForm kategori={selectedKategori} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <SummaryCards stats={stats} />

      <AlertDialog
        open={!!deleteKategori}
        onOpenChange={() => setDeleteKategori(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable columns={columns} data={initialCategories} />
    </div>
  );
}
