'use client';

import { usePathname } from 'next/navigation';

import { SkeletonContainer } from '@/components';
import { useMediaQuery } from '@/hooks';

import { useUserConfig } from '../hooks';

import { DatePicker, SelectCurrencies } from '.';

const DashboardSettingsBar = () => {
  const { data, isLoading } = useUserConfig();
  const pathname = usePathname();
  const isLargeScreen = useMediaQuery('(min-width: 1280px)');

  const relevantPage = [
    '/billing',
    '/categories',
    '/payment/cancelled',
    '/payment/success'
  ];
  const isRelevantPage = relevantPage.includes(pathname);

  const { currency = 'EGP' } = data?.data || {};

  return (
    <>
      {!isLargeScreen && !isRelevantPage && (
        <div className="fixed top-[77px] z-50 h-14 w-full border-b bg-card px-4 sm:px-6 xl:hidden">
          <div className="flex size-full items-center justify-end gap-3">
            <DatePicker />
            <SkeletonContainer isLoading={isLoading}>
              <SelectCurrencies currency={currency} />
            </SkeletonContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSettingsBar;
