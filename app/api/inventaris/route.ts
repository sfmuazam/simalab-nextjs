import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../lib/prisma"
import { z } from "zod"
import { inventarisSchema } from "@/lib/schema"

export async function GET(request: NextRequest) {

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    const isNumeric = !isNaN(Number(search));

    const searchQuery = `
      (i."nama" ILIKE '%${search}%' OR
       i."merk" ILIKE '%${search}%' OR
       i."spesifikasi" ILIKE '%${search}%' OR
       i."fungsi" ILIKE '%${search}%' OR
       i."sumber" ILIKE '%${search}%' OR
       i."keterangan" ILIKE '%${search}%' OR
       l."nama" ILIKE '%${search}%' OR
       CAST(i."kondisi" AS TEXT) ILIKE '%${search}%' OR
       CAST(i."penggunaan" AS TEXT) ILIKE '%${search}%' OR
       ${isNumeric ? `i."tahun" = ${Number(search)} OR i."jumlah" = ${Number(search)}` : 'FALSE'}
      )
    `;

    // Query to get total count
    const totalResult = await prisma.$queryRawUnsafe<{ count: bigint }[]>(`
      SELECT COUNT(*) as count
      FROM "inventaris" i
      JOIN "laboratorium" l ON i."laboratoriumId" = l.id
      WHERE ${searchQuery}
    `);

    // Extract count from the result
    const totalInventaris = Number(totalResult[0].count);

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || totalInventaris.toString(), 10);
    const offset = (page - 1) * limit;

    // Query to get actual data
    const inventarisData = await prisma.$queryRawUnsafe(`
      SELECT i.*, l."nama" AS laboratorium_nama
      FROM "inventaris" i
      JOIN "laboratorium" l ON i."laboratoriumId" = l.id
      WHERE ${searchQuery}
      LIMIT ${limit} OFFSET ${offset}
    `);

    // Use custom JSON stringify to handle BigInt
    const jsonResponse = JSON.stringify({
      status: 200,
      success: true,
      message: "Data inventaris ditemukan",
      data: inventarisData,
      dataLength: totalInventaris,
    }, (key, value) => (typeof value === 'bigint' ? value.toString() : value));

    return new Response(jsonResponse, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: 'Gagal mengambil data inventaris',
      errors: error,
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  
  const body = await request.json()
  const data = inventarisSchema.parse(body)

  try {

    const laboratorium = await prisma.laboratorium.findUnique({
      where: {id: Number(data.laboratoriumId)}
    })

    if(!laboratorium){
      return NextResponse.json({
        status: 400,
        success: false,
        message: 'Data laboratorium tidak ditemukan',
      }, { status: 400 })
    }

    const inventarisBaru = await prisma.inventaris.create({
      data: {
        laboratoriumId: data.laboratoriumId,
        nama: data.nama,
        merk: data.merk || null,
        spesifikasi: data.spesifikasi || null,
        jumlah: data.jumlah || 1,
        fungsi: data.fungsi || null,
        sumber: data.sumber || null,
        tahun: data.tahun || new Date().getFullYear(),
        kondisi: data.kondisi || "BERFUNGSI",
        penggunaan: data.penggunaan || "BELUM_DIGUNAKAN",
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