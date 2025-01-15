'use client';

import { ColumnDef } from '@tanstack/react-table';

import { GetTransactionsResponse } from '@/app/api/transactions/route';
import { Badge } from '@/components/ui/badge';

import DataTableColumnHeader from '../table/data-table-column-header';

const columns: ColumnDef<GetTransactionsResponse['data'][0]>[] = [
  {
    accessorKey: 'categoryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const { categoryName, categoryIcon } = row.original;

      const name = categoryName || 'Uncategorized';
      const icon = categoryIcon || '⁉️';

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
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
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
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    )
  }
];

export default columns;
