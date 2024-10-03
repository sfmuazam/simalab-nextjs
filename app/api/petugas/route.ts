/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { petugasSchema } from '@/lib/schema'
import { promises as fs } from 'fs'
import path from 'path'

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  try {
    const petugas = await prisma.petugas.findMany()
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data petugas ditemukan",
      data: petugas
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil data petugas',
      errors: error
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    await fs.mkdir(uploadDir, { recursive: true });

    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: 'Request tidak valid. Harus berupa multipart/form-data',
      }, { status: 400 });
    }

    const formData = await request.formData();

    const ttdFile = formData.get('ttd') as File;

    let ttdPath = null

    if (ttdFile) {

      if (!ALLOWED_TYPES.includes(ttdFile.type)) {
        return NextResponse.json({
          status: 400,
          success: false,
          message: 'Tipe file tidak diizinkan. Hanya JPG, JPEG, PNG, dan GIF yang diperbolehkan.',
        }, { status: 400 });
      }

      if (ttdFile.size > MAX_SIZE) {
        return NextResponse.json({
          status: 400,
          success: false,
          message: 'Ukuran file terlalu besar. Maksimal 10MB.',
        }, { status: 400 });
      }

      const buffer = Buffer.from(await ttdFile.arrayBuffer());
      const newFileName = `${Date.now()}-${ttdFile.name}`;
      const filePath = path.join(uploadDir, newFileName);

      await fs.writeFile(filePath, buffer);

      ttdPath = `/uploads/${newFileName}`;

    }
    const fields = {
      nip: formData.get('nip'),
      nama: formData.get('nama'),
      jabatan: formData.get('jabatan'),
    };

    const data = petugasSchema.parse(fields);

    const existingPetugas = await prisma.petugas.findUnique({
      where: { nip: data.nip },
    });

    if (existingPetugas) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: 'NIP sudah terdaftar.',
      }, { status: 400 });
    }

    const petugasBaru = await prisma.petugas.create({
      data: {
        nip: data.nip,
        nama: data.nama,
        jabatan: data.jabatan,
        ttd: ttdPath || null,
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: 'Data petugas baru berhasil ditambahkan.',
      data: petugasBaru,
    }, { status: 201 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: 'Gagal membuat data petugas',
        errors: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal membuat data petugas',
      errors: error,
    }, { status: 500 });
  }
}
