'use client'

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import InventarisForm from '@/sections/inventaris/inventaris-form';
import ky from 'ky';
import { useState, useEffect } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Inventaris', link: '/dashboard/inventaris' },
  { title: 'Create', link: '/dashboard/inventaris/create' }
]

export default function Page() {

  const [isLoading, setIsLoading] = useState(true)
  const [laboratorium, setLaboratorium] = useState([])
 

  async function fetchLaboratorium() {
    try {
      setIsLoading(true)
      const res = await ky(`/api/laboratorium`, { retry: { limit: 2 } })
      const response: any = await res.json()
      setLaboratorium(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
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
          <InventarisForm labData={laboratorium} />
        )}
      </div>
    </ScrollArea>
  );
}
