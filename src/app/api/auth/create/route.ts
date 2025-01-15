import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { getTimezone, timezoneToCurrency } from '@/lib/helpers';
import { TimeZoneCurrencies } from '@/lib/types';
import { stripe } from '@/lib/stripe';

export async function GET() {
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

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id
      }
    });

    const userConfig = await prisma.userConfig.findUnique({
      where: {
        userId: user?.id
      }
    });

    if (!dbUser) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress ?? '',
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          fullName: user.fullName ?? '',
          imageUrl: user.imageUrl ?? ''
        }
      });
    }

    if (!userConfig) {
      await prisma.userConfig.create({
        data: {
          userId: user.id,
          timezone: getTimezone(),
          currency: timezoneToCurrency(getTimezone() as TimeZoneCurrencies)
        }
      });
    }

    if (dbUser && !dbUser?.stripeCustomerId) {
      const customer = await stripe.customers.create({
        name: dbUser.fullName,
        email: dbUser.email
      });

      await prisma.user.update({
        where: {
          id: dbUser.id
        },
        data: {
          stripeCustomerId: customer.id
        }
      });
    }

    return NextResponse.redirect(process.env.BASE_URL as string);
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
