import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import generateSuratWord from '@/lib/generate-surat'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const suratBebas = await prisma.suratBebas.findUnique({
    where: { id: Number(id) }
  })

  if(!suratBebas) {
    return NextResponse.json({
      status: 404,
      success: false,
      message: "Surat bebas lab tidak ditemukan"
    }, {status: 404})
  }

  try{
    const wordBuffer = await generateSuratWord('bebas lab', {
      no_surat: suratBebas.no_surat,
      nama: suratBebas.nama,
      nim: suratBebas.nim,
      judul: suratBebas.judul,
    })

    return new NextResponse(wordBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="Surat Bebas Lab ${suratBebas.nim}.docx"`,
      },
    });

  } catch (error){
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat bebas lab',
      errors: error
    }, { status: 500 });
  }

}

