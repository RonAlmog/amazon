import Header from "@/components/Header";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import { GetServerSideProps } from "next";

type Props = {};

const Orders = (props: Props) => {
  const { data: session, status } = useSession();
  return (
    <div>
      <Header />
      <main className="max-w-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>x orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}

        <div className="mt-5 space-y-4"></div>
      </main>
    </div>
  );
};

export default Orders;

// backend routine: find orders for the logged in user
export const getServerSideProps: GetServerSideProps = async (context) => {
  // get stripe
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // get session
  const session = getSession(context);
  //if (!session) {
  return {
    props: {},
  };
  //}

  // const stripeOrders=await db
};
