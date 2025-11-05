import prisma from "@/lib/prisma";

export async function getAllUsers() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id_user: true,
        nama_lengkap: true,
        username: true,
        role: true,
        created_at: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
}

export async function getUserById(id) {
  try {
    const user = await prisma.users.findUnique({
      where: { id_user: id },
      select: {
        id_user: true,
        nama_lengkap: true,
        username: true,
        role: true,
      },
    });
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
}
