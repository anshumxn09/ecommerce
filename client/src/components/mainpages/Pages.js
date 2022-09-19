import React, { useContext } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Products from "./products/Products";
import { Routes, Route } from "react-router-dom";
import Cart from "./cart/Cart";
import NotFound from "./utils/notfound/NotFound";
import DetailProduct from "./detailProduct/DetailProduct";
import { GlobalState } from "../../GlobalState";
import Categories from "./categories/Categories";
import CreateProduct from "./createproduct/CreateProduct";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [isAdmin] = state.UserAPI.isAdmin;
  // console.log(isLogged);
  return (
    <Routes>
      <Route exact path="/" element={<Products />} />
      <Route exact path="/detail/:id" element={<DetailProduct />} />
      <Route exact path="/history" element={isLogged ? <OrderHistory /> : <NotFound/>}/>
      <Route exact path="/history/:id" element={isLogged ? <OrderDetails /> : <NotFound/>}/>
      <Route
        exact
        path="/login"
        element={isLogged ? <NotFound /> : <Login />}
      />
      <Route
        exact
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />
      <Route
        exact
        path="/category"
        element={isAdmin ? <Categories /> : <NotFound />}
      />
      <Route
        exact
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />
      <Route
        exact
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : <NotFound />}
      />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
