import { TrendingDown, TrendingUp } from 'lucide-react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GetCategoriesStatsResponse } from '@/app/api/stats/categories/route';
import { EmptyMessage } from '@/components';

import CategoriesStatsItem from './categories-stats-item';

interface Props {
  type: TransactionType;
  data: GetCategoriesStatsResponse['data'];
}

const config = {
  income: {
    title: 'Income',
    icon: TrendingUp
  },
  expense: {
    title: 'Expense',
    icon: TrendingDown
  }
};

const CategoriesStatsCard = ({ type, data }: Props) => {
  const IconComp = config[type].icon;
  const title = config[type].title;

  const categories = data.filter(category => category.type === type);

  return (
    <Card>
      <CardHeader>
        <div className="flex-horizontally gap-3">
          <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
            <IconComp />
          </span>
          <CardTitle className="flex flex-col">
            <Typography as="h2" variant="h5" weight="semibold">
              {title} Categories
            </Typography>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[246px]">
          {categories.length > 0 ? (
            categories.map(item => (
              <CategoriesStatsItem key={item.id} {...item} type={type} />
            ))
          ) : (
            <div className="flex-center h-[264px]">
              <EmptyMessage />
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CategoriesStatsCard;
