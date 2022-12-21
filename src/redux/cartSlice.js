import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let token = '';
if(localStorage.getItem('token') !== null){
    token = localStorage.getItem('token');
}  

export const cartFetch = createAsyncThunk(
    "cart/cartFetch",
    async () => {
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
          const data = await response.json();
          return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

const INITIALSTATE = {
  cartItems: [],
  cartInfo : {},
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  status : null
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIALSTATE,
  reducers: {
    addToCart(state,action){
        const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if(itemIndex >= 0 ){
            state.cartItems[itemIndex].cartQuantity += 1;
        }else{
            const tempProduct = {...action.payload, cartQuantity: 1};
            state.cartItems.push(tempProduct);
        }
    },
  },
  extraReducers : {
    [cartFetch.pending] : (state,action) => {
        state.status = "pending";
    },
    [cartFetch.fulfilled] : (state,action) => {
        state.cartInfo = action.payload;
        state.cartItems = action.payload.items;
        state.cartTotalQuantity = action.payload.quentity;
        state.cartTotalAmount = action.payload.price;
        state.status = "success";
    },
    [cartFetch.rejected] : (state,action) => {
        state.status = "rejected";
    },
},
});

export const {addToCart} = cartSlice.actions;

export default cartSlice.reducer;
