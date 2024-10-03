// lib/generate-surat.ts
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs/promises';
import path from 'path';
import { JsonValue } from '@prisma/client/runtime/react-native.js';

interface Alat {
  nama: string;
  jumlah: number;
}

interface Dospem {
  nama: string;
  nip: string;
}

interface SuratBebasLab {
  no_surat: string;
  nama: string;
  nim: string;
  judul: string;
}

interface SuratPenelitian {
  no_surat: string;
  nama: string;
  nim: string;
  judul: string;
  dospem: Dospem[] | JsonValue;
}

interface SuratPeminjaman {
  no_surat: string;
  nama: string;
  nim: string;
  no_hp: string;
  tanggal_pinjam: string | null;
  durasi: number;
  tanggal_kembali: string | null;
  alat: Alat[] | JsonValue;
}

type SuratData = SuratBebasLab | SuratPenelitian | SuratPeminjaman;

export default async function generateSuratWord(templateName: string, data: SuratData): Promise<Buffer> {
  try {
    const templatePath = path.resolve('./public/templates', `${templateName} template.docx`);
    const content = await fs.readFile(templatePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

    // Set data sesuai dengan template
    doc.setData(data);

    // Render dokumen
    doc.render();

    // Generate buffer
    const buffer = doc.getZip().generate({ type: 'nodebuffer' });
    return buffer;
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw new Error('Failed to generate Word document');
  }
}
