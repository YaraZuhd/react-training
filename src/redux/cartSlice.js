import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let token = "";
if (localStorage.getItem("token") !== null) {
  token = localStorage.getItem("token");
}

export const cartFetch = createAsyncThunk("cart/cartFetch", async () => {
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
});

export const emptyCart = createAsyncThunk("cart/emptyCart", async () => {
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
    const data = await response.json();
    //dispatch(reset());
    return data;
  } catch (error) {
    console.log(error.message);
  }
});

const updateCartItem = createAsyncThunk(
    "cart/updateCart",
    async (productId, productInfo, quantity) => {
      try {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            items: [
              {
                id: productInfo.id,
                newQuantity: quantity,
                oldQuantity: productInfo.quantity,
                productId: productInfo.productId,
              },
            ],
          }),
        };
        const response = await fetch(
          `http://localhost:3000/carts/update-cart-item/${productId}`,
          requestOptions
        );
        if (response.status === 200 && response.ok) {
          const data = await response.json();
          localStorage.removeItem("cart");
          localStorage.setItem("cart", JSON.stringify(data));
        } else {
          throw new Error("No Cart Found");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [localStorage.getItem("token")]
  );

const INITIALSTATE = {
  cartInfo: {},
  cartItemsArray: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  status: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIALSTATE,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);
      const itemIndex = state.cartItemsArray.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(itemIndex);
      if (itemIndex >= 0) {
        //state.cartItemsArray[itemIndex].cartQuantity += 1;
        state.cartItemsArray[itemIndex] = {
          ...state.cartItemsArray[itemIndex],
          cartQuantity: state.cartItemsArray[itemIndex].cartQuantity + 1,
        };
        state.cartInfo = action.payload;
      } else {
        const tempProduct = { ...action.payload.items, cartQuantity: 1 };
        state.cartItemsArray.push(tempProduct);
        state.cartInfo = action.payload;
      }
    },
    // increaseCart(state, action) {
    //   const itemIndex = state.cartItemsArray.findIndex(
    //     (item) => item.id === action.payload.id
    //   );
    //   state.cartItemsArray[itemIndex] = {
    //     ...state.cartItemsArray[itemIndex],
    //     cartQuantity: state.cartItemsArray[itemIndex].cartQuantity + 1,
    //   };
    // },
    updateCartItem(state, action) {},
  },
  extraReducers: {
    [cartFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [cartFetch.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.cartInfo = action.payload;
      state.cartItemsArray = action.payload.items;
      state.cartTotalQuantity = action.payload.quentity;
      state.cartTotalAmount = action.payload.price;
      state.status = "success";
    },
    [cartFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [emptyCart.pending]: (state, action) => {
      state.status = "pending";
    },
    [emptyCart.fulfilled]: (state, action) => {
      state.cartInfo = action.payload;
      state.cartItemsArray = action.payload.items;
      state.cartTotalQuantity = action.payload.quentity;
      state.cartTotalAmount = action.payload.price;
      state.status = "success";
    },
    [emptyCart.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
