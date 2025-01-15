'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { DASHBOARD_NAV_ItEMS } from '@/lib/constants';

const DashboardHeaderNav = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        {DASHBOARD_NAV_ItEMS.map(({ name, value, href, icon: Icon }) => (
          <NavigationMenuItem key={value}>
            <Link href={href} legacyBehavior passHref>
              <Button
                variant="outline"
                asChild
                className={cn(
                  'trans-colors hover:border-primary hover:bg-transparent hover:text-primary',
                  pathname === href && 'border-primary text-primary'
                )}
              >
                <NavigationMenuLink>
                  <Icon />
                  {name}
                </NavigationMenuLink>
              </Button>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DashboardHeaderNav;
