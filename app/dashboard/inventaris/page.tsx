import { searchParamsCache } from '@/lib/searchparams';
import InventarisListingPage from '@/sections/inventaris/views/inventaris-listing-page';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'SIMALAB | Inventaris'
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  return <InventarisListingPage />;
}
