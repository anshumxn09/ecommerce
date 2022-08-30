import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useContext(GlobalState);
  const [sum, setSum] = useState(0);
  const [cart] = state.UserAPI.cart;
  
  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>
        Nothing Added To Cart
      </h2>
    );
  }
  return (
    <div>
      {cart.map((product) => (
        <>
          <div className="detail cart">
            <img src={product.images.url} alt=""  className="img_container" height={100}/>
            <div className="box-detail">
              <div className="row">
                <h2>{product.title}</h2>
              </div>
              <h3>
                <span className="small">₹ </span>
                <span className="bolder">{product.price * product.Quantity}</span>
              </h3>
              <p>{product.description}</p>
              <p>{product.content}</p>
              <div className="amount">
                <button> - </button>
                <span>{product.Quantity}</span>
                <button> + </button>
              </div>
              <div className="delete">X</div>
            </div>
          </div>
        </>
      ))}

      <div className="total">
        <h3>Total:₹ {sum}</h3>
        <Link to={'#!'}>Payment</Link>
      </div>
    </div>
  );
};

export default Cart;
