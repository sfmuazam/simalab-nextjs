import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { suratBebasSchema } from '@/lib/schema'

export async function GET(request: NextRequest) {
  
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''

    const startFilter = startDate ? new Date(startDate) : undefined;
    const endFilter = endDate ? new Date(endDate) : undefined;

    const totalSuratBebas = await prisma.suratBebas.count({
      where: {
        OR: [
          { nama: { contains: search, mode: 'insensitive' } },
          { nim: { contains: search, mode: 'insensitive' } },
          { judul: { contains: search, mode: 'insensitive' } },
          { no_surat: { contains: search, mode: 'insensitive' } }
        ],
        AND: [
           { tanggal: { gte: startFilter } },
           { tanggal: { lte: endFilter } }
        ].filter(Boolean) 
      }
    });

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || totalSuratBebas.toString(), 10);
    const offset = (page - 1) * limit;

    const suratBebas = await prisma.suratBebas.findMany({
      where: {
        OR: [
          { nama: { contains: search, mode: 'insensitive' } },
          { nim: { contains: search, mode: 'insensitive' } },
          { judul: { contains: search, mode: 'insensitive' } },
          { no_surat: { contains: search, mode: 'insensitive' } }
        ],
        AND: [
           { tanggal: { gte: startFilter } },
           { tanggal: { lte: endFilter } }
        ].filter(Boolean) 
      },
      skip: offset,
      take: limit
    })
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Surat bebas lab ditemukan",
      data: suratBebas,
      dataLength: totalSuratBebas
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
  const tanggalS = data.tanggal ? new Date(data.tanggal) : new Date();

    const suratBebasBaru = await prisma.suratBebas.create({
      data: {
        no_surat: data.no_surat,
        nama: data.nama,
        nim: data.nim,
        judul: data.judul,
        tanggal: tanggalS
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
