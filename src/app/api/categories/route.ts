import { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { categorySchema } from '@/features/dashboard/schema/category-schema';
import { convertUTCToTimezone } from '@/lib/helpers';

interface GetCategories {
  userId: string;
  type: TransactionType | null;
  timezone: string;
}

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json(
        {
          statusText: 'unauthorized',
          error: 'This user is not authorized to access this resource.'
        },
        {
          status: 401
        }
      );
    }

    const searchParams = req.nextUrl.searchParams;

    const typeParam = searchParams.get('type');
    const {
      data: type,
      success,
      error
    } = categorySchema.shape.type.nullable().safeParse(typeParam);

    if (!success) {
      return Response.json(
        {
          statusText: 'error',
          error: error.message,
          data: null
        },
        {
          status: 400
        }
      );
    }

    const userConfig = await prisma.userConfig.findUnique({
      where: {
        userId: user.id
      },
      select: {
        timezone: true
      }
    });

    if (!userConfig) {
      throw new Error('User configuration not found.');
    }

    const categories = await getCategories({
      userId: user.id,
      type,
      timezone: userConfig.timezone
    });

    return Response.json({
      statusText: 'success',
      data: categories
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Something went wrong, Please try again.';

    return Response.json(
      {
        statusText: 'error',
        error: errorMessage
      },
      {
        status: 500
      }
    );
  }
}

const getCategories = async ({ userId, type, timezone }: GetCategories) => {
  const categories = await prisma.category.findMany({
    where: {
      userId,
      ...(type && { type })
    },
    select: {
      id: true,
      name: true,
      icon: true,
      type: true,
      description: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return categories.map(item => ({
    ...item,
    categoryName: item.name,
    description: item.description || '—',
    createdAt: convertUTCToTimezone(item.createdAt, timezone)
  }));
};

export type GetCategoriesResponse = {
  statusText: string;
  data: Awaited<ReturnType<typeof getCategories>>;
};
