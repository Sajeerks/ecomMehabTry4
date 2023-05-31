import React, { Fragment, useEffect } from 'react'
import { useTheme } from "@mui/material/styles";
import { Typography } from '@mui/material';
import "./Home.css"
import { green, purple } from '@mui/material/colors';
import MouseIcon from '@mui/icons-material/Mouse';
import Product from '../../components/Product/Product.js'
import { Link } from "react-router-dom";
import MetaData from '../MetaData.js/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../actions/productActions';
import { toast } from 'react-hot-toast';
import Loader from '../Loader/Loader'
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
} from 'react-share';



import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


const products  =JSON.parse(JSON.stringify( 
    [{
        "_id": {
          "$oid": "646a03b825c042ed737dfd63"
        },
        "name": "did",
        "description": "8888888 desciption",
        "price": 254,
        "images": [
          {
            "public_id": "sample 888",
            "url": "https://www.shutterstock.com/image-illustration/green-hydrogen-h2-gas-molecule-600w-1938738706.jpg",
            "_id": {
              "$oid": "646a03b825c042ed737dfd64"
            }
          }
        ],
        "category": "sample 888888",
        "stock": 4920,
        "numOfReviews": 1,
        "user": {
          "$oid": "646872389f7ac6db98c71c88"
        },
        "reviews": [
          {
            "user": {
              "$oid": "6469f9a4582374ec0f31be16"
            },
            "name": " sajeer",
            "rating": 6,
            "comment": "this is the first gggggggggggggggggggggggggg mnn",
            "_id": {
              "$oid": "646a0509686e145329af3a3c"
            }
          }
        ],
        "createdAt": {
          "$date": "2023-05-21T11:42:48.576Z"
        },
        "__v": 3,
        "ratings": 6
      },{
        "_id": {
          "$oid": "646a03ba25c042ed737dfd67"
        },
        "name": "dfdfdf",
        "description": "start line start line   this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product this is a very good product",
        "price": 254,
        "images": [
          {
            "public_id": "sample 888",
            "url": "https://www.shutterstock.com/image-illustration/green-hydrogen-h2-gas-molecule-600w-1938738706.jpg",
            "_id": {
              "$oid": "646a03ba25c042ed737dfd68"
            }
          }
        ],
        "category": "sample 888888",
        "stock": 25,
        "numOfReviews": 1,
        "user": {
          "$oid": "646872389f7ac6db98c71c88"
        },
        "reviews": [
          {
            "user": {
              "$oid": "6469f9a4582374ec0f31be16"
            },
            "name": " sajeer",
            "rating": 5,
            "comment": "this is the first ssssssssssssssdfdfsddf mnn",
            "_id": {
              "$oid": "646a04f8686e145329af3a37"
            }
          }
        ],
        "createdAt": {
          "$date": "2023-05-21T11:42:50.800Z"
        },
        "__v": 5,
        "ratings": 1
      },{
        "_id": {
          "$oid": "646a03bd25c042ed737dfd6b"
        },
        "name": "sss",
        "description": "8888888 desciption",
        "price": 254,
        "images": [
          {
            "public_id": "sample 888",
            "url": "https://www.shutterstock.com/image-illustration/green-hydrogen-h2-gas-molecule-600w-1938738706.jpg",
            "_id": {
              "$oid": "646a03bd25c042ed737dfd6c"
            }
          }
        ],
        "category": "sample 888888",
        "stock": 25,
        "numOfReviews": 0,
        "user": {
          "$oid": "646872389f7ac6db98c71c88"
        },
        "reviews": [],
        "createdAt": {
          "$date": "2023-05-21T11:42:53.242Z"
        },
        "__v": 0
      }]


))

let product = {}
  // console.log(products)
const Home = () => {
  const theme = useTheme()

  const dispatch = useDispatch()

  const {loading:allProductLoading, products:allProducts, error:AllProductError} = useSelector(state=>state.allProducts)

  useEffect(() => {
    dispatch(getAllProductsAction())
    if(AllProductError){
      toast.error(AllProductError)
      dispatch({type:"clearErrors"})
    }
  }, [dispatch,AllProductError])
  

  // console.log(allProducts)


  
  // const handleDownloadPdf = async () => {
      
    // const element = rootREf;
  //   // const element =  await document.getElementById('root');
  //   const element =  await document.getElementById("home")
  //   // const element =  await document.getElementsByClassName(".leftproduct")


    
  //   const canvas = await html2canvas(element ,{
  //       windowHeight:element.scrollHeight,
  //       windowWidth:element.scrollWidth

  //   });
  //    const data = await canvas.toDataURL('image/png', 1.0);
  //   // const data = await canvas.toDataURL('image/png');

  //   //  await  saveAs( data,"sdfds.png")
  //   const pdf = new jsPDF();
  //   const imgProperties = pdf.getImageProperties(data);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight =
  //     (imgProperties.height * pdfWidth) / imgProperties.width;

  //   pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save('print.pdf');
  // };



  return ( 
    <>
               { allProductLoading ?(<Loader/>):(<>
                <Fragment>
                <MetaData title={"HOme"}/>
                <div className='home' id="home">
                <Typography sx={{ color:theme.palette.text.primary , textTransform:"uppercase" , overflow:"hidden" ,
              fontSize:"5vmax",
              fontStyle: 'italic',fontWeight:"bold",
              paddingTop:3
            
            }} textAlign={"center"} variant='h1'>
                       welcome to home
                </Typography>

  <div className='banner'>
    <button>
        <a href="#container">
            Scroll <MouseIcon/>
        </a>
    </button>

  </div>
     
<h2 className='prooductHeaing'>PRODUCTS</h2>
  <div id="container" >

    {allProducts && allProducts.map((product, index)=>(

      <Link to={`/product/${product._id}` } key={product._id}> 
         <Product product={product} key={product._id}/>
         </Link>
    ))}
        
  </div>

  {/* <div>

 <button onClick={handleDownloadPdf}>onver to pdf</button>
  </div> */}

{/* 
  <div>

<FacebookShareButton
  
  url={'https://www.pakkamarwadi.tk/'}
  quote={'Title or jo bhi aapko likhna ho'}
  hashtag={'#portfolio...'}
>
  
  <FacebookIcon size={40} round={true} />
</FacebookShareButton>
<WhatsappShareButton
      url={'https://www.pakkamarwadi.tk/'}
      quote={'Title or jo bhi aapko likhna ho'}
      hashtag={'#portfolio...'}
    >
      <WhatsappIcon size={40} round={true} />
    </WhatsappShareButton>
  </div> */}
{/* <img src={"https://images.ctfassets.net/hrltx12pl8hq/5CQKrQCEI9IUMRhWkW2RRH/d63eb46e78090142283a074f6fb85ae3/Creative_Collection.jpg?fit=fill&w=960&h=540&fm=webp"}/> */}

  </div>

               </Fragment>
                
                </>)}

                </>
  )
}

export default Home