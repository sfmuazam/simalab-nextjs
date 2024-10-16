import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  // Insert dummy data for Laboratorium
  await prisma.user.create({
    data: {
      nama: 'Gilang',
      email: 'admin@admin.com',
      password: await bcrypt.hash("admin", 10)
    },
  });

  await prisma.laboratorium.createMany({
    data: [
      {
        id: 1,
        nama: 'LABORATORIUM MULTIMEDIA',
        kapasitas: 15,
        penanggung_jawab: 'Ir. Dadang Iskandar, S.T., M.Eng.',
      },
      {
        id: 2,
        nama: 'LABORATORIUM PEMROGRAMAN',
        kapasitas: 20,
        penanggung_jawab: 'Ir. Bangun Wijayanto, S.T., M.Cs.',
      },
      {
        id: 3,
        nama: 'LABORATORIUM JARINGAN',
        kapasitas: 20,
        penanggung_jawab: 'Ir. Dadang Iskandar, S.T., M.Eng.',
      },
      {
        id: 4,
        nama: 'LABORATORIUM RISET',
        kapasitas: 15,
        penanggung_jawab: 'Ir. Swahesti Puspita Rahayu, S.Kom., M.T.',
      },
    ],
  });

  // Seed for Petugas
  await prisma.petugas.createMany({
    data: [
      {
        nip: '198107052008012024',
        nama: 'Ir. Swahesti Puspita Rahayu, S.Kom., M.T.',
        jabatan: 'Kepala Laboratorium Riset',
        ttd: null, // No TTD provided
      },
      {
        nip: '198306182006041002',
        nama: 'Ir. Bangun Wijayanto, S.T., M.Cs.',
        jabatan: 'Kepala Laboratorium Pemrograman',
        ttd: '/uploads/TTD Pak Bangun.png',
      },
      {
        nip: '198312022015041001',
        nama: 'Ir. Dadang Iskandar, S.T., M.Eng.',
        jabatan: 'Kepala Laboratorium Jaringan',
        ttd: '/uploads/TTD Pak Dadang.png',
      },
      {
        nip: '198703022014041002',
        nama: 'Gilang Dwi Ratmana, A.Md.',
        jabatan: 'Teknisi Laboratorium',
        ttd: null, // No TTD provided
      },
    ],
  });

  // Insert dummy data for SuratBebas
  await prisma.suratBebas.createMany({
    data: [
      {
        no_surat: 'No: 005/LAB-TIF/PEN/06/2016',
        nama: 'Nabilla Anggraini',
        nim: 'H1D017045',
        judul: 'Rancang Bangun Sistem Computer Based Test (CBT) Dalam Proses Seleksi Penerimaan Prajurit Tahap Akademik Di TNI Angkatan Udara',
        tanggal: '2024-10-06T16:34:04.111Z',
      },
      {
        no_surat: 'No: 006/LAB-TIF/PEN/06/2016',
        nama: 'Safa Muazam',
        nim: 'H1D020048',
        judul: 'mage Captioning pada Gambar Objek Wisata di Purbalingga Menggunakan Arsitektur Transformer dan Text-to-Speech Berbasis Website',
        tanggal: '2024-10-14T16:34:04.111Z',
      },
    ],
  });

  await prisma.suratPenelitian.createMany({
    data: [
      {
        no_surat: 'No: 005/LAB-TIF/PEN/06/2016',
        nama: 'Nabilla Anggraini',
        nim: 'H1D017045',
        judul: 'Rancang Bangun Sistem Computer Based Test (CBT) Dalam Proses Seleksi Penerimaan Prajurit Tahap Akademik Di TNI Angkatan Udara',
        tanggal: '2024-10-06T16:34:04.111Z',
        nama_dospem: 'Dr. AI Mentor',
        nip_dospem: '1122334455',
      },
      {
        no_surat: 'No: 006/LAB-TIF/PEN/06/2016',
        nama: 'Safa Muazam',
        nim: 'H1D020048',
        judul: 'mage Captioning pada Gambar Objek Wisata di Purbalingga Menggunakan Arsitektur Transformer dan Text-to-Speech Berbasis Website',
        tanggal: '2024-10-14T16:34:04.111Z',
        nama_dospem: 'Dr. AI Mentor',
        nip_dospem: '1122334455',
      },
    ],
  });

  // Insert dummy data for SuratPeminjaman
  await prisma.suratPeminjaman.create({
    data: {
      nama: 'John Borrower',
      nim: '135792468',
      no_hp: '08123456789',
      keperluan: 'ekskul ngoding',
      tanggal_pinjam: '2024-10-06T16:34:04.111Z',
      durasi: 7,
      tanggal_kembali: '2024-10-13T16:34:04.111Z',
      alat: JSON.parse(`[{"nama":"Laptop","jumlah":2},{"nama":"Proyektor","jumlah":1}]`),
    },
  });

  await prisma.inventaris.createMany({
    data: [
      { id: 1, nama: 'Laptop Dell', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 1 },
      { id: 2, nama: 'Proyektor Epson', kondisi: 'BELUM_BERFUNGSI', penggunaan: 'BELUM_DIGUNAKAN', laboratoriumId: 1 },
      { id: 3, nama: 'Kamera DSLR Canon', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 1 },
      { id: 4, nama: 'Komputer Desktop HP', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 2 },
      { id: 5, nama: 'Router Cisco', kondisi: 'RUSAK', penggunaan: 'BELUM_DIGUNAKAN', laboratoriumId: 3 },
      { id: 6, nama: 'Switch Netgear', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 3 },
      { id: 7, nama: 'Alat Peraga Fisika', kondisi: 'BELUM_BERFUNGSI', penggunaan: 'BELUM_DIGUNAKAN', laboratoriumId: 4 },
      { id: 8, nama: 'Alat Pengujian Jaringan', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 3 },
      { id: 9, nama: 'Mikroskop', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 4 },
      { id: 10, nama: 'Perangkat Lunak Pemrograman', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 2 },
      { id: 11, nama: 'Meja Lab', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 1 },
      { id: 12, nama: 'Kursi Lab', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 1 },
      { id: 13, nama: 'Printer HP', kondisi: 'RUSAK', penggunaan: 'BELUM_DIGUNAKAN', laboratoriumId: 2 },
      { id: 14, nama: 'Scanner', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 2 },
      { id: 15, nama: 'Alat Pengujian Software', kondisi: 'BERFUNGSI', penggunaan: 'SUDAH_DIGUNAKAN', laboratoriumId: 2 },
      {
        id: 16,
        laboratoriumId: 1,
        nama: 'Laptop',
        merk: 'Dell',
        spesifikasi: 'Intel Core i7, 16GB RAM, 512GB SSD',
        jumlah: 10,
        fungsi: 'Komputasi',
        sumber: 'Pengadaan',
        tahun: 2023,
        kondisi: 'BERFUNGSI',
        penggunaan: 'BELUM_DIGUNAKAN',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
