import { UserTable } from "@/components/pengguna/user-table";
import { getAllUsers } from "@/lib/data/users";

export default async function PenggunaPage() {
  const users = await getAllUsers();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const stats = {
    totalUsers: users.length,
    adminUsers: users.filter((user) => user.role === "admin").length,
    gudangUsers: users.filter((user) => user.role === "gudang").length,
    newUsers: users.filter((user) => new Date(user.created_at) > thirtyDaysAgo)
      .length,
  };

  return (
    <div className="p-4">
      <UserTable users={users} stats={stats} />
    </div>
  );
}
