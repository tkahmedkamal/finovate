'use server';

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';

import {
  transactionSchema,
  TransactionSchema
} from '../schema/transaction-schema';

export const createTransaction = async (data: TransactionSchema) => {
  try {
    const user = await currentUser();

    if (!user) {
      return redirect('/sign-in');
    }

    const { success, data: newData, error } = transactionSchema.safeParse(data);

    if (!success) {
      return {
        ok: false,
        error: error.message
      };
    }

    const { description, category, type, amount, date } = newData;

    const newTransaction = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          description,
          type,
          amount,
          date,
          categoryId: category,
          userId: user.id
        }
      }),

      prisma.dailyStats.upsert({
        where: {
          userId_day_month_year: {
            userId: user.id,
            day: date.getUTCDate(),
            month: date.getUTCMonth(),
            year: date.getUTCFullYear()
          }
        },
        create: {
          userId: user.id,
          day: date.getUTCDate(),
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
          income: type === 'income' ? amount : 0,
          expense: type === 'expense' ? amount : 0
        },
        update: {
          income: {
            increment: type === 'income' ? amount : 0
          },
          expense: {
            increment: type === 'expense' ? amount : 0
          }
        }
      }),

      prisma.monthlyStats.upsert({
        where: {
          userId_month_year: {
            userId: user.id,
            month: date.getUTCMonth(),
            year: date.getUTCFullYear()
          }
        },
        create: {
          userId: user.id,
          month: date.getUTCMonth(),
          year: date.getUTCFullYear(),
          income: type === 'income' ? amount : 0,
          expense: type === 'expense' ? amount : 0
        },
        update: {
          income: {
            increment: type === 'income' ? amount : 0
          },
          expense: {
            increment: type === 'expense' ? amount : 0
          }
        }
      })
    ]);

    return {
      ok: true,
      data: newTransaction
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
