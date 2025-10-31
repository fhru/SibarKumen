import { getUser } from '@/lib/auth';
import DashboardProvider from './dashboard-provider';

export default async function DashboardLayout({ children }) {
  const user = await getUser();

  return (
    <DashboardProvider user={user}>
      {children}
    </DashboardProvider>
  );
}
