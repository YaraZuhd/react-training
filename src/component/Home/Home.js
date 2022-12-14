import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useSelector } from "react-redux";
import Navbar from "../NavResponsive/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [toggle, setToggle] = useState(false);

  let cartInfo = {};
  cartInfo = useSelector((state) => state.cart.cartInfo);

  const handelCallback = (childData) => {
    setToggle(childData);
  };

  useEffect(() => {
    if (token === null) {
      navigate("login");
    }
    setTimeout(() => {
    }, 2000);
    return () => <div>Loading ...</div>
  }, [navigate, token]);

  if (token != null) {
    return (
      <div>
        {cartInfo === null && (
            <div>
                Loading...
            </div>
        )}
        <div>
          <Navbar toggleCallback={handelCallback} />
          <h1>Welcome To Our Website</h1>
        </div>
      </div>
    );
  }
};

export default Home;
