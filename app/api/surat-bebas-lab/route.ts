import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { suratBebasSchema } from '@/lib/schema'

export async function GET() {
  try {
    const suratBebas = await prisma.suratBebas.findMany()
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Surat bebas lab ditemukan",
      data: suratBebas
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat bebas lab',
      errors: error
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = suratBebasSchema.parse(body);

    const existingSuratBebas = await prisma.suratBebas.findUnique({
      where: { no_surat: data.no_surat }
    });

    if (existingSuratBebas) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "No surat sudah terdaftar",
      }, { status: 400 });
    }

    const suratBebasBaru = await prisma.suratBebas.create({
      data: {
        no_surat: data.no_surat,
        nama: data.nama,
        nim: data.nim,
        judul: data.judul,
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Surat bebas lab baru berhasil ditambahkan",
      data: suratBebasBaru
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat surat bebas lab",
        errors: error.errors
      }, { status: 400 });
    }
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal membuat surat bebas lab',
      errors: error
    }, { status: 500 });
  }
}
