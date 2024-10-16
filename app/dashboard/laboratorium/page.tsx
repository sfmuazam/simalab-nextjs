import { searchParamsCache } from '@/lib/searchparams';
import LaboratoriumListingPage from '@/sections/laboratorium/views/laboratorium-listing-page';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'SIMALAB | Laboratorium'
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  return <LaboratoriumListingPage />;
}
