import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { items, email } = req.body;
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        line_items: items.map((item) => ({
          quantity: 1,
          price_data: {
            currency: "cad",
            unit_amount: item.price * 100,
            product_data: {
              name: item.title,
              description: item.description,
              images: [item.image],
            },
          },
        })),

        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 0, currency: "cad" },
              display_name: "Free shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 5 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 1500, currency: "cad" },
              display_name: "Next day delivery",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 1 },
                maximum: { unit: "business_day", value: 1 },
              },
            },
          },
        ],

        shipping_address_collection: {
          allowed_countries: ["CA", "US"],
        },
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      // in real life, check product, pricing, availablity on the server.
      // do not trust the client...
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      // Success! return session to the calling page.
      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
