import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import ProductItem from "../utils/productItem/ProductItem";

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [isAdmin] = state.UserAPI.isAdmin;  
  const [token] = state.token;
  const [callBack, setCallback] = state.productAPI.callBack;

  return (
    <>
      <div className="products">
        {products.map((products) => {
          return (
            <ProductItem
              key={products._id}
              product={products}
              isAdmin={isAdmin}
              token={token}
              callBack={callBack}
              setCallback={setCallback}
            />
          );
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
};

export default Products;
