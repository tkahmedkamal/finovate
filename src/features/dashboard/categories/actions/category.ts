'use server';

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';

export const deleteCategory = async (id: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      redirect('/sign-in');
    }

    if (!id) {
      throw new Error('Invalid category id');
    }

    return await prisma.category.delete({
      where: {
        userId: user.id,
        id
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Something went wrong, please try again later');
  }
};
