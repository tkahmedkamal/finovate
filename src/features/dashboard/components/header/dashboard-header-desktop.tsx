'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo, ModeToggle, SkeletonContainer } from '@/components';

import { useUserConfig } from '../../hooks';
import { DatePicker, SelectCurrencies } from '../';

import DashboardHeaderNav from './dashboard-header-nav';
import DashboardHeaderUser from './dashboard-header-user';

const DashboardHeaderDesktop = () => {
  const { data, isLoading } = useUserConfig();
  const pathname = usePathname();

  const isBillingPage = pathname.includes('billing');

  const { currency = 'EGP' } = data?.data || {};

  return (
    <header className="fixed top-0 z-50 h-[77px] w-full border-b bg-card px-4 sm:px-6">
      <div className="flex-between size-full">
        <Link href="/">
          <Logo />
        </Link>
        <DashboardHeaderNav />
        <div className="flex-center gap-2">
          {!isBillingPage && (
            <>
              <DatePicker />
              <SkeletonContainer isLoading={isLoading}>
                <SelectCurrencies currency={currency} />
              </SkeletonContainer>
            </>
          )}
          <ModeToggle />
          <DashboardHeaderUser />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeaderDesktop;
