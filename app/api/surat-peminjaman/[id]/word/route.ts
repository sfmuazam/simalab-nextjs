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

  const formatTanggalIndonesia = (tanggal: Date | null) => {
    if (!tanggal) return null;
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(tanggal));
  };

  const tanggalPinjam = formatTanggalIndonesia(suratPeminjaman.tanggal_pinjam);
  const tanggalKembali = formatTanggalIndonesia(suratPeminjaman.tanggal_kembali) || null;

  try {
    const wordBuffer = await generateSuratWord('peminjaman', {
      no_surat: suratPeminjaman.no_surat,
      nama: suratPeminjaman.nama,
      nim: suratPeminjaman.nim,
      no_hp: suratPeminjaman.no_hp,
      tanggal_pinjam: tanggalPinjam,
      durasi: suratPeminjaman.durasi,
      tanggal_kembali: tanggalKembali,
      alat: suratPeminjaman.alat
    })

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

