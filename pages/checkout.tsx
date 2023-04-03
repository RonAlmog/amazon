import CheckoutProduct from "@/components/CheckoutProduct";
import Header from "@/components/Header";
import { selectItems, selectTotal } from "@/store/slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";
import getStripe from "@/utils/get-stripejs";
import { fetchPostJSON } from "../utils/api-helpers";
// this is outside the component's render, to avoid recreating stripe object on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

type Props = {};

const Checkout = (props: Props) => {
  const session = useSession();
  const auth = session.status === "authenticated";
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [loading, setLoading] = useState(false);

  const createCheckoutSession = async () => {
    setLoading(true);
    // call backend to create a checkout session
    const response = await fetchPostJSON("/api/checkout_sessions", {
      items,
      email: session.data?.user?.email,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id,
    });

    console.warn(error.message);
    setLoading(false);
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left  */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/prime-banner.webp"
            alt="prime day"
            width={1020}
            height={250}
            style={{ objectFit: "contain" }}
          />
          <div className="flex flex-col p-5 space-y-10">
            <h1 className="text-3xl border-b pb-4">
              {items?.length === 0 ? "Your basket is empty" : "Shopping Basket"}
            </h1>
            {items?.map((item: Product, i) => (
              <CheckoutProduct key={i} basketItem={item} />
            ))}
          </div>
        </div>

        {/* style={{ objectFit: "fill, contain, cover, none, scale-down" }}   */}

        {/* right  */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              {loading && <h2 className="font-bold">Loading...</h2>}
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):{" "}
                <span className="font-bold">
                  <NumericFormat
                    value={total}
                    displayType={"text"}
                    prefix={"$"}
                    thousandSeparator={true}
                  />
                </span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!auth}
                className={`button mt-2 ${
                  !auth &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {auth ? "Proceed to checkout" : "Sign in to Checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
