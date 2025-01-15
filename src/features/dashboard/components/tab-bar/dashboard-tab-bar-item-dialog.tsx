'use client';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CreateTransactionForm } from '../create-transaction';
import { CreateCategoryForm } from '../create-category';
import { useAddModalStore } from '../../store';

const DashboardTabBarItemDialog = () => {
  const open = useAddModalStore(state => state.open);
  const setOpen = useAddModalStore(state => state.setOpen);

  return (
    <li className="flex-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" className="rounded-full">
            <Plus className="!size-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Category / Transaction</DialogTitle>
          <DialogDescription>
            Quickly add a new category or transaction to your records.
          </DialogDescription>
          <Tabs defaultValue="transaction">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="category">Category</TabsTrigger>
              <TabsTrigger value="transaction">Transaction</TabsTrigger>
            </TabsList>
            <TabsContent value="category">
              <CreateCategoryForm />
            </TabsContent>
            <TabsContent value="transaction">
              <CreateTransactionForm />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </li>
  );
};

export default DashboardTabBarItemDialog;
