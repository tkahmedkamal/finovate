import { useQuery } from '@tanstack/react-query';
import { endOfDay } from 'date-fns';

import { GetSummaryStatsResponse } from '@/app/api/stats/summary/route';

import useDateRangeStore from '../../store/use-date-range-store';

const useGetSummaryStats = () => {
  const { from, to } = useDateRangeStore();

  const { data, isFetching } = useQuery<Mapped<GetSummaryStatsResponse>>({
    queryKey: ['stats', 'summaryStats', from, to],
    queryFn: () =>
      fetch(`/api/stats/summary?from=${from}&to=${endOfDay(to)}`).then(res =>
        res.json()
      ),
    staleTime: 120 * 60 * 1000
  });

  return { data, isFetching };
};

export default useGetSummaryStats;
