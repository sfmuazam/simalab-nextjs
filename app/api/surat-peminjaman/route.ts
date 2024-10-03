import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { addDays } from 'date-fns'
import { suratPeminjamanSchema } from '@/lib/schema'

export async function GET() {
  try {
    const suratPeminjaman = await prisma.suratPeminjaman.findMany()
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Surat peminjaman ditemukan",
      data: suratPeminjaman
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

    const existingSuratPeminjaman = await prisma.suratPeminjaman.findUnique({
      where: { no_surat: data.no_surat }
    });

    if (existingSuratPeminjaman) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "No surat sudah terdaftar",
      }, { status: 400 });
    }

    const tanggalPinjam = data.tanggal_pinjam ? new Date(data.tanggal_pinjam) : new Date();

    const tanggalKembali = addDays(tanggalPinjam, data.durasi || 7);

    const suratPeminjamanBaru = await prisma.suratPeminjaman.create({
      data: {
        no_surat: data.no_surat,
        nama: data.nama,
        nim: data.nim,
        no_hp: data.no_hp,
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
