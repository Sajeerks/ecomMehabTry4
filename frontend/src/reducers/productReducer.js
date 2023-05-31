import { createReducer } from "@reduxjs/toolkit";

const intialState = {};



export const getSingleProduct = createReducer(intialState, {
    getSingleProductsRequest: (state, action) => {
      state.loading = true;
    },
    getSingleProductsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getSingleProductsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    clearErrors: (state, action) => {
      state.error = null;
    },
  });










export const allproducts = createReducer(intialState, {
  getAllProductsRequest: (state, action) => {
    state.loading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload.products;
    state.filteredProductsCount = action.payload.filteredProductsCount
    state.TotaloOfProducts = action.payload.TotaloOfProducts
    state.resultPerPage = action.payload.resultPerPage

    
    

  },
  getAllProductsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clearErrors: (state, action) => {
    state.error = null;
  },
});
