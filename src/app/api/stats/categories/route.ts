import { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { dateRangeSchema } from '@/features/dashboard/schema/date-range-schema';

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
    const from = searchParams.get('from') || new Date(new Date().setDate(1));
    const to = searchParams.get('to') || new Date();

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const { success, data, error } = dateRangeSchema.safeParse({
      from: fromDate,
      to: toDate
    });

    if (!success) {
      return Response.json(
        {
          statusText: 'error',
          error: error.errors,
          data: null
        },
        { status: 400 }
      );
    }

    const stats = await getCategoriesStats(user.id, data.from, data.to);

    return Response.json({
      statusText: 'success',
      data: stats
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

const getCategoriesStats = async (userId: string, from: Date, to: Date) => {
  const categories = await prisma.transaction.groupBy({
    by: ['categoryId', 'type'],
    where: {
      userId,
      date: {
        gte: from,
        lte: to
      }
    },
    _sum: {
      amount: true
    },
    orderBy: {
      _sum: {
        amount: 'desc'
      }
    }
  });

  const totalIncomeAmount = categories
    .filter(category => category.type === 'income')
    .reduce((acc, item) => acc + Number(item._sum.amount), 0);

  const totalExpenseAmount = categories
    .filter(category => category.type === 'expense')
    .reduce((acc, item) => acc + Number(item._sum.amount), 0);

  const categoriesDetails = await prisma.category.findMany({
    where: {
      id: {
        in: categories.map(s => s.categoryId).filter(s => s !== null)
      }
    },
    select: {
      id: true,
      name: true,
      icon: true,
      description: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  const items = categories.map(category => {
    const details = categoriesDetails.find(c => c.id === category.categoryId);
    const amount = category._sum.amount || 0;
    const incomePercentage =
      totalIncomeAmount > 0 ? (amount / totalIncomeAmount) * 100 : 0;
    const expensePercentage =
      totalExpenseAmount > 0 ? (amount / totalExpenseAmount) * 100 : 0;

    return {
      id: category.categoryId,
      name: details?.name,
      icon: details?.icon,
      description: details?.description,
      amount,
      type: category.type,
      ...(category.type === 'income'
        ? { percentage: Number(incomePercentage.toFixed()) }
        : { percentage: Number(expensePercentage.toFixed()) })
    };
  });

  return items;
};

export type GetCategoriesStatsResponse = Mapped<{
  statusText: string;
  data: Awaited<ReturnType<typeof getCategoriesStats>>;
}>;
