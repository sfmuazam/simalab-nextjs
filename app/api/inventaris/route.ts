import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import { z } from "zod"
import { inventarisSchema } from "@/lib/schema"

export async function GET() {
  try {
    const inventarisData = await prisma.inventaris.findMany()
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Data inventaris ditemukan",
      data: inventarisData
    }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil data inventaris',
      errors: error
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const data = inventarisSchema.parse(body)

  try {
    const inventarisBaru = await prisma.inventaris.create({
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
      status: 201,
      success: true,
      message: "Data inventaris baru berhasil ditambahkan.",
      data: inventarisBaru
    }, { status: 201 })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Gagal membuat data inventaris",
        errors: error.errors
      }, { status: 400 })
    }
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal membuat data inventaris',
      errors: error
    }, { status: 500 })
  }
}