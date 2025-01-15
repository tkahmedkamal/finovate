'use client';

import { useMediaQuery } from '@/hooks';

import { DashboardHeaderDesktop, DashboardHeaderMobile } from './';

const DashboardHeader = () => {
  const isLargeScreen = useMediaQuery('(min-width:1280px)');

  return isLargeScreen ? <DashboardHeaderDesktop /> : <DashboardHeaderMobile />;
};

export default DashboardHeader;
