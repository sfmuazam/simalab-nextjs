import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { z } from 'zod'
import { petugasSchema } from '@/lib/schema'
import { promises as fs } from 'fs'
import path from 'path'

const MAX_SIZE = 10 * 1024 * 1024; 
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

export const config = {
  api: {
    bodyParser: false, 
  },
};

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params

  try {
    const petugas = await prisma.petugas.findUnique({
      where: { id: Number(id) },
    })

    if (!petugas) {
      return NextResponse.json({
        status: 404,
        message: 'Data petugas tidak ditemukan',
      }, { status: 404 })
    }
    return NextResponse.json({
      status: 200,
      message: 'Data petugas ditemukan',
      data: petugas
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      message: "Gagal mengambil data petugas",
      errors: error
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params;

  try {
    const contentType = request.headers.get('content-type') || '';

    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: 'Request tidak valid. Harus berupa multipart/form-data',
      }, { status: 400 });
    }

    const formData = await request.formData();
    const ttdFile = formData.get('ttd') as File | null;

    const fields = {
      nip: formData.get('nip'),
      nama: formData.get('nama'),
      jabatan: formData.get('jabatan'),
    };

    const data = petugasSchema.parse(fields);

    const existingPetugas = await prisma.petugas.findUnique({
      where: { nip: data.nip },
    });

    if (existingPetugas && existingPetugas.id !== Number(id)) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: 'NIP sudah terdaftar.',
      }, { status: 400 });
    }

    const petugasLama = await prisma.petugas.findUnique({
      where: { id: Number(id) },
    });

    let ttdPath = null;

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
      
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const buffer = Buffer.from(await ttdFile.arrayBuffer());
      const newFileName = `${Date.now()}-${ttdFile.name}`;
      const filePath = path.join(uploadDir, newFileName);

      if (petugasLama?.ttd) {
        const oldFilePath = path.join(process.cwd(), 'public', petugasLama.ttd);
        await fs.unlink(oldFilePath).catch(err => {
          console.error(`Gagal menghapus tanda tangan lama: ${err}`);
        });
      }

      await fs.writeFile(filePath, buffer);
      ttdPath = `/uploads/${newFileName}`;
    } else {
      ttdPath = petugasLama?.ttd || null;
    }

    const petugasUpdate = await prisma.petugas.update({
      where: { id: Number(id) },
      data: {
        nip: data.nip,
        nama: data.nama,
        jabatan: data.jabatan,
        ttd: ttdPath || undefined,
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'Data petugas berhasil diubah',
      data: petugasUpdate,
    }, { status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        message: 'Gagal mengubah data petugas',
        errors: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      status: 500,
      message: 'Gagal mengubah data petugas',
      errors: error,
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params;

  try {
    const petugas = await prisma.petugas.findUnique({
      where: { id: Number(id) },
    });

    if (!petugas) {
      return NextResponse.json({
        status: 404,
        message: 'Data petugas tidak ditemukan',
      }, { status: 404 });
    }

    if (petugas.ttd) {
      const filePath = path.join(process.cwd(), 'public', petugas.ttd);
      await fs.unlink(filePath).catch(err => {
        console.error(`Gagal menghapus tanda tangan: ${err}`);
      });
    }

    await prisma.petugas.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      status: 200,
      message: 'Data petugas berhasil dihapus',
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      message: 'Gagal menghapus data petugas',
      errors: error,
    }, { status: 500 });
  }
}
