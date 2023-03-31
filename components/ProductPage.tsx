import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { NumericFormat, PatternFormat } from "react-number-format";

type Props = {
  product: Product;
};

const ProductPage = ({ product }: Props) => {
  // const [rating, setRating] = useState(2);
  // const [hasPrime, setHasPrime] = useState(Math.random() < 0.5);
  const rating = 3;
  const hasPrime = true;
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <div className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </div>
      <Image src={product.image} height={200} width={200} alt={product.title} />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        <StarIcon className="h-5 text-yellow-500" />
        <StarIcon className="h-5 text-yellow-500" />
        <StarIcon className="h-5 text-yellow-500" />
      </div>
      {/* product.rating.rate */}
      <div className="text-xs mt-2 mb-2 line-clamp-2 ">
        {product.description}
      </div>
      <div className="mb-5">
        <NumericFormat
          value={product.price}
          displayType={"text"}
          prefix={"$"}
          thousandSeparator={true}
        />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img src="/prime.png" className="w-16" alt="prime" />
          <div className="text-xs text-gray-500">Free next day delivery</div>
        </div>
      )}
      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
};

export default ProductPage;
