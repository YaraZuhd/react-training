import React from "react";
import "./Navbar.css";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  let cartInfo = {};
  let cartItemsArray = [];
  cartInfo = useSelector((state) => state.cart.cartInfo);
  cartItemsArray = useSelector((state) => state.cart.cartItemsArray);
  console.log(cartInfo,cartItemsArray);

  return (
    <nav className="navigation">
      <Link to={"/"} className={"brand-name"}>
        Online Shopping
      </Link>
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
            <Link to={"/products"} className={"nav-item"}>
              Products
            </Link>
          </li>
          <li>
            {cartInfo === null && (
              <Link to={"/cart"} className={"nav-item"}>
                Cart
              </Link>
            )}
            {cartInfo !== null && cartItemsArray.length === 0 && (
              <Link to={"/cart"} className={"nav-item"}>
                Cart
              </Link>
            )}
            {cartInfo !== null && cartItemsArray.length > 0 && (
              <Link to={"/cart"} className={"nav-item"}>
                Cart
                <span className="badge">{cartItemsArray.length}</span>
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
                localStorage.removeItem("products");
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
