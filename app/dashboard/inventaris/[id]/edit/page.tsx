/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import InventarisForm from '@/sections/inventaris/inventaris-form';
import { useEffect, useState } from 'react';
import ky from 'ky';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page({ params }: { params: { id: number } }) {
  const { id } = params;
  const [data, setData] = useState<{ id: number; nama: string; kapasitas: number; penanggung_jawab: string } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true)
  const [laboratorium, setLaboratorium] = useState([])
 

  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Inventaris', link: '/dashboard/inventaris' },
    { title: 'Edit', link: `/dashboard/inventaris/${id}/edit` }
  ];

  async function fetchData() {
    setIsLoading(true)
    try {
      const res = await ky(`/api/inventaris/${Number(id)}`, { retry: { limit: 2 } });

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

  async function fetchLaboratorium() {
    try {
      const res = await ky(`/api/laboratorium`, { retry: { limit: 2 } })
      const response: any = await res.json()
      setLaboratorium(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData();
    fetchLaboratorium()
  }, []);

  return (
    <ScrollArea className="h-[calc(100dvh-64px)]">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        {isLoading ? (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-left text-2xl font-bold">
                Data Inventaris
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <InventarisForm initialData={data} labData={laboratorium}/>
        )}
      </div>
    </ScrollArea>
  );
}
