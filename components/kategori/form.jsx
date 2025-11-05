'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  nama_kategori: z.string().min(2, 'Nama kategori terlalu pendek'),
  keterangan: z.string().optional(),
});

export function KategoriForm({ kategori, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: kategori
      ? {
          nama_kategori: kategori.nama_kategori,
          keterangan: kategori.keterangan,
        }
      : {
          nama_kategori: '',
          keterangan: '',
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
          name="nama_kategori"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Kategori</FormLabel>
              <FormControl>
                <Input placeholder="Nama Kategori" {...field} />
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
                <Input placeholder="Keterangan" {...field} />
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
