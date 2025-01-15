'use client';

import { toast } from 'sonner';
import { differenceInDays } from 'date-fns';

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';

import { useDateRangeStore } from '../store';

const DatePicker = () => {
  const { from, to, setDateRange } = useDateRangeStore();

  return (
    <DateRangePicker
      initialDateFrom={from}
      initialDateTo={to}
      showCompare={false}
      onUpdate={values => {
        const { from, to } = values.range;

        if (!from || !to) {
          return;
        }

        if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
          toast.error(
            `The selected date range is too big. Max allow range is ${MAX_DATE_RANGE_DAYS} days`,
            {
              richColors: true
            }
          );

          return;
        }

        setDateRange(from, to);
      }}
    />
  );
};

export default DatePicker;
