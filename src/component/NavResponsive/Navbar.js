import React from "react";
import "./Navbar.css";
import { FaSignOutAlt, FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { CBadge, CButton } from '@coreui/react';


const Navbar = (props) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const navigate = useNavigate();

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
            <Link to={"/cart"} className={'nav-item'}>
              Cart
            {/* <CButton color="primary">
              Cart <CBadge color="secondary">4</CBadge>
            </CButton> */}
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
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
