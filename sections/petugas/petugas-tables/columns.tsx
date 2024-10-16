'use client';
import { Petugas } from '@/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import Image from 'next/image';

export const columns = (onRefresh: () => void): ColumnDef<Petugas>[] => [
  {
    id: 'no',
    header: () => (
      <div className="text-center">NO</div>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'nip',
    header: 'NIP',
    enableSorting: true,
  },
  {
    accessorKey: 'nama',
    header: 'NAMA',
    enableSorting: true,
  },
  {
    accessorKey: 'jabatan',
    header: 'JABATAN',
    enableSorting: true,
  },
  {
    accessorKey: 'ttd',
    header: 'TANDA TANGAN',
    cell: ({ row }) => {
      const ttdUrl = row.getValue('ttd');
      
      return (
        <div className="flex justify-center items-center relative w-16 h-16">
          {ttdUrl ? (
            <Image
              src={ttdUrl}
              alt={row.getValue('nama')}
              fill
              className="rounded-lg self-center mx-auto"
            />
          ) : (
            <></>
          )}
        </div>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
