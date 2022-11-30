import React from "react";
import "./Navbar.css";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useState } from "react";
import { MDBBadge, MDBIcon } from 'mdb-react-ui-kit';
import { Link, useNavigate } from "react-router-dom";


const Navbar = (props) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const navigate = useNavigate();

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
            {cart.items.length > 0 && (
              <Link to={"/cart"} className={'nav-item'}>
               Cart
               <MDBIcon fas icon='envelope' size='lg'/>
               <MDBBadge color='danger' notification pill style={{marginLeft:'3px'}}>{cart.items.length}</MDBBadge>
              </Link>
            )}
            {cart.items.length === 0 && (
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
