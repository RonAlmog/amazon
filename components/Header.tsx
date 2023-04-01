import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "@/store/slices/basketSlice";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  const items = useSelector(selectItems);
  const { data: session } = useSession();
  const sign = (e: any) => {
    e.preventDefault();
    console.log("sign in");
    signIn();
  };
  const signout = (e: any) => {
    e.preventDefault();
    console.log("sign out");
    signOut();
  };
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
            onClick={() => router.push("/")}
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
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-pre-wrap">
          <div className="link" onClick={!session ? sign : signout}>
            <p>{session ? `Hello ${session?.user?.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">orders</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">Orders</p>
          </div>
          <div className=" relative link flex items-center">
            <Link href="/checkout">
              <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                {items.length}
              </span>
              <ShoppingCartIcon className="h-10" />
              <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                Basket
              </p>
            </Link>
          </div>
        </div>
      </div>
      {/* bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Groceries</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
