'use client';

import { CreateCategoryCard, CreateTransactionCard } from '../components';

import {
  CategoriesStats,
  SummaryStats,
  ChartStatsCard,
  TransactionsStatsCard
} from './components';

const DashboardContainer = () => {
  return (
    <div className="relative grid w-full grid-cols-12 gap-6 pt-12 sm:pt-14 xl:pt-0">
      <div className="col-span-full flex flex-col gap-y-4 sm:gap-y-6 xl:col-span-9">
        <SummaryStats />
        <ChartStatsCard />
        <CategoriesStats />
        <TransactionsStatsCard />
      </div>
      <div className="col-span-full hidden xl:col-span-3 xl:block">
        <div className="sticky top-[10px] space-y-6">
          <CreateTransactionCard />
          <CreateCategoryCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
