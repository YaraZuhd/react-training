import { createSlice } from "@reduxjs/toolkit";

const INITIALSTATE = {
    cartItems: [],
    cartTotalQuantity : 0,
    cartTotalAmount : 0
};

const cartSlice = createSlice({
    name : "cart",
    initialState : INITIALSTATE,
    reducers : {
        addToCart(state, action){

        }
    }
})