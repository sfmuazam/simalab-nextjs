import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { z } from 'zod'
import { inventarisSchema } from '@/lib/schema'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    const inventaris = await prisma.inventaris.findUnique({
      where: { id: Number(id) },
    })

    if (!inventaris) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: 'Data inventaris tidak ditemukan',
      }, { status: 404 })
    }
    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Data inventaris ditemukan',
      data: inventaris
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mengambil data inventaris",
      errors: error
    }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await request.json()
  const data = inventarisSchema.parse(body)

  try {
    const inventarisUpdate = await prisma.inventaris.update({
      where: { id: Number(id) },
      data: {
        laboratoriumId: data.laboratoriumId,
        nama: data.nama,
        merk: data.merk,
        spesifikasi: data.spesifikasi,
        jumlah: data.jumlah,
        fungsi: data.fungsi,
        sumber: data.sumber,
        tahun: data.tahun,
        kondisi: data.kondisi,
        penggunaan: data.penggunaan,
        keterangan: data.keterangan || null
      }
    })
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data nventaris berhasil diubah",
      data: inventarisUpdate
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal mengubah data inventaris",
        errors: error.errors
      }, { status: 400 })
    }
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal mengubah data inventaris",
      errors: error
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  try {
    await prisma.inventaris.delete({
      where: { id: Number(id) }
    })

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data inventaris berhasil dihapus"
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Gagal menghapus data inventaris",
      errors: error
    }, { status: 500 })
  }
}