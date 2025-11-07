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
    accessorKey: "nama_satuan",
    header: "Nama Satuan",
  },
  {
    accessorKey: "singkatan",
    header: "Singkatan",
  },
  {
    accessorKey: "keterangan",
    header: "Keterangan",
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
      const satuan = row.original

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
            <DropdownMenuItem onClick={() => handleEdit(satuan)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(satuan)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
