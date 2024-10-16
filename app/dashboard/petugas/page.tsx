import { searchParamsCache } from '@/lib/searchparams';
import PetugasListingPage from '@/sections/petugas/views/petugas-listing-page';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'SIMALAB | Petugas'
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  return <PetugasListingPage />;
}
