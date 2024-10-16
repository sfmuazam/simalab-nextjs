'use client';
import { Laboratorium } from '@/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns = (onRefresh: () => void): ColumnDef<Laboratorium>[] => [
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
    accessorKey: 'nama',
    header: 'NAMA LABORATORIUM',
    enableSorting: true,
  },
  {
    accessorKey: 'kapasitas',
    header: 'KAPASITAS',
    enableSorting: true,
  },
  {
    accessorKey: 'penanggung_jawab',
    header: 'PENANGGUNG JAWAB',
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
