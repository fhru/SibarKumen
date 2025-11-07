import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const satuan = await prisma.satuan.findMany();
    return NextResponse.json(satuan);
  } catch (error) {
    console.error('Error fetching satuan:', error);
    return NextResponse.json({ error: 'Failed to fetch satuan' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { nama_satuan, singkatan, keterangan } = body;

    const newSatuan = await prisma.satuan.create({
      data: {
        nama_satuan,
        singkatan,
        keterangan,
      },
    });

    return NextResponse.json(newSatuan, { status: 201 });
  } catch (error) {
    console.error('Error creating satuan:', error);
    return NextResponse.json({ error: 'Failed to create satuan' }, { status: 500 });
  }
}
