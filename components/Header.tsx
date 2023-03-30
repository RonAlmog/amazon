import Image from "next/image";
import React from "react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

type Props = {};

const Header = (props: Props) => {
  return (
    <header>
      {/* top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Image
            src="/amazonlogo.png"
            width={150}
            height={40}
            alt="Amazon.ca"
            style={{ objectFit: "cover" }}
            className="cursor-pointer"
          />
        </div>
        {/* search */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
          />
          <MagnifyingGlassIcon className="h-12 p-3" />
        </div>

        {/* right */}
        <div className="text-white flex items-center text-sm space-x-6 mx-6 whitespace-pre-wrap">
          <div>
            <p>hello ron</p>
            <p>orders</p>
          </div>
          <div>
            <p>Returns</p>
            <p>Orders</p>
          </div>
          <div>
            <ShoppingCartIcon className="h-10" />
          </div>
        </div>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
