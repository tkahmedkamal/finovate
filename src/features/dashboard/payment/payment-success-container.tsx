import Link from 'next/link';
import { Check } from 'lucide-react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

const PaymentSuccessContainer = () => {
  return (
    <div className="flex-vertically space-y-10 pt-12">
      <Card className="w-full sm:max-w-lg">
        <CardHeader className="flex-center gap-4">
          <div className="flex-center size-20 rounded-full bg-success/5 text-success-foreground-hard">
            <Check size={48} />
          </div>
          <div className="space-y-2 text-center">
            <CardTitle>Payment Successful</CardTitle>
            <Typography color="muted" variant="h5">
              Congrats on your subscription, please check your email for further
              instructions.
            </Typography>
          </div>
          <Button className="w-full" asChild>
            <Link href="/">Go Back to Dashboard</Link>
          </Button>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PaymentSuccessContainer;
