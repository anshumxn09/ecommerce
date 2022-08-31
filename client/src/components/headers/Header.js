import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icons/bars-solid.svg";
import XMark from "./icons/xmark-solid.svg";
import Cart from "./icons/cart-shopping-solid.svg";
import { Link } from "react-router-dom";
import axios from "axios";


const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
  const [cart] = state.UserAPI.cart;

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to={"/create_product"}>Create Product</Link>
        </li>
        <li>
          <Link to={"/category"}>Category</Link>
        </li>
      </>
    );
  };

  const loggoutUser = async () => {
    await axios.get('/users/logout')
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
    window.localStorage.href = "/";
    window.location.reload();
  }

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to={"/history"}>History</Link>
        </li>
        <li>
          <Link to={"/"} onClick={loggoutUser}>Logout</Link>
        </li>
      </>
    );
  };
  return (
    <div className="stick">
      <header>
        <div className="menu">
          <img src={Menu} alt="" width={30} />
        </div>

        <div className="logo">
          <h1>
            <Link to={"/"}>{isAdmin ? "UK-Admin" : "UrbanKing"}</Link>
          </h1>
        </div>

        <ul>
          <li>
            <Link to={"/"}>{isAdmin ? "Products" : "Shop"}</Link>
          </li>
          {isAdmin && adminRouter()}
          {isLogged ? (
            loggedRouter()
          ) : (
            <li>
              <Link to={"/login"}>Login / Register</Link>
            </li>
          )}
          <li>
            <img src={XMark} alt="" width={30} className="menu" />
          </li>
        </ul>
        {isAdmin ? (
          ""
        ) : (
          <div className="cart-icon">
            <span>{cart.length}</span>
            <Link to={"/cart"}>
              <img src={Cart} alt="" width={30} />
            </Link>
          </div>
        )}
      </header>
      {/* <div className="line_div"></div> */}
    </div>
  );
};

export default Header;
