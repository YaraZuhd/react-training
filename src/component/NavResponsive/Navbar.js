import React from "react";
import "./Navbar.css";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCount } from "../../redux/counterSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();
  let count = useSelector(selectCount);
  let cart = JSON.parse(localStorage.getItem("cart"));
  if(cart !== null){
    if(cart.items.length !== 0){
      count = cart.items.length;
    }
  }

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
            {cart === null && (
              <Link to={"/cart"} className={"nav-item"}>
                Cart
              </Link>
            )}
            {cart !== null && cart.items.length === 0 && (
              <Link to={"/cart"} className={"nav-item"}>
                Cart
              </Link>
            )}
            {cart !== null && cart.items.length > 0 && count > 0 && (
              <Link to={"/cart"} className={"nav-item"}>
                Cart
                <span className="badge">{count}</span>
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
