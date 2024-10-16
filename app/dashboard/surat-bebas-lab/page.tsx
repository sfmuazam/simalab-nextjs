import { searchParamsCache } from '@/lib/searchparams';
import SuratBebasListingPage from '@/sections/surat-bebas/views/surat-bebas-listing-page';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'SIMALAB | Surat Bebas Lab'
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  return <SuratBebasListingPage />;
}
