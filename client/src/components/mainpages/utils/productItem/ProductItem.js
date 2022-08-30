import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

const ProductItem = ({ product, isAdmin }) => {
  const state = useContext(GlobalState);
  const addCart = state.UserAPI.addToCart;

  return (
    <div className="product_card">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
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
            <Link id="btn_buy" to="#!">
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
