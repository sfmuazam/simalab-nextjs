'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { suratBebasSchema } from '@/lib/schema';
import ky from 'ky';
import { Modal } from '@/components/ui/modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface SuratBebasFormProps {
  initialData?: any;
}

export default function SuratBebasForm({ initialData }: SuratBebasFormProps) {
  const form = useForm<z.infer<typeof suratBebasSchema>>({
    resolver: zodResolver(suratBebasSchema),
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
      const url = initialData ? `/api/surat-bebas-lab/${initialData.id}` : `/api/surat-bebas-lab`;

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
        router.push('/dashboard/surat-bebas-lab');
      }, 300);
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Surat Bebas Lab
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="no_surat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No Surat</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan no surat" {...field} />
                    </FormControl>
                    <FormDescription>
                      No: 056/LAB-TIF/BL/9/2024
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal</FormLabel>
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
              <FormField
                control={form.control}
                name="judul"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Tugas Akhir</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tuliskan judul akhir" {...field} />
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
