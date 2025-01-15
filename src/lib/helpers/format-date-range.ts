import { format } from 'date-fns';

const formatDateRange = (from: Date, to: Date) => {
  const formattedStart = format(new Date(from), 'd MMM yyyy');
  const formattedEnd = format(new Date(to), 'd MMM yyyy');

  return `${formattedStart} - ${formattedEnd}`;
};

export default formatDateRange;
