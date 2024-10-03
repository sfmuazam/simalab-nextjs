import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { z } from 'zod';
import { addDays } from 'date-fns'
import { suratPeminjamanSchema } from '@/lib/schema';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const suratPeminjaman = await prisma.suratPeminjaman.findUnique({
      where: { id: Number(id) }
    });

    if (suratPeminjaman) {
      return NextResponse.json({
        status: 200,
        success: true,
        message: 'Surat peminjaman ditemukan',
        data: suratPeminjaman
      }, { status: 200 });
    } else {
      return NextResponse.json({
        status: 404,
        success: false,
        message: 'Surat peminjaman tidak ditemukan',
      }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat peminjaman',
      errors: error
    }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  const data = suratPeminjamanSchema.parse(body)

  const existingSuratPeminjaman = await prisma.suratPeminjaman.findUnique({
    where: { no_surat: data.no_surat }
  })

  if (existingSuratPeminjaman && existingSuratPeminjaman.id != Number(id)) {
    return NextResponse.json({
      status: 400,
      success: false,
      message: "No surat sudah terdaftar",
    }, { status: 400 })
  }

  try {
    const tanggalPinjam = data.tanggal_pinjam ? new Date(data.tanggal_pinjam) : new Date();

    const tanggalKembali = addDays(tanggalPinjam, data.durasi || 7);

    const suratPeminjamanUpdate = await prisma.suratPeminjaman.update({
      where: {id: Number(id)},
      data: {
        no_surat: data.no_surat,
        nama: data.nama,
        nim: data.nim,
        no_hp: data.no_hp,
        tanggal_pinjam: tanggalPinjam,
        durasi: data.durasi || 7,
        tanggal_kembali: tanggalKembali, 
        alat: {
          create: data.alat.map((item) => ({
            nama: item.nama,
            jumlah: item.jumlah,
          })),
        }
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Surat peminjaman berhasil diubah",
      data: suratPeminjamanUpdate
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        message: "Gagal mengubah surat peminjaman",
        errors: error.errors
      }, { status: 400 })
    }
    return NextResponse.json({
      status: 500,
      message: "Gagal mengubah surat peminjaman",
      errors: error
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.suratPeminjaman.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({
      status: 200,
      message: "Surat peminjaman berhasil dihapus"
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Gagal menghapus surat peminjaman",
      errors: error
    }, { status: 500 })
  }
}
