import { NextResponse } from 'next/server';
import { deleteBarangMasuk, updateBarangMasuk } from '@/lib/data/transaksi';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    await deleteBarangMasuk(parseInt(id));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Barang masuk deleted successfully' 
    });
  } catch (error) {
    console.error(`Error deleting barang masuk with id: ${params.id}`, error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const updatedBarangMasuk = await updateBarangMasuk(parseInt(id), body);
    
    return NextResponse.json({ 
      success: true, 
      data: updatedBarangMasuk,
      message: 'Barang masuk updated successfully' 
    });
  } catch (error) {
    console.error(`Error updating barang masuk with id: ${params.id}`, error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}