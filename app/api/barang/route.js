import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { id_kategori, kode_barang, nama_barang, deskripsi } = body;

    const newBarang = await prisma.barang.create({
      data: {
        id_kategori,
        kode_barang,
        nama_barang,
        deskripsi,
      },
    });

    return NextResponse.json(newBarang, { status: 201 });
  } catch (error) {
    console.error('Error creating barang:', error);
    return NextResponse.json({ error: 'Failed to create barang' }, { status: 500 });
  }
}
