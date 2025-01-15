import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';

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
      },
      select: {
        id: true
      }
    });

    if (!dbUser) {
      return Response.json(
        {
          statusText: 'error',
          error: 'User not found.'
        },
        {
          status: 404
        }
      );
    }

    const subscription = await getSubscription(dbUser.id);

    return Response.json({
      statusText: 'success',
      data: subscription || null
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

const getSubscription = async (userId: string) => {
  return await prisma.subscription.findUnique({
    where: {
      userId
    },
    select: {
      status: true,
      periodEnd: true
    }
  });
};

export type GetSubscriptionResponse = Mapped<{
  statusText: string;
  data: Awaited<ReturnType<typeof getSubscription>>;
}>;
