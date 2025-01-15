import { useQuery } from '@tanstack/react-query';

import { GetYearsResponse } from '@/app/api/get-years/route';

const useGetYears = () => {
  const { data, isFetching, isLoading } = useQuery<GetYearsResponse>({
    queryKey: ['years'],
    queryFn: () => fetch(`/api/get-years`).then(res => res.json()),
    staleTime: 48 * 60 * 60 * 1000
  });

  return { data, isFetching, isLoading };
};

export default useGetYears;
