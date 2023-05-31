import { tabScrollButtonClasses } from "@mui/material";
import { createReducer } from "@reduxjs/toolkit";


const intialState = {};



export const userReducer = createReducer(intialState, {


  logoutRequest: (state, action) => {
    state.loading = true;
    state.isAuthenticated= true
  },
  logoutSuccess: (state, action) => {
    state.loading = false;
    state.user = null
    state.isAuthenticated= false
    state.message = action.payload

  },
  logoutFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated= true
    // state.user =null
  },










  loadUserRequest: (state, action) => {
    state.loading = true;
    state.isAuthenticated= false
  },
  loadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated= true
    

  },
  loadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated= false
    state.user =null
  },






    loginRequest: (state, action) => {
        state.loading = true;
        state.isAuthenticated= false
      },
      loginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated= true
  
      },
      loginFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated= false
        state.user =null
      },






    createUserRequest: (state, action) => {
      state.loading = true;
      state.isAuthenticated= false
    },
    createUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated= true

    },
    createUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated= false
      state.user =null
    },
  
    clearErrors: (state, action) => {
      state.error = null;
    },

    clearMessages: (state, action) => {
      state.message = null;
    },
  });



