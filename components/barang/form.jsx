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
  kode_barang: z.string().optional(),
  nama_barang: z.string().min(2, "Nama barang terlalu pendek"),
  id_kategori: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number({ required_error: "Kategori harus diisi" }).int().positive()
  ),
  id_satuan: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number({ required_error: "Satuan harus diisi" }).int().positive()
  ),
  stok_minimum: z.number().int().min(0, "Stok minimum tidak boleh negatif"),
  deskripsi: z.string().optional(),
});

export function BarangForm({ barang, kategori, satuan, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: barang
      ? {
          kode_barang: barang.kode_barang,
          nama_barang: barang.nama_barang,
          id_kategori: barang.id_kategori,
          id_satuan: barang.id_satuan,
          stok_minimum: barang.stok_minimum,
          deskripsi: barang.deskripsi || "",
        }
      : {
          nama_barang: "",
          id_kategori: undefined,
          id_satuan: undefined,
          stok_minimum: 0,
          deskripsi: "",
        },
  });

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {barang && (
          <FormField
            control={form.control}
            name="kode_barang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode Barang</FormLabel>
                <FormControl>
                  <Input placeholder="Kode Barang" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
                onValueChange={field.onChange}
                defaultValue={field.value ? String(field.value) : ""}
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
          name="id_satuan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Satuan</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value ? String(field.value) : ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Satuan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {satuan.map((s) => (
                    <SelectItem
                      key={s.id_satuan}
                      value={String(s.id_satuan)}
                    >
                      {s.nama_satuan} ({s.singkatan})
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
          name="stok_minimum"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stok Minimum</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Stok Minimum" {...field} onChange={event => field.onChange(Number(event.target.value))} />
              </FormControl>
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
                <Input placeholder="Deskripsi" {...field} value={field.value || ''} />
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
