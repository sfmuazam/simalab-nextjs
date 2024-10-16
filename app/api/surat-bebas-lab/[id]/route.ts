import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { z } from 'zod';
import { suratBebasSchema } from '@/lib/schema';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params;

  try {
    const suratBebas = await prisma.suratBebas.findUnique({
      where: { id: Number(id) }
    });

    if (suratBebas) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: 'Surat bebas lab ditemukan',
        data: suratBebas
      }, { status: 200 });
    } else {
      return NextResponse.json({
        status: 404,
        success: false,
        message: 'Surat bebas lab tidak ditemukan',
      }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat bebas lab',
      errors: error
    }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  
  const { id } = params
  const body = await request.json()
  const data = suratBebasSchema.parse(body)

  const existingSuratBebas = await prisma.suratBebas.findUnique({
    where: { no_surat: data.no_surat }
  })

  if (existingSuratBebas && existingSuratBebas.id != Number(id)) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: "No surat sudah terdaftar",
    }, { status: 400 })
  }

  const tanggalS = data.tanggal ? new Date(data.tanggal) : new Date();

  try {
    const suratBebasUpdate = await prisma.suratBebas.update({
      where: { id: Number(id) },
      data: {
        no_surat: data.no_surat,
        nama: data.nama,
        nim: data.nim,
        judul: data.judul,
        tanggal: tanggalS,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Surat bebas lab berhasil diubah",
      data: suratBebasUpdate
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        message: "Gagal mengubah surat bebas lab",
        errors: error.errors
      }, { status: 400 })
    }
    return NextResponse.json({
      status: 500,
      message: "Gagal mengubah surat bebas lab",
      errors: error
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params

  try {
    await prisma.suratBebas.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({
      status: 200,
      message: "Surat bebas lab berhasil dihapus"
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Gagal menghapus surat bebas lab",
      errors: error
    }, { status: 500 })
  }
}
