import { NextResponse } from 'next/server';
import { getBarangMasuk, createBarangMasuk } from '@/lib/data/transaksi';

export async function GET() {
  try {
    const barangMasuk = await getBarangMasuk();
    return NextResponse.json({ 
      success: true, 
      data: barangMasuk 
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const result = await createBarangMasuk(body);
    
    return NextResponse.json(
      { 
        success: true, 
        data: result,
        message: 'Barang masuk created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}