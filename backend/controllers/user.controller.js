import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import { User } from '../models/user.model.js';
import ErrorHandler from '../utils/errorHandler.js';
import sendToken from '../utils/jwtToken.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';

// register user
export const registerUser = catchAsyncErrors(async (req, res, next) => {

  const { name, email, password } = req.body;

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

  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: `Logged out successfully`
  })

})


// forgot password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

  if(!req.body.email){
    return next(new ErrorHandler("Please enter your email", 400));
  }

  const user = await User.findOne({ email: req.body.email });

  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }

  // get reset-password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is:-\n\n ${resetPasswordUrl} \n\n It is only valid for 15 minutes. \n\n If you have not requested this email, then ignore it.`;

  try{

    await sendEmail({
      email: user.email,  // receiver's email address
      subject: 'CartXpress Password Recovery',
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`
    })

  }
  catch(error){

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save({ validateBeforeSave: false });
    
    return next(new ErrorHandler(error.message, 500));
  }

})


// reset password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {

  const { password, confirmPassword } = req.body;

  if(!password || !confirmPassword){
    return next(new ErrorHandler("Please enter both password & confirmPassword", 400));
  }

  if(password !== confirmPassword){
    return next(new ErrorHandler("Passwords don't match", 400));
  }

  // hash url token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken, 
    resetPasswordExpire: {$gt: Date.now()}
  });

  if(!user){
    return next(new ErrorHandler("Password reset token is invalid or has been expired", 400));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);

})


// get user details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })

})


// update password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  
  const { oldPassword, newPassword, confirmPassword } = req.body;
  
  if(!oldPassword || !newPassword || !confirmPassword){
    return next(new ErrorHandler("Please enter all fields", 400));
  }

  if(newPassword !== confirmPassword){
    return next(new ErrorHandler("Passwords don't match", 400));
  }
  
  const user = await User.findById(req.user.id).select('+password');

  const isMatch = await user.comparePassword(oldPassword);

  if(!isMatch){
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = newPassword;

  await user.save();

  sendToken(user, 200, res);

})


// update user profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findByIdAndUpdate(
    req.user.id, 
    req.body,
    {'new': true, 'runValidators': true}
  );

  res.status(200).json({
    success: true,
    user
  })

})


// get all users -- admin only
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  })

})


// get user details -- admin only
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user
  })

})


// update user role -- admin only
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {

  const userExists = await User.findById(req.params.id);

  if(!userExists){
    return next( new ErrorHandler(`User does not exists with id: ${req.params.id}`,400));
  }

  const user = await User.findByIdAndUpdate(
    req.params.id, 
    // req.body,
    {role: req.body.role},
    {'new': true, 'runValidators': true}
  );

  res.status(200).json({
    success: true,
    user
  })

})


// delete user -- admin only
export const deleteUser = catchAsyncErrors(async (req, res, next) => {

  if(req.params.id === req.user.id){
    return next( new ErrorHandler(`You can't delete yourself`,400));
  }

  const user = await User.findById(req.params.id);

  if(!user){
    return next( new ErrorHandler(`User does not exists with id: ${req.params.id}`,400));
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: `User deleted successfully`
  })

})
