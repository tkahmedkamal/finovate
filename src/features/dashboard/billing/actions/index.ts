'use server';

import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

import prisma from '@/lib/prisma';
import { getStripeSession, stripe } from '@/lib/stripe';

const BASE_URL = process.env.BASE_URL as string;

export const createSubscription = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id
    },
    select: {
      stripeCustomerId: true
    }
  });

  if (!dbUser?.stripeCustomerId) {
    throw new Error('Stripe customer not found');
  }

  const subscriptionUrl = await getStripeSession({
    priceId: process.env.STRIPE_PRICE_ID!,
    domainUrl: BASE_URL,
    customerId: dbUser.stripeCustomerId
  });

  redirect(subscriptionUrl);
};

export const createBillingPortal = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id
    },
    select: {
      stripeCustomerId: true
    }
  });

  if (!dbUser?.stripeCustomerId) {
    throw new Error('Stripe customer not found');
  }

  const billingPortal = await stripe.billingPortal.sessions.create({
    customer: dbUser.stripeCustomerId as string,
    return_url: `${BASE_URL}/billing`
  });

  redirect(billingPortal.url);
};
