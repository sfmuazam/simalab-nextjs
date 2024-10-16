'use client';
import { SuratPeminjaman } from '@/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns = (onRefresh: () => void): ColumnDef<SuratPeminjaman>[] => [
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
    header: 'NAMA',
    enableSorting: true,
  },
  {
    accessorKey: 'nim',
    header: 'NIM',
    enableSorting: true,
  },
  {
    accessorKey: 'no_hp',
    header: 'NO HP',
    enableSorting: true,
  },
  {
    accessorKey: 'keperluan',
    header: 'KEPERLUAN',
    enableSorting: true,
  },
  {
    accessorKey: 'tanggal_pinjam',
    header: 'TANGGAL PINJAM',
    cell: ({ row }) => (
      row.original.tanggal_pinjam
        ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(row.original.tanggal_pinjam))
        : '-'
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'durasi',
    header: 'DURASI',
    enableSorting: true,
  },
  {
    accessorKey: 'tanggal_kembali',
    header: 'TANGGAL KEMBALI',
    cell: ({ row }) => (
      row.original.tanggal_kembali
        ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(row.original.tanggal_kembali))
        : 'Tanggal tidak tersedia'
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'alat',
    header: 'ALAT',
    enableSorting: true,
    cell: ({ row }) => (
      <div>
        {Array.isArray(row.original.alat) ? (
          row.original.alat.map((item: any, index: number) => (
            <div className="inline-block" key={index}>
              {item.nama}: {item.jumlah}
            </div>
          ))
        ) : (
          <div>-</div>
        )}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
