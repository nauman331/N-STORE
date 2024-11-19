import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import "../../assets/stylesheets/navbar.scss";
import {
  ArrowRightFromLine,
  House,
  LogIn,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  UserPen,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.jpeg"
import {logOut} from "../../store/slices/authSlice"

const navbar = () => {
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <>
      <header>
        <h5>Big Dicounts available upto 80% go and checkout</h5>
        <nav>
          <div className="logo">
            <img src={logo} alt="logo-image" />
            <h3>N-STORE</h3>
          </div>
          <ul className={open ? "open-nav" : "close-nav"}>
            <div className="search">
              <input type="text" placeholder="Search trending items..." />
              <Search className="search-icon"/>
            </div>
            <li>
              <House />
              <NavLink to="/home" className='link'>HOME</NavLink>
            </li>
            <li>
              <ShoppingCart />
              <NavLink to="/cart" className='link'>CART</NavLink>
            </li>
            <li>
              <UserPen />
              <NavLink to="/profile" className='link'>PROFILE</NavLink>
            </li>
            {token !== null ? (
              <li>
                <LogOut />
                <h4 onClick={(()=>dispatch(logOut()))} className='link'>LOGOUT</h4>
              </li>
            ) : (
              <>
                <li>
                  <LogIn />
                  <NavLink to="/auth/login" className='link'>LOGIN</NavLink>
                </li>
                <li>
                  <ArrowRightFromLine />
                  <NavLink to="/auth/register" className='link'>REGISTER</NavLink>
                </li>
              </>
            )}
          </ul>
        {open ? <X onClick={(()=>setOpen(false))} className="toggler"/> : <Menu onClick={(()=>setOpen(true))} className="toggler"/>}
        </nav>
      </header>
    </>
  );
};

export default navbar;
