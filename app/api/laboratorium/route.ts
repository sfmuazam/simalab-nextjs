import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'
import { z } from 'zod'
import { laboratoriumSchema } from '@/lib/schema'

export async function GET(request: NextRequest) {

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const isNumeric = !isNaN(Number(search));

    const totalLaboratorium = await prisma.laboratorium.count({
      where: {
        OR: [
          { nama: { contains: search, mode: 'insensitive' } },
          { penanggung_jawab: { contains: search, mode: 'insensitive' } },
          ...(isNumeric
            ? [{ kapasitas: { equals: Number(search) } }]
            : [])
        ]
      }
    });
    
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || totalLaboratorium.toString(), 10);
    const offset = (page - 1) * limit;

    const laboratorium = await prisma.laboratorium.findMany({
      where: {
        OR: [
          { nama: { contains: search, mode: 'insensitive' } },
          { penanggung_jawab: { contains: search, mode: 'insensitive' } },
          ...(isNumeric
            ? [{ kapasitas: { equals: Number(search) } }]
            : [])
        ]
      },
      skip: offset,
      take: limit
    })

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data laboratorium ditemukan",
      data: laboratorium,
      dataLength: totalLaboratorium
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil data laboratorium',
      errors: error
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  
  try {
    const body = await request.json()

    const data = laboratoriumSchema.parse(body)

    const laboratoriumBaru = await prisma.laboratorium.create({
      data: {
        nama: data.nama,
        kapasitas: data.kapasitas,
        penanggung_jawab: data.penanggung_jawab,
      },
    })

    return NextResponse.json({
      status: 201,
      success: true,
      message: "Data laboratorium baru berhasil ditambahkan.",
      data: laboratoriumBaru
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat data laboratorium",
        errors: error.errors
      }, { status: 400 })
    }

    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal membuat data laboratorium',
      errors: error
    }, { status: 500 })
  }
}
