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
      return {
        ok: false,
        error:
          'You have reached the limit of categories for your subscription plan'
      };
    }

    const { success, data: newData, error } = categorySchema.safeParse(data);

    if (!success) {
      return {
        ok: false,
        error: error.errors[0].message
      };
    }

    const category = await prisma.category.findFirst({
      where: {
        userId: user.id,
        name: newData.name,
        type: newData.type
      }
    });

    if (category) {
      return {
        ok: false,
        error: 'Category already exists'
      };
    }

    const newCategory = await prisma.category.create({
      data: {
        userId: user.id,
        ...newData
      }
    });

    return {
      ok: true,
      data: newCategory
    };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Something went wrong, please try again later.'
    };
  }
};
