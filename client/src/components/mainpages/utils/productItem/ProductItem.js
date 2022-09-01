import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
import axios from "axios";
import Loading from "../loading/Loading";

const ProductItem = ({
  product,
  isAdmin,
  token,
  callBack,
  setCallback,
  setProducts,
}) => {
  const state = useContext(GlobalState);
  const addCart = state.UserAPI.addToCart;
  const [loading, setLoading] = useState(false);
  const [checkValue, setCheckValue] = useState(product.checked);

  const deleteProducts = async () => {
    console.log(product);
    try {
      if (window.confirm(`ARE YOU SURE TO DELETE ${product.title}`)) {
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

        const deletedItem = await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: token },
        });
      } else {
        return;
      }
      setLoading(!loading);
      setCallback(!callBack);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleCheckBox = async (product) => {
    setCheckValue(!checkValue);
    product.checked = !product.checked;
    console.log(product.checked)
  };

  if (loading) return <Loading />;
  return (
    <div className="product_card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheckBox(product)}
        />
      )}
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>
          <span className="small">₹ </span>
          <span className="bolder">{product.price}</span>
        </span>
        <p>{product.description}</p>
      </div>

      {isAdmin ? (
        <>
          <div className="row_btn">
            <Link id="btn_buy" to="#!" onClick={deleteProducts}>
              Delete
            </Link>
            <Link id="btn_view" to={`/edit_product/${product._id}`}>
              Edit
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="row_btn">
            <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
              Add To Cart
            </Link>
            <Link id="btn_view" to={`/detail/${product._id}`}>
              View
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductItem;
