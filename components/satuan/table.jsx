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
import { SatuanForm } from "@/components/satuan/form";
import { columns as makeColumns } from "@/components/satuan/columns";
import { SummaryCards } from "@/components/satuan/summary-cards";
import { useRouter } from "next/navigation";

export function SatuanTable({ initialSatuan, stats }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedSatuan, setSelectedSatuan] = useState(null);
  const [deleteSatuan, setDeleteSatuan] = useState(null);

  const handleEdit = (satuan) => {
    setSelectedSatuan(satuan);
    setOpen(true);
  };

  const handleDelete = (satuan) => {
    setDeleteSatuan(satuan);
  };

  const confirmDelete = async () => {
    if (deleteSatuan) {
      const res = await fetch(`/api/satuan/${deleteSatuan.id_satuan}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Satuan deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete satuan");
      }
      setDeleteSatuan(null);
    }
  };

  const handleSubmit = async (values) => {
    const url = selectedSatuan
      ? `/api/satuan/${selectedSatuan.id_satuan}`
      : "/api/satuan";
    const method = selectedSatuan ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      toast.success(
        `Satuan ${selectedSatuan ? "updated" : "created"} successfully`,
      );
      setOpen(false);
      setSelectedSatuan(null);
      router.refresh();
    } else {
      toast.error(`Failed to ${selectedSatuan ? "update" : "create"} satuan`);
    }
  };

  const columns = makeColumns({ handleEdit, handleDelete });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Satuan</h1>
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            setOpen(isOpen);
            if (!isOpen) {
              setSelectedSatuan(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>Tambah Satuan</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedSatuan ? "Edit Satuan" : "Tambah Satuan"}
              </DialogTitle>
            </DialogHeader>
            <SatuanForm satuan={selectedSatuan} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <SummaryCards stats={stats} />

      <AlertDialog
        open={!!deleteSatuan}
        onOpenChange={() => setDeleteSatuan(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              satuan.
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

      <DataTable columns={columns} data={initialSatuan} />
    </div>
  );
}
