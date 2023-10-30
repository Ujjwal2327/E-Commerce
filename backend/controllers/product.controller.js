import ErrorHandler from '../utils/errorHandler.js';
import { Product } from './../models/product.model.js';
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import ApiFeatures from '../utils/apiFeatures.js';

// create new product -- admin only
export const createProduct = catchAsyncErrors(async (req, res, next) => {

  const { name, description , price, images, category, stock } = req.body;
  // if anyone of these are missing, then it wont change those values in the database

  const product = await Product.create({
    name, description , price, images, category, stock, user: req.user._id
  });

  res.status(201).json({
    success: true,
    product
  })

})


// get all products
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {

  // for pagination
  const resultsPerPage = 4;
  const productsCount = await Product.countDocuments();

  // for searching and filtering
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search().filter().pagination(resultsPerPage);
  // const apiFeature = new ApiFeatures(Product, req.query).search().filter().pagination(resultsPerPage);

  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount
  })

})


// update product -- admin only
export const updateProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    product._id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );

  res.status(200).json({
    success: true,
    updatedProduct
  })
    
})


// delete product -- admin only
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  })
  
})


// get single product details
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if(!product){
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product
  })

})

