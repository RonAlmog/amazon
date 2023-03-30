import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";

type Props = {
  product: Product;
};

const Product = ({ product }: Props) => {
  const [rating, setRating] = useState(2);
  return (
    <div>
      <p>{product.category}</p>
      <Image src={product.image} height={200} width={200} alt={product.title} />
      <h4>{product.title}</h4>
      <div className="flex">
        <StarIcon className="h-5" />
        <StarIcon className="h-5" />
        <StarIcon className="h-5" />
      </div>
      {/* product.rating.rate */}
    </div>
  );
};

export default Product;
