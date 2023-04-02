import CheckoutProduct from "@/components/CheckoutProduct";
import Header from "@/components/Header";
import { selectItems, selectTotal } from "@/store/slices/basketSlice";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { NumericFormat } from "react-number-format";
import { useSelector } from "react-redux";

type Props = {};

const Checkout = (props: Props) => {
  const session = useSession();
  const auth = session.status === "authenticated";
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
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
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
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
