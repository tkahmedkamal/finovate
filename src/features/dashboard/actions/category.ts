'use server';

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import {
  categorySchema,
  CategorySchema
} from '@/features/dashboard/schema/category-schema';
import prisma from '@/lib/prisma';

export const createCategory = async (data: CategorySchema) => {
  try {
    const user = await currentUser();

    if (!user) {
      redirect('/sign-in');
    }

    const userInfo = await prisma.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        subscription: {
          select: {
            status: true
          }
        },
        _count: {
          select: {
            categories: true
          }
        }
      }
    });

    const isSubscribed = userInfo?.subscription?.status === 'active';
    const categoriesCount = userInfo?._count?.categories || 0;

    if (!isSubscribed && categoriesCount >= 2) {
      throw new Error(
        'You have reached the limit of categories for your subscription plan'
      );
    }

    const { success, data: newData, error } = categorySchema.safeParse(data);

    if (!success) {
      throw new Error(error.errors[0].message);
    }

    const category = await prisma.category.findFirst({
      where: {
        userId: user.id,
        name: newData.name,
        type: newData.type
      }
    });

    if (category) {
      throw new Error('Category already exists');
    }

    return await prisma.category.create({
      data: {
        userId: user.id,
        ...newData
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error('Something went wrong, please try again later');
  }
};
