import React from "react";
import Product from "./Product";

type Props = {
  products: Product[];
};

const ProductFeed = ({ products }: Props) => {
  return (
    <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.map((prod) => (
        <Product key={prod.title} product={prod} />
      ))}
    </div>
  );
};

export default ProductFeed;
