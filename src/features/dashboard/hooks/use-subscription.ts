import { useQuery } from '@tanstack/react-query';

import { GetSubscriptionResponse } from '@/app/api/subscription/me/route';

const useSubscription = () => {
  const { data, isFetching, refetch } = useQuery<GetSubscriptionResponse>({
    queryKey: ['subscription'],
    queryFn: () => fetch(`/api/subscription/me`).then(res => res.json())
  });

  return { data, isFetching, refetch };
};

export default useSubscription;
