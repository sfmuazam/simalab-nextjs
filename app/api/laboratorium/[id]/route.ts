import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { z } from 'zod'
import { laboratoriumSchema } from '@/lib/schema'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {

  const { id } = params

  try {
    const laboratorium = await prisma.laboratorium.findUnique({
      where: { id: Number(id) },
    })

    if (!laboratorium) {
      return NextResponse.json({
        status: 404,
      success: false,
      message: 'Data laboratorium tidak ditemukan',
      }, { status: 404 })
    }
    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Data laboratorium ditemukan',
      data: laboratorium
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mengambil data laboratorium",
      errors: error
    }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {

  const { id } = params
  const body = await request.json()
  const data = laboratoriumSchema.parse(body)
  try {
    const laboratoriumUpdate = await prisma.laboratorium.update({
      where: { id: Number(id) },
      data: {
        nama: data.nama,
        kapasitas: data.kapasitas,
        penanggung_jawab: data.penanggung_jawab,
      },
    })
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data laboratorium berhasil diubah",
      data: laboratoriumUpdate
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
      success: false,
      message: "Gagal mengubah data laboratorium",
        errors: error.errors
      }, { status: 400 })
    }
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mengubah data laboratorium",
      errors: error
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  
  const { id } = params

  try {
    await prisma.laboratorium.delete({
      where: { id: Number(id) },
    })
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data laboratorium berhasil dihapus"
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal menghapus data laboratorium",
      errors: error
    }, { status: 500 })
  }
}
