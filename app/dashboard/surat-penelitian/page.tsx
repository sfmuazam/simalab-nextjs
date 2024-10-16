import { searchParamsCache } from '@/lib/searchparams';
import SuratPenelitianListingPage from '@/sections/surat-penelitian/views/surat-penelitian-listing-page';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'SIMALAB | Surat Penelitian'
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  return <SuratPenelitianListingPage />;
}
