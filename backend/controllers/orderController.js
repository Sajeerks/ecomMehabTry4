const Order = require("../models/orderModels.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Product = require("../models/productModel.js");
const User = require("../models/userModel.js");


exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    console.log(req.params.id)

    const order = await Order.findById(req.params.id);
  

  
    if (!order) {
      return next(new Error(`your orders could not  be found `, 404));
    }

    order.deleteOne()
  
    res.status(200).json({
      success: true,
     message:` order with id ${req.params.id }  is deleted successfully`
    });
  });









exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new Error(`your orders could not  be found `, 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new Error(`you have already deliverd this order`, 404));
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save();

  res.status(200).json({
    success: true,
    messsage: `order with ${req.params.id}  id is changed status to delivered`,
    order,
  });
});

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  if (!orders) {
    return next(new Error(`your orders could not  be found `, 404));
  }

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    return next(new Error(`your orders could not  be found `, 404));
  }

  res.status(200).json({
    success: true,

    order,
  });
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email "
  );

  //   "user" ,  "name email avatar"
  //   "orderItems.product","image"
  if (!order) {
    return next(new Error(`the request order could not be found `, 404));
  }

  res.status(200).json({
    success: true,

    order,
  });
});

exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  console.log(req.body);

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    messsage: ` new order creatded succesulley  `,
    order,
  });
});




async function updateStock (id, quantity){

    const product = await Product.findById(id)
    console.log(product.stock)
    product.stock-=quantity
     console.log(product.stock)
    await product.save({validateBeforeSave:false})

}