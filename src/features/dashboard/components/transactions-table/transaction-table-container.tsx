'use client';

import { SkeletonContainer } from '@/components';

import { useTransactionsData } from '../../hooks';
import DataTable from '../table/data-table';

import { columns } from './';

interface Props {
  size?: number;
}

const TransactionTableContainer = ({ size }: Props) => {
  const { data, isFetching } = useTransactionsData(size);

  const transactions = data?.data || [];

  return (
    <SkeletonContainer isLoading={isFetching}>
      <DataTable columns={columns} data={transactions} />
    </SkeletonContainer>
  );
};

export default TransactionTableContainer;
