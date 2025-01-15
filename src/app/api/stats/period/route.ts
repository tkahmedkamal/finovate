import { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { getDaysInMonth } from 'date-fns';

import prisma from '@/lib/prisma';
import { months } from '@/lib/constants';
import { periodSchema } from '@/features/dashboard/home/schema/period';

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
    const viewMode = searchParams.get('viewMode') || 'year';
    const month = searchParams.get('month') || new Date().getMonth();
    const year = searchParams.get('year') || new Date().getFullYear();

    const { success, data, error } = periodSchema.safeParse({
      viewMode,
      month,
      year
    });

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

    const stats = await getPeriodStats(
      user.id,
      data.viewMode,
      data.month,
      data.year
    );
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

const getPeriodStats = async (
  userId: string,
  viewMode: ChartTabs,
  month: number,
  year: number
) => {
  switch (viewMode) {
    case 'month':
      return getDailyState(userId, month, year);
    default:
      return getMonthlyStats(userId, year);
  }
};

const getDailyState = async (userId: string, month: number, year: number) => {
  const dailyStats = await prisma.dailyStats.findMany({
    where: {
      userId,
      month,
      year
    },
    select: {
      day: true,
      income: true,
      expense: true
    },
    orderBy: {
      day: 'asc'
    }
  });

  const daysInMonth = getDaysInMonth(
    new Date(new Date().getFullYear(), new Date().getMonth())
  );

  const data: { day: string; income: number; expense: number }[] = [];

  for (let i = 1; i <= daysInMonth; i++) {
    const findStats = dailyStats.find(dailyStat => dailyStat.day === i);

    data.push({
      day: `${i} day`,
      income: findStats?.income || 0,
      expense: findStats?.expense || 0
    });
  }

  return data;
};

const getMonthlyStats = async (userId: string, year: number) => {
  const monthlyStats = await prisma.monthlyStats.findMany({
    where: {
      userId,
      year
    },
    select: {
      month: true,
      income: true,
      expense: true
    },
    orderBy: {
      month: 'asc'
    }
  });

  return months.map(month => {
    const findStats = monthlyStats.find(
      monthlyStat => monthlyStat.month === month.month
    );

    return {
      month: month.name,
      income: findStats?.income || 0,
      expense: findStats?.expense || 0
    };
  });
};

export type GetPeriodStatsResponse = Mapped<{
  statusText: string;
  data: Awaited<ReturnType<typeof getPeriodStats>>;
}>;
