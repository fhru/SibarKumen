import { UserTable } from "@/components/pengguna/user-table"
import { SummaryCards } from "@/components/pengguna/summary-cards"
import prisma from "@/lib/prisma"

async function getUserData() {
  const users = await prisma.users.findMany();
  
  const totalUsers = users.length;
  const adminUsers = users.filter(user => user.role === 'admin').length;
  const gudangUsers = users.filter(user => user.role === 'gudang').length;
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newUsers = users.filter(user => new Date(user.created_at) > thirtyDaysAgo).length;

  const stats = {
    totalUsers,
    adminUsers,
    gudangUsers,
    newUsers,
  }

  return { users, stats };
}

export default async function PenggunaPage() {
  const { users, stats } = await getUserData();

  return (
    <div className="container mx-auto py-10">
      <UserTable users={users} stats={stats} />
    </div>
  )
}
