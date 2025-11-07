import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { kode_kategori, nama_kategori, keterangan } = body;

    const updatedCategory = await prisma.kategori.update({
      where: { id_kategori: parseInt(id) },
      data: {
        kode_kategori,
        nama_kategori,
        keterangan,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(`Error updating category with id: ${params.id}` , error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    await prisma.kategori.delete({
      where: { id_kategori: parseInt(id) },
    });

    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(`Error deleting category with id: ${params.id}` , error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
