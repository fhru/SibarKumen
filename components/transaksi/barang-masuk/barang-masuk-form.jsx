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
  categories = [],
  barangList = [],
  satuanList = []
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState({}); // State untuk kontrol dropdown per item

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
      
      const processedItems = await Promise.all(
        values.items.map(async (item) => {
          try {
            const existingBarang = barangList.find(
              barang => barang.nama_barang.toLowerCase() === item.nama_barang.toLowerCase()
            );

            if (existingBarang) {
              return {
                id_barang: existingBarang.id_barang,
                jumlah: item.jumlah,
                harga: item.harga || 0,
              };
            } else {
              const kategori = categories.find(k => k.id_kategori === item.id_kategori);
              const kodeKategori = kategori?.kode_kategori || 'BRG';
              const timestamp = Date.now().toString().slice(-4);
              const kodeBarang = `${kodeKategori}-${timestamp}`;

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

      const submitData = {
        tanggal_masuk: values.tanggal_masuk,
        keterangan: values.keterangan,
        id_user: 1,
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
    // Hapus juga state suggestions untuk item yang dihapus
    setShowSuggestions(prev => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  // Filter barang suggestions berdasarkan input
  const getBarangSuggestions = (inputValue, index) => {
    if (!inputValue || inputValue.length < 2) return [];
    
    // Filter barang yang belum dipilih di item lain
    const selectedBarangInOtherItems = fields
      .filter((_, i) => i !== index) // Exclude current item
      .map(field => form.getValues(`items.${i}.nama_barang`))
      .filter(Boolean);

    return barangList.filter(barang =>
      barang.nama_barang.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedBarangInOtherItems.includes(barang.nama_barang)
    ).slice(0, 5);
  };

  // Handle ketika user memilih barang dari dropdown
  const handleBarangSelect = (barang, index) => {
    // Set nilai form
    form.setValue(`items.${index}.nama_barang`, barang.nama_barang);
    form.setValue(`items.${index}.id_kategori`, barang.id_kategori || 0);
    form.setValue(`items.${index}.id_satuan`, barang.id_satuan || 0);
    form.setValue(`items.${index}.deskripsi`, barang.deskripsi || '');
    
    // Sembunyikan dropdown untuk item ini
    setShowSuggestions(prev => ({
      ...prev,
      [index]: false
    }));
  };

  // Handle ketika user mengubah input manual
  const handleBarangInputChange = (value, index) => {
    // Reset kategori dan satuan jika user menghapus input
    if (!value) {
      form.setValue(`items.${index}.id_kategori`, 0);
      form.setValue(`items.${index}.id_satuan`, 0);
      form.setValue(`items.${index}.deskripsi`, '');
    }
    
    // Tampilkan dropdown jika ada input
    if (value && value.length >= 2) {
      setShowSuggestions(prev => ({
        ...prev,
        [index]: true
      }));
    } else {
      setShowSuggestions(prev => ({
        ...prev,
        [index]: false
      }));
    }
  };

  // Handle ketika input kehilangan fokus
  const handleBarangInputBlur = (index) => {
    // Tunggu sebentar sebelum menyembunyikan dropdown untuk memberi waktu klik suggestion
    setTimeout(() => {
      setShowSuggestions(prev => ({
        ...prev,
        [index]: false
      }));
    }, 200);
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
            const shouldShowSuggestions = showSuggestions[index] && suggestions.length > 0;

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
                            onChange={(e) => {
                              field.onChange(e);
                              handleBarangInputChange(e.target.value, index);
                            }}
                            onBlur={() => handleBarangInputBlur(index)}
                            onFocus={() => {
                              if (field.value && field.value.length >= 2) {
                                setShowSuggestions(prev => ({
                                  ...prev,
                                  [index]: true
                                }));
                              }
                            }}
                          />
                          {shouldShowSuggestions && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                              {suggestions.map((barang) => (
                                <div
                                  key={barang.id_barang}
                                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 border-b last:border-b-0"
                                  onClick={() => handleBarangSelect(barang, index)}
                                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
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