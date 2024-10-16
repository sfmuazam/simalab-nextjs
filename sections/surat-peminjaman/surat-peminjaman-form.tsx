'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { suratPeminjamanSchema } from '@/lib/schema';
import ky from 'ky';
import { Modal } from '@/components/ui/modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SuratPeminjamanFormProps {
  initialData?: any;
}

export default function SuratPeminjamanForm({ initialData }: SuratPeminjamanFormProps) {
  const form = useForm<z.infer<typeof suratPeminjamanSchema>>({
    resolver: zodResolver(suratPeminjamanSchema),
    defaultValues: initialData,
  });

  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
 

  // Menggunakan useFieldArray untuk daftar alat
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'alat', // Nama field array
  });

  async function onSubmit(values: any) {
    setIsLoading(true);
    try {
      const method = initialData ? 'put' : 'post';
      const url = initialData ? `/api/surat-peminjaman/${initialData.id}` : `/api/surat-peminjaman`;

      const res = await ky[method](url, {
        json: values,
        retry: { limit: 2 }
      });

      const response: any = await res.json();

      setModalMessage(response.message);
      setIsSuccess(true);
      setModalOpen(true);
    } catch (error) {
      console.error('Error during submission:', error);
      setModalMessage('Terjadi kesalahan saat menyimpan data.');
      setIsSuccess(false);
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false);
    if (isSuccess) {
      setTimeout(() => {
        router.push('/dashboard/surat-peminjaman');
      }, 300);
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Surat Peminjaman
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field untuk nama */}
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan nama" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Field untuk nim */}
              <FormField
                control={form.control}
                name="nim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIM</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan NIM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Field untuk tanggal pinjam */}
              <FormField
                control={form.control}
                name="tanggal_pinjam"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Pinjam</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Pilih tanggal" {...field}
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Field untuk durasi */}
              <FormField
                control={form.control}
                name="durasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durasi (hari)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Tuliskan durasi peminjaman" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Field untuk nomor HP */}
              <FormField
                control={form.control}
                name="no_hp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor HP</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan nomor HP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Field untuk keperluan */}
              <FormField
                control={form.control}
                name="keperluan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keperluan</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan keperluan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Daftar Alat Dinamis */}
              <div className="col-span-2">
                <FormLabel className="block mb-3">Alat dan Jumlah</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4">
                    <FormField
                      control={form.control}
                      name={`alat.${index}.nama`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Nama alat" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`alat.${index}.jumlah`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          <FormControl>
                            <Input type="number" placeholder="Jumlah" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>Hapus</Button>
                  </div>
                ))}
                <Button type="button" variant="secondary"  size="sm" className="block mt-3" onClick={() => append({ nama: '', jumlah: 1 })}>Tambah Alat</Button>
              </div>
            </div>
            <Button type="submit" disabled={isLoading}>Submit</Button>
          </form>
        </Form>
      </CardContent>

      <Modal
        title="Informasi"
        description={modalMessage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Card>
  );
}
