'use client';

import { SkeletonContainer } from '@/components';

import { useCategoriesData } from '../../hooks';
import { DataTable } from '../../components';

import { columns } from './';

const CategoriesTableContainer = () => {
  const { data, isFetching } = useCategoriesData();

  const categories = data?.data || [];

  return (
    <SkeletonContainer isLoading={isFetching}>
      <DataTable columns={columns} data={categories} />
    </SkeletonContainer>
  );
};

export default CategoriesTableContainer;
