import React , {useState,  useContext}from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icons/bars-solid.svg';
import XMark from './icons/xmark-solid.svg';
import Cart from './icons/cart-shopping-solid.svg';
import {Link} from "react-router-dom";

const Header = () => {
  const value = useContext(GlobalState);
  return (
    <div>
        <header>
            <div className="menu">
                <img src={Menu} alt="" width={30}/>
            </div>

            <div className="logo">
                <h1>
                    <Link to={"/"}>UrbanKing</Link>
                </h1>
            </div>

            <ul>
                <li><Link to={"/"}>Products</Link></li>
                <li><Link to={"/login"}>✴ Login ⭑ Register ✴</Link></li>
                <li>
                    <img src={XMark} alt="" width={30} className="menu"/>
                </li>
            </ul>

            <div className='cart-icon'>
                <span>0</span>
                <Link to={'/cart'}>
                    <img src={Cart} alt="" width={30}/>
                </Link>
            </div>
        </header>
    </div>
  )
}

export default Header;