'use client';
import { SuratBebas } from '@/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns = (onRefresh: () => void): ColumnDef<SuratBebas>[] => [
  {
    accessorKey: 'no_surat',
    header: 'NO SURAT',
    enableSorting: true,
  },
  {
    accessorKey: 'nama',
    header: 'NAMA',
    enableSorting: true,
  },
  {
    accessorKey: 'nim',
    header: 'NIM',
    enableSorting: true,
  },
  {
    accessorKey: 'judul',
    header: 'JUDUL',
    enableSorting: true,
  },
  {
    accessorKey: 'tanggal',
    header: 'TANGGAL',
    cell: ({ row }) => (
      new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(row.original.tanggal))
    ),
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
