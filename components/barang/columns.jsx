'use client'

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns = ({ handleEdit, handleDelete }) => [
  {
    header: "No",
    cell: ({ row }) => {
        return row.index + 1;
    },
  },
  {
    accessorKey: "kode_barang",
    header: "Kode Barang",
  },
  {
    accessorKey: "nama_barang",
    header: "Nama Barang",
  },
  {
    accessorKey: "kategori.nama_kategori",
    header: "Kategori",
  },
  {
    accessorKey: "deskripsi",
    header: "Deskripsi",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      const formatted = date.toLocaleDateString()
      return <div className="font-medium">{formatted}</div>
    },
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const barang = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(barang)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(barang)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
