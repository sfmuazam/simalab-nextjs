'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { inventarisSchema } from '@/lib/schema';
import ky from 'ky';
import { Modal } from '@/components/ui/modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface InventarisFormProps {
  initialData?: any;
  labData: any
}

export default function InventarisForm({ initialData, labData }: InventarisFormProps) {
  const form = useForm<z.infer<typeof inventarisSchema>>({
    resolver: zodResolver(inventarisSchema),
    defaultValues: initialData,
  });

  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
 

  async function onSubmit(values: any) {
    setIsLoading(true);
    try {
      const method = initialData ? 'put' : 'post';
      const url = initialData ? `/api/inventaris/${initialData.id}` : `/api/inventaris`;

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
        router.push('/dashboard/inventaris');
      }, 300);
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Data Inventaris
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="laboratoriumId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Laboratorium</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih laboratorium" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {labData.map((lab: any) => (
                          <SelectItem key={lab.id} value={lab.id.toString()}>{lab.nama}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Inventaris</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan nama inventaris" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="merk"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Merk</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan merk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="spesifikasi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spesifikasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan spesifikasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jumlah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit/Jumlah</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Tuliskan unit/jumlah"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fungsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fungsi</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan fungsi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sumber</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan sumber" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tahun"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Tuliskan tahun" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kondisi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kondisi</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kondisi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="RUSAK">Rusak</SelectItem>
                        <SelectItem value="BERFUNGSI">Berfungsi</SelectItem>
                        <SelectItem value="BELUM_BERFUNGSI">Belum Berfungsi</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="penggunaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kondisi</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih penggunaan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BELUM_DIGUNAKAN">Belum Digunakan</SelectItem>
                        <SelectItem value="SUDAH_DIGUNAKAN">Sudah Digunakan</SelectItem>
                      </SelectContent>
                    </Select>
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
                      <Textarea placeholder="Tuliskan keterangan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
