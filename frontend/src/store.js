import { configureStore } from "@reduxjs/toolkit";
import { allproducts, getSingleProduct } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    allProducts: allproducts,
    getSingleProduct:getSingleProduct,
    userReducer:userReducer,
    
  },
});

export default store;
