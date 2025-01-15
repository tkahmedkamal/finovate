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

    const years = await getYears(user.id);

    return Response.json({
      statusText: 'success',
      data: years
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

const getYears = async (userId: string) => {
  const yearsData = await prisma.monthlyStats.findMany({
    where: {
      userId
    },
    select: {
      year: true
    },
    distinct: ['year'],
    orderBy: {
      year: 'asc'
    }
  });

  const years = yearsData.map(year => year.year);

  if (years.length === 0) {
    return [new Date().getFullYear()];
  }

  return years;
};

export type GetYearsResponse = Mapped<{
  statusText: string;
  data: Awaited<ReturnType<typeof getYears>>;
}>;
