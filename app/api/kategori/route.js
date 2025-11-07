import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { kode_kategori, nama_kategori, keterangan } = body;

    const newCategory = await prisma.kategori.create({
      data: {
        kode_kategori,
        nama_kategori,
        keterangan,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
