import React , {useContext} from 'react'
import Login from './auth/Login'
import Register from './auth/Register'
import Products from './products/Products'
import {Routes, Route} from "react-router-dom";
import Cart from './cart/Cart';
import NotFound from './utils/notfound/NotFound';
import DetailProduct from './detailProduct/DetailProduct';
import { GlobalState } from '../../GlobalState';

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  console.log(isLogged);
  return (
    <Routes>
      <Route exact path='/' element={<Products/>}/>
      <Route exact path='/detail/:id' element={<DetailProduct/>}/>
      <Route exact path='/login' element={isLogged ? <NotFound/> : <Login/>}/>
      <Route exact path='/register' element={isLogged ? <NotFound/> : <Register/>}/>
      <Route exact path='/cart' element={<Cart/>}/>
      <Route exact path='/*' element={<NotFound/>}/>
    </Routes>
  )
}

export default Pages;