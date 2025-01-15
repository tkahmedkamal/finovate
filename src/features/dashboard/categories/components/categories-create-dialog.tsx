'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { CreateCategoryForm } from '../../components/create-category';
import { useAddModalStore } from '../../store';

const CategoriesCreateDialog = ({ children }: Children) => {
  const open = useAddModalStore(state => state.open);
  const setOpen = useAddModalStore(state => state.setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Fill in the form below to create a new category.
          </DialogDescription>
        </DialogHeader>
        <CreateCategoryForm />
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesCreateDialog;
