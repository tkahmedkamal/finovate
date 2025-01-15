'use client';

import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface Props {
  href: string;
  icon: LucideIcon;
}

const DashboardTabBarItem = ({ href, icon: Icon }: Props) => {
  const pathname = usePathname();

  return (
    <li>
      <a
        href={href}
        className={cn(
          'flex flex-col items-center gap-y-2 text-center text-sm font-bold',
          pathname === href && 'text-primary'
        )}
      >
        <Icon />
      </a>
    </li>
  );
};

export default DashboardTabBarItem;
