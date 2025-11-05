import prisma from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.kategori.findMany();
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories.");
  }
}

export async function createCategory(data) {
  try {
    const newCategory = await prisma.kategori.create({
      data,
    });
    return newCategory;
  } catch (error) {
    console.error("Failed to create category:", error);
    throw new Error("Failed to create category.");
  }
}

export async function updateCategory(id, data) {
  try {
    const updatedCategory = await prisma.kategori.update({
      where: { id_kategori: id },
      data,
    });
    return updatedCategory;
  } catch (error) {
    console.error(`Failed to update category with id: ${id}`, error);
    throw new Error("Failed to update category.");
  }
}

export async function deleteCategory(id) {
  try {
    await prisma.kategori.delete({
      where: { id_kategori: id },
    });
  } catch (error) {
    console.error(`Failed to delete category with id: ${id}`, error);
    throw new Error("Failed to delete category.");
  }
}

export async function getCategoryStats() {
  try {
    const totalCategories = await prisma.kategori.count();
    // Add more stats here if needed
    return { totalCategories };
  } catch (error) {
    console.error("Failed to fetch category stats:", error);
    throw new Error("Failed to fetch category stats.");
  }
}
