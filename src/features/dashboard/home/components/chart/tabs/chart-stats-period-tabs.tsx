'use client';

import { Button } from '@/components/ui/button';
import { SkeletonContainer } from '@/components';

import { usePeriodTabsStore } from '../../../store';
import { useGetYears } from '../../../hooks';

import { ChartStatsPeriodTabsMonth, ChartStatsPeriodTabsYear } from './';

const ChartStatsPeriodTabs = () => {
  const tab = usePeriodTabsStore(state => state.tab);
  const setTab = usePeriodTabsStore(state => state.setTab);

  const { data, isFetching } = useGetYears();
  const years = data?.data || [];

  return (
    <div className="flex-horizontally gap-3">
      <div className="p rounded-lg border bg-background p-[5]">
        <Button
          size="sm"
          variant={tab === 'month' ? 'secondary' : 'ghost'}
          className="h-7"
          onClick={() => setTab('month')}
        >
          Month
        </Button>
        <Button
          size="sm"
          variant={tab === 'year' ? 'secondary' : 'ghost'}
          className="h-7"
          onClick={() => setTab('year')}
        >
          Year
        </Button>
      </div>
      <SkeletonContainer isLoading={isFetching}>
        <ChartStatsPeriodTabsYear years={years} />
      </SkeletonContainer>
      {tab === 'month' && (
        <SkeletonContainer isLoading={isFetching}>
          <ChartStatsPeriodTabsMonth />
        </SkeletonContainer>
      )}
    </div>
  );
};

export default ChartStatsPeriodTabs;
