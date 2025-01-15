import { useQuery } from '@tanstack/react-query';

import { CategorySchema } from '@/features/dashboard/schema/category-schema';
import { GetCategoriesResponse } from '@/app/api/categories/route';

const useCategoriesData = (type?: CategorySchema['type'] | null) => {
  const url = type ? `/api/categories?type=${type}` : '/api/categories';

  const { data, isFetching, refetch } = useQuery<Mapped<GetCategoriesResponse>>(
    {
      queryKey: ['categories', type],
      queryFn: () => fetch(url).then(res => res.json()),
      staleTime: 120 * 60 * 1000
    }
  );

  return { data, isFetching, refetch };
};

export default useCategoriesData;
