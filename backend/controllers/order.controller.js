import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Order } from "../models/order.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { Product } from './../models/product.model.js';


// create new order
export const createOrder = catchAsyncErrors(async (req, res, next) => {

  const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id
  })

  res.status(201).json({
    success: true,
    order
  })

})


// get single order
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  
  const order = await Order.findById(req.params.id).populate('user', 'name email')  // populate() is a mongoose method that allows us to populate the user field with the name and email fields from the User model

  if (!order) {
    return next(new Error('Order not found with this ID'))
  }

  res.status(200).json({
    success: true,
    order
  })

})


// get logged in user orders
export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
  
  const orders = await Order.find({ user: req.user._id })

  res.status(200).json({
    success: true,
    orders
  })

})


// get all orders -- admin only
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {

  const orders = await Order.find()

  let totalAmount = 0;

  orders.forEach(order => {
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  })

})


// update order status -- admin only
export const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404));
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order',400));
  }

  // order.orderItems.forEach(async item => {
  //   await updateStock(item.product, item.quantity)
  // })

  for(const item of order.orderItems) {
    const product = await Product.findById(item.product);

    if(!product)
      return next(new ErrorHandler('Product not found with this ID', 404))
    
    if(product.stock < item.quantity)
      return next(new ErrorHandler(`Product ${product.name} is out of stock`, 400))
    
    product.stock -= item.quantity;

    await product.save({ validateBeforeSave: false })
  }

  order.orderStatus = req.body.status;

  if(req.body.status === 'Delivered') {
    order.deliveredAt = Date.now()
  }

  await order.save({ validateBeforeSave: false})

  res.status(200).json({
    success: true,
    order
  })

})

// // update stock after order is placed
// const updateStock = async (id, quantity) => {

//   const product = await Product.findById(id)

//   product.stock -= quantity;

//   await product.save({ validateBeforeSave: false })

// }


// delete order -- admin only
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler('Order not found with this ID', 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Order deleted successfully'
  })

})
