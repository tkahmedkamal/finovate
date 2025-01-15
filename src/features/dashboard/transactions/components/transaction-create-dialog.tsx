'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { CreateTransactionForm } from '../../components/create-transaction';
import { useAddModalStore } from '../../store';

const TransactionCreateDialog = ({ children }: Children) => {
  const open = useAddModalStore(state => state.open);
  const setOpen = useAddModalStore(state => state.setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new transaction.
          </DialogDescription>
        </DialogHeader>
        <CreateTransactionForm />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionCreateDialog;
