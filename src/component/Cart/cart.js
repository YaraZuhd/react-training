import React from "react";
import { useEffect, useState, useCallback } from "react";
import "./cart.css";
import Navbar from "../NavResponsive/Navbar";
import { Button, Modal, Image, Header, Item } from "semantic-ui-react";
import CartItems from './cartItem'
import { json } from "react-router-dom";

const Cart = (props) => {
  const [cart, setCart] = useState({});
  const [userData, setUserData] = useState({});
  const [toggle, setToggle] = useState(false);
  console.log(props, cart.items)

  const handelCallback = (childData) => {
    setToggle(childData);
  };

  let token = "";
  if (localStorage.getItem("token") != null) {
    token = localStorage.getItem("token");
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
    // setCart(JSON.parse(localStorage.getItem("cart")))
    fetchCart();
  }, []);

  return ( 
    <>
            <Navbar toggleCallback={handelCallback}/> 
            {cart !== null && cart.items != []  ? (
                <>
                    <Item.Group divided>
                        {/* {cart.items.map(item => (
                            <Item key={item.id}>
                                <CartItems item={item}/>
                            </Item>
                        ))} */}
                    </Item.Group>

                    <Modal.Actions className='model-bottom'>
                        <Button  
                            basic 
                            negative  
                            floated='left' 
                            //onClick={props.emptyCart}
                        >
                            Empty Cart
                        </Button>
                        <Header floated='right'>${cart.price}</Header>
                    </Modal.Actions>
                </>
            ) 
            :
            (
                <>
                    <Modal.Header>Seities Apparel Cart</Modal.Header>
                    <Modal.Content image>
                        {/* <Image wrapped size='huge' src={cartImg} /> */}
                        <Modal.Description>
                            <Header>Your Cart is currently Empty</Header>
                            <p>
                                It would make you very happy if you added an item to the cart
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                </>
            )
            }
        </>
  );
};

export default Cart;
