'use server';

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';

import {
  userConfigSchema,
  UserConfigSchema
} from '../schema/user-config-schema';

export const updateUserConfig = async (data: UserConfigSchema) => {
  try {
    const user = await currentUser();

    if (!user) {
      return redirect('/sign-in');
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
        }
      }
    });

    const isSubscribed = userInfo?.subscription?.status === 'active';

    if (!isSubscribed) {
      throw new Error('You need to subscribe to a plan to access this feature');
    }

    const { success, data: newData, error } = userConfigSchema.safeParse(data);

    if (!success) {
      throw new Error(error.errors[0].message);
    }

    return await prisma.userConfig.update({
      where: {
        userId: user.id
      },
      data: {
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
