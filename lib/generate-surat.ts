// lib/generate-surat.ts
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';
import { JsonValue } from '@prisma/client/runtime/react-native.js';
import ImageModule from 'docxtemplater-image-module-free';
import prisma from './prisma';

interface Alat {
  nama: string;
  jumlah: number;
}

interface SuratBebasLab {
  no_surat: string;
  nama: string;
  nim: string;
  judul: string;
  tanggal: string;
}

interface SuratPenelitian {
  no_surat: string;
  nama: string;
  nim: string;
  judul: string;
  nama_dospem: string;
  nip_dospem: string;
  tanggal: string;
}

interface SuratPeminjaman {
  nama: string;
  nim: string;
  no_hp: string;
  keperluan: string;
  tanggal_pinjam: string | null;
  durasi: number;
  tanggal_kembali: string | null;
  alat: Alat[] | JsonValue;
}

type SuratData = SuratBebasLab | SuratPenelitian | SuratPeminjaman;

export default async function generateSuratWord(templateName: string, data: SuratData): Promise<Buffer> {
  try {
    const templatePath = path.resolve('./public/templates', `${templateName} template.docx`);
    const content = await fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // Set up the image module
    const imageOptions = {
      centered: false,
      getImage: (tagValue: string) => {
        return fs.readFileSync(tagValue); // Read image from file path
      },
      getSize: (imgBuffer: Buffer) => {
        // const dimensions = sizeOf(imgBuffer); // Calculate image dimensions
        return [165, 75];
      }
    };

    const imageModule = new ImageModule(imageOptions);

    // Initialize Docxtemplater with image module
    const doc = new Docxtemplater(zip, {
      modules: [imageModule],
      paragraphLoop: true,
      linebreaks: true,
    });

    const kalab_jaringan = await prisma.petugas.findFirst({
      where: {
        jabatan: "Kepala Laboratorium Jaringan"
      }
    });
    
    const kalab_pemrograman = await prisma.petugas.findFirst({
      where: {
        jabatan: "Kepala Laboratorium Pemrograman"
      }
    });

    const kalab_riset = await prisma.petugas.findFirst({
      where: {
        jabatan: "Kepala Laboratorium Riset"
      }
    });

    const teknisi_lab = await prisma.petugas.findFirst({
      where: {
        jabatan: "Teknisi Laboratorium"
      }
    });
    
    doc.setData({
      ...data,
      kalab_jaringan: kalab_jaringan?.nama || 'Ir. Dadang Iskandar, S.T., M.Eng.',
      nip_kalab_jaringan: kalab_jaringan?.nip || '198312022015041001',
      ttd_kalab_jaringan: kalab_jaringan?.ttd || './public/ttd/TTD Pak Dadang.png', 
      kalab_pemrograman: kalab_pemrograman?.nama || 'Ir. Bangun Wijayanto S.T., M.Cs.',
      nip_kalab_pemrograman: kalab_pemrograman?.nip || '198306182006041002',
      ttd_kalab_pemrograman: kalab_pemrograman?.ttd || './public/ttd/TTD Pak Bangun.png',  
      kalab_riset: kalab_riset?.nama || 'Ir. Swahesti Puspita Rahayu, S.Kom., M.T.',
      nip_kalab_riset: kalab_riset?.nip || '198107052008012024',
      ttd_kalab_riset: kalab_riset?.ttd || './public/ttd/TTD Bu Swahesti.png',  
      teknisi_lab: teknisi_lab?.nama || 'Gilang Dwi Ratmana, A.Md.',
      nip_teknisi_lab: teknisi_lab?.nip || '198703022014041002',
      ttd_teknisi_lab: teknisi_lab?.ttd || './public/ttd/TTD Pak Gilang.png',  
    });

    // Render the document
    doc.render();

    // Generate the document buffer
    const buffer = doc.getZip().generate({ type: 'nodebuffer', compression: "DEFLATE", });
    return buffer;
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw new Error('Failed to generate Word document');
  }
}
