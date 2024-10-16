'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export function useInventarisTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'search',
    searchParams.search
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault('')
  );

  const [laboratoriumFilter, setLaboratoriumFilter] = useQueryState(
    'laboratorium',
    searchParams.laboratorium.withOptions({ shallow: false }).withDefault('')
  );

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);

    setPage(1);
  }, [setSearchQuery, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery;
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    laboratoriumFilter,
    setLaboratoriumFilter
  };
}
