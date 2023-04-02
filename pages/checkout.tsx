import CheckoutProduct from "@/components/CheckoutProduct";
import Header from "@/components/Header";
import { selectItems } from "@/store/slices/basketSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Checkout = (props: Props) => {
  const session = useSession();
  const items = useSelector(selectItems);
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
            {items?.map((item, i) => (
              <CheckoutProduct key={i} basketItem={item} />
            ))}
          </div>
        </div>

        {/* style={{ objectFit: "fill, contain, cover, none, scale-down" }}   */}

        {/* right  */}
        <div>
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold">123</span>
              </h2>
              <button
                className={`button mt-2 ${
                  session.status != "authenticated" &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {session.status != "authenticated"
                  ? "Sign in to Checkout"
                  : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
