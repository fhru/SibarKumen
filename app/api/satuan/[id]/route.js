import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { nama_satuan, singkatan, keterangan } = body;

    const updatedSatuan = await prisma.satuan.update({
      where: { id_satuan: parseInt(id) },
      data: {
        nama_satuan,
        singkatan,
        keterangan,
      },
    });

    return NextResponse.json(updatedSatuan);
  } catch (error) {
    console.error(`Error updating satuan with id: ${params.id}`, error);
    return NextResponse.json({ error: 'Failed to update satuan' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.satuan.delete({
      where: { id_satuan: parseInt(id) },
    });

    return NextResponse.json({ message: 'Satuan deleted successfully' });
  } catch (error) {
    console.error(`Error deleting satuan with id: ${params.id}`, error);
    return NextResponse.json({ error: 'Failed to delete satuan' }, { status: 500 });
  }
}
