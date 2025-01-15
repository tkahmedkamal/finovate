import { ChevronRightCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { SubmitButton } from '../../components';
import { createBillingPortal } from '../actions';

const BillingDetailsCard = () => {
  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Edit Subscription</CardTitle>
        <CardDescription>
          Click below to update payment details and view your statement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createBillingPortal}>
          <SubmitButton>
            View Payment Details
            <ChevronRightCircle />
          </SubmitButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default BillingDetailsCard;
