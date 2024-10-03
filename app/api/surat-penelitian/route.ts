import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { suratPenelitianSchema } from '@/lib/schema'

export async function GET() {
  try {
    const suratPenelitian = await prisma.suratPenelitian.findMany()
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Surat penelitian ditemukan",
      data: suratPenelitian
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat penelitian',
      errors: error
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = suratPenelitianSchema.parse(body);

    const existingSuratPenelitian = await prisma.suratPenelitian.findUnique({
      where: { no_surat: data.no_surat }
    });

    if (existingSuratPenelitian) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "No surat sudah terdaftar",
      }, { status: 400 });
    }

    const suratPenelitianBaru = await prisma.suratPenelitian.create({
      data: {
        no_surat: data.no_surat,
        nama: data.nama,
        nim: data.nim,
        judul: data.judul,
        dospem: data.dospem
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Surat penelitian baru berhasil ditambahkan.",
      data: suratPenelitianBaru
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat surat penelitian",
        errors: error.errors
      }, { status: 400 });
    }
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal membuat surat penelitian',
      errors: error
    }, { status: 500 });
  }
}
