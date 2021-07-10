import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb';

import { fauna } from '../../services/fauna';
import { getSession } from 'next-auth/client'
import { stripe } from '../../services/stripe';

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_custumer: string
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, resp: NextApiResponse) => {

  if (req.method === 'POST') {
    const { priceId } = req.body;
    console.log(priceId);

    const session = await getSession({ req });


    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    );

    let custumerId = user.data.stripe_custumer

    if (!custumerId) {
      const stripeCustumer = await stripe.customers.create({
        email: session.user.email,
      });

      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: {
              stripe_custumer: stripeCustumer.id
            }
          }
        )
      )
      custumerId = stripeCustumer.id
    }


    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: custumerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return resp.status(200).json({ sessionId: stripeCheckoutSession.id })

  } else {
    resp.setHeader('Allow', 'POST');
    return resp.status(405).end('Method not allowed')
  }

}