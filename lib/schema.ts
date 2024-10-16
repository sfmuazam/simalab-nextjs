import { z } from 'zod'

const suratPenelitianSchema = z.object({
  no_surat: z.string().min(1, { message: "No surat tidak boleh kosong" }).transform((val) => val.trim()),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  nim: z.string().min(1, { message: "NIM tidak boleh kosong" }).transform((val) => val.trim()),
  judul: z.string().min(1, { message: "Judul tidak boleh kosong" }).transform((val) => val.trim()),
  nama_dospem: z.string().min(1, { message: "Nama dosen tidak boleh kosong" }).transform((val) => val.trim()),
  nip_dospem: z.string().min(1, { message: "NIP dosen tidak boleh kosong" }).transform((val) => val.trim()),
  tanggal: z.string().nullable().optional(),
});

const suratPeminjamanSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  nim: z.string().min(1, { message: "NIM tidak boleh kosong" }).transform((val) => val.trim()),
  no_hp: z.string().min(1, { message: "No HP tidak boleh kosong" }).transform((val) => val.trim()),
  keperluan: z.string().min(1, { message: "Keperluan tidak boleh kosong" }).transform((val) => val.trim()),
  tanggal_pinjam: z.string().nullable().optional(),
  durasi: z.coerce.number().positive().optional().default(7),
  alat: z.array(z.object({
    nama: z.string().min(1, { message: "Nama alat tidak boleh kosong" }).transform((val) => val.trim()),
    jumlah: z.coerce.number().positive({ message: "Jumlah alat harus angka positif" })
  }))
});

const suratBebasSchema = z.object({
  no_surat: z.string().min(1, { message: "No surat tidak boleh kosong" }).transform((val) => val.trim()),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  nim: z.string().min(1, { message: "NIM tidak boleh kosong" }).transform((val) => val.trim()),
  judul: z.string().min(1, { message: "Judul tidak boleh kosong" }).transform((val) => val.trim()),
  tanggal: z.string().nullable().optional(),
});

const inventarisSchema = z.object({
  laboratoriumId: z.coerce.number().int().positive({ message: "Laboratorium harus berupa angka positif." }),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong." }).transform((val) => val.trim()),
  merk: z.string().nullable().optional().transform((val) => val?.trim()),
  spesifikasi: z.string().nullable().optional().transform((val) => val?.trim()),
  jumlah: z.coerce.number().int().nullable().optional(), 
  fungsi: z.string().nullable().optional().transform((val) => val?.trim()),
  sumber: z.string().nullable().optional().transform((val) => val?.trim()),
  tahun: z.coerce.number().int().positive({ message: "Tahun harus berupa angka positif." })
    .max(new Date().getFullYear(), { message: "Tahun tidak boleh lebih dari tahun ini." })
    .default(new Date().getFullYear()), 
  kondisi: z.enum(['RUSAK', 'BERFUNGSI', 'BELUM_BERFUNGSI'], { message: "Kondisi tidak valid." }).default('BERFUNGSI'),
  penggunaan: z.enum(['BELUM_DIGUNAKAN', 'SUDAH_DIGUNAKAN'], { message: "Penggunaan tidak valid." }).default('BELUM_DIGUNAKAN'), 
  keterangan: z.string().nullable().optional().transform((val) => val?.trim()).default(null)
});


const laboratoriumSchema = z.object({
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  kapasitas: z.coerce.number().int().positive({ message: "Kapasitas harus berupa angka positif" }),
  penanggung_jawab: z.string().min(1, { message: "Penanggung jawab tidak boleh kosong" }).transform((val) => val.trim()),
})

const petugasSchema = z.object({
  nip: z.string().min(1, { message: "NIP tidak boleh kosong" }).transform((val) => val.trim()),
  nama: z.string().min(1, { message: "Nama tidak boleh kosong" }).transform((val) => val.trim()),
  jabatan: z.string().min(1, { message: "Jabatan tidak boleh kosong" }).transform((val) => val.trim()),
  ttd: z.string().nullable().optional().transform((val) => val?.trim()),
})

export { petugasSchema, laboratoriumSchema, inventarisSchema, suratBebasSchema, suratPeminjamanSchema, suratPenelitianSchema }