'use client';

import { AreaChart, BarChart2Icon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { useChartTypeStore } from '../../store';

const ChartStatsSelector = () => {
  const setChartType = useChartTypeStore(state => state.setType);

  const onChange = (value: ChartType) => {
    setChartType(value);
  };

  return (
    <Select defaultValue="area" onValueChange={onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bar">
          <div className="flex-horizontally gap-2">
            <BarChart2Icon size={18} />
            Bar Chart
          </div>
        </SelectItem>
        <SelectItem value="area">
          <div className="flex-horizontally gap-2">
            <AreaChart size={18} />
            Area Chart
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ChartStatsSelector;
