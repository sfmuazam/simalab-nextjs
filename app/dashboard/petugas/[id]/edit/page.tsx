'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import PetugasForm from '@/sections/petugas/petugas-form';
import { useEffect, useState } from 'react';
import ky from 'ky';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const [data, setData] = useState<{ id: number; nip: string; nama: string; ttd: File[] | undefined } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Petugas', link: '/dashboard/petugas' },
    { title: 'Edit', link: `/dashboard/petugas/${id}/edit` }
  ];

  // Function to fetch the file and convert it to a File object
  async function pathToFile(path: string): Promise<File> {
    try {
      const response = await fetch(path);
      const blob = await response.blob();
      
      const fileName = path.split('/').pop() || 'file.jpg'; 
  
      // Create a File object from the Blob
      const file = new File([blob], fileName, {
        type: blob.type,
        lastModified: new Date().getTime(), 
      });
  
      // Return the File object with the original path as the preview URL
      Object.defineProperty(file, 'preview', {
        value: path,
        writable: false, 
      });
  
      return file; // Return the File object
    } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
    }
  }
  

  async function fetchData() {
    setIsLoading(true);
    try {
      const res = await ky(`/api/petugas/${Number(id)}`, { retry: { limit: 2 } });

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }

      const response: any = await res.json();

      // Transform ttd path to File if it exists, await the pathToFile call
      const transformedData = {
        ...response.data,
        ttd: response.data.ttd ? [await pathToFile(response.data.ttd)] : undefined, // Only return File array
      };

      setData(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollArea className="h-[calc(100dvh-64px)]">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        {isLoading ? (
          <Card className="w-full md:w-1/2">
            <CardHeader>
              <CardTitle className="text-left text-2xl font-bold">Data Petugas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <PetugasForm initialData={data} />
        )}
      </div>
    </ScrollArea>
  );
}
