import Link from 'next/link';
import { BadgeEuro, PlusCircle } from 'lucide-react';

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

import { CategoriesCreateDialog, CategoriesTableContainer } from './components';

const CategoriesContainer = () => {
  return (
    <div className="space-y-10">
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
              <BreadcrumbPage>Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-y-5 sm:flex-row sm:justify-between">
            <div className="flex-horizontally gap-3">
              <span className="flex-center size-10 shrink-0 rounded-lg bg-primary/5 text-primary">
                <BadgeEuro />
              </span>
              <CardTitle className="flex flex-col">
                <Typography as="h1" variant="h5" weight="semibold">
                  Categories
                </Typography>
              </CardTitle>
            </div>
            <CategoriesCreateDialog>
              <Button size="icon" className="hidden xl:flex">
                <PlusCircle />
              </Button>
            </CategoriesCreateDialog>
          </div>
        </CardHeader>
        <CardContent>
          <CategoriesTableContainer />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesContainer;
