'use client';

import { useGetCategoriesStats } from '../../hooks';

import { CategoriesStatsCard, CategoriesStatsSkeleton } from '.';

const CategoriesStats = () => {
  const { data, isFetching } = useGetCategoriesStats();

  if (isFetching) {
    return <CategoriesStatsSkeleton />;
  }

  const items = data?.data || [];

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
      <CategoriesStatsCard type="income" data={items} />
      <CategoriesStatsCard type="expense" data={items} />
    </div>
  );
};

export default CategoriesStats;
