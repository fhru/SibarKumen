import prisma from "@/lib/prisma";

export async function getSatuan() {
  try {
    const satuan = await prisma.satuan.findMany();
    return satuan;
  } catch (error) {
    console.error("Error fetching satuan:", error);
    return [];
  }
}

export async function getSatuanStats() {
  try {
    const totalSatuan = await prisma.satuan.count();
    return { totalSatuan };
  } catch (error) {
    console.error("Error fetching satuan stats:", error);
    return { totalSatuan: 0 };
  }
}
