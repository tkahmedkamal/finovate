import { useEffect, useState } from 'react';

import { GetCategoriesStatsResponse } from '@/app/api/stats/categories/route';
import { Progress } from '@/components/ui/progress';
import { Typography } from '@/components/ui/typography';
import { formatCurrency } from '@/lib/helpers';
import { useUserConfig } from '@/features/dashboard/hooks';

const CategoriesStatsItem = ({
  type,
  icon,
  name,
  description,
  amount,
  percentage
}: GetCategoriesStatsResponse['data'][0]) => {
  const [prog, setProg] = useState(0);
  const { data } = useUserConfig();
  const { currency = 'EGP' } = data?.data || {};

  const formattedAmount = formatCurrency(currency).format(amount);

  useEffect(() => {
    const timer = setTimeout(() => setProg(percentage), 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  const categoryName = name ?? 'Uncategorized';
  const categoryIcon = icon ?? '⁉️';

  return (
    <div className="mb-6 flex flex-col gap-y-3">
      <div className="flex-between">
        <div className="flex-horizontally gap-3">
          <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
            {categoryIcon}
          </span>
          <div className="space-y-1.5">
            <Typography as="h3" variant="body2" weight="semibold">
              {categoryName}
            </Typography>
            <Typography variant="body3" color="muted">
              {description}
            </Typography>
          </div>
        </div>
        <Typography
          as="span"
          variant="body3"
          weight="medium"
          className="space-x-1"
        >
          {formattedAmount} /{' '}
          <Typography as="span" color="primary" weight="medium">
            {percentage}%
          </Typography>
        </Typography>
      </div>
      <Progress
        value={prog}
        className="h-1.5"
        indicator={type === 'income' ? 'bg-primary' : 'bg-third'}
      />
    </div>
  );
};

export default CategoriesStatsItem;
