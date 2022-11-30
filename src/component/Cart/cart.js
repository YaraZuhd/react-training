import React from "react";
import { useEffect, useState, useCallback } from "react";
import "./cart.css";
import Navbar from "../NavResponsive/Navbar";
import { Button, Modal, Image, Header, Item } from "semantic-ui-react";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [userData, setUserData] = useState({});
  const [toggle, setToggle] = useState(false);

  const handelCallback = (childData) => {
    setToggle(childData);
  };

  let token = "";
  //let decoded;
  if (localStorage.getItem("token") != null) {
    token = localStorage.getItem("token");
    //decoded = jwt_decode(token);
  }

  const fetchCart = useCallback(async () => {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `http://localhost:3000/carts/me`,
        requestOptions
      );
      if (response.status === 200 && response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("cart", JSON.stringify(data));
        setCart(data);
      } else {
        throw new Error("No Cart Found");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [token]);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user")));
    fetchCart();
  }, []);

  return (
    <div>
      <Navbar toggleCallback={handelCallback} />
      {/* <>
        <Modal.Header>Shope Now To Make The Cart Fully</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Your Cart is currently Empty</Header>
            <p>It would make you very happy if you added an item to the cart</p>
          </Modal.Description>
        </Modal.Content>
      </> */}
    </div>
  );
};

export default Cart;
