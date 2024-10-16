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
import ky from 'ky';
import { Modal } from '@/components/ui/modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FileUploader } from '@/components/file-uploader';

interface PetugasFormProps {
  initialData?: { id: number; nip: string; nama: string; ttd: any; };
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

export default function PetugasForm({ initialData }: PetugasFormProps) {
  const petugasSchema = z.object({
    nip: z.string().min(1, { message: "NIP tidak boleh kosong" }).transform((val) => val.trim()),
    nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
    jabatan: z.string().min(1, { message: "Jabatan tidak boleh kosong" }).transform((val) => val.trim()),
    ttd: z
      .any().nullable()
      .optional() 
      .refine(
        (files) => !files || files?.length == 1, 
        'Image is required if provided.'
      )
      .refine(
        (files) => !files || files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => !files || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.'
      ),
  });  

  const form = useForm<z.infer<typeof petugasSchema>>({
    resolver: zodResolver(petugasSchema),
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
      const formData = new FormData();

      // Append data to formData object
      formData.append('nip', values.nip);
      formData.append('nama', values.nama);
      formData.append('jabatan', values.jabatan);

      // Append the file (ttd) if it exists
      if (values.ttd && values.ttd.length > 0) {
        formData.append('ttd', values.ttd[0]); // Assuming the file is in the first index of the array
      }

      const method = initialData ? 'put' : 'post';
      const url = initialData ? `/api/petugas/${initialData.id}` : `/api/petugas`;

      // Send data using 'multipart/form-data'
      const res = await ky[method](url, {
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        retry: { limit: 2 },
      });

      const response: any = await res.json();

      setModalMessage(response.message);
      setIsSuccess(response.success); 
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
        router.push('/dashboard/petugas');
      }, 300);
    }
  };
  

  return (
    <Card className="md:w-full w-1/2">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Data Petugas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" method="POST">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan NIP" {...field} />
                    </FormControl>
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
                      <Input
                        placeholder="Tuliskan nama"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jabatan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input placeholder="Tuliskan jabatan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ttd"
                render={({ field }) => (
                  <div className="space-y-6">
                    <FormItem className="w-full">
                      <FormLabel>Tanda Tangan</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={(file) => field.onChange(file)} 
                          maxFiles={1}
                          maxSize={5 * 1024 * 1024} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
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
        onClose={handleCloseModal} // Close handler yang diperbarui
      />
    </Card>
  );
}
