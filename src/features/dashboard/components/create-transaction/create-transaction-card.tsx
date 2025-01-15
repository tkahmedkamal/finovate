import { BadgeEuro } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

import { CreateTransactionForm } from './';

const CreateTransactionCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex-horizontally gap-3">
          <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
            <BadgeEuro />
          </span>
          <CardTitle className="flex flex-col">
            <Typography as="h2" variant="h5" weight="semibold">
              Create Transaction
            </Typography>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <CreateTransactionForm />
      </CardContent>
    </Card>
  );
};

export default CreateTransactionCard;
