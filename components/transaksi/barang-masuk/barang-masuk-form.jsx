'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  tanggal_masuk: z.string().min(1, 'Tanggal masuk harus diisi'),
  keterangan: z.string().optional(),
  items: z.array(
    z.object({
      id_barang: z.number().optional(),
      nama_barang: z.string().min(1, 'Nama barang harus diisi'),
      id_kategori: z.number().min(1, 'Kategori harus dipilih'),
      deskripsi: z.string().optional(),
      jumlah: z.number().min(1, 'Jumlah harus lebih dari 0'),
      harga: z.number().min(0, 'Harga tidak boleh negatif').optional(),
      id_satuan: z.number().min(1, 'Satuan harus dipilih'),
    })
  ).min(1, 'Minimal ada satu item barang'),
});

export function BarangMasukForm({ 
  barangMasuk, 
  onSubmit, 
  categories = [],   // Terima dari props
  barangList = [],   // Terima dari props
  satuanList = []    // Terima dari props
}) {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = barangMasuk
    ? {
        tanggal_masuk: barangMasuk.tanggal_masuk.split('T')[0],
        keterangan: barangMasuk.keterangan || '',
        items: barangMasuk.detail_barang_masuk?.map(item => ({
          id_barang: item.id_barang,
          nama_barang: item.barang.nama_barang,
          id_kategori: item.barang.id_kategori || 0,
          deskripsi: item.barang.deskripsi || '',
          jumlah: item.jumlah,
          harga: parseFloat(item.harga) || 0,
          id_satuan: item.barang.id_satuan || 0,
        })) || [],
      }
    : {
        tanggal_masuk: new Date().toISOString().split('T')[0],
        keterangan: '',
        items: [{
          nama_barang: '',
          id_kategori: 0,
          deskripsi: '',
          jumlah: 1,
          harga: 0,
          id_satuan: 0,
        }],
      };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      
      // Process each item - create barang if not exists
      const processedItems = await Promise.all(
        values.items.map(async (item) => {
          try {
            // Cari barang berdasarkan nama (case insensitive)
            const existingBarang = barangList.find(
              barang => barang.nama_barang.toLowerCase() === item.nama_barang.toLowerCase()
            );

            if (existingBarang) {
              // Jika barang sudah ada, gunakan ID yang ada
              return {
                id_barang: existingBarang.id_barang,
                jumlah: item.jumlah,
                harga: item.harga || 0,
              };
            } else {
              // Jika barang belum ada, buat barang baru via API
              const kategori = categories.find(k => k.id_kategori === item.id_kategori);
              
              // Generate kode barang otomatis berdasarkan kategori
              const kodeKategori = kategori?.kode_kategori || 'BRG';
              const timestamp = Date.now().toString().slice(-4);
              const kodeBarang = `${kodeKategori}-${timestamp}`;

              // Create new barang via API
              const createBarangRes = await fetch('/api/barang', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  kode_barang: kodeBarang,
                  nama_barang: item.nama_barang,
                  id_kategori: item.id_kategori,
                  id_satuan: item.id_satuan,
                  deskripsi: item.deskripsi,
                  stok_minimum: 0,
                }),
              });

              if (!createBarangRes.ok) {
                throw new Error(`HTTP error! status: ${createBarangRes.status}`);
              }

              const responseText = await createBarangRes.text();
              const newBarang = responseText ? JSON.parse(responseText) : {};

              if (newBarang.success || newBarang.id_barang) {
                return {
                  id_barang: newBarang.data?.id_barang || newBarang.id_barang,
                  jumlah: item.jumlah,
                  harga: item.harga || 0,
                };
              } else {
                throw new Error('Gagal membuat barang baru: ' + (newBarang.error || 'Unknown error'));
              }
            }
          } catch (error) {
            console.error(`Error processing item ${item.nama_barang}:`, error);
            throw error;
          }
        })
      );

      // Submit barang masuk dengan items yang sudah diproses
      const submitData = {
        tanggal_masuk: values.tanggal_masuk,
        keterangan: values.keterangan,
        id_user: 1, // TODO: Ganti dengan user ID dari session/auth
        items: processedItems,
      };

      await onSubmit(submitData);
    } catch (error) {
      console.error('Error processing items:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addNewItem = () => {
    append({
      nama_barang: '',
      id_kategori: 0,
      deskripsi: '',
      jumlah: 1,
      harga: 0,
      id_satuan: 0,
    });
  };

  const removeItem = (index) => {
    remove(index);
  };

  // Filter barang suggestions berdasarkan input
  const getBarangSuggestions = (inputValue, index) => {
    if (!inputValue || inputValue.length < 2) return [];
    return barangList.filter(barang =>
      barang.nama_barang.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 5); // Limit to 5 suggestions
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Header Section */}
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="tanggal_masuk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Masuk</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
                  <Textarea 
                    placeholder="Keterangan barang masuk..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Items Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <FormLabel>Items Barang</FormLabel>
            <Button 
              type="button" 
              onClick={addNewItem} 
              variant="outline"
              disabled={isLoading}
            >
              Tambah Item
            </Button>
          </div>

          {fields.map((field, index) => {
            const namaBarangValue = form.watch(`items.${index}.nama_barang`);
            const suggestions = getBarangSuggestions(namaBarangValue, index);

            return (
              <div key={field.id} className="p-4 border rounded-lg space-y-4">
                {/* Nama Barang dengan Autocomplete */}
                <FormField
                  control={form.control}
                  name={`items.${index}.nama_barang`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Barang *</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Masukkan nama barang..." 
                            {...field} 
                            disabled={isLoading}
                          />
                          {suggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                              {suggestions.map((barang) => (
                                <div
                                  key={barang.id_barang}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                                  onClick={() => {
                                    field.onChange(barang.nama_barang);
                                    form.setValue(`items.${index}.id_kategori`, barang.id_kategori || 0);
                                    form.setValue(`items.${index}.id_satuan`, barang.id_satuan || 0);
                                    form.setValue(`items.${index}.deskripsi`, barang.deskripsi || '');
                                  }}
                                >
                                  <div className="font-medium">{barang.nama_barang}</div>
                                  <div className="text-sm text-gray-500">
                                    {barang.kode_barang} • {barang.kategori?.nama_kategori}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Kategori */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.id_kategori`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori *</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          value={field.value?.toString()}
                          disabled={isLoading || categories.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={categories.length === 0 ? "Tidak ada kategori" : "Pilih kategori"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((kategori) => (
                              <SelectItem 
                                key={kategori.id_kategori} 
                                value={kategori.id_kategori.toString()}
                              >
                                {kategori.nama_kategori}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Satuan */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.id_satuan`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Satuan *</FormLabel>
                        <Select 
                          onValueChange={(value) => field.onChange(parseInt(value))} 
                          value={field.value?.toString()}
                          disabled={isLoading || satuanList.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={satuanList.length === 0 ? "Tidak ada satuan" : "Pilih satuan"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {satuanList.map((satuan) => (
                              <SelectItem 
                                key={satuan.id_satuan} 
                                value={satuan.id_satuan.toString()}
                              >
                                {satuan.nama_satuan} ({satuan.singkatan})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Deskripsi */}
                <FormField
                  control={form.control}
                  name={`items.${index}.deskripsi`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Barang</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Deskripsi barang (optional)" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Jumlah */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.jumlah`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Jumlah"
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Harga */}
                  <FormField
                    control={form.control}
                    name={`items.${index}.harga`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harga (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Harga"
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeItem(index)}
                    disabled={isLoading}
                  >
                    Hapus Item
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Loading...' : (barangMasuk ? 'Update Barang Masuk' : 'Tambah Barang Masuk')}
        </Button>
      </form>
    </Form>
  );
}