import React from 'react'
import Login from './auth/Login'
import Register from './auth/Register'
import Products from './products/Products'
import {Routes, Route} from "react-router-dom";
import Cart from './cart/Cart';
import NotFound from './utils/notfound/NotFound';

const Pages = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Products/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/cart' element={<Cart/>}/>
      <Route exact path='/*' element={<NotFound/>}/>
    </Routes>
  )
}

export default Pages;