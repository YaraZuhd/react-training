import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const INITIALSTATE = {
     products : [],
     filterd : false,
     filterCategorie : '',
     filterProduct :'',
     status : null,
}

let token = '';
if(localStorage.getItem('token') !== null){
    token = localStorage.getItem('token');
}  

export const productsFetch = createAsyncThunk(
    "products/productsFetch",
    async (userToken) => {
      try {
        let requestOptions ;
        if(token === ''){
           requestOptions = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          };
        }else{
           requestOptions = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
        }
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
    reducers : {
      filterProduct(state,action){
        state.filterd = false;
        state.filterCategorie = '';
        state.filterProduct = '';
        if(action.payload.className === 'header'){
          state.filterd = true;
          state.filterCategorie = action.payload.text;
        }else if (action.payload.className === 'item'){
          state.filterd = true;
          state.filterProduct = action.payload.text;
        }
      },
    },
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

export const { filterProduct } = productSlice.actions;


export default productSlice.reducer;
