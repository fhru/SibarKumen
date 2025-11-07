import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { id_kategori, id_satuan, nama_barang, deskripsi, stok_minimum } = body;

    if (!id_kategori) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 },
      );
    }

    const kategori = await prisma.kategori.findUnique({
      where: { id_kategori: parseInt(id_kategori, 10) },
    });

    if (!kategori || !kategori.kode_kategori) {
      return NextResponse.json(
        { error: "Category not found or category code is missing" },
        { status: 404 },
      );
    }

    // 2. The prefix is the category code
    const prefix = `${kategori.kode_kategori}-`;

    // 3. Find the last item with this prefix to determine the next number
    const lastBarang = await prisma.barang.findFirst({
      where: {
        kode_barang: {
          startsWith: prefix,
        },
      },
      orderBy: {
        kode_barang: "desc",
      },
    });

    // 4. Calculate the next number
    let nextNumber = 1;
    if (lastBarang) {
      const lastNumber = parseInt(
        lastBarang.kode_barang.substring(prefix.length),
        10,
      );
      nextNumber = lastNumber + 1;
    }

    // 5. Format the new code (e.g., ELE-001)
    const newKodeBarang = `${prefix}${String(nextNumber).padStart(3, "0")}`;

    // 6. Create the new barang with the generated code
    const newBarang = await prisma.barang.create({
      data: {
        id_kategori: parseInt(id_kategori, 10),
        id_satuan: parseInt(id_satuan, 10),
        kode_barang: newKodeBarang,
        nama_barang,
        deskripsi,
        stok_minimum: parseInt(stok_minimum, 10),
      },
    });

    return NextResponse.json(newBarang, { status: 201 });
  } catch (error) {
    console.error("Error creating barang:", error);
    return NextResponse.json(
      { error: "Failed to create barang" },
      { status: 500 },
    );
  }
}
