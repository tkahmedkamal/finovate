import { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { convertUTCToTimezone, formatCurrency } from '@/lib/helpers';
import { dateRangeSchema } from '@/features/dashboard/schema/date-range-schema';

interface GetTransaction {
  userId: string;
  from: Date;
  to: Date;
  timezone: string;
  currency: string;
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
        useConfig: {
          select: {
            timezone: true,
            currency: true
          }
        }
      }
    });

    const isSubscribed = userInfo?.subscription?.status === 'active';

    if (!isSubscribed) {
      throw new Error('User is not subscribed to access this resource.');
    }

    if (!userInfo?.useConfig) {
      throw new Error('User configuration not found.');
    }

    const timezone = userInfo.useConfig.timezone;
    const currency = userInfo.useConfig.currency;

    const searchParams = req.nextUrl.searchParams;
    const from = searchParams.get('from') || new Date(new Date().setDate(1));
    const to = searchParams.get('to') || new Date();

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const { data, success, error } = dateRangeSchema.safeParse({
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

    const transactions = await getTransactions({
      userId: user.id,
      from: data.from,
      to: data.to,
      timezone,
      currency
    });

    return Response.json({
      statusText: 'success',
      data: transactions
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

const getTransactions = async ({
  userId,
  from,
  to,
  timezone,
  currency
}: GetTransaction) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to
      }
    },
    select: {
      description: true,
      date: true,
      type: true,
      amount: true,
      category: {
        select: {
          name: true,
          icon: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return transactions.map(transaction => ({
    ...transaction,
    category: `${transaction.category?.icon} ${transaction.category?.name}`,
    date: convertUTCToTimezone(transaction.date, timezone),
    amount: formatCurrency(currency).format(transaction.amount)
  }));
};

export type GetTransactionsReport = Mapped<{
  statusText: string;
  data: Awaited<ReturnType<typeof getTransactions>>;
  error: string;
}>;
