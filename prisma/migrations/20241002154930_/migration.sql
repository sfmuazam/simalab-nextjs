/*
  Warnings:

  - You are about to drop the column `nama_dospem` on the `surat_penelitian` table. All the data in the column will be lost.
  - You are about to drop the column `nip_dospem` on the `surat_penelitian` table. All the data in the column will be lost.
  - Added the required column `dospem` to the `surat_penelitian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "surat_penelitian" DROP COLUMN "nama_dospem",
DROP COLUMN "nip_dospem",
ADD COLUMN     "dospem" JSONB NOT NULL;
