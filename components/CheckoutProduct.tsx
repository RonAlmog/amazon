import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { NumericFormat, PatternFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "@/store/slices/basketSlice";

type Props = {
  basketItem: Product;
};

const CheckoutProduct = ({ basketItem }: Props) => {
  const id = basketItem.id;
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket(basketItem));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <Image
        src={basketItem.image}
        height={200}
        width={200}
        alt={basketItem.title}
      />
      <div className="col-span-3 mx-5">
        <p>{basketItem.title}</p>
        <div className="flex">
          <StarIcon className="h-5 text-yellow-500" />
        </div>
        <p className="text-sm my-2 line-lamp-3">{basketItem.description}</p>
        <div className="mb-2">
          <NumericFormat
            value={basketItem.price}
            displayType={"text"}
            prefix={"$"}
            thousandSeparator={true}
          />
        </div>
        {basketItem.hasPrime ||
          (true && (
            <div className="flex items-center space-x-2">
              <img src="/prime.png" className="w-16" alt="prime" />
              <div className="text-xs text-gray-500">
                Free next day delivery
              </div>
            </div>
          ))}
      </div>
      {/* add / remove buttons */}
      <div className="flex flex-col space-y-2 justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
