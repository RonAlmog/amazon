import React from "react";
import Product from "./Product";

type Props = {
  products: Product[];
};

const ProductFeed = ({ products }: Props) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.slice(0, 4).map((prod) => (
        <Product key={prod.title} product={prod} />
      ))}

      <img
        src="/ad_1500x300.jpg"
        alt="ad here"
        className="md:col-span-full mx-auto"
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((prod) => (
          <Product key={prod.title} product={prod} />
        ))}
      </div>
      {products.slice(5, products.length).map((prod) => (
        <Product key={prod.title} product={prod} />
      ))}
    </div>
  );
};

export default ProductFeed;
