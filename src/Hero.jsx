import React from "react";
import { PRODUCTS } from "./product";
import { useState, useEffect } from "react";
const Hero = () => {
  const [cartItems, setCartItems] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  });
  const [total, setTotal] = useState(0);

  const addToCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: cartItems[id] + 1 }));
    console.log(cartItems);
  };
  const subCart = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: cartItems[id] - 1 }));
  };
  const remove = (id) => {
    setCartItems((cartItems) => ({ ...cartItems, [id]: (cartItems[id] = 0) }));
  };
  const getTotal = () => {
    let res = 0;
    {
      PRODUCTS.map((produt, id) => {
        res += produt.price * cartItems[produt.id];
      });
    }
    setTotal(res);
  };
  useEffect(getTotal, [addToCart, remove, subCart]);
  return (
    <div className="flex flex-wrap   gap-20 p-10 pr-96 ">
      {PRODUCTS.map((product, i) => (
        <div
          key={i}
          className=" h-[20%] w-[40%] flex  flex-col  flex-wrap justify-center
           items-center object-contain "
        >
          <img src={product.productImage} alt="" />
          <p>{product.productName}</p>
          <p>${product.price}</p>
          <button
            className="border-2 border-red-400 hover:bg-green-400 
          p-2 mt-3 rounded-xl drop-shadow-md"
            onClick={() => addToCart(product.id)}
          >
            add to cart
          </button>
        </div>
      ))}

      <div className=" fixed right-0 top-0 w-[30%] h-screen bg-blue-400 p-4 overflow-auto">
        <h1 className="text-center text-3xl p-2">your cart</h1>
        <h1 className="pl-14 p-4 text-3xl font-extrabold">
          your total:${total}
        </h1>
        {PRODUCTS.map((product, i) => {
          if (cartItems[product.id] > 0) {
            return (
              <div key={i} className="flex my-4">
                <div className="flex">
                  <img
                    src={product.productImage}
                    alt=""
                    className="w-40 h-40"
                  />
                  <p className="flex mt-28 ml-2 text-3xl font-extrabold">
                    X {cartItems[product.id]}
                  </p>
                </div>
                <div className="flex flex-col mt-4 ml-10">
                  <button
                    className="bg-red-500 p-2 rounded-md"
                    onClick={() => remove(product.id)}
                  >
                    remove
                  </button>
                  <button
                    className="text-green-700 text-2xl font-extrabold hover:bg-green-300 mx-3 my-2 
                    rounded-lg"
                    onClick={() => addToCart(product.id)}
                  >
                    +
                  </button>
                  <button
                    onClick={() => subCart(product.id)}
                    className="text-red-700 text-2xl font-extrabold hover:bg-red-300 mx-3 my-2
                     rounded-lg text-center"
                  >
                    -
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Hero;
