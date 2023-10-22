import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
      minLength: [8, "Password ahould be greater than 8 characters"],
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

export const User = mongoose.model("User", userSchema);
