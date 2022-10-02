import React from 'react'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js';
import { useContext, useState } from 'react';
import { ToastContainer ,toast} from 'react-toastify';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
// import Cart from './Cart';

const PaypalButton = (props) => {
    const state = useContext(GlobalState);
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const [token] = state.token;
    const [cart, setCart] = state.UserAPI.cart;
    const {product, sum, setSum} = props;
    const [callBack, setCallBack] = state.UserAPI.callBack;

    const handleApprove = async (data, order) => {
        setPaidFor(true);
        // console.log(data);
        const address = {
            country : "USA",
            city : "California",
        }
        const {payerID} = data;
        await axios.post('/api/payment', {
            cart, paymentID : payerID, address
        }, {
            headers : {Authorization : token}
        })
        setCart([]);
        await axios.patch('/users/addtocart', {cart : []}, {
            headers : {Authorization : token}
          })
        setSum(0);
        alert('you have successfully placed an order!!!');
        setCallBack(!callBack);
        
    }

    if(error){
        console.log(error);
    }
  return (
    <>
    <ToastContainer/>
    <PayPalScriptProvider>
    <PayPalButtons style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill"
    }} 
    onClick = {(data, actions) => {
        const purchasedAlready = false;
        if(purchasedAlready){
            setError("already done");
            return actions.reject();
        }else{
            return actions.resolve();
        }
    }}
    createOrder={(data, actions) => {
        return actions.order.create({
            purchase_units : [
                {
                    description : "Total Products.",
                    amount : {
                        value : (sum/80).toFixed(2)
                    }

                }
            ]
        })
    }} onApprove={async(data, actions) => {
        const order = await actions.order.capture;
        handleApprove(data, order)
    }}
        onCancel= {(() => {

        })}
        onError = {((err) => {
            setError(err);
            // console.log(err);
        })}
    />
    </PayPalScriptProvider>
    </>
  )
}

export default PaypalButton;
