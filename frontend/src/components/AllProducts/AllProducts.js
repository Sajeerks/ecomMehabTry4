import React, { Fragment, useEffect, useState } from "react";
import "./AllProducts.css";
import Loader from "../Loader/Loader";
import Product from "../../components/Product/Product.js";
import { Link } from "react-router-dom";
import MetaData from "../MetaData.js/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../../actions/productActions";
import { toast } from "react-hot-toast";
import { Button, Paper, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Pagination from "react-js-pagination";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';

const AllProducts = ({ query,setquery }) => {
  const categories =["","dress", "electronics","sports", "cars"]
  const theme = useTheme();

  const dispatch = useDispatch();

  const {
    loading: allProductLoading,
    products: allProducts,
    error: AllProductError,
    filteredProductsCount,
    TotaloOfProducts,
  } = useSelector((state) => state.allProducts);

  // console.log(filteredProductsCount,
  //   TotaloOfProducts,)

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = React.useState([100, 500]);

  const [filterCurrentPage, setfilterCurrentPage] = useState(1);
  const [category, setcategory] = React.useState('');
  const [starValue, setstarValue] = useState(0)


 let currentPageinNOtinUsestate = currentPage

  let resultPerPage = 4;
  // setkeyword(...query)
  // console.log({query})
  // let keyword = query.trim()
  // console.log({keyword})

  function valuetext(value) {
    return `$ ${value}`;
  }
  const handleChange = (event, newValue) => {
    setPrice(newValue);
  };

  const setCurrentPageNo = (e) => {
    console.log("e inside thee setcurrengepage functnion",e)
    setCurrentPage(e);
    
  };



  const handleChangeForSelect = (event) => {
    setcategory(event.target.value);
  };


  const resetALLFilterfunc= ()=>{
    setquery("")
    setCurrentPage(1)
    setPrice([100,500])
    setstarValue(0)
    setcategory("")
  }

  useEffect(() => {
    let noOfFilteredPages = Math.ceil(TotaloOfProducts/filteredProductsCount)
    // console.log({noOfFilteredPages})
  
    if(currentPageinNOtinUsestate >= noOfFilteredPages ){
      setCurrentPage(1)
    }
  }, [query,starValue])
  


 



  let timer;

  useEffect(() => {
    const dbounder = async () => {
      // console.log("rannnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
    //   if(query){
    //     setCurrentPage(0)
    //   }

      await dispatch(getAllProductsAction(currentPage, price, query,category, starValue));
    };

    timer = setTimeout(() => {
      dbounder();
    }, 3000);

    if (AllProductError) {
      toast.error(AllProductError);
      dispatch({ type: "clearErrors" });
    }
    return () => {
      // console.log("cleartiem our");
      clearTimeout(timer);
     
    };
  }, [dispatch, AllProductError, currentPage, price[0], price[1], query,category, starValue]);




  return (
    <Fragment>
      {allProductLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"all products"}/>
          <div className="allproductsMainDIV">
            <div className="product_controls_div">
              
              <Box width={"90%" }  textAlign={"center"}>
                <Typography>select price</Typography>
                <Slider
                  getAriaLabel={() => "price range"}
                  value={price}
                  defaultValue={[0, 12000]}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  max={500}
                  min={100}
                />
                <Typography>{`price range selected ${price[0]} & ${price[1]}`}</Typography>
              </Box>

              <Box sx={{ minWidth: "100%" ,p:3}} textAlign={"center"}>
                {/* <Typography>Category</Typography> */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          onChange={handleChangeForSelect}
        >
          {categories.map((cat, index)=>(
              <MenuItem key={index} value={cat===""?"":cat}>{cat===""?"NONE":cat}</MenuItem>
          ))}

          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>

    <Box  width={"90%" } alignItems={"center"} justifyContent={"center"} display={"flex"}>
      <Typography>Rating</Typography>
      <Rating
  name="simple-controlled"
  value={starValue}
  onChange={(event, newValue) => {
    setstarValue(newValue);
  }}
/>
    </Box>
    <Box sx={{pt:4}} width={150} display={"flex"}>
      <Paper>
        {/* <Typography>Reselt all filters</Typography> */}
       <Button variant="contained" onClick={resetALLFilterfunc}>Reset Filter</Button>
      </Paper>
    </Box>
            </div>

            <div className="showPRoducts_div">
              {allProducts && allProducts.length >= 1
                ? allProducts.map((product, index) => (
                    <Link to={`/product/${product._id}`} key={product._id}>
                      <Product product={product} key={product._id} />
                    </Link>
                  ))
                : "No products as per selection "}
            </div>
            <div className="paginator_div">

            {resultPerPage < filteredProductsCount && (<Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage }
                totalItemsCount={filteredProductsCount}
                pageRangeDisplayed={10}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />)}
              
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllProducts;
