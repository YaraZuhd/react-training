import React from "react";
import { useEffect, useState, useCallback } from "react";
import "./cart.css";
import Navbar from "../NavResponsive/Navbar";
import { Button, Modal, Header, Item, Image } from "semantic-ui-react";
import CartItems from "./cartItem";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/counterSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Cart = (props) => {
  const [cart, setCart] = useState({});
  const [toggle, setToggle] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  let cartobj = {};
  const dispatch = useDispatch();
  let {cartInfo,cartItemsArray,cartTotalQuantity,cartTotalAmount,status} = useSelector((state) => state.cart);
  // console.log('cartInfo',cartInfo,'cartItemsArray',cartItemsArray,'cartTotalQuantity' ,cartTotalQuantity,'cartTotalAmount' ,cartTotalAmount,'status' ,status);

  
  const handelCallback = (childData) => {
    setToggle(childData);
  };

  let token = "";
  if (localStorage.getItem("token") !== null) {
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
        method: "DELETE",
      };
      const response = await fetch(
        `http://localhost:3000/carts/delete-cart-items`,
        requestOptions
      );
      if (response.status === 200 && response.ok) {
        const data = await response.json();
        setCartItems([]);
        cartobj = data;
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(data));
        dispatch(reset());
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
      <Navbar toggleCallback={handelCallback} />
      {cartobj !== null && cartItems.length !== 0 && (
        <>
          <Item.Group divided>
            {cartItems.map((item) => (
              <Item key={item.id}>
                <CartItems item={item} />
              </Item>
            ))}
          </Item.Group>

          <Modal.Actions className="model-bottom">
            <Button basic negative floated="left" onClick={emptyCart}>
              Empty Cart
            </Button>
            <Header floated="right">${cart.price}</Header>
          </Modal.Actions>
        </>
      )}
      {cartItems.length === 0 && (
        <div className="container-fluid  mt-100">
          <div className="row-cart">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                </div>
                <div className="card-body cart">
                  <div className="col-sm-12 empty-cart-cls text-center">
                     <Image wrapped size='huge' src='https://cdn.pixabay.com/photo/2012/04/16/11/34/shopping-35594__340.png'
                     className="img-cart-empty"/>
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Add something to make me happy </h4>
                    <a
                      href="/products"
                      className="btn btn-primary cart-btn-transform m-3"
                      data-abc="true"
                    >
                      continue shopping
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
