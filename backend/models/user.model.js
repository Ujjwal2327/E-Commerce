import mongoose from "mongoose";
import validator from "validator";  // for email validation
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";  // for reset password token

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {

  if(!this.isModified('password'))
    next();

  this.password = await bcrypt.hash(this.password, 10);

});

// jwt token
userSchema.methods.getJWTToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRE}
  );
}

// compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// generate resetPasswordToken & resetPasswordExpire
userSchema.methods.getResetPasswordToken = function() {

  // generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hashing and adding to userSchema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
  // setting expire time
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
}

export const User = mongoose.model("User", userSchema);
