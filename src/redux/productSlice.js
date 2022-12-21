import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const INITIALSTATE = {
     products : [],
     status : null,
}

let token = '';
if(localStorage.getItem('token') !== null){
    token = localStorage.getItem('token');
}  

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async () => {
      try {
        const requestOptions = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await fetch(
            `http://localhost:3000/products`,
            requestOptions
          );
          const data = await response.json();
          return data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  

const productSlice = createSlice({
    name: "product",
    initialState : INITIALSTATE,
    reducers : {},
    extraReducers : {
        [productsFetch.pending] : (state,action) => {
            state.status = "pending";
        },
        [productsFetch.fulfilled] : (state,action) => {
            state.products = action.payload;
            state.status = "success";
        },
        [productsFetch.rejected] : (state,action) => {
            state.status = "rejected";
        },
    },
});

export default productSlice.reducer;
