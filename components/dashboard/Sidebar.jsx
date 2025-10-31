'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  Home,
  Package,
  FileText,
  X,
  LogOut,
  LayoutDashboard,
  Tags,
  Users,
  PackagePlus,
  PackageMinus,
  ArrowRightLeft,
  Boxes,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  {
    type: 'category',
    label: 'Main',
    items: [{ href: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' }],
  },
  {
    type: 'category',
    label: 'Master Data',
    items: [
      { href: '/dashboard/barang', icon: <Package size={20} />, label: 'Barang' },
      { href: '/dashboard/kategori', icon: <Tags size={20} />, label: 'Kategori' },
      { href: '/dashboard/pengguna', icon: <Users size={20} />, label: 'Pengguna' },
    ],
  },
  {
    type: 'category',
    label: 'Transaksi',
    items: [
      { href: '/dashboard/barang-masuk', icon: <PackagePlus size={20} />, label: 'Barang Masuk' },
      {
        href: '/dashboard/barang-keluar',
        icon: <PackageMinus size={20} />,
        label: 'Barang Keluar',
      },
      { href: '/dashboard/peminjaman', icon: <ArrowRightLeft size={20} />, label: 'Peminjaman' },
    ],
  },
  {
    type: 'category',
    label: 'Persediaan',
    items: [
      { href: '/dashboard/stok', icon: <Boxes size={20} />, label: 'Stok Barang' },
      { href: '/dashboard/mutasi', icon: <Truck size={20} />, label: 'Mutasi Barang' },
    ],
  },
  {
    type: 'category',
    label: 'Laporan',
    items: [
      { href: '/dashboard/laporan/masuk', icon: <FileText size={20} />, label: 'Laporan Masuk' },
      { href: '/dashboard/laporan/keluar', icon: <FileText size={20} />, label: 'Laporan Keluar' },
      { href: '/dashboard/laporan/mutasi', icon: <FileText size={20} />, label: 'Laporan Mutasi' },
    ],
  },
];

const NavLink = ({ href, icon, label, isCollapsed, pathname }) => {
  const isActive = pathname === href;

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant={isActive ? 'secondary' : 'ghost'}
              className="w-full justify-center"
            >
              <Link href={href}>{icon}</Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button asChild variant={isActive ? 'secondary' : 'ghost'} className="justify-start">
      <Link href={href}>
        {icon}
        <span className="ml-3">{label}</span>
      </Link>
    </Button>
  );
};

import { useState } from 'react';
import { logout } from '@/app/dashboard/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Sidebar({ user, isSidebarOpen, toggleSidebar, isCollapsed }) {
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const pathname = usePathname();

  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  };

  return (
    <>
      <aside
        className={clsx(
          'fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out',
          {
            'translate-x-0': isSidebarOpen,
            '-translate-x-full': !isSidebarOpen,
          },
          'md:translate-x-0',
          isCollapsed ? 'w-20' : 'w-64',
        )}
      >
        <div
          className={clsx(
            'flex items-center h-16 px-4',
            isCollapsed ? 'justify-center' : 'justify-between',
          )}
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/images/sibarkumenlogo.png" alt="SibarKumen Logo" width={32} height={32} />
            {!isCollapsed && <span className="font-bold text-lg">SibarKumen</span>}
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <X size={24} />
            <span className="sr-only">Close Menu</span>
          </Button>
        </div>
        <nav className="grow flex flex-col px-2 py-4 overflow-y-auto">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.type === 'link' ? (
                <NavLink {...item} isCollapsed={isCollapsed} pathname={pathname} />
              ) : (
                <div className="my-2">
                  {!isCollapsed && (
                    <h3 className="text-xs font-bold uppercase text-gray-400 px-4 py-1">
                      {item.label}
                    </h3>
                  )}
                  <div className="flex flex-col gap-1">
                    {item.items.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        {...subItem}
                        isCollapsed={isCollapsed}
                        pathname={pathname}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="border-t dark:border-gray-700 p-2">
          {isCollapsed ? (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-full" onClick={() => setShowLogoutAlert(true)}>
                    <LogOut size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2">
                <Avatar>
                  <AvatarFallback>{user ? getInitials(user.nama_lengkap) : 'G'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{user ? user.nama_lengkap : 'Guest'}</p>
                  <p className="text-xs text-gray-500">{user ? user.role : 'guest'}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setShowLogoutAlert(true)}>
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </aside>

      <AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={logout}>
              <AlertDialogAction type="submit">Logout</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
