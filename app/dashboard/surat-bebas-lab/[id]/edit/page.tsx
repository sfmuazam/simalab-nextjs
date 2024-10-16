/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SuratBebasForm from '@/sections/surat-bebas/surat-bebas-form';
import { useEffect, useState } from 'react';
import ky from 'ky';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const [data, setData] = useState<{ id: number; nama: string; kapasitas: number; penanggung_jawab: string } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true)
 

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Surat Bebas Lab', link: '/dashboard/surat-bebas-lab' },
    { title: 'Edit', link: `/dashboard/surat-bebas-lab/${id}/edit` }
  ];

  async function fetchData() {
    setIsLoading(true)
    try {
      const res = await ky(`/api/surat-bebas-lab/${Number(id)}`, { retry: { limit: 2 } });

      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }

      const response: any = await res.json();
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false)
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
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-left text-2xl font-bold">
                Surat Bebas Lab
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <SuratBebasForm initialData={data} />
        )}
      </div>
    </ScrollArea>
  );
}
