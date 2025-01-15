import { headers } from 'next/headers';
import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const headerList = await headers();
  const signature = headerList.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    const session = event.data.object as Stripe.Checkout.Session;
    const subscription = event.data.object as Stripe.Subscription;
    const invoice = event.data.object as Stripe.Invoice;

    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(session);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(invoice);
        break;
      case 'customer.subscription.deleted':
        await handleCustomerSubscriptionDeleted(subscription);
        break;
      default:
        throw new Error('Unhandled event type');
    }

    return new Response(null, {
      status: 200
    });
  } catch (error) {
    return Response.json(
      {
        statusText: 'error',
        error: error instanceof Error ? error.message : error
      },
      {
        status: 400
      }
    );
  }
}

const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
) => {
  const customerId = session.customer as string;
  const subscriptions = await stripe.subscriptions.retrieve(
    session.subscription as string
  );

  const user = await prisma.user.findUnique({
    where: {
      stripeCustomerId: customerId
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.subscription.create({
    data: {
      stripeSubscriptionId: subscriptions.id,
      period: subscriptions.items.data[0].plan.interval,
      periodStart: subscriptions.current_period_start,
      periodEnd: subscriptions.current_period_end,
      status: subscriptions.status,
      planId: subscriptions.items.data[0].plan.id,
      userId: user.id
    }
  });
};

const handleInvoicePaymentSucceeded = async (invoice: Stripe.Invoice) => {
  const subscriptions = await stripe.subscriptions.retrieve(
    invoice.subscription as string
  );

  return await prisma.subscription.update({
    where: {
      stripeSubscriptionId: subscriptions.id
    },
    data: {
      periodStart: subscriptions.current_period_start,
      periodEnd: subscriptions.current_period_end,
      status: subscriptions.status,
      planId: subscriptions.items.data[0].price.id
    }
  });
};

const handleCustomerSubscriptionDeleted = async (
  subscription: Stripe.Subscription
) => {
  const subscriptions = await stripe.subscriptions.retrieve(subscription.id);

  await prisma.subscription.delete({
    where: {
      stripeSubscriptionId: subscriptions.id
    }
  });
};
