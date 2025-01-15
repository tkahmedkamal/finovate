import { useQuery } from '@tanstack/react-query';
import { endOfDay } from 'date-fns';

import { GetTransactionsResponse } from '@/app/api/transactions/route';

import { useDateRangeStore } from '../store';

const useTransactionsData = (size?: number) => {
  const { from, to } = useDateRangeStore();

  const url = size
    ? `/api/transactions?size=${size}&from=${from}&to=${endOfDay(to)}`
    : `/api/transactions?from=${from}&to=${endOfDay(to)}`;

  const { data, isFetching } = useQuery<GetTransactionsResponse>({
    queryKey: ['stats', 'transactions', size, from, to],
    queryFn: () => fetch(url).then(res => res.json()),
    staleTime: 120 * 60 * 1000
  });

  return { data, isFetching };
};

export default useTransactionsData;
