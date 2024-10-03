-- CreateEnum
CREATE TYPE "Kondisi" AS ENUM ('RUSAK', 'BERFUNGSI', 'BELUM_BERFUNGSI');

-- CreateEnum
CREATE TYPE "Penggunaan" AS ENUM ('BELUM_DIGUNAKAN', 'SUDAH_DIGUNAKAN');

-- CreateTable
CREATE TABLE "petugas" (
    "nip" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "jabatan" VARCHAR(255) NOT NULL,
    "ttd" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "petugas_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "laboratorium" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "penanggung_jawab" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laboratorium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "surat_bebas" (
    "no_surat" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "nim" VARCHAR(255) NOT NULL,
    "judul" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surat_bebas_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "surat_penelitian" (
    "no_surat" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "nim" VARCHAR(255) NOT NULL,
    "judul" TEXT NOT NULL,
    "nama_dospem" VARCHAR(255) NOT NULL,
    "nip_dospem" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surat_penelitian_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "surat_peminjaman" (
    "no_surat" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "nim" VARCHAR(255) NOT NULL,
    "no_hp" VARCHAR(20) NOT NULL,
    "tanggal_pinjam" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durasi" INTEGER NOT NULL DEFAULT 7,
    "tanggal_kembali" TIMESTAMP(3),
    "alat" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surat_peminjaman_pkey" PRIMARY KEY ("no_surat")
);

-- CreateTable
CREATE TABLE "inventaris" (
    "id" SERIAL NOT NULL,
    "laboratoriumId" INTEGER NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "merk" VARCHAR(255) NOT NULL,
    "spesifikasi" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "fungsi" VARCHAR(255) NOT NULL,
    "sumber" VARCHAR(255) NOT NULL,
    "tahun" INTEGER NOT NULL,
    "kondisi" "Kondisi" NOT NULL,
    "penggunaan" "Penggunaan" NOT NULL,
    "keterangan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventaris_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "petugas_nip_key" ON "petugas"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "surat_bebas_no_surat_key" ON "surat_bebas"("no_surat");

-- CreateIndex
CREATE UNIQUE INDEX "surat_penelitian_no_surat_key" ON "surat_penelitian"("no_surat");

-- CreateIndex
CREATE UNIQUE INDEX "surat_peminjaman_no_surat_key" ON "surat_peminjaman"("no_surat");

-- AddForeignKey
ALTER TABLE "inventaris" ADD CONSTRAINT "inventaris_laboratoriumId_fkey" FOREIGN KEY ("laboratoriumId") REFERENCES "laboratorium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
