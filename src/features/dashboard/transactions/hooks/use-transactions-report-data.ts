import { useQuery } from '@tanstack/react-query';

import { GetTransactionsReport } from '@/app/api/subscription/reports/transactions/route';

import { useDateRangeStore } from '../../store';

const useTransactionReportData = () => {
  const { from, to } = useDateRangeStore();

  const { data, isFetching } = useQuery<Mapped<GetTransactionsReport>>({
    queryKey: ['stats', 'transactions-reports', from, to],
    queryFn: () =>
      fetch(
        `/api/subscription/reports/transactions?from=${from}&to=${to}`
      ).then(res => res.json()),
    staleTime: 120 * 60 * 1000
  });

  return { data, isFetching };
};

export default useTransactionReportData;
