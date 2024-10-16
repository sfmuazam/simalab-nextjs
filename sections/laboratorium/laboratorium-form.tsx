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
import { laboratoriumSchema } from '@/lib/schema';
import ky from 'ky';
import { Modal } from '@/components/ui/modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LaboratoriumFormProps {
  initialData?: { id: number; nama: string; kapasitas: number; penanggung_jawab: string; }; 
}

export default function LaboratoriumForm({ initialData }: LaboratoriumFormProps) {
  const form = useForm<z.infer<typeof laboratoriumSchema>>({
    resolver: zodResolver(laboratoriumSchema),
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
      // If initialData is provided, update; otherwise, create a new entry
      const method = initialData ? 'put' : 'post';
      const url = initialData ? `/api/laboratorium/${initialData.id}` : `/api/laboratorium`;

      const res = await ky[method](url, {
        json: values,
        retry: { limit: 2 } 
      });

      const response: any = await res.json();

      setModalMessage(response.message);
      setIsSuccess(true); // Set isSuccess to true
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

  // Function untuk handle close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    if (isSuccess) {
      // Gunakan setTimeout untuk memberikan waktu modal menutup
      setTimeout(() => {
        router.push('/dashboard/laboratorium');
      }, 300);
    }
  };
  

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Data Laboratorium
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" method="POST">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Laboratorium</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan nama laboratorium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kapasitas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapasitas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Tuliskan kapasitas laboratorium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="penanggung_jawab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penanggung Jawab</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan nama penanggung jawab" {...field} />
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
