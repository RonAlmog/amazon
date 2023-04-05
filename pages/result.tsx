import { NextPage } from "next";
import { useRouter } from "next/router";

//import Layout from '../components/Layout'
import PrintObject from "../components/PrintObject";
//import Cart from '../components/Cart'
//import ClearCart from '../components/ClearCart'

import { fetchGetJSON } from "../utils/api-helpers";
import useSWR from "swr";
import Header from "@/components/Header";

const ResultPage: NextPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  if (error) return <div>failed to load</div>;

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <h2>{!data?.payment_intent?.status && "Loading..."}</h2>

        {data?.payment_intent?.status === "succeeded" && (
          <div>
            <h1 className="text-3xl border-b pb-4">Success!!</h1>
            <p>Thank you for your order!</p>
          </div>
        )}
        {/* <PrintObject content={data ?? "loading..."} /> */}
      </main>
    </div>

    // <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
    //   <div className="page-container">
    //     <h1>Checkout Payment Result</h1>
    //     <h2>Status: {data?.payment_intent?.status ?? "loading..."}</h2>
    //     <h3>CheckoutSession response:</h3>
    //     <PrintObject content={data ?? "loading..."} />
    //     <Cart>
    //       <ClearCart />
    //     </Cart>
    //   </div>
    // </Layout>
  );
};

export default ResultPage;
