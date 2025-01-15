import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import { usePeriodStore } from '../../../store';

interface Props {
  years: number[];
}

const ChartStatsPeriodTabsYear = ({ years }: Props) => {
  const { month, year } = usePeriodStore(state => state.period);
  const setPeriod = usePeriodStore(state => state.setPeriod);

  const onChange = (value: string) => {
    setPeriod({
      month,
      year: +value
    });
  };

  return (
    <Select defaultValue={String(year)} onValueChange={onChange}>
      <SelectTrigger className="w-[107px]">
        <SelectValue placeholder="Select the year" />
      </SelectTrigger>
      <SelectContent>
        {years.map(year => (
          <SelectItem key={year} value={String(year)}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChartStatsPeriodTabsYear;
