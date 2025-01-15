import { useQuery } from '@tanstack/react-query';

import { GetPeriodStatsResponse } from '@/app/api/stats/period/route';

import usePeriodStore from '../store/use-period-store';
import usePeriodTabsStore from '../store/use-period-tabs-store';

const useGetPeriodStats = () => {
  const tab = usePeriodTabsStore(state => state.tab);
  const { month, year } = usePeriodStore(state => state.period);

  const { data, isFetching, isLoading } = useQuery<GetPeriodStatsResponse>({
    queryKey: ['stats', 'periodStats', tab, month, year],
    queryFn: () =>
      fetch(
        `/api/stats/period?viewMode=${tab}&month=${month}&year=${year}`
      ).then(res => res.json()),
    staleTime: 120 * 60 * 1000
  });

  return { data, isFetching, isLoading };
};

export default useGetPeriodStats;
