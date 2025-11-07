"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  kode_barang: z.string().min(2, "Kode barang terlalu pendek"),
  nama_barang: z.string().min(2, "Nama barang terlalu pendek"),
  id_kategori: z.number().int().positive(),
  deskripsi: z.string().optional(),
});

export function BarangForm({ barang, kategori, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: barang
      ? {
          kode_barang: barang.kode_barang,
          nama_barang: barang.nama_barang,
          id_kategori: barang.id_kategori,
          deskripsi: barang.deskripsi,
        }
      : {
          kode_barang: "",
          nama_barang: "",
          id_kategori: null,
          deskripsi: "",
        },
  });

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="kode_barang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Barang</FormLabel>
              <FormControl>
                <Input placeholder="Kode Barang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nama_barang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Barang</FormLabel>
              <FormControl>
                <Input placeholder="Nama Barang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_kategori"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {kategori.map((k) => (
                    <SelectItem
                      key={k.id_kategori}
                      value={String(k.id_kategori)}
                    >
                      {k.nama_kategori}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deskripsi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Input placeholder="Deskripsi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
