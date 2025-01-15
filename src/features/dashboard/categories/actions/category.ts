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
      return {
        ok: false,
        error: 'Invalid category id'
      };
    }

    const category = await prisma.category.delete({
      where: {
        userId: user.id,
        id
      }
    });

    return {
      ok: true,
      data: category
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Something went wrong, please try again later'
    };
  }
};
