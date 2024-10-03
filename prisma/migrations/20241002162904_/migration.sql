/*
  Warnings:

  - The primary key for the `petugas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `surat_bebas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `surat_peminjaman` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `surat_penelitian` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "petugas" DROP CONSTRAINT "petugas_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "petugas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "surat_bebas" DROP CONSTRAINT "surat_bebas_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "surat_bebas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "surat_peminjaman" DROP CONSTRAINT "surat_peminjaman_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "surat_peminjaman_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "surat_penelitian" DROP CONSTRAINT "surat_penelitian_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "surat_penelitian_pkey" PRIMARY KEY ("id");
