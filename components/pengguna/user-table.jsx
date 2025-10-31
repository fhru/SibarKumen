'use client';

import { useState } from 'react';
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
import { UserForm } from '@/components/pengguna/user-form';
import { columns as makeColumns } from '@/components/pengguna/columns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { SummaryCards } from "@/components/pengguna/summary-cards"

export function UserTable({ users, stats }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDelete = (user) => {
    setDeleteUser(user);
  };

  const confirmDelete = async () => {
    if (deleteUser) {
      const res = await fetch(`/api/users/${deleteUser.id_user}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('User deleted successfully');
        router.refresh();
      } else {
        toast.error('Failed to delete user');
      }
      setDeleteUser(null);
    }
  };

  const handleSubmit = async (values) => {
    const url = selectedUser ? `/api/users/${selectedUser.id_user}` : '/api/users';
    const method = selectedUser ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      toast.success(`User ${selectedUser ? 'updated' : 'created'} successfully`);
      setOpen(false);
      setSelectedUser(null);
      router.refresh();
    } else {
      toast.error(`Failed to ${selectedUser ? 'update' : 'create'} user`);
    }
  };

  const columns = makeColumns({ handleEdit, handleDelete });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pengguna</h1>
        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedUser(null);
          }
        }}>
          <DialogTrigger asChild>
            <Button>Tambah Pengguna</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedUser ? "Edit User" : "Tambah Pengguna"}</DialogTitle>
            </DialogHeader>
            <UserForm user={selectedUser} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <SummaryCards stats={stats} />

      <AlertDialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DataTable columns={columns} data={users} />
    </div>
  )
}
