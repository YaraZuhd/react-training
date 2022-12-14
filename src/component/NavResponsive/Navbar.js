import React from "react";
import "./Navbar.css";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useState } from "react";
import {useSelector} from "react-redux";
import { selectCount } from "../../counter/counterSlice"
import { Link, useNavigate } from "react-router-dom";


const Navbar = (props) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const navigate = useNavigate();
  const count = useSelector(selectCount);
  let cart = JSON.parse(localStorage.getItem('cart'));

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Online Shopping
      </a>
      <button
        className="menu-bar"
        type="button"
        onClick={() => {
          props.toggleCallback(!isNavExpanded);
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <FaBars className="h-5 w-5" fill="white"></FaBars>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <Link to={"/products"} className={'nav-item'}>Products</Link>
          </li>
          <li>
            {(cart !== null  && cart.items.length > 0 && count > 0) && (
              <Link to={"/cart"} className={'nav-item'}>
               Cart
               <span className="badge">{count}</span>
              </Link>
            )}
                {(cart !== null && cart.items.length === 0) && (
                  <Link to={"/cart"} className={'nav-item'}>
                   Cart
                  </Link>
            )}
            {cart === null && (
              <Link to={"/cart"} className={'nav-item'}>
                Cart
              </Link>
            )}
          </li>
          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("cart");
                navigate("/login");
              }}
            >
              <FaSignOutAlt></FaSignOutAlt>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
