import React, { useEffect, useLayoutEffect, useRef } from "react";
import "./Footer.css";
import playStore from '../../images/playstore.png'
import appStore from '../../images/Appstore.png'
import { useTheme } from "@emotion/react";



const Footer = () => {
  const theme = useTheme()
  const fff = useRef()


useEffect(() => {
   if(fff.current){
    // console.log(fff.current)
    fff.current.style.setProperty("--text-colorforalll",theme.palette.primary.contrastText)
   }
  

}, [])

 

  return (
    <footer id="footer" ref={fff}  >
    <div className="leftFooter">
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App for Android and IOS mobile phone</p>
      <img src={playStore} alt="playstore" />
      <img src={appStore} alt="Appstore" />
    </div>

    <div className="midFooter">
      <h1>ECOMMERCE.</h1>
      <p>High Quality is our first priority</p>

      <p>Copyrights 2021 &copy; MeAbhiSingh</p>
    </div>

    <div className="rightFooter">
      <h4>Follow Us</h4>
      <a href="http://instagram.com/meabhisingh">Instagram</a>
      <a href="http://youtube.com/6packprogramemr">Youtube</a>
      <a href="http://instagram.com/meabhisingh">Facebook</a>
    </div>
  </footer>
  );
};

export default Footer;
