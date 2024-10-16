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

  const formattedDate = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(suratPenelitian.tanggal));
  
  try{
    const wordBuffer = await generateSuratWord('penelitian', {
      no_surat: suratPenelitian.no_surat,
      nama: suratPenelitian.nama,
      nim: suratPenelitian.nim,
      judul: suratPenelitian.judul,
      nama_dospem: suratPenelitian.nama_dospem, 
      nip_dospem: suratPenelitian.nip_dospem,  
      tanggal: formattedDate // Use formatted date here
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

