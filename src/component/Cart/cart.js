import React from "react";
import { useState } from "react";
import "./cart.css";
import Navbar from "../NavResponsive/Navbar";
import { Button, Modal, Header, Item, Image } from "semantic-ui-react";
import CartItems from "./cartItem";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import store from "../../store/store";
import { emptyCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const [toggle, setToggle] = useState(false);
  let {
    cartInfo,
    cartItemsArray,
  } = useSelector((state) => state.cart);

  const handelCallback = (childData) => {
    setToggle(childData);
  };

  const handleEmptyClick = (e) => {
    e.preventDefault();
    store.dispatch(emptyCart());
  };

  return (
    <>
      <Navbar toggleCallback={handelCallback} />
      {cartInfo !== null && cartItemsArray.length !== 0 && (
        <>
          <Item.Group divided>
            {cartItemsArray.map((item) => (
              <Item key={item.id}>
                <CartItems item={item} />
              </Item>
            ))}
          </Item.Group>

          <Modal.Actions className="model-bottom">
            <Button basic negative floated="left" onClick={handleEmptyClick}>
              Empty Cart
            </Button>
            <Header floated="right">${cartInfo.price}</Header>
          </Modal.Actions>
        </>
      )}
      {cartItemsArray.length === 0 && (
        <div className="container-fluid  mt-100">
          <div className="row-cart">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header"></div>
                <div className="card-body cart">
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Image
                      wrapped
                      size="huge"
                      src="https://cdn.pixabay.com/photo/2012/04/16/11/34/shopping-35594__340.png"
                      className="img-cart-empty"
                    />
                    <h3>
                      <strong>Your Cart is Empty</strong>
                    </h3>
                    <h4>Add something to make me happy </h4>
                    <Link
                      to={"/products"}
                      className="btn btn-primary cart-btn-transform m-3"
                      data-abc="true"
                    >
                      continue shopping
                    </Link>
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
