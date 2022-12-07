import React from "react";
import { useEffect, useState, useCallback } from "react";
import "./cart.css";
import Navbar from "../NavResponsive/Navbar";
import { Button, Modal, Header, Item, Image } from "semantic-ui-react";
import CartItems from './cartItem'


const Cart = (props) => {
  const [cart, setCart] = useState({});
  const [toggle, setToggle] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  let cartobj = {};

  const handelCallback = (childData) => {
    setToggle(childData);
  };

  let token = '';
  if(localStorage.getItem('token') !== null){
    token = localStorage.getItem('token');
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
        setCartItems(data.items);
        cartobj = data;
        localStorage.setItem("cart", JSON.stringify(data));
        setCart(data);
      } else {
        throw new Error("No Cart Found");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [token]);

  const emptyCart = useCallback(async () => {
    try {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method :'DELETE'
      };
      const response = await fetch(
        `http://localhost:3000/carts/delete-cart-items`,
        requestOptions
      );
      if (response.status === 200 && response.ok) {
        const data = await response.json();
        setCartItems([]);
        cartobj = data;
        localStorage.removeItem('cart');
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
    fetchCart();
  }, [cartItems]);

  return ( 
    <>
            <Navbar toggleCallback={handelCallback}/> 
            {(cartobj !== null && cartItems.length !== 0) && 
            (
                <>
                    <Item.Group divided>
                        {cartItems.map(item => (
                            <Item key={item.id}>
                                <CartItems item={item}/>
                            </Item>
                        ))}
                    </Item.Group>

                    <Modal.Actions className='model-bottom'>
                        <Button  
                            basic 
                            negative  
                            floated='left' 
                            onClick={emptyCart}
                        >
                            Empty Cart
                        </Button>
                        <Header floated='right'>${cart.price}</Header>
                    </Modal.Actions>
                </>
            ) }
            {cartItems.length === 0 && 
                        (
                            <>
                                <Modal.Header>Seities Apparel Cart</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size='huge' 
                                    src='https://cdn.pixabay.com/photo/2012/04/16/11/34/shopping-35594__340.png' />
                                    <Modal.Description>
                                        <Header>Your Cart is currently Empty</Header>
                                        <p>
                                            It would make you very happy if you added an item to the cart
                                        </p>
                                    </Modal.Description>
                                </Modal.Content>
                            </>
                        )}
        </>
  );
};

export default Cart;
