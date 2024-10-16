'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export function useSuratPenelitianTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'search',
    searchParams.search
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const [startDate, setStartDate] = useQueryState(
    'startDate',
    searchParams.startDate.withDefault('')
  );

  const [endDate, setEndDate] = useQueryState(
    'endDate',
    searchParams.endDate.withDefault('')
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setStartDate(null);  // Reset tanggal awal
    setEndDate(null);    // Reset tanggal akhir
    setPage(1);
  }, [setSearchQuery, setStartDate, setEndDate, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!startDate || !!endDate;
  }, [searchQuery, startDate, endDate]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetFilters,
    isAnyFilterActive
  };
}
