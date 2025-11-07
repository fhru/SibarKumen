import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { id_kategori, id_satuan, kode_barang, nama_barang, deskripsi, stok_minimum } = body;

    const updatedBarang = await prisma.barang.update({
      where: { id_barang: parseInt(id) },
      data: {
        id_kategori: parseInt(id_kategori, 10),
        id_satuan: parseInt(id_satuan, 10),
        kode_barang,
        nama_barang,
        deskripsi,
        stok_minimum: parseInt(stok_minimum, 10),
      },
    });

    return NextResponse.json(updatedBarang);
  } catch (error) {
    console.error(`Error updating barang with id: ${params.id}` , error);
    return NextResponse.json({ error: 'Failed to update barang' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.barang.delete({
      where: { id_barang: parseInt(id) },
    });

    return NextResponse.json({ message: 'Barang deleted successfully' });
  } catch (error) {
    console.error(`Error deleting barang with id: ${params.id}` , error);
    return NextResponse.json({ error: 'Failed to delete barang' }, { status: 500 });
  }
}
