import { NavItem } from '@/types';

export type Petugas = {
  id: number;
  nip: string;
  nama: string;
  jabatan: string;
  ttd?: string | null; // Optional field
  createdAt: Date;
  updatedAt: Date;
};

export type Laboratorium = {
  id: number;
  nama: string;
  kapasitas: number;
  penanggung_jawab: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SuratBebas = {
  id: number;
  no_surat: string;
  nama: string;
  nim: string;
  judul: string;
  tanggal: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type SuratPenelitian = {
  id: number;
  no_surat: string;
  nama: string;
  nim: string;
  judul: string;
  dospem: object; 
  tanggal: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type SuratPeminjaman = {
  id: number;
  nama: string;
  nim: string;
  no_hp: string;
  tanggal_pinjam: Date;
  durasi: number;
  tanggal_kembali: Date | null; 
  alat: object; 
  createdAt: Date;
  updatedAt: Date;
};

export type Inventaris = {
  id: number;
  laboratoriumId: number;
  nama: string;
  merk: string;
  spesifikasi: string;
  jumlah: number;
  fungsi: string;
  sumber: string;
  tahun: number;
  kondisi: "RUSAK" | "BERFUNGSI" | "BELUM_BERFUNGSI"; 
  penggunaan: "BELUM_DIGUNAKAN" | "SUDAH_DIGUNAKAN"; 
  keterangan?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type InventarisWithLaboratorium = Inventaris & {
  laboratorium_nama: string
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard', // LayoutDashboardIcon
    label: 'Dashboard'
  },
  {
    title: 'Laboratorium',
    href: '/dashboard/laboratorium',
    icon: 'flask', // Cocok untuk lab (gunakan FlaskConical dari lucide-react)
    label: 'Laboratorium'
  },
  {
    title: 'Petugas',
    href: '/dashboard/petugas',
    icon: 'user', // User
    label: 'Petugas'
  },
  {
    title: 'Inventaris',
    href: '/dashboard/inventaris',
    icon: 'box', // Box untuk inventaris
    label: 'Inventaris'
  },
  {
    title: 'Surat Peminjaman',
    href: '/dashboard/surat-peminjaman',
    icon: 'fileText', // FileText untuk surat
    label: 'Surat Peminjaman'
  },
  {
    title: 'Surat Penelitian',
    href: '/dashboard/surat-penelitian',
    icon: 'fileSearch', // FileSearch untuk penelitian
    label: 'Surat Penelitian'
  },
  {
    title: 'Surat Bebas Lab',
    href: '/dashboard/surat-bebas-lab',
    icon: 'fileCheck', // FileCheck untuk surat bebas
    label: 'Surat Bebas Lab'
  },
  {
    title: 'Logout',
    icon: 'login', // LogIn
    label: 'Login'
  }
];
