import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { suratPenelitianSchema } from '@/lib/schema'

export async function GET(request: NextRequest) {
  
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''

    const startFilter = startDate ? new Date(startDate) : undefined;
    const endFilter = endDate ? new Date(endDate) : undefined;

    const totalSuratPenelitian = await prisma.suratPenelitian.count({
      where: {
        OR: [
          { nama: { contains: search, mode: 'insensitive' } },
          { nim: { contains: search, mode: 'insensitive' } },
          { judul: { contains: search, mode: 'insensitive' } },
          { nama_dospem: { contains: search, mode: 'insensitive' } },
          { nip_dospem: { contains: search, mode: 'insensitive' } },
          { no_surat: { contains: search, mode: 'insensitive' } },
        ],
        AND: [
          { tanggal: { gte: startFilter } },
          { tanggal: { lte: endFilter } }
        ].filter(Boolean)
      }
    });

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || totalSuratPenelitian.toString(), 10);
    const offset = (page - 1) * limit;

    const suratPenelitian = await prisma.suratPenelitian.findMany({
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
      message: "Surat penelitian ditemukan",
      data: suratPenelitian,
      dataLength: totalSuratPenelitian
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

    const tanggalS = data.tanggal ? new Date(data.tanggal) : new Date();

    const suratPenelitianBaru = await prisma.suratPenelitian.create({
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
