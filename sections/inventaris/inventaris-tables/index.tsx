'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { InventarisWithLaboratorium } from '@/lib/data';
import { columns } from './columns';
import ky from 'ky';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useInventarisTableFilters } from './use-inventaris-table-filters';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';

export default function InventarisTable() {
  const {
    laboratoriumFilter,
    setLaboratoriumFilter,
    searchQuery,
    setPage,
    setSearchQuery,
    isAnyFilterActive,
    resetFilters,
  } = useInventarisTableFilters();

  const [data, setData] = useState<InventarisWithLaboratorium[]>([]);
  const [dataLength, setDataLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [laboratorium, setLaboratorium] = useState([]);
 

  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';
  const pageLimit = searchParams.get('limit') || '10';

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(laboratoriumFilter && { laboratorium: laboratoriumFilter }),
  };

  async function fetchData() {
    setIsLoading(true);
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await ky(`/api/inventaris?${queryString}`, { retry: { limit: 2 } });
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
  }

  async function fetchLaboratorium() {
    try {
      const res = await ky(`/api/laboratorium`, { retry: { limit: 2 } });
      const response: any = await res.json();
      setLaboratorium(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const LAB_OPTIONS: any[] = laboratorium.map((lab: any) => ({
    value: lab.id,
    label: lab.nama,
  }));

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    fetchLaboratorium();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey=""
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        {/* <DataTableFilterBox
          filterKey="laboratoriumId"
          title="Laboratorium"
          options={LAB_OPTIONS}
          setFilterValue={setLaboratoriumFilter}  // Menggunakan setLaboratoriumFilter
          filterValue={laboratoriumFilter}  // Nilai filter yang dipilih
        /> */}
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index: number) => (
            <Skeleton key={index} className="h-14 w-full" />
          ))}
        </div>
      ) : (
        <DataTable columns={columns(fetchData)} data={data} totalItems={dataLength} />
      )}
    </div>
  );
}
