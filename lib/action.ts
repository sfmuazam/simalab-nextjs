import prisma from "./prisma";

export async function getLaboratoriumLength() {
  return await prisma.laboratorium.count()
}

export async function getSuratPenelitianLength() {
  return await prisma.suratPenelitian.count()
}
export async function getSuratBebasLength() {
  return await prisma.suratBebas.count()
}
export async function getSuratPeminjamanLength() {
  return await prisma.suratPeminjaman.count()
}
export async function getInventarisLength() {
  return await prisma.inventaris.count()
}