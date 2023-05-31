import React from "react";
import "./Product.css";

import Rating from '@mui/material/Rating';
import { useTheme } from "@emotion/react";

const Product = ({ product }) => {
  const [value, setValue] = React.useState(2);
  const  theme = useTheme()

  return (
    <div className="productCard">
      <div className="productHeader" style={{color:theme.palette.text.primary}}> {product && product.name} </div>
      <div className="rightPRoduct" style={{color:theme.palette.text.primary}}>
       

            <div>price--{product &&  product.price} </div> 
            
              <div> {product && product.category} </div>
   
            <div  > <Rating
              readOnly={true}
        name="simple-controlled"
        value={product && product.ratings}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /></div>   
      

          </div>
      <div className="leftproduct" > <img src={product.images[0].url}/> </div>
      <div className="productdescription"  style={{color:theme.palette.text.primary}}> {product.description}</div>
    </div>
  );
};

export default Product;
