import React from "react";
import Product from "./Product";

type Props = {
  products: Product[];
};

const ProductFeed = ({ products }: Props) => {
  return (
    <div>
      {products.map((prod) => (
        <Product key={prod.title} product={prod} />
      ))}
    </div>
  );
};

export default ProductFeed;
