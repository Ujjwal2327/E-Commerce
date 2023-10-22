import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import { User } from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendToken from '../utils/jwtToken.js';

// register user
export const registerUser = catchAsyncErrors(async (req, res, next) => {

  const { name, email, password,  } = req.body;

  const userExists = await User.findOne({ email });

  if(userExists){
    return next(new ErrorHandler('User already exists', 400));
  }

  const user = await User.create({
    name, email, password,
    avatar: {
      public_id: 'this is a sample id',
      url: 'profilepic.jpg'
    }
  });

  sendToken(user, 201, res);

})


// login user
export const loginUser = catchAsyncErrors(async (req, res, next) => {

  const { email, password } = req.body;

  if(!email || !password){
    return next(new ErrorHandler('Please enter email & password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if(!user){
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  
  sendToken(user, 200, res);

})


// logout user
export const logoutUser = catchAsyncErrors(async (req, res, next) => {

  const user = req.user;

  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: `Logged out successfully`
  })

})