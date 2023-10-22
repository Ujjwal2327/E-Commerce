import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from 'jsonwebtoken';

// check if user is authenticated (logged in) or not
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

  const { token } = req.cookies;

  if(!token){
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
})

// authorize roles
export const authorizeRoles = (...roles) => {

  return (req, res, next) => {

    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
    }

    next();
  }

}