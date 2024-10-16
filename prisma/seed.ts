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

  await prisma.laboratorium.create({
    data: {
      nama: 'Laboratorium Komputer',
      kapasitas: 30,
      penanggung_jawab: 'John Doe',
    },
  });

  // Insert dummy data for SuratBebas
  await prisma.suratBebas.create({
    data: {
      no_surat: 'SB-001',
      nama: 'John Student',
      nim: '123456789',
      judul: 'Proyek Akhir',
      tanggal: '2024-10-06T16:34:04.111Z',
    },
  });

  // Insert dummy data for SuratPenelitian
  await prisma.suratPenelitian.create({
    data: {
      no_surat: 'SP-001',
      nama: 'Jane Researcher',
      nim: '987654321',
      judul: 'Penelitian AI',
      nama_dospem: 'Dr. AI Mentor',
      nip_dospem: '1122334455',
    },
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

  // Insert dummy data for Inventaris
  await prisma.inventaris.create({
    data: {
      laboratoriumId: 1, // Assume lab id is 1
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
  });

  await prisma.petugas.createMany({
    data: [
      { nip: '12345678', nama: 'John Doe', jabatan: 'Kepala Laboratorium', ttd: 'ttd_johndoe.png' },
      { nip: '87654321', nama: 'Jane Smith', jabatan: 'Staff Lab', ttd: 'ttd_janesmith.png' },
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
