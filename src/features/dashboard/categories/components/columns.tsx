'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import { GetCategoriesResponse } from '@/app/api/categories/route';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';

import { useDeleteCategory } from '../hooks';
import { DataTableColumnHeader } from '../../components';

const columns: ColumnDef<GetCategoriesResponse['data'][0]>[] = [
  {
    accessorKey: 'categoryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const { name, icon } = row.original;

      return (
        <>
          {icon} {name}
        </>
      );
    }
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    )
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const { type } = row.original;

      return (
        <Badge variant={type === 'income' ? 'default' : 'third'}>{type}</Badge>
      );
    }
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ({ row }) => <ActionsRow categoryId={row.original.id} />
  }
];

export default columns;

interface ActionsRow {
  categoryId: string;
}

const ActionsRow = ({ categoryId }: ActionsRow) => {
  const { mutate } = useDeleteCategory();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            category and remove its data from our records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: 'destructive'
            })}
            onClick={() => mutate(categoryId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
