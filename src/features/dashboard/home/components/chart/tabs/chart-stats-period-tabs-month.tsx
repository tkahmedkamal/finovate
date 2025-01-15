import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { months } from '@/lib/constants';

import { usePeriodStore } from '../../../store';

const ChartStatsPeriodTabsMonth = () => {
  const setPeriod = usePeriodStore(state => state.setPeriod);
  const { month, year } = usePeriodStore(state => state.period);

  const onChange = (value: string) => {
    setPeriod({
      month: +value,
      year
    });
  };

  return (
    <div className="flex-horizontally gap-3">
      <Select defaultValue={String(month)} onValueChange={onChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select the month" />
        </SelectTrigger>
        <SelectContent>
          {months.map(({ name, month }) => (
            <SelectItem key={name} value={String(month)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ChartStatsPeriodTabsMonth;
