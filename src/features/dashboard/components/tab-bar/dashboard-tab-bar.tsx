'use client';

import { useMediaQuery } from '@/hooks';
import { DASHBOARD_NAV_ItEMS } from '@/lib/constants';

import { DashboardTabBarItemDialog, DashboardTabBarItem } from './';

const DashboardTabBar = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');

  return (
    <>
      {!isLargeScreen && (
        <nav className="flex-horizontally fixed bottom-0 h-20 w-full bg-card px-4 shadow-[0_-12px_32px_rgba(0,0,0,0.1)] xl:hidden">
          <div className="w-full sm:container sm:mx-auto">
            <ul className="flex-between">
              {DASHBOARD_NAV_ItEMS.slice(
                0,
                Math.ceil(DASHBOARD_NAV_ItEMS.length / 2)
              ).map(({ value, href, icon }) => (
                <DashboardTabBarItem key={value} href={href} icon={icon} />
              ))}

              <DashboardTabBarItemDialog />

              {DASHBOARD_NAV_ItEMS.slice(
                Math.ceil(DASHBOARD_NAV_ItEMS.length / 2)
              ).map(({ value, href, icon }) => (
                <DashboardTabBarItem key={value} href={href} icon={icon} />
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};

export default DashboardTabBar;
