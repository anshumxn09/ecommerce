import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
// import { Link } from "react-router-dom";
import axios from 'axios';
import PaypalButton from './PaypalButton';
import NothingCart from "../utils/NoCartItem/NothingCart";

const Cart = () => {
  const state = useContext(GlobalState);
  const [sum, setSum] = useState(0);
  const [cart, setCart] = state.UserAPI.cart;
  const [token] = state.token;
  useEffect(()=> {
    const getTotal = () => {
     const total = cart.reduce((prev, item) => {
       return prev + (item.price * item.Quantity);
     }, 0)
     setSum(total)
    } 
    getTotal();
   }, [cart])

  const addToCart = async () => {
    try {
      await axios.patch('/users/addtocart', {cart}, {
        headers : {Authorization : token}
      })
    } catch (error) {
      console.log(error)
    }
  }

  const increment = (id) => {
    cart.forEach(item => {
      if(item._id === id){
        item.Quantity += 1;
      }
    })
    setCart([...cart]);
    addToCart()
  }

  const decrement = (id) => {
    cart.forEach(item => {
      if(item._id === id && item.Quantity > 1){
        item.Quantity -= 1;
      }
    })
    setCart([...cart]);
    addToCart();
  }

  const removeProduct = (id) => {
    if(window.confirm('DO YOU WANT TO DELETE THIS PRODUCT?')){
      cart.forEach((elem, index) => {
        if(elem._id === id){
          cart.splice(index, 1);
        }
      })

      setCart([...cart]);
      addToCart();
    }
  }

  const tranSuccess = async (payment) => {
    console.log(payment);
  }

  if (cart.length === 0) {
    return (
      <NothingCart/>
    );
  }
  return (
    <div>
      {cart.map((product) => (
        <>
          <div className="detail cart" key={product._id}>
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
                <button onClick={() => decrement(product._id)}> - </button>
                <span>{product.Quantity}</span>
                <button onClick={() => increment(product._id)}> + </button>
              </div>
              <div className="delete" onClick={() => removeProduct(product._id)}>X</div>
            </div>
          </div>
        </>
      ))}

      <div className="total">
        <h3>Total:₹ {sum}</h3>
        <PaypalButton total={sum} 
          tranSuccess={tranSuccess}
        />
      </div>
    </div>
  );
};

export default Cart;
