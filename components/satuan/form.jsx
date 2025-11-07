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

const formSchema = z.object({
  nama_satuan: z.string().min(2, "Nama satuan terlalu pendek"),
  singkatan: z.string().min(1, "Singkatan tidak boleh kosong"),
  keterangan: z.string().optional(),
});

export function SatuanForm({ satuan, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: satuan
      ? {
          nama_satuan: satuan.nama_satuan,
          singkatan: satuan.singkatan,
          keterangan: satuan.keterangan || "",
        }
      : {
          nama_satuan: "",
          singkatan: "",
          keterangan: "",
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
          name="nama_satuan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Satuan</FormLabel>
              <FormControl>
                <Input placeholder="Nama Satuan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="singkatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Singkatan</FormLabel>
              <FormControl>
                <Input placeholder="Singkatan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keterangan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Input placeholder="Keterangan" {...field} value={field.value || ''} />
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
