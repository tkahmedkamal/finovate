'use client';

import { ChartConfig } from '@/components/ui/chart';
import { SkeletonContainer } from '@/components';

import { useGetPeriodStats } from '../../hooks';
import { useChartTypeStore } from '../../store';

import { ChartStatsArea, ChartStatsBar } from './';

const chartConfig = {
  income: {
    label: 'Income',
    color: 'hsl(var(--chart-1))'
  },
  expense: {
    label: 'Expense',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

const ChartStatsView = () => {
  const { data, isFetching } = useGetPeriodStats();
  const chartType = useChartTypeStore(state => state.type);

  const chartData = data?.data || [];

  return (
    <SkeletonContainer isLoading={isFetching}>
      {chartType === 'area' ? (
        <ChartStatsArea chartData={chartData} chartConfig={chartConfig} />
      ) : (
        <ChartStatsBar chartData={chartData} chartConfig={chartConfig} />
      )}
    </SkeletonContainer>
  );
};

export default ChartStatsView;
