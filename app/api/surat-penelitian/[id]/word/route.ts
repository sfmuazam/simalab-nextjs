import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import generateSuratWord from '@/lib/generate-surat'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const suratPenelitian = await prisma.suratPenelitian.findUnique({
    where: { id: Number(id) }
  })

  if(!suratPenelitian) {
    return NextResponse.json({
      status: 404,
      success: false,
      message: "Surat penelitian tidak ditemukan"
    }, {status: 404})
  }

  try{
    const wordBuffer = await generateSuratWord('penelitian', {
      no_surat: suratPenelitian.no_surat,
      nama: suratPenelitian.nama,
      nim: suratPenelitian.nim,
      judul: suratPenelitian.judul,
      dospem: suratPenelitian.dospem
    })

    return new NextResponse(wordBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="Surat Penelitian ${suratPenelitian.nim}.docx"`,
      },
    });

  } catch (error){
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil surat penelitian',
      errors: error
    }, { status: 500 });
  }

}

