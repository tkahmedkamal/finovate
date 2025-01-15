import { BadgeEuro } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { TransactionTableContainer } from '@/features/dashboard/components';

const TransactionsStatsCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-y-5 sm:flex-row sm:justify-between">
          <div className="flex-horizontally gap-3">
            <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
              <BadgeEuro />
            </span>
            <CardTitle className="flex flex-col">
              <Typography as="h1" variant="h5" weight="semibold">
                Recent Transactions
              </Typography>
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TransactionTableContainer size={5} />
      </CardContent>
    </Card>
  );
};

export default TransactionsStatsCard;
