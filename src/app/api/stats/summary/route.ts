import { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';

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
          error: error.message,
          data: null
        },
        { status: 400 }
      );
    }

    const stats = await getSummaryStats(user.id, data.from, data.to);
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

const getSummaryStats = async (userId: string, from: Date, to: Date) => {
  const prevMonthStart = new Date(to.getFullYear(), to.getMonth() - 1, 1);
  const prevMonthEnd = new Date(to.getFullYear(), to.getMonth(), 0);

  const stats = await summaryStatsQuery(userId, from, to);
  const prevMonth = await summaryStatsQuery(
    userId,
    prevMonthStart,
    prevMonthEnd
  );

  const income = getStatsAmount(stats, 'income');
  const expense = getStatsAmount(stats, 'expense');
  const prevMonthIncome = getStatsAmount(prevMonth, 'income');
  const prevMonthExpense = getStatsAmount(prevMonth, 'expense');

  return {
    income,
    expense,
    prevMonthIncomePercentage: calcStatsPercentage(income, prevMonthIncome),
    prevMonthExpensePercentage: calcStatsPercentage(expense, prevMonthExpense)
  };
};

const summaryStatsQuery = async (userId: string, from: Date, to: Date) => {
  return await prisma.transaction.groupBy({
    by: ['type'],
    where: {
      userId,
      date: {
        gte: from,
        lte: to
      }
    },
    _sum: {
      amount: true
    }
  });
};

const getStatsAmount = (stats: StatsType, type: string) => {
  return stats.find(item => item.type === type)?._sum.amount || 0;
};

const calcStatsPercentage = (current: number, prev: number) => {
  if (prev === 0) {
    return 0;
  }

  const percentage = ((current - prev) / prev) * 100;

  return Number(percentage.toFixed());
};

type StatsType = (Prisma.PickEnumerable<
  Prisma.TransactionGroupByOutputType,
  'type'[]
> & {
  _sum: {
    amount: number | null;
  };
})[];

export type GetSummaryStatsResponse = Mapped<{
  statusText: string;
  data: Awaited<ReturnType<typeof getSummaryStats>>;
}>;
