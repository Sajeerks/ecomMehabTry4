import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { green, grey, purple } from "@mui/material/colors";
import WebFont from "webfontloader";

import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header/Header.js";
import Footer from "./components/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage.js";
import { Toaster } from 'react-hot-toast';
import AllProducts from "./components/AllProducts/AllProducts";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAction } from "./actions/userActions";
import store from"./store.js"
import UserOptions from "./components/UserOptions/UserOptions";

function App() {
  const [color, setcolor] = useState(true);
  const [query, setquery] = useState("")
  const dispatch = useDispatch()
 const firstREf = useRef(null)
  const {loading:userLoading, error:userError,isAuthenticated, user,message:userMessage} =useSelector(state=>state.userReducer)


  
  // console.log(firstREf)
// console.log(this)
  useEffect(() => {
    
     (  async()=>{ WebFont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
        },
      })})()

    
 
  }, []);
  
  useEffect(() => {

    store.dispatch(loadUserAction())

  }, [])
  
   



  const darkTheme = createTheme({
    palette: {
      mode: color ? "light" : "dark",
      primary: {
        main: purple[500],
      },
      text:{
        // primary:purple[500],
        // secondary:grey[500]
      }
    },
  });

  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HelmetProvider>

      <Router>
      {/* <Header setcolor={setcolor} color={color} setquery={"dfsafas"} /> */}
      <Header   setcolor={setcolor} color={color} setquery={setquery} query={query}  isAuthenticated={isAuthenticated} user={user} userMessage={userMessage}/>

       <UserOptions isAuthenticated={isAuthenticated} user={user}  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          {/* <Route path="/products" element={<AllProducts query={"dfasf"}/>} /> */}
          <Route path="/products" element={<AllProducts query={query} setquery={setquery}/>} />

          <Route path="/loginsignup" element={<LoginSignup />} />

           


        </Routes>
      </Router>
     <Toaster/>
      <Footer />
      </HelmetProvider>
    </ThemeProvider>
  
  );
}

export default App;
