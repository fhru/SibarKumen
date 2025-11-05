import prisma from '../prisma';

export async function getBarang() {
  try {
    const barang = await prisma.barang.findMany({
      include: {
        kategori: true,
      },
    });
    return barang;
  } catch (error) {
    console.error('Failed to fetch barang:', error);
    throw new Error('Failed to fetch barang.');
  }
}

export async function createBarang(data) {
  try {
    const newBarang = await prisma.barang.create({
      data,
    });
    return newBarang;
  } catch (error) {
    console.error('Failed to create barang:', error);
    throw new Error('Failed to create barang.');
  }
}

export async function updateBarang(id, data) {
  try {
    const updatedBarang = await prisma.barang.update({
      where: { id_barang: id },
      data,
    });
    return updatedBarang;
  } catch (error) {
    console.error(`Failed to update barang with id: ${id}` , error);
    throw new Error('Failed to update barang.');
  }
}

export async function deleteBarang(id) {
  try {
    await prisma.barang.delete({
      where: { id_barang: id },
    });
  } catch (error) {
    console.error(`Failed to delete barang with id: ${id}` , error);
    throw new Error('Failed to delete barang.');
  }
}

export async function getBarangStats() {
  try {
    const totalBarang = await prisma.barang.count();
    // Add more stats here if needed
    return { totalBarang };
  } catch (error) {
    console.error('Failed to fetch barang stats:', error);
    throw new Error('Failed to fetch barang stats.');
  }
}
