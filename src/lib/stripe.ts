import Stripe from 'stripe';

interface StripeSession {
  priceId: string;
  domainUrl: string;
  customerId: string;
}

const apiKey = process.env.STRIPE_SECRET_KEY as string;

export const stripe = new Stripe(apiKey, {
  apiVersion: '2024-12-18.acacia',
  typescript: true
});

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId
}: StripeSession) => {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    customer_update: {
      address: 'auto',
      name: 'auto'
    },
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`
  });

  return session.url as string;
};
