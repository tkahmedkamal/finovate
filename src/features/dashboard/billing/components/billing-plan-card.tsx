import { CheckCircle2, ChevronRightCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Badge } from '@/components/ui/badge';
import { PLAN_ITEMS } from '@/lib/constants';

import { SubmitButton } from '../../components';
import { createSubscription } from '../actions';

const BillingPlanCard = async () => {
  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <div className="flex flex-col gap-y-4">
          <CardTitle className="text-lg font-medium text-muted-foreground">
            <Badge variant="third">Monthly</Badge>
          </CardTitle>
          <Typography as="h3" weight="bold" className="text-5xl">
            <Typography as="span" variant="h2" weight="bold">
              $
            </Typography>
            10
            <Typography as="span" variant="h5" color="muted">
              /mo
            </Typography>
          </Typography>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border text-muted-foreground">
          {PLAN_ITEMS.map(({ id, title }) => (
            <li key={id} className="flex-horizontally py-3">
              <CheckCircle2 size={18} className="mr-2 shrink-0 text-success" />
              {title}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <form className="w-full" action={createSubscription}>
          <SubmitButton fullWidth>
            Choose Plan <ChevronRightCircle />
          </SubmitButton>
        </form>
      </CardFooter>
    </Card>
  );
};

export default BillingPlanCard;
