'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { GetPeriodStatsResponse } from '@/app/api/stats/period/route';

import { usePeriodTabsStore } from '../../store';

interface Props {
  chartData: GetPeriodStatsResponse['data'];
  chartConfig: ChartConfig;
}

const ChartStatsBar = ({ chartData, chartConfig }: Props) => {
  const tab = usePeriodTabsStore(state => state.tab);

  return (
    <ChartContainer config={chartConfig} className="h-96 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={tab === 'month' ? 'day' : 'month'}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="income" fill="var(--color-income)" radius={4} />
        <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

export default ChartStatsBar;
