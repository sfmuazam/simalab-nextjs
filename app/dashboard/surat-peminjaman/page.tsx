import { searchParamsCache } from '@/lib/searchparams';
import SuratPeminjamanListingPage from '@/sections/surat-peminjaman/views/surat-peminjaman-listing-page';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'SIMALAB | Surat Peminjaman'
};

export default async function Page({ searchParams }: pageProps) {
  searchParamsCache.parse(searchParams);

  return <SuratPeminjamanListingPage />;
}
