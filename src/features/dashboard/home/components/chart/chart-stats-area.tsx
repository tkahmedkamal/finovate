'use client';

import { AreaChart, Area, CartesianGrid, XAxis } from 'recharts';

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

const ChartStatsArea = ({ chartData, chartConfig }: Props) => {
  const tab = usePeriodTabsStore(state => state.tab);

  return (
    <ChartContainer config={chartConfig} className="h-96 w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={tab === 'month' ? 'day' : 'month'}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={value => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-income)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-income)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-expense)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-expense)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="expense"
          type="natural"
          fill="url(#fillExpense)"
          fillOpacity={0.4}
          stroke="var(--color-expense)"
          stackId="a"
        />
        <Area
          dataKey="income"
          type="natural"
          fill="url(#fillIncome)"
          fillOpacity={0.4}
          stroke="var(--color-income)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default ChartStatsArea;
