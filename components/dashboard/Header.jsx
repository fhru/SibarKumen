'use client';
import { Menu, ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Header({ user, toggleSidebar, isCollapsed, toggleCollapse }) {
  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length > 1) {
      return names[0][0] + names[names.length - 1][0];
    }
    return name.substring(0, 2);
  };

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 border-b">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu size={24} />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className="hidden md:flex">
            <ChevronLeft
              size={24}
              className={clsx('transition-transform', isCollapsed && 'rotate-180')}
            />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Dashboard</h2>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Avatar>
            <AvatarFallback>{user ? getInitials(user.nama_lengkap) : 'G'}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
