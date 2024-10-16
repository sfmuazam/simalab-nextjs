'use client';
import { InventarisWithLaboratorium} from '@/lib/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

// Data inventaris sekarang berisi objek laboratorium


export const columns = (onRefresh: () => void): ColumnDef<InventarisWithLaboratorium>[] => [
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
    accessorKey: 'laboratorium.nama',
    header: 'LABORATORIUM',
    cell: ({ row }) => (
      <div>{row.original.laboratorium_nama}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'nama',
    header: 'ALAT/BARANG',
    enableSorting: true,
  },
  {
    accessorKey: 'merk',
    header: 'MERK',
    enableSorting: true,
  },
  {
    accessorKey: 'spesifikasi',
    header: 'SPESIFIKASI',
    enableSorting: true,
  },
  {
    accessorKey: 'jumlah',
    header: 'JUMLAH',
    enableSorting: true,
  },
  {
    accessorKey: 'fungsi',
    header: 'FUNGSI',
    enableSorting: true,
  },
  {
    accessorKey: 'sumber',
    header: 'SUMBER',
    enableSorting: true,
  },
  {
    accessorKey: 'tahun',
    header: 'TAHUN PEROLEHAN',
    enableSorting: true,
  },
  {
    accessorKey: 'kondisi',
    header: 'KONDISI',
    enableSorting: true,
    cell: ({ row }) => (
      <div>
        {row.original.kondisi === 'RUSAK' ? 'Rusak' : row.original.kondisi === 'BERFUNGSI' ? 'Berfungsi' : 'Belum Berfungsi'}
      </div>
    ),
  },
  {
    accessorKey: 'penggunaan',
    header: 'PENGGUNAAN',
    enableSorting: true,
    cell: ({ row }) => (
      <div>
        {row.original.penggunaan === 'BELUM_DIGUNAKAN' ? 'Belum Digunakan' : 'Sudah Digunakan'}
      </div>
    ),
  },
  {
    accessorKey: 'keterangan',
    header: 'KETERANGAN',
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} onRefresh={onRefresh} />
  }
];
