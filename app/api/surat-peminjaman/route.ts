import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { addDays } from 'date-fns'
import { suratPeminjamanSchema } from '@/lib/schema'

export async function GET(request: NextRequest) {
  
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''

    const startFilter = startDate ? new Date(startDate) : undefined;
    const endFilter = endDate ? new Date(endDate) : undefined;

    const totalSuratPeminjaman = await prisma.suratPeminjaman.count({
      where: {
        OR: [
          { nama: { contains: search, mode: 'insensitive' } },
          { nim: { contains: search, mode: 'insensitive' } },
          { no_hp: { contains: search, mode: 'insensitive' } },
          { keperluan: { contains: search, mode: 'insensitive' } },
        ],
        AND: [
          { tanggal_pinjam: { gte: startFilter } },
          { tanggal_pinjam: { lte: endFilter } }
        ].filter(Boolean)
      }
    });

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || totalSuratPeminjaman.toString(), 10);
    const offset = (page - 1) * limit;

    const suratPeminjaman = await prisma.suratPeminjaman.findMany({
      where: {
        OR: [
          { nama: { contains: search, mode: 'insensitive' } },
          { nim: { contains: search, mode: 'insensitive' } },
          { no_hp: { contains: search, mode: 'insensitive' } },
          { keperluan: { contains: search, mode: 'insensitive' } },
        ],
        AND: [
          { tanggal_pinjam: { gte: startFilter } },
          { tanggal_pinjam: { lte: endFilter } }
        ].filter(Boolean)
      },
      skip: offset,
      take: limit
    })

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Surat peminjaman ditemukan",
      data: suratPeminjaman,
      dataLength: totalSuratPeminjaman
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat peminjaman',
      errors: error
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  
  try {
    const body = await request.json();
    const data = suratPeminjamanSchema.parse(body);

    const tanggalPinjam = data.tanggal_pinjam ? new Date(data.tanggal_pinjam) : new Date();

    const tanggalKembali = addDays(tanggalPinjam, data.durasi || 7);

    const suratPeminjamanBaru = await prisma.suratPeminjaman.create({
      data: {
        nama: data.nama,
        nim: data.nim,
        no_hp: data.no_hp,
        keperluan: data.keperluan,
        tanggal_pinjam: tanggalPinjam,
        durasi: data.durasi || 7,
        tanggal_kembali: tanggalKembali, 
        alat: data.alat
      },
    });

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Surat peminjaman baru berhasil ditambahkan",
      data: suratPeminjamanBaru
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat surat peminjaman",
        errors: error.errors
      }, { status: 400 });
    }
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal membuat surat peminjaman',
      errors: error
    }, { status: 500 });
  }
}
