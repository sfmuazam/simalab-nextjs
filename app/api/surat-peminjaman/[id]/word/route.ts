import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import generateSuratWord from '@/lib/generate-surat'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params
  const suratPeminjaman = await prisma.suratPeminjaman.findUnique({
    where: { id: Number(id) }
  })

  if (!suratPeminjaman) {
    return NextResponse.json({
      status: 404,
      success: false,
      message: "Surat peminjaman tidak ditemukan"
    }, { status: 404 })
  }

  const formattedDatePinjam = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(suratPeminjaman.tanggal_pinjam));
  const formattedDateKembali = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(suratPeminjaman.tanggal_kembali)) || null;

  let alatArray: any[] = [];
  if (Array.isArray(suratPeminjaman.alat)) {
    alatArray = suratPeminjaman.alat.map((item: any, index: number) => ({
      ...item,
      nomor: index + 1
    }));
  }

  try {
    const wordBuffer = await generateSuratWord('peminjaman', {
      nama: suratPeminjaman.nama,
      nim: suratPeminjaman.nim,
      no_hp: suratPeminjaman.no_hp,
      keperluan: suratPeminjaman.keperluan,
      tanggal_pinjam: formattedDatePinjam,
      durasi: suratPeminjaman.durasi,
      tanggal_kembali: formattedDateKembali,
      alat: alatArray
    });

    return new NextResponse(wordBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="Surat Peminjaman ${suratPeminjaman.nim} ${Date.now()}.docx"`,
      },
    });

  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat peminjaman',
      errors: error
    }, { status: 500 });
  }

}

