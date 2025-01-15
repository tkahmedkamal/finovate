'use client';

import Link from 'next/link';
import { BadgeEuro, Download, PlusCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

import { useSubscription } from '../hooks';
import { TransactionTableContainer } from '../components';

import { TransactionCreateDialog, TransactionsCsv } from './components';

const TransactionsContainer = () => {
  const { data } = useSubscription();

  const isSubscribed = data?.data && data.data.status === 'active';

  return (
    <div className="space-y-10 pt-12 sm:pt-14 xl:pt-0">
      <header className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Transactions</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Card>
        <CardHeader>
          <div className="flex-between">
            <div className="flex-horizontally gap-3">
              <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
                <BadgeEuro />
              </span>
              <CardTitle className="flex flex-col">
                <Typography as="h1" variant="h5" weight="semibold">
                  Transactions
                </Typography>
              </CardTitle>
            </div>
            <div className="flex-horizontally gap-3">
              {isSubscribed ? (
                <TransactionsCsv />
              ) : (
                <Button asChild>
                  <Link href="/billing">
                    <Download />
                  </Link>
                </Button>
              )}
              <TransactionCreateDialog>
                <Button size="icon" className="hidden xl:flex">
                  <PlusCircle />
                </Button>
              </TransactionCreateDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TransactionTableContainer />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsContainer;
