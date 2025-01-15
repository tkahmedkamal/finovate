import { useQuery } from '@tanstack/react-query';
import { endOfDay } from 'date-fns';

import { GetCategoriesStatsResponse } from '@/app/api/stats/categories/route';

import useDateRangeStore from '../../store/use-date-range-store';

const useGetCategoriesStats = () => {
  const { from, to } = useDateRangeStore();

  const { data, isFetching, isLoading } = useQuery<GetCategoriesStatsResponse>({
    queryKey: ['stats', 'categoriesSats', from, to],
    queryFn: () =>
      fetch(`/api/stats/categories?from=${from}&to=${endOfDay(to)}`).then(res =>
        res.json()
      ),
    staleTime: 120 * 60 * 1000
  });

  return { data, isFetching, isLoading };
};

export default useGetCategoriesStats;
