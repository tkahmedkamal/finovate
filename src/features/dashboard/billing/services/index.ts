import { auth } from '@clerk/nextjs/server';

import { GetSubscriptionResponse } from '@/app/api/subscription/me/route';

export const getMeSubscription = async (): Promise<GetSubscriptionResponse> => {
  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    throw new Error('Invalid token, please sign in');
  }

  const response = await fetch(`${process.env.Base_URL}/api/subscription/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch subscription data');
  }

  return await response.json();
};
