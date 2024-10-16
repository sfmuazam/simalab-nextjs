'use client';

import { Icons } from '@/components/icons';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';
import ky from 'ky'; // Import ky

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const router = useRouter(); // Hook untuk redirect setelah logout

  const handleLogout = async () => {
    try {
      const res = await ky.post('/api/auth/logout')
      const response: any = await res.json();

      if (response.success) {
        router.push('/');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = item.icon ? Icons[item.icon] : Icons.logo;
          return (
            item.href ? (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.disabled ? '/' : item.href}
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path === item.href ? 'bg-accent' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon className={`ml-3 size-5 flex-none`} />

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <button
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      item.disabled && 'cursor-not-allowed opacity-80'
                    )}
                    onClick={() => {
                      if (item.title === 'Logout') {
                        handleLogout(); // Panggil fungsi logout
                      }
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon className={`ml-3 size-5 flex-none`} />
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-2 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
