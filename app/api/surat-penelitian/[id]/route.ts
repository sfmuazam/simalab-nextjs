import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { z } from 'zod';
import { suratPenelitianSchema } from '@/lib/schema';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params;

  try {
    const suratPenelitian = await prisma.suratPenelitian.findUnique({
      where: { id: Number(id) }
    });

    if (suratPenelitian) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: 'Surat penelitian ditemukan',
        data: suratPenelitian
      }, { status: 200 });
    } else {
      return NextResponse.json({
        status: 404,
        success: false,
        message: 'Surat penelitian tidak ditemukan',
      }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat penelitian',
      errors: error
    }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  
  const { id } = params
  const body = await request.json()
  const data = suratPenelitianSchema.parse(body)

  const existingsuratPenelitian = await prisma.suratPenelitian.findUnique({
    where: { no_surat: data.no_surat }
  })

  if (existingsuratPenelitian && existingsuratPenelitian.id != Number(id)) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: "No surat sudah terdaftar",
    }, { status: 400 })
  }

  const tanggalS = data.tanggal ? new Date(data.tanggal) : new Date();

  try {
    const suratPenelitianUpdate = await prisma.suratPenelitian.update({
      where: { id: Number(id) },
      data: {
        no_surat: data.no_surat,
        nama: data.nama,
        nim: data.nim,
        judul: data.judul,
        tanggal: tanggalS,
        nama_dospem: data.nama_dospem,
        nip_dospem: data.nip_dospem,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Surat penelitian berhasil diubah",
      data: suratPenelitianUpdate
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        message: "Gagal mengubah data surat penelitian",
        errors: error.errors
      }, { status: 400 })
    }
    return NextResponse.json({
      status: 500,
      message: "Gagal mengubah data surat penelitian",
      errors: error
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params

  try {
    await prisma.suratPenelitian.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({
      status: 200,
      message: "Surat penelitian berhasil dihapus"
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Gagal menghapus data surat penelitian",
      errors: error
    }, { status: 500 })
  }
}
