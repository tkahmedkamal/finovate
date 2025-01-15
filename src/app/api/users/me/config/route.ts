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

    const userConfig = await getUserConfig(user.id);

    return Response.json({
      statusText: 'success',
      data: userConfig
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

const getUserConfig = async (userId: string) => {
  return await prisma.userConfig.findFirst({
    where: {
      userId
    },
    select: {
      currency: true
    }
  });
};

export type GetUserConfigResponse = Mapped<{
  statusText: string;
  data: Awaited<ReturnType<typeof getUserConfig>>;
}>;
