/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { Laboratorium } from '@/lib/data';
import { columns } from './columns';
import {
  useLaboratoriumTableFilters
} from './use-laboratorium-table-filters';
import ky from 'ky';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';

export default function LaboratoriumTable() {
  const {
    searchQuery,
    setPage,
    setSearchQuery,
    isAnyFilterActive,
    resetFilters,
  } = useLaboratoriumTableFilters();

  const [data, setData] = useState<Laboratorium[]>([]);
  const [dataLength, setDataLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';
  const pageLimit = searchParams.get('limit') || '10';

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
  };

  async function fetchData() {
    setIsLoading(true)
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await ky(`/api/laboratorium?${queryString}`, { retry: { limit: 2 } })
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      const data: any = await response.json();
      setData(data.data); 
      setDataLength(data.dataLength);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);
  
  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey=""
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      {isLoading ? (<div className="space-y-4">
          {Array.from({ length: 5 }).map((_: any, index: number) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>)
          : <DataTable columns={columns(fetchData)} data={data} totalItems={dataLength} />}
    </div>
  );
}
