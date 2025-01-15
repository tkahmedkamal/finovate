'use client';

import { INITIAL_SUMMARY_STATS } from '@/lib/constants';

import { useGetSummaryStats } from '../../hooks';

import { SummaryStatsCard, SummaryStatsSkeleton } from './';

const SummaryStats = () => {
  const { data, isFetching } = useGetSummaryStats();

  const stats = data?.data ?? INITIAL_SUMMARY_STATS;

  if (isFetching) {
    return <SummaryStatsSkeleton />;
  }

  const balance = stats.income - stats.expense;
  const prevMonthIncome = stats.prevMonthIncomePercentage;
  const prevMonthExpense = stats.prevMonthExpensePercentage;

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
      <SummaryStatsCard type="balance" amount={balance} />
      <SummaryStatsCard
        type="income"
        amount={stats.income}
        statusValue={prevMonthIncome}
      />
      <SummaryStatsCard
        type="expense"
        amount={stats.expense}
        statusValue={prevMonthExpense}
      />
    </div>
  );
};

export default SummaryStats;
