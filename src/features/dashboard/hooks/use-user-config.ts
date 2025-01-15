import { useQuery } from '@tanstack/react-query';

import { GetUserConfigResponse } from '@/app/api/users/me/config/route';

const useUserConfig = () => {
  const { data, isFetching, isLoading } = useQuery<GetUserConfigResponse>({
    queryKey: ['user-config'],
    queryFn: () => fetch('/api/users/me/config').then(res => res.json()),
    staleTime: 24 * 1000 * 60 * 60
  });

  return {
    data,
    isFetching,
    isLoading
  };
};

export default useUserConfig;
