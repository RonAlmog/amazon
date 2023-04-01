import Header from "@/components/Header";
import Image from "next/image";
import React from "react";

type Props = {};

const checkout = (props: Props) => {
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
            <h1 className="text-3xl border-b pb-4">Shopping Basket</h1>
          </div>
        </div>

        {/* style={{ objectFit: "fill, contain, cover, none, scale-down" }}   */}

        {/* right  */}
      </main>
    </div>
  );
};

export default checkout;
