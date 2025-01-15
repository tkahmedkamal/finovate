import { NextRequest } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { convertUTCToTimezone, formatCurrency } from '@/lib/helpers';
import { transactionRangeSchema } from '@/features/dashboard/schema/transaction-range-schema';

interface GetTransaction {
  userId: string;
  size: number | null;
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

    const searchParams = req.nextUrl.searchParams;
    const size = searchParams.get('size');
    const from = searchParams.get('from') || new Date(new Date().setDate(1));
    const to = searchParams.get('to') || new Date();

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const { data, success, error } = transactionRangeSchema.safeParse({
      size,
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

    const userConfig = await prisma.userConfig.findUnique({
      where: {
        userId: user.id
      },
      select: {
        currency: true,
        timezone: true
      }
    });

    if (!userConfig) {
      throw new Error('User configuration not found.');
    }

    const transactions = await getTransactions({
      userId: user.id,
      size: data.size,
      from: data.from,
      to: data.to,
      timezone: userConfig.timezone,
      currency: userConfig.currency
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
  size,
  from,
  to,
  currency,
  timezone
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
      id: true,
      description: true,
      amount: true,
      date: true,
      type: true,
      createdAt: true,
      category: {
        select: {
          id: true,
          name: true,
          icon: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    ...(size && { take: size })
  });

  return transactions.map(transaction => ({
    ...transaction,
    date: convertUTCToTimezone(transaction.date, timezone || 'UTC'),
    amount: formatCurrency(currency || 'EGP').format(transaction.amount),
    categoryName: transaction.category?.name || '',
    categoryIcon: transaction.category?.icon || ''
  }));
};

export type GetTransactionsResponse = Mapped<{
  statusText: string;
  data: Awaited<ReturnType<typeof getTransactions>>;
}>;
