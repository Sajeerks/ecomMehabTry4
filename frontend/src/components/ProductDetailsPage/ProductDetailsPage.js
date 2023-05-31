import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProductAction } from "../../actions/productActions";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, TextField } from "@mui/material";
import "./ProductDetailsPage.css";
import ReviewCard from "../ReviewCard/ReviewCard";



function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    loading: singleProductLoading,
    product,
    error: singleProductError,
  } = useSelector((state) => state.getSingleProduct);


  // console.log({singleProductLoading})
  useEffect(() => {
    dispatch(getSingleProductAction(id));

    if (singleProductError) {
      toast.error(singleProductError);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, id, singleProductError]);

  // console.log(product);
  return (
    <Fragment>
      {" "}
      {singleProductLoading ? (
        <Loader />
      ) : (
        <div className="mainSIngleProductDIv">
          <div className="leFtDIvInsideProductDEatils">
            <h2>{product && product.name}</h2>
            <div className="carousedlDIV">
             
              <Carousel >
             { (product?.images &&
                  product.images.length > 0) &&   product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />  
                  ))

                  }
                {/* {(product &&
                  product.images.length > 0) &&
                  product.images.map((item, i) => <Item key={i} item={item} />)} */}
              </Carousel>

              
            </div>
        
          </div>
          <div className="rightDIvInsideProductDEatils">

    
            <div>        <h1>Product details</h1>  </div>
            <div>{ `Price $${product && product.price}`} </div>
            <div>{ `numOfReviews $${product && product.numOfReviews}`} </div>
            <div>{ `category ${product && product.category}`} </div>
           
            <div> {product && product.stock>0 ?  <p className="InStock">"InStock "</p> : <p className="notInStock">"Not in stock"</p>} </div>
              
          <div className="addtoCartDIV">
         <div>Add to Cart</div>
          <div>
              <div>
                <button>+</button>
                <input type="numbers" readOnly value="10"/>
                <button>-</button>
              </div>
          </div>
          <div><button>ADD Cart</button></div>
          </div>
        
             
     
       <div className="submitReViewDIV">
          <button>Submit Review</button>
       </div>

          </div>
          <div className="productReviews">
            <div><h4>Product reviews</h4></div>
            
          { (product?.reviews &&
                  product.reviews.length > 0) ?   (product.reviews.map((item, i) => (
                         <ReviewCard review={item} key={item._id} />
                  ))) :("No reviews yet")

                  }






              </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductDetailsPage;
