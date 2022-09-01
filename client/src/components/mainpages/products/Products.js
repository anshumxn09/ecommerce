import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";
import ProductItem from "../utils/productItem/ProductItem";
import axios from "axios";
// import Loading from "../utils/loading/Loading";

const Products = () => {
  const state = useContext(GlobalState);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = state.productAPI.products;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;
  const [callBack, setCallback] = state.productAPI.callBack;
  const checkAll = () => {
    setCheck(!check);
    if (!check) {
      products.forEach((item) => {
        item.checked = true;
      });
    } else {
      products.forEach((item) => {
        item.checked = false;
      });
    }
    setProducts([...products]);
  };

  const deleteAll = async () => {
    console.log("hello");
    if (window.confirm(`ARE YOU SURE, YOU WANT TO DELETE THE PRODUCTS?`)) {
      products.forEach(async (product) => {
        if (product.checked) {
          try {
            setLoading(!loading);
            const destoryImag = await axios.post(
              "/api/destroy",
              {
                public_id: product.images.public_id,
              },
              {
                headers: { Authorization: token },
              }
            );

            const deletedItem = await axios.delete(
              `/api/products/${product._id}`,
              {
                headers: { Authorization: token },
              }
            );
            setLoading(!loading);
            setCallback(!callBack);
          } catch (error) {
            console.log(error.response.data.message);
          }
        }
      });
    }else{return;}
  };
  return (
    <>
      {isAdmin ? (
        <div className="delete_all">
          <span>Select All</span>
          <input
            type="checkbox"
            name="checked"
            id="checked"
            checked={check}
            onChange={() => checkAll()}
          />
          <button onClick={() => deleteAll()}>Delete All</button>
        </div>
      ) : (
        <></>
      )}
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
              setProducts={setProducts}
            />
          );
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
};

export default Products;
