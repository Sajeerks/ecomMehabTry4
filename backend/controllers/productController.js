const Product = require("../models/productModel.js");
const ErrorHander = require("../utils/errorHander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ApiFeatures = require("../utils/apiFeatures.js");



exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new Error("thiss i a proaddctu eerxxx ", 404));
    // return next(new ErrorHander("thiss i a proaddctu eerxxx ",4332))
  }

 const reviews = await product.reviews.filter(rev=>rev._id.toString()!== req.query.id.toString())
//  console.log(reviews)

 let avg = 0
 reviews.forEach(rev=>{
       avg+=rev.rating 
     })
     
     
  const ratings = avg /reviews.length
 const numOfReviews = reviews.length


 await Product.findByIdAndUpdate(req.query.productId,  {
  reviews,ratings,numOfReviews
 }, {
  new:true,
  runvalidators:true,
  useFindAndModify:false
 })

  res.status(200).json({
    message: ` hanges in deletion of the revies is done`,
      success:true
  });
});










exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new Error("thiss i a proaddctu eerxxx ", 4332));
    // return next(new ErrorHander("thiss i a proaddctu eerxxx ",4332))
  }

  res.status(200).json({
  success:true,
   review: product.reviews,
  });
});













exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  // console.log({productId})
  const product = await Product.findById(productId);

  if (!product) {
    return next(new Error("product not found ", 404));
  }

  const  isReviewd =  product.reviews.find(rev=>rev.user.toString() === req.user._id.toString())
  // console.log({isReviewd})

   if(isReviewd){
     product.reviews.forEach(rev=>{
         if(rev.user.toString() ===  req.user._id.toString()){
             rev.comment = comment
             rev.rating =rating
         }
     })
   
   }else{
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
   }


 let avg = 0
product.reviews.forEach(rev=>{
      avg+=rev.rating 
    })
    
    
   product.ratings = avg /product.reviews.length



 await  product.save()
  res.status(200).json({
  message:"your revies ave been addded" ,
    
  });
});

exports.getSingleProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("reviews.user");
  // console.log(product)
  if (!product) {
    return next(new Error("thiss i a proaddctu eerxxx ", 4332));
    // return next(new ErrorHander("thiss i a proaddctu eerxxx ",4332))
  }
  res.status(200).json({
    message: `product with ${req.params.id} is send to the user`,
    product,
  });
});

// async (req, res , next)=>{

//     try {
//     const product = await Product.findById(req.params.id)
//     if(!product){
//         return next(new Error("thiss i a proaddctu eerxxx ",4332))
//         // return next(new ErrorHander("thiss i a proaddctu eerxxx ",4332))

//     }

//       res.status(200 ).json({
//         message:`product with ${req.params.id} is send to the user`,
//         product

//       })
//     } catch (error) {

//         next(error)
//     }
//     // console.log(req)
//     // if(!product){
//     //     console.log(req.params.id +'DDDDDDDDDDDDDFFFF')
//     //     // throw new Error('BROKEN')
//     //     // throw new Error('the bloodugn thing is not foudn', 404)
//     //      next (new ErrorHander('the bloodugn thing is not foudn', 404))
//     //     // return next(new ErrorHander("product not found", 404))
//     //     // return res.status(500).json({
//     //     //     success:false,
//     //     //     message:"Product not found"
//     //     // })
//     // }

//     //   res.status(200 ).json({
//     //     message:`product with ${req.params.id} is send to the user`,
//     //     product

//     //   })
//   }

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Error("product not found ", 404));
  }

  await product.remove();
  res.status(200).json({
    message: `product with ${req.params.id} is delted`,
  });
});

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new Error("prouct is not found for upate", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runvalidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
      message: `product with ${req.params.id} is updated`,
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user._id;
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // console.log("req.user.name in getprdouct deatils", req.user.name)

  const resultPerPage = 4;
  const TotaloOfProducts = await Product.countDocuments();
  const apiFeatuers = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeatuers.query;
  let filteredProductsCount = products.length;

  apiFeatuers.pagination(resultPerPage);

  products = await apiFeatuers.query.clone(); // othe ise iwll have infinte loop
  // products = await apiFeatuers.query  // othe ise iwll have infinte loop

  res.status(200).json({
    products,
    message: "produts  is working fine Alhamdulilla",
    TotaloOfProducts,
    filteredProductsCount,
    resultPerPage,
    //   productLength,
  });
});
