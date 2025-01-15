import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { asyncWrap } from '@/lib/helpers';
import { ErrorMessage } from '@/components';

import { BillingDetailsCard, BillingPlanCard } from './components';
import { getMeSubscription } from './services';

const BillingContainer = async () => {
  const [subscription, error] = await asyncWrap(getMeSubscription());

  const billingCard =
    subscription && subscription.data?.status === 'active' ? (
      <BillingDetailsCard />
    ) : (
      <BillingPlanCard />
    );

  return (
    <div className="space-y-10">
      <header className="space-y-2 border-b pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Billing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex-center">
        {error ? <ErrorMessage message={error.message} /> : billingCard}
      </div>
    </div>
  );
};

export default BillingContainer;
