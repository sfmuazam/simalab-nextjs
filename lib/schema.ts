import { z } from 'zod'

const suratPenelitianSchema = z.object({
  no_surat: z.string().min(1, { message: "No surat tidak boleh kosong" }).transform((val) => val.trim()),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  nim: z.string().min(1, { message: "NIM tidak boleh kosong" }).transform((val) => val.trim()),
  judul: z.string().min(1, { message: "Judul tidak boleh kosong" }).transform((val) => val.trim()),
  dospem: z.array(z.object({
    nama: z.string().min(1, { message: "Nama dosen tidak boleh kosong" }).transform((val) => val.trim()),
    nip: z.string().min(1, { message: "NIP dosen tidak boleh kosong" }).transform((val) => val.trim()),
  }))
});

const suratPeminjamanSchema = z.object({
  no_surat: z.string().min(1, { message: "No surat tidak boleh kosong" }).transform((val) => val.trim()),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  nim: z.string().min(1, { message: "NIM tidak boleh kosong" }).transform((val) => val.trim()),
  no_hp: z.string().min(1, { message: "No HP tidak boleh kosong" }).transform((val) => val.trim()),
  tanggal_pinjam: z.string().nullable().optional(), 
  durasi: z.number().optional().default(7), 
  alat: z.array(z.object({
    nama: z.string().min(1, { message: "Nama alat tidak boleh kosong" }).transform((val) => val.trim()),
    jumlah: z.number().positive({ message: "Jumlah alat harus angka positif" })
  }))
});

const suratBebasSchema = z.object({
  no_surat: z.string().min(1, { message: "No surat tidak boleh kosong" }).transform((val) => val.trim()),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  nim: z.string().min(1, { message: "NIM tidak boleh kosong" }).transform((val) => val.trim()),
  judul: z.string().min(1, { message: "Judul tidak boleh kosong" }).transform((val) => val.trim()),
});

const inventarisSchema = z.object({
  laboratoriumId: z.number().int().positive({ message: "Laboratorium harus berupa angka positif" }),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  merk: z.string().min(1, { message: "Merk tidak boleh kosong" }).transform((val) => val.trim()),
  spesifikasi: z.string().min(1, { message: "Spesifikasi tidak boleh kosong" }).transform((val) => val.trim()),
  jumlah: z.number().int().positive({ message: "Kapasitas harus berupa angka positif" }),
  fungsi: z.string().min(1, { message: "Fungsi tidak boleh kosong" }).transform((val) => val.trim()),
  sumber: z.string().min(1, { message: "Sumber tidak boleh kosong" }).transform((val) => val.trim()),
  tahun: z.number().int().positive({ message: "Tahun harus berupa angka positif" }),
  kondisi: z.enum(['RUSAK', 'BERFUNGSI', 'BELUM_BERFUNGSI'], { message: "Kondisi tidak valid" }),
  penggunaan: z.enum(['BELUM_DIGUNAKAN', 'SUDAH_DIGUNAKAN'], { message: "Penggunaan tidak valid" }),
  keterangan: z.string().nullable().optional().transform((val) => val?.trim())
})

const laboratoriumSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  kapasitas: z.number().int().positive({ message: "Kapasitas harus berupa angka positif" }),
  penanggung_jawab: z.string().min(1, { message: "Penanggung jawab tidak boleh kosong" }).transform((val) => val.trim()),
})

const petugasSchema = z.object({
  nip: z.string().min(1, { message: "NIP tidak boleh kosong" }).transform((val) => val.trim()),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  jabatan: z.string().min(1, { message: "Jabatan tidak boleh kosong" }).transform((val) => val.trim()),
  ttd: z.string().nullable().optional().transform((val) => val?.trim()),
})

export { petugasSchema, laboratoriumSchema, inventarisSchema, suratBebasSchema, suratPeminjamanSchema, suratPenelitianSchema }